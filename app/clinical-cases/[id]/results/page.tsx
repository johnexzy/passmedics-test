"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clinicalCases } from "@/data/clinical-cases";
import { ClinicalCase } from "@/types/clinical-case";
import { useFlashcards } from '@/context/FlashcardContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Link from "next/link";
import { useHistory } from '@/context/HistoryContext';

interface UserAction {
  text: string;
  order?: number;
  isCorrect: boolean;
}

export default function CaseResultsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [currentCase, setCurrentCase] = useState<ClinicalCase | null>(null);
  const [isAddToFlashcardsOpen, setIsAddToFlashcardsOpen] = useState(false);
  const [deckName, setDeckName] = useState('');
  const [hasRecorded, setHasRecorded] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    completionTime: number;
    stagesCompleted: number;
  } | null>(null);
  const { dispatch: flashcardDispatch } = useFlashcards();
  const { dispatch: historyDispatch } = useHistory();

  useEffect(() => {
    const caseData = clinicalCases.find((c) => c.id === id);
    if (!caseData) {
      router.push("/clinical-cases");
      return;
    }
    setCurrentCase(caseData);
    
    // Calculate score based on stored user actions
    const userActions = JSON.parse(sessionStorage.getItem('userActions') || '[]') as UserAction[][];
    let correctStages = 0;
    
    userActions.forEach((stageActions: UserAction[], stageIndex: number) => {
      const stage = caseData.stages[stageIndex];
      if (!stage) return;
      
      const correctActions = stage.actions
        .filter(a => a.isCorrect)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
        
      const selectedCorrectActions = stageActions
        .filter(a => a.isCorrect)
        .map((a, index) => ({ ...a, selectedOrder: index + 1 }));
      
      const isOrderCorrect = selectedCorrectActions.every((action, index) => 
        action.order === index + 1
      );
      
      if (selectedCorrectActions.length === correctActions.length && isOrderCorrect) {
        correctStages++;
      }
    });
    
    const calculatedScore = Math.round((correctStages / caseData.stages.length) * 100);

    // Set default deck name
    setDeckName(`${caseData.title} - ${new Date().toLocaleDateString()}`);

    // Record attempt in history with the calculated score
    if (!hasRecorded) {
      historyDispatch({
        type: 'ADD_ATTEMPT',
        payload: {
          id: Math.random().toString(36).substring(2),
          type: 'clinical-case',
          title: caseData.title,
          score: calculatedScore,
          accuracy: calculatedScore,
          timeSpent: 0, // We'll implement this later
          timestamp: new Date(),
          details: {
            category: caseData.category,
            difficulty: caseData.difficulty,
            totalQuestions: caseData.stages.length,
            correctAnswers: correctStages,
          },
        },
      });
      setHasRecorded(true);
    }

    // Clean up session storage
    return () => {
      sessionStorage.removeItem('caseStartTime');
      sessionStorage.removeItem('userActions');
    };
  }, [id, router, hasRecorded, historyDispatch]);

  useEffect(() => {
    // Load results from session storage
    const savedResults = sessionStorage.getItem('caseResults');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    } else {
      router.push('/clinical-cases');
    }
  }, [router]);

  const handleAddToFlashcards = () => {
    if (!currentCase || !deckName.trim()) return;

    // Generate deck ID
    const newDeckId = Math.random().toString(36).substring(2) + Date.now().toString(36);

    // Create a new deck
    flashcardDispatch({
      type: 'CREATE_DECK',
      payload: {
        id: newDeckId,
        name: deckName.trim(),
        description: `Clinical case: ${currentCase.title}. ${currentCase.description}`,
      },
    });

    // Add cards for each stage and action
    currentCase.stages.forEach((stage, stageIndex) => {
      // Add a card for the stage question
      flashcardDispatch({
        type: 'ADD_CARD',
        payload: {
          deckId: newDeckId,
          card: {
            front: `Stage ${stageIndex + 1}: ${stage.question}`,
            back: stage.actions
              .filter(action => action.isCorrect)
              .map(action => `• ${action.type}: ${action.text}\n${action.feedback}`)
              .join('\n\n'),
          },
        },
      });

      // Add individual cards for each action
      stage.actions.forEach(action => {
        flashcardDispatch({
          type: 'ADD_CARD',
          payload: {
            deckId: newDeckId,
            card: {
              front: `${action.type}: ${action.text}\n\nIs this the correct approach for:\n${stage.question}`,
              back: `${action.isCorrect ? '✓ Correct' : '✗ Incorrect'}\n\n${action.feedback}`,
            },
          },
        });
      });
    });

    setIsAddToFlashcardsOpen(false);
    router.push('/flashcards');
  };

  if (!currentCase || !results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading results...</p>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex justify-between items-center p-4 border-b">
        <Link href="/clinical-cases" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Cases
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Case Completed!</h1>
          <p className="text-xl text-gray-600">{currentCase.title}</p>
          <div className="flex items-center justify-center gap-4 mt-2 text-sm text-gray-500">
            <span>{currentCase.category}</span>
            <span>•</span>
            <span>{currentCase.difficulty}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{results.score}%</div>
            <div className="text-sm text-gray-600">Overall Score</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">
              {formatTime(results.completionTime)}
            </div>
            <div className="text-sm text-gray-600">Completion Time</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">{results.stagesCompleted}</div>
            <div className="text-sm text-gray-600">Stages Completed</div>
          </Card>
        </div>

        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Clinical Decision Analysis</h2>
            <div className="space-y-6">
              {currentCase.stages.map((stage, index) => (
                <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      stage.actions.some(action => action.isCorrect) ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
                    }`}>
                      {stage.actions.some(action => action.isCorrect) ? (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Stage {index + 1}: {stage.question}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {stage.actions.map(action => (
                          <div key={action.text}>
                            {action.isCorrect ? (
                              <span className="text-green-500">✓ {action.type}: {action.text}</span>
                            ) : (
                              <span className="text-red-500">✗ {action.type}: {action.text}</span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 text-sm">
                        {stage.actions.map(action => (
                          <div key={action.text}>
                            {action.isCorrect ? action.feedback : action.feedback}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => router.push('/clinical-cases')}>
            Try Another Case
          </Button>
          <Button onClick={() => router.push('/history')}>
            View History
          </Button>
          <Button onClick={() => setIsAddToFlashcardsOpen(true)}>
            Add to Flashcards
          </Button>
        </div>

        {/* Add to Flashcards Dialog */}
        <Dialog open={isAddToFlashcardsOpen} onOpenChange={setIsAddToFlashcardsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to Flashcards</DialogTitle>
              <DialogDescription>
                Create a new flashcard deck from this clinical case. This will create cards for each stage and action with their feedback.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label htmlFor="deckName" className="block text-sm font-medium text-gray-700">
                  Deck Name
                </label>
                <input
                  id="deckName"
                  type="text"
                  value={deckName}
                  onChange={(e) => setDeckName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter deck name"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddToFlashcardsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddToFlashcards}>
                  Create Flashcards
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
} 