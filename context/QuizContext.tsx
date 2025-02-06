'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { QuizQuestion } from '@/data/quizzes';

interface Answer {
  questionId: string;
  selectedOption: string;
}

interface QuizState {
  questions: QuizQuestion[];
  answers: Answer[];
  currentQuestionIndex: number;
  isComplete: boolean;
}

type QuizAction =
  | { type: 'SET_QUESTIONS'; questions: QuizQuestion[] }
  | { type: 'ANSWER_QUESTION'; answer: Answer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'RESET_QUIZ' };

const initialState: QuizState = {
  questions: [],
  answers: [],
  currentQuestionIndex: 0,
  isComplete: false,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return {
        ...state,
        questions: action.questions,
        answers: [],
        currentQuestionIndex: 0,
        isComplete: false,
      };
    case 'ANSWER_QUESTION':
      return {
        ...state,
        answers: [...state.answers, action.answer],
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    case 'COMPLETE_QUIZ':
      return {
        ...state,
        isComplete: true,
      };
    case 'RESET_QUIZ':
      return initialState;
    default:
      return state;
  }
}

const QuizContext = createContext<{
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
} | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
} 