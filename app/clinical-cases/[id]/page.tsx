"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clinicalCases } from "@/data/clinical-cases";
import { ClinicalCase, CaseAction } from "@/types/clinical-case";
import { motion, AnimatePresence } from "framer-motion";

interface Feedback {
  type: 'success' | 'error';
  message: string;
}

interface SelectedAction extends CaseAction {
  selectionOrder: number;
}

export default function CaseSimulatorPage() {
  const { id } = useParams();
  const router = useRouter();
  const [currentCase, setCurrentCase] = useState<ClinicalCase | null>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [selectedActions, setSelectedActions] = useState<SelectedAction[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isStageComplete, setIsStageComplete] = useState(false);
  const [startTime] = useState<number>(Date.now());
  const [stageScores, setStageScores] = useState<number[]>([]);

  useEffect(() => {
    const caseData = clinicalCases.find((c) => c.id === id);
    if (!caseData) {
      router.push("/clinical-cases");
      return;
    }
    setCurrentCase(caseData);
    
    // Initialize or load previous scores
    const savedScores = sessionStorage.getItem('stageScores');
    if (savedScores) {
      setStageScores(JSON.parse(savedScores));
    }
  }, [id, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStage]);

  const calculateStageScore = (selectedActs: CaseAction[], correctActs: CaseAction[]) => {
    const correctlySelected = selectedActs.filter(a => a.isCorrect).length;
    const totalCorrect = correctActs.length;
    return Math.round((correctlySelected / totalCorrect) * 100);
  };

  const handleActionSelect = (action: CaseAction) => {
    if (!currentCase || isStageComplete) return;
    
    const actionExists = selectedActions.some(a => a.text === action.text);
    
    if (actionExists) {
      // Remove the action and reorder remaining actions
      const newSelectedActions = selectedActions
        .filter(a => a.text !== action.text)
        .map((a, index) => ({
          ...a,
          selectionOrder: index + 1
        }));
      setSelectedActions(newSelectedActions);
      setFeedback(null);
    } else {
      // Add the action with the next order number
      const newSelectedActions = [
        ...selectedActions,
        { ...action, selectionOrder: selectedActions.length + 1 }
      ];
      setSelectedActions(newSelectedActions);
      
      // Store user actions in session storage
      const userActions = JSON.parse(sessionStorage.getItem('userActions') || '[]');
      userActions[currentStage] = newSelectedActions.map(a => ({ 
        text: a.text, 
        order: a.selectionOrder,
        isCorrect: a.isCorrect 
      }));
      sessionStorage.setItem('userActions', JSON.stringify(userActions));
    }
  };

  const handleFinishStage = () => {
    if (!currentCase || !stage) return;

    setIsStageComplete(true);
    
    // Check if all correct actions are selected in the right order
    const correctActions = stage.actions
      .filter(a => a.isCorrect)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
      
    const selectedCorrectActions = selectedActions
      .filter(a => a.isCorrect)
      .map((a, index) => ({ ...a, selectedOrder: index + 1 }));

    const isOrderCorrect = selectedCorrectActions.every((action, index) => 
      action.order === index + 1
    );

    // Calculate and save stage score
    const stageScore = calculateStageScore(selectedActions, correctActions);
    const newStageScores = [...stageScores];
    newStageScores[currentStage] = stageScore;
    setStageScores(newStageScores);
    sessionStorage.setItem('stageScores', JSON.stringify(newStageScores));

    if (selectedActions.length === correctActions.length && isOrderCorrect) {
      setFeedback({
        type: 'success',
        message: 'Correct sequence! Well done.'
      });
    } else {
      setFeedback({
        type: 'error',
        message: 'Check your selected actions and their order.'
      });
    }
  };

  const handleNextStage = () => {
    if (!currentCase) return;
    
    if (currentStage < currentCase.stages.length - 1) {
      setCurrentStage(currentStage + 1);
      setSelectedActions([]);
      setTimeLeft(60);
      setFeedback(null);
      setIsStageComplete(false);
    } else {
      // Calculate final results
      const endTime = Date.now();
      const totalTime = Math.floor((endTime - startTime) / 1000); // in seconds
      const overallScore = Math.round(stageScores.reduce((acc, score) => acc + score, 0) / stageScores.length);
      
      // Store results in session storage
      sessionStorage.setItem('caseResults', JSON.stringify({
        score: overallScore,
        completionTime: totalTime,
        stagesCompleted: currentStage + 1
      }));
      
      // Navigate to results page
      router.push(`/clinical-cases/${id}/results`);
    }
  };

  if (!currentCase) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading case...</p>
      </div>
    );
  }

  const stage = currentCase.stages[currentStage];
  const progress = ((currentStage + 1) / currentCase.stages.length) * 100;

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Progress Bar and Info */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          <div>Stage {currentStage + 1} of {currentCase.stages.length}</div>
          <div>{progress.toFixed(0)}% Complete</div>
          <div className="flex items-center gap-4">
            <div>Score: {stageScores[currentStage] || 0}%</div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {timeLeft}s left
            </div>
          </div>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Patient Information Card */}
        <Card className="mb-6 divide-y">
          <div className="p-4">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">Patient Information</h2>
              <h2 className="font-semibold">Vital Signs</h2>
            </div>
            <div className="grid grid-cols-2">
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600">Age:</span> {currentCase.patientInfo.age}
                </div>
                <div>
                  <span className="text-gray-600">Gender:</span>{" "}
                  {currentCase.patientInfo.gender}
                </div>
                <div>
                  <span className="text-gray-600">Chief Complaint:</span>{" "}
                  {currentCase.patientInfo.chiefComplaint}
                </div>
                {currentCase.patientInfo.pastMedicalHistory && (
                  <div>
                    <span className="text-gray-600">PMH:</span>{" "}
                    {currentCase.patientInfo.pastMedicalHistory.join(", ")}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-y-2">
                {currentCase.vitalSigns.temperature && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {currentCase.vitalSigns.temperature}
                  </div>
                )}
                {currentCase.vitalSigns.heartRate && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {currentCase.vitalSigns.heartRate}
                  </div>
                )}
                {currentCase.vitalSigns.bloodPressure && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    BP: {currentCase.vitalSigns.bloodPressure}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Question and Actions */}
        <Card className="mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">{stage.question}</h2>
            <div className="space-y-3">
              {stage.actions.map((action) => {
                const selectedAction = selectedActions.find(a => a.text === action.text);
                return (
                  <button
                    key={action.text}
                    onClick={() => handleActionSelect(action)}
                    className={`w-full p-4 rounded-lg border transition-colors relative ${
                      selectedAction
                        ? "bg-primary/10 border-primary"
                        : "hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedAction
                          ? "bg-primary text-white"
                          : "bg-gray-100"
                      }`}>
                        {selectedAction ? (
                          <span className="font-semibold">{selectedAction.selectionOrder}</span>
                        ) : (
                          action.type === "Examination" ? (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          ) : action.type === "Treatment" ? (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          )
                        )}
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{action.text}</div>
                        <div className="text-sm text-gray-600">{action.type}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Feedback Animation */}
        <AnimatePresence mode="wait">
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
              className={`p-4 rounded-lg mt-4 ${
                feedback.type === 'success' ? "bg-green-50 text-green-800" : "bg-blue-50 text-blue-800"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {feedback.type === 'success' ? (
                    <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <p className="text-sm">{feedback.message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/clinical-cases")}>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Exit Case
          </Button>
          {!isStageComplete ? (
            <Button
              onClick={handleFinishStage}
              disabled={selectedActions.length === 0}
            >
              Finish Stage
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedActions([]);
                  setFeedback(null);
                  setIsStageComplete(false);
                }}
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Retry
              </Button>
              <Button
                onClick={handleNextStage}
              >
                {currentStage < currentCase.stages.length - 1
                  ? "Next Stage"
                  : "Complete Case"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 