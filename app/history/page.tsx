'use client';

import { useHistory } from '@/context/HistoryContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';

export default function HistoryPage() {
  const { state } = useHistory();
  const [filter, setFilter] = useState<'all' | 'quiz' | 'clinical-case'>('all');

  const filteredAttempts = state.attempts.filter(attempt => 
    filter === 'all' ? true : attempt.type === filter
  );

  const stats = {
    totalAttempts: state.attempts.length,
    averageAccuracy: state.attempts.reduce((acc, curr) => acc + curr.accuracy, 0) / (state.attempts.length || 1),
    quizzes: state.attempts.filter(a => a.type === 'quiz').length,
    clinicalCases: state.attempts.filter(a => a.type === 'clinical-case').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold">History</h1>
        <div className="text-sm text-gray-600">
          Review your past attempts and track your improvement
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.totalAttempts}</div>
            <div className="text-sm text-gray-600">Total Attempts</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{Math.round(stats.averageAccuracy)}%</div>
            <div className="text-sm text-gray-600">Average Accuracy</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">{stats.quizzes}</div>
            <div className="text-sm text-gray-600">Quizzes Taken</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">{stats.clinicalCases}</div>
            <div className="text-sm text-gray-600">Clinical Cases</div>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All Attempts
            </Button>
            <Button
              variant={filter === 'quiz' ? 'default' : 'outline'}
              onClick={() => setFilter('quiz')}
            >
              Quizzes
            </Button>
            <Button
              variant={filter === 'clinical-case' ? 'default' : 'outline'}
              onClick={() => setFilter('clinical-case')}
            >
              Clinical Cases
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredAttempts.map((attempt) => (
            <Card key={attempt.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block w-2 h-2 rounded-full ${
                      attempt.type === 'quiz' ? 'bg-purple-500' : 'bg-orange-500'
                    }`} />
                    <h3 className="font-semibold">{attempt.title}</h3>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {new Date(attempt.timestamp).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Accuracy</div>
                    <div className="font-semibold">{attempt.accuracy}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Time Spent</div>
                    <div className="font-semibold">{Math.round(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s</div>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href={`/history/${attempt.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {filteredAttempts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No attempts found
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 