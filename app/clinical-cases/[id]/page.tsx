"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clinicalCases } from "@/data/clinical-cases";
import { ClinicalCase } from "@/types/clinical-case";
import { motion, AnimatePresence } from "framer-motion";

export default function CaseSimulatorPage() {
  const { id } = useParams();
  const router = useRouter();
  const [currentCase, setCurrentCase] = useState<ClinicalCase | null>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);

  useEffect(() => {
    const caseData = clinicalCases.find((c) => c.id === id);
    if (!caseData) {
      router.push("/clinical-cases");
      return;
    }
    setCurrentCase(caseData);
  }, [id, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStage]);

  const handleActionSelect = (action: { text: string; feedback: string; isCorrect: boolean }) => {
    if (selectedActions.includes(action.text)) {
      setSelectedActions(selectedActions.filter((a) => a !== action.text));
      setFeedback(null);
    } else {
      setSelectedActions([...selectedActions, action.text]);
      setFeedback({
        text: action.feedback,
        isCorrect: action.isCorrect
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
    } else {
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
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {timeLeft}s left
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
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">{stage.question}</h2>
          <div className="space-y-2">
            {stage.actions.map((action) => (
              <motion.button
                key={action.text}
                onClick={() => handleActionSelect(action)}
                whileTap={{ scale: 0.98 }}
                animate={{
                  scale: selectedActions.includes(action.text) ? [1, 1.02, 1] : 1,
                  transition: {
                    duration: 0.3,
                    type: "spring",
                    bounce: 0.4
                  }
                }}
                className={`w-full p-4 text-left rounded-lg border transition-colors ${
                  selectedActions.includes(action.text)
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-800">
                    {action.type}
                  </span>
                  {action.text}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Feedback Animation */}
          <AnimatePresence mode="wait">
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                className={`p-4 rounded-lg mt-4 ${
                  feedback.isCorrect ? "bg-green-50 text-green-800" : "bg-blue-50 text-blue-800"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {feedback.isCorrect ? (
                      <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm">{feedback.text}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/clinical-cases")}>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Exit Case
          </Button>
          <Button
            onClick={handleNextStage}
            disabled={selectedActions.length === 0}
          >
            {currentStage < currentCase.stages.length - 1
              ? "Next Stage"
              : "Complete Case"}
          </Button>
        </div>
      </div>
    </div>
  );
} 