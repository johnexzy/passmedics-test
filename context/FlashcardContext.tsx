'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  lastReviewed?: Date;
  nextReview?: Date;
  repetitions: number;
  easeFactor: number;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  cards: Flashcard[];
  createdAt: Date;
  lastStudied?: Date;
}

interface FlashcardState {
  decks: Deck[];
}

type FlashcardAction =
  | { type: 'CREATE_DECK'; payload: Omit<Deck, 'createdAt' | 'cards'> }
  | { type: 'DELETE_DECK'; payload: string }
  | { type: 'ADD_CARD'; payload: { deckId: string; card: Omit<Flashcard, 'id' | 'repetitions' | 'easeFactor'> } }
  | { type: 'DELETE_CARD'; payload: { deckId: string; cardId: string } }
  | { type: 'LOAD_STATE'; payload: FlashcardState }
  | { type: 'UPDATE_CARD'; payload: { deckId: string; cardId: string; updates: Partial<Flashcard> } };

const initialState: FlashcardState = {
  decks: [],
};

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function flashcardReducer(state: FlashcardState, action: FlashcardAction): FlashcardState {
  switch (action.type) {
    case 'CREATE_DECK':
      return {
        ...state,
        decks: [
          ...state.decks,
          {
            ...action.payload,
            cards: [],
            createdAt: new Date(),
          },
        ],
      };

    case 'DELETE_DECK':
      return {
        ...state,
        decks: state.decks.filter((deck) => deck.id !== action.payload),
      };

    case 'ADD_CARD':
      return {
        ...state,
        decks: state.decks.map((deck) =>
          deck.id === action.payload.deckId
            ? {
                ...deck,
                cards: [
                  ...deck.cards,
                  {
                    ...action.payload.card,
                    id: generateId(),
                    repetitions: 0,
                    easeFactor: 2.5,
                  },
                ],
              }
            : deck
        ),
      };

    case 'DELETE_CARD':
      return {
        ...state,
        decks: state.decks.map((deck) =>
          deck.id === action.payload.deckId
            ? {
                ...deck,
                cards: deck.cards.filter((card) => card.id !== action.payload.cardId),
              }
            : deck
        ),
      };

    case 'UPDATE_CARD':
      return {
        ...state,
        decks: state.decks.map((deck) =>
          deck.id === action.payload.deckId
            ? {
                ...deck,
                cards: deck.cards.map((card) =>
                  card.id === action.payload.cardId
                    ? { ...card, ...action.payload.updates }
                    : card
                ),
              }
            : deck
        ),
      };

    case 'LOAD_STATE':
      return action.payload;

    default:
      return state;
  }
}

const FlashcardContext = createContext<{
  state: FlashcardState;
  dispatch: React.Dispatch<FlashcardAction>;
} | null>(null);

// Add this interface before the FlashcardProvider
interface ParsedDeck extends Omit<Deck, 'createdAt' | 'lastStudied' | 'cards'> {
  createdAt: string;
  lastStudied?: string;
  cards: Array<Omit<Flashcard, 'lastReviewed' | 'nextReview'> & {
    lastReviewed?: string;
    nextReview?: string;
  }>;
}

export function FlashcardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(flashcardReducer, initialState, () => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('flashcardState');
      if (savedState) {
        try {
          const parsedState = JSON.parse(savedState) as { decks: ParsedDeck[] };
          const stateWithDates = {
            ...parsedState,
            decks: parsedState.decks.map(deck => ({
              ...deck,
              createdAt: new Date(deck.createdAt),
              lastStudied: deck.lastStudied ? new Date(deck.lastStudied) : undefined,
              cards: deck.cards.map(card => ({
                ...card,
                lastReviewed: card.lastReviewed ? new Date(card.lastReviewed) : undefined,
                nextReview: card.nextReview ? new Date(card.nextReview) : undefined
              }))
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
          decks: state.decks.map(deck => ({
            ...deck,
            createdAt: deck.createdAt.toISOString(),
            lastStudied: deck.lastStudied?.toISOString(),
            cards: deck.cards.map(card => ({
              ...card,
              lastReviewed: card.lastReviewed?.toISOString(),
              nextReview: card.nextReview?.toISOString()
            }))
          }))
        };
        localStorage.setItem('flashcardState', JSON.stringify(stateToSave));
      } catch (error) {
        console.error('Failed to save flashcard state:', error);
      }
    }
  }, [state]);

  return (
    <FlashcardContext.Provider value={{ state, dispatch }}>
      {children}
    </FlashcardContext.Provider>
  );
}

export function useFlashcards() {
  const context = useContext(FlashcardContext);
  if (!context) {
    throw new Error('useFlashcards must be used within a FlashcardProvider');
  }
  return context;
} 