'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { QuizQuestion } from '@/data/quizzes';

interface Answer {
  questionId: string;
  selectedOption: string;
  timeSpent: number;  
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
  | { type: 'RESET_QUIZ' }
  | { type: 'LOAD_STATE'; payload: QuizState }

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
      localStorage.removeItem('quizState');
      return initialState;
    case 'LOAD_STATE':
      // Only load incomplete quizzes or completed quizzes that haven't been viewed
      if (action.payload.isComplete && !window.location.pathname.includes('/results')) {
        localStorage.removeItem('quizState');
        return initialState;
      }
      return action.payload;
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

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Failed to load quiz state:', error);
      }
    }
  }, []);

  // Save state to localStorage on changes
  useEffect(() => {
    localStorage.setItem('quizState', JSON.stringify(state));
  }, [state]);

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