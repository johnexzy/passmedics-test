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
  const [state, dispatch] = useReducer(historyReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('historyState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState, (key, value) => {
          if (key === 'timestamp') return new Date(value);
          return value;
        });
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Failed to load history state:', error);
      }
    }
  }, []);

  // Save state to localStorage on changes
  useEffect(() => {
    localStorage.setItem('historyState', JSON.stringify(state));
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