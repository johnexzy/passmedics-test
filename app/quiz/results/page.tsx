"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/context/QuizContext";
import { useEffect, useState } from "react";
import { useFlashcards } from '@/context/FlashcardContext';
import { useHistory } from '@/context/HistoryContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Header from "@/components/Header";

export default function QuizResults() {
  const router = useRouter();
  const { state: quizState, dispatch: quizDispatch } = useQuiz();
  const { dispatch: flashcardDispatch } = useFlashcards();
  const { dispatch: historyDispatch } = useHistory();
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [isAddingToFlashcards, setIsAddingToFlashcards] = useState(false);
  const [deckName, setDeckName] = useState('');

  // Calculate overall score
  const calculateOverallScore = () => Math.round(
    (quizState.answers.filter((answer, index) => {
      const question = quizState.questions[index];
      return question?.correctAnswer === answer.selectedOption;
    }).length / quizState.answers.length) * 100
  );

  useEffect(() => {
    if (!quizState.isComplete || quizState.questions.length === 0) {
      router.push('/quiz');
      return;
    }

    // Get the total time from the last answer's timeSpent
    const totalTime = quizState.answers[quizState.answers.length - 1]?.timeSpent || 0;

    // Calculate score and store in history
    const correctAnswers = quizState.answers.filter(
      (answer) => {
        const question = quizState.questions.find((q) => q.id === answer.questionId);
        return question?.correctAnswer === answer.selectedOption;
      }
    ).length;

    const score = Math.round((correctAnswers / quizState.questions.length) * 100);
    const accuracy = Math.round((correctAnswers / quizState.questions.length) * 100);

    historyDispatch({
      type: 'ADD_ATTEMPT',
      payload: {
        id: Math.random().toString(36).substring(2),
        type: 'quiz',
        title: 'Medical Knowledge Quiz',
        score,
        accuracy,
        timeSpent: totalTime,
        timestamp: new Date(),
        details: {
          totalQuestions: quizState.questions.length,
          correctAnswers,
          questions: quizState.questions.map((question, index) => {
            const answer = quizState.answers[index];
            return {
              category: question.category,
              difficulty: question.difficulty,
              question: question.question,
              selectedAnswer: answer.selectedOption,
              correctAnswer: question.correctAnswer,
              explanation: question.explanation,
              isCorrect: answer.selectedOption === question.correctAnswer,
            };
          }),
        },
      },
    });

    // Only cleanup when navigating away from results page
    const handleRouteChange = () => {
      if (!window.location.pathname.includes('/results')) {
        quizDispatch({ type: 'RESET_QUIZ' });
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [quizState, router, historyDispatch, quizDispatch]);

  // Calculate topic performance
  const calculateTopicPerformance = () => {
    const topicResults: { [key: string]: { correct: number; total: number } } = {};
    
    quizState.questions.forEach((question, index) => {
      const answer = quizState.answers[index];
      if (!answer) return;

      if (!topicResults[question.category]) {
        topicResults[question.category] = { correct: 0, total: 0 };
      }

      topicResults[question.category].total += 1;
      if (answer.selectedOption === question.correctAnswer) {
        topicResults[question.category].correct += 1;
      }
    });

    return Object.entries(topicResults).map(([topic, results]) => ({
      topic,
      percentage: Math.round((results.correct / results.total) * 100)
    }));
  };

  const topicPerformance = calculateTopicPerformance();
  const overallScore = calculateOverallScore();

  const handleTryAgain = () => {
    quizDispatch({ type: 'RESET_QUIZ' });
    router.push("/quiz");
  };

  const handleCreateFlashcards = () => {
    // Generate deck ID first
    const newDeckId = Math.random().toString(36).substring(2) + Date.now().toString(36);

    // Create a new deck from quiz results
    flashcardDispatch({
      type: 'CREATE_DECK',
      payload: {
        id: newDeckId,
        name: `Quiz Results - ${new Date().toLocaleDateString()}`,
        description: `Quiz results with ${quizState.questions.length} questions. Score: ${overallScore}%`,
      },
    });

    // Add cards for each question
    quizState.questions.forEach((question, index) => {
      const answer = quizState.answers[index];
      const selectedOption = question.options.find(o => o.id === answer?.selectedOption);
      const correctOption = question.options.find(o => o.id === question.correctAnswer);

      flashcardDispatch({
        type: 'ADD_CARD',
        payload: {
          deckId: newDeckId,
          card: {
            front: `Q: ${question.question}\n\nYour Answer: ${selectedOption?.text || 'Unanswered'}\nCorrect Answer: ${correctOption?.text}`,
            back: question.explanation,
          },
        },
      });
    });

    // Navigate to the flashcards page
    router.push('/flashcards');
  };

  const handleAddQuestionToFlashcards = () => {
    if (!selectedQuestion || !deckName.trim()) return;

    // Generate deck ID
    const newDeckId = Math.random().toString(36).substring(2) + Date.now().toString(36);

    // Create a new deck
    flashcardDispatch({
      type: 'CREATE_DECK',
      payload: {
        id: newDeckId,
        name: deckName.trim(),
        description: `Question from medical quiz on ${new Date().toLocaleDateString()}`,
      },
    });

    // Add the question as a flashcard
    flashcardDispatch({
      type: 'ADD_CARD',
      payload: {
        deckId: newDeckId,
        card: {
          front: `Q: ${quizState.questions[selectedQuestion].question}\n\nYour Answer: ${quizState.answers[selectedQuestion].selectedOption}\nCorrect Answer: ${quizState.questions[selectedQuestion].correctAnswer}`,
          back: quizState.questions[selectedQuestion].explanation,
        },
      },
    });

    setIsAddingToFlashcards(false);
    setSelectedQuestion(null);
    router.push('/flashcards');
  };

  if (!quizState.isComplete || quizState.questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No quiz results available</p>
          <Link href="/quiz" className="text-primary hover:underline">
            Start a New Quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Overall Score */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <svg className="w-32 h-32" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-primary"
                strokeDasharray={`${overallScore}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div>
                <div className="text-3xl font-bold">{overallScore}%</div>
                <div className="text-sm text-gray-500">Complete</div>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-4">Keep Practicing!</h1>
          <p className="text-gray-600">
            Don&apos;t worry, practice makes perfect. Review your answers to understand the concepts better.
          </p>
        </div>

        {/* Topic Performance */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Topic Analysis</h2>
            <div className="space-y-4">
              {topicPerformance.map((topic) => (
                <div key={topic.topic}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{topic.topic}</span>
                    <span>{topic.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${topic.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Topic Performance</h2>
            <div className="space-y-2">
              {topicPerformance.map((topic) => (
                <div key={topic.topic} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    topic.percentage >= 70 ? 'bg-green-500' :
                    topic.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <span className="text-sm">{topic.topic}</span>
                  <span className="text-sm text-gray-500 ml-auto">{topic.percentage}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Detailed Question Review */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Detailed Question Review</h2>
          {quizState.questions.map((question, index) => {
            const answer = quizState.answers[index];
            const selectedOption = question.options.find(o => o.id === answer?.selectedOption);
            const correctOption = question.options.find(o => o.id === question.correctAnswer);

            return (
              <Card key={question.id} className="p-6">
                <div className="flex gap-2 mb-4">
                  <Badge variant="secondary" className="bg-blue-100 text-primary">
                    {question.category}
                  </Badge>
                  <Badge variant="secondary" className="bg-gray-100">
                    {question.difficulty}
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Question {index + 1}</h3>
                    <p className="text-gray-600">{question.question}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      answer?.selectedOption === question.correctAnswer ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <span className="font-medium">Your Answer:</span>
                    <span className="text-gray-600">{selectedOption?.text || 'Unanswered'}</span>
                  </div>
                  {answer?.selectedOption !== question.correctAnswer && (
                    <div className="flex items-center gap-2 text-green-600">
                      <span className="font-medium">Correct Answer:</span>
                      <span>{correctOption?.text}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium mb-2">Explanation:</p>
                    <p className="text-gray-600">{question.explanation}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedQuestion(index);
                    setDeckName(`Medical Quiz - ${new Date().toLocaleDateString()}`);
                    setIsAddingToFlashcards(true);
                  }}
                >
                  Add to Flashcards
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Add to Flashcards Dialog */}
        <Dialog open={isAddingToFlashcards} onOpenChange={setIsAddingToFlashcards}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to Flashcards</DialogTitle>
              <DialogDescription>
                Create a new flashcard deck from this question. The card will include the question, your answer, the correct answer, and the explanation.
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
                <Button variant="outline" onClick={() => {
                  setIsAddingToFlashcards(false);
                  setSelectedQuestion(null);
                }}>
                  Cancel
                </Button>
                <Button onClick={handleAddQuestionToFlashcards}>
                  Create Flashcard
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-12">
          <Button onClick={handleTryAgain}>Try Another Quiz</Button>
          <Button variant="outline" onClick={handleCreateFlashcards}>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Save as Flashcards
          </Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      </main>
    </div>
  );
} 