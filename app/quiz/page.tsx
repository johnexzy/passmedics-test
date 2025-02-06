"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function QuizPage() {
  const router = useRouter();

  const handleStartQuiz = () => {
    router.push("/quiz/1"); // Start with the first quiz
  };

  const handleTryClinicalCases = () => {
    router.push("/clinical-cases");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Medical Quiz</h1>
          <p className="text-gray-600">
            Test your knowledge with personalized questions based on your performance
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1">Personalized Questions</h2>
              <p className="text-gray-600">Questions tailored to your performance and learning needs</p>
            </div>
          </Card>

          <Card className="p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1">Active Learning</h2>
              <p className="text-gray-600">Detailed explanations and feedback for each question</p>
            </div>
          </Card>

          <Card className="p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1">Time Management</h2>
              <p className="text-gray-600">Practice under timed conditions to improve speed and accuracy</p>
            </div>
          </Card>

          <Card className="p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8v8M12 11v5M8 14v2M6 3v18M18 3v18" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1">Progress Tracking</h2>
              <p className="text-gray-600">Monitor your improvement with detailed performance analytics</p>
            </div>
          </Card>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4">
            <Button size="lg" className="px-8" onClick={handleStartQuiz}>
              Start Quiz
            </Button>
            <Button size="lg" variant="outline" className="px-8" onClick={handleTryClinicalCases}>
              Try Clinical Cases
            </Button>
          </div>
          <p className="text-gray-600 text-sm">
            Want a more immersive experience? Try our clinical case simulations.
          </p>
        </div>
      </main>
    </div>
  );
} 