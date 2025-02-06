'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useHistory } from '@/context/HistoryContext';

interface QuizQuestion {
  category: string;
  difficulty: string;
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  explanation: string;
  isCorrect: boolean;
}

interface AttemptDetails {
  questions?: QuizQuestion[];
  totalQuestions?: number;
  correctAnswers?: number;
  category?: string;
  difficulty?: string;
}

interface Attempt {
  id: string;
  type: 'quiz' | 'clinical-case';
  title: string;
  score: number;
  accuracy: number;
  timeSpent: number;
  timestamp: Date;
  details?: AttemptDetails;
}

export default function HistoryDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { state } = useHistory();
  const [attempt, setAttempt] = useState<Attempt | null>(null);

  useEffect(() => {
    const foundAttempt = state.attempts.find(a => a.id === id);
    if (!foundAttempt) {
      router.push('/history');
      return;
    }
    setAttempt(foundAttempt);
  }, [id, state.attempts, router]);

  if (!attempt) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex justify-between items-center p-4 border-b">
        <Link href="/history" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to History
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{attempt.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{formatDate(attempt.timestamp)}</span>
            <span>•</span>
            <span>{Math.round(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{attempt.score}%</div>
            <div className="text-sm text-gray-600">Overall Score</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{attempt.accuracy}%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">
              {attempt.details?.totalQuestions || 0}
            </div>
            <div className="text-sm text-gray-600">Total Questions</div>
          </Card>
        </div>

        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quiz Details</h2>
            {attempt.type === 'quiz' && attempt.details?.questions?.map((question: QuizQuestion, index: number) => (
              <div key={index} className="border-b last:border-0 pb-6 last:pb-0 mb-6 last:mb-0">
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
                      question.isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <span className="font-medium">Your Answer:</span>
                    <span className="text-gray-600">{question.selectedAnswer}</span>
                  </div>
                  {!question.isCorrect && (
                    <div className="flex items-center gap-2 text-green-600">
                      <span className="font-medium">Correct Answer:</span>
                      <span>{question.correctAnswer}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium mb-2">Explanation:</p>
                    <p className="text-gray-600">{question.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/history">
              Back to History
            </Link>
          </Button>
          {attempt.type === 'quiz' && (
            <Button onClick={() => router.push('/quiz')}>
              Try Another Quiz
            </Button>
          )}
        </div>
      </main>
    </div>
  );
} 