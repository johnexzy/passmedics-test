"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { quizQuestions } from "@/data/quizzes";
import { useQuiz } from "@/context/QuizContext";

export default function QuizExperience() {
  const router = useRouter();
  const { state, dispatch } = useQuiz();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Initialize quiz with randomized questions
  useEffect(() => {
    try {
      // Shuffle questions
      const shuffled = [...quizQuestions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10); // Take 10 random questions

      dispatch({ type: 'SET_QUESTIONS', questions: shuffled });
    } catch (error: unknown) {
      console.error('Failed to initialize quiz:', error);
      setError("Failed to initialize quiz");
      setTimeout(() => router.push("/quiz"), 2000);
    }
  }, [dispatch, router]);

  const currentQuestion = state.questions[state.currentQuestionIndex];
  const progress = ((state.currentQuestionIndex + 1) / state.questions.length) * 100;

  // Timer effect - counts up from 0
  useEffect(() => {
    if (!currentQuestion || state.isComplete) return;

    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, state.isComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNextQuestion = () => {
    try {
      if (!selectedOption) return;
      if (!currentQuestion) return;

      // Save answer
      dispatch({
        type: 'ANSWER_QUESTION',
        answer: {
          questionId: currentQuestion.id,
          selectedOption: selectedOption,
          timeSpent: elapsedTime // Store total elapsed time
        }
      });

      if (state.currentQuestionIndex < state.questions.length - 1) {
        dispatch({ type: 'NEXT_QUESTION' });
        setSelectedOption(null);
      } else {
        dispatch({ type: 'COMPLETE_QUIZ' });
        router.push("/quiz/results");
      }
    } catch (error: unknown) {
      console.error('Failed to process answer:', error);
      setError("Failed to process answer");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleExitQuiz = () => {
    try {
      const confirmExit = window.confirm("Are you sure you want to exit? Your progress will be lost.");
      if (confirmExit) {
        dispatch({ type: 'RESET_QUIZ' });
        router.push("/quiz");
      }
    } catch (error: unknown) {
      console.error('Failed to exit quiz:', error);
      setError("Failed to exit quiz");
      setTimeout(() => setError(null), 3000);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Link href="/quiz" className="text-primary hover:underline">
            Return to Quiz Home
          </Link>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading quiz questions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress and Timer */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4 text-gray-600">
            <span>Question {state.currentQuestionIndex + 1} of {state.questions.length}</span>
            <span>{progress.toFixed(0)}% Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formatTime(elapsedTime)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full mb-8">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Category and Difficulty */}
        <div className="flex gap-2 mb-6">
          <Badge variant="secondary" className="bg-blue-100 text-primary">
            {currentQuestion.category}
          </Badge>
          <Badge variant="secondary" className="bg-gray-100">
            {currentQuestion.difficulty}
          </Badge>
        </div>

        {/* Question */}
        <h2 className="text-xl font-semibold mb-8">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={`w-full p-4 text-left rounded-lg border transition-all ${
                selectedOption === option.id
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  selectedOption === option.id
                    ? "border-primary text-primary"
                    : "border-gray-300"
                }`}>
                  {option.id}
                </div>
                <span>{option.text}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={handleExitQuiz}
            className="text-gray-600"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Exit Quiz
          </Button>
          <Button
            onClick={handleNextQuestion}
            disabled={!selectedOption}
          >
            {state.currentQuestionIndex < state.questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        </div>
      </div>
    </div>
  );
} 