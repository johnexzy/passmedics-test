'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export interface AttemptResult {
  id: string;
  type: 'quiz' | 'clinical-case';
  title: string;
  score: number;
  accuracy: number;
  timeSpent: number;
  timestamp: Date;
  details?: {
    category?: string;
    difficulty?: string;
    totalQuestions?: number;
    correctAnswers?: number;
    questions?: Array<{
      category: string;
      difficulty: string;
      question: string;
      selectedAnswer: string;
      correctAnswer: string;
      explanation: string;
      isCorrect: boolean;
    }>;
  };
}

interface HistoryState {
  attempts: AttemptResult[];
}

type HistoryAction =
  | { type: 'ADD_ATTEMPT'; payload: AttemptResult }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'LOAD_STATE'; payload: HistoryState };

const initialState: HistoryState = {
  attempts: [],
};

function historyReducer(state: HistoryState, action: HistoryAction): HistoryState {
  switch (action.type) {
    case 'ADD_ATTEMPT':
      return {
        ...state,
        attempts: [action.payload, ...state.attempts],
      };

    case 'CLEAR_HISTORY':
      return {
        ...state,
        attempts: [],
      };

    case 'LOAD_STATE':
      return action.payload;

    default:
      return state;
  }
}

const HistoryContext = createContext<{
  state: HistoryState;
  dispatch: React.Dispatch<HistoryAction>;
} | null>(null);

export function HistoryProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage if available
  const [state, dispatch] = useReducer(historyReducer, initialState, () => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('historyState');
      if (savedState) {
        try {
          const parsedState = JSON.parse(savedState);
          // Convert string dates back to Date objects
          const stateWithDates = {
            ...parsedState,
            attempts: parsedState.attempts.map((attempt: AttemptResult & { timestamp: string }) => ({
              ...attempt,
              timestamp: new Date(attempt.timestamp)
            }))
          };
          return stateWithDates;
        } catch (error) {
          console.error('Failed to parse saved state:', error);
          return initialState;
        }
      }
    }
    return initialState;
  });

  // Save state to localStorage on changes
  useEffect(() => {
    if (state !== initialState) {
      try {
        const stateToSave = {
          ...state,
          attempts: state.attempts.map(attempt => ({
            ...attempt,
            timestamp: attempt.timestamp.toISOString()
          }))
        };
        localStorage.setItem('historyState', JSON.stringify(stateToSave));
      } catch (error) {
        console.error('Failed to save history state:', error);
      }
    }
  }, [state]);

  return (
    <HistoryContext.Provider value={{ state, dispatch }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
} 