"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFlashcards } from '@/context/FlashcardContext';
import { Flashcard } from '@/components/ui/flashcard';
import { motion, AnimatePresence } from 'framer-motion';

export default function StudyPage() {
  const { id } = useParams();
  const router = useRouter();
  const { state, dispatch } = useFlashcards();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const deck = state.decks.find((d) => d.id === id);
  const currentCard = deck?.cards[currentCardIndex];

  useEffect(() => {
    if (!deck) {
      router.push('/flashcards');
    }
  }, [deck, router]);

  const handleNextCard = () => {
    if (!deck) return;
    
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  if (!deck || !currentCard) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex justify-between items-center p-4 border-b">
        <Link href={`/flashcards/${id}`} className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Deck
        </Link>
        <div className="text-sm text-gray-600">
          Card {currentCardIndex + 1} of {deck.cards.length}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{deck.name}</h1>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all duration-300"
              style={{ width: `${((currentCardIndex + 1) / deck.cards.length) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentCardIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="mb-8"
          >
            <Flashcard
              front={currentCard.front}
              back={currentCard.back}
              onClick={() => setShowAnswer(!showAnswer)}
            />
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevCard}
            disabled={currentCardIndex === 0}
          >
            Previous
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                dispatch({
                  type: 'UPDATE_CARD',
                  payload: {
                    deckId: deck.id,
                    cardId: currentCard.id,
                    updates: {
                      easeFactor: Math.max(1.3, (currentCard.easeFactor || 2.5) - 0.15),
                      repetitions: (currentCard.repetitions || 0) + 1,
                    },
                  },
                });
                handleNextCard();
              }}
            >
              Hard
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                dispatch({
                  type: 'UPDATE_CARD',
                  payload: {
                    deckId: deck.id,
                    cardId: currentCard.id,
                    updates: {
                      easeFactor: currentCard.easeFactor || 2.5,
                      repetitions: (currentCard.repetitions || 0) + 1,
                    },
                  },
                });
                handleNextCard();
              }}
            >
              Good
            </Button>
            <Button
              onClick={() => {
                dispatch({
                  type: 'UPDATE_CARD',
                  payload: {
                    deckId: deck.id,
                    cardId: currentCard.id,
                    updates: {
                      easeFactor: Math.min(2.5, (currentCard.easeFactor || 2.5) + 0.15),
                      repetitions: (currentCard.repetitions || 0) + 1,
                    },
                  },
                });
                handleNextCard();
              }}
            >
              Easy
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={handleNextCard}
            disabled={currentCardIndex === deck.cards.length - 1}
          >
            Next
          </Button>
        </div>
      </main>
    </div>
  );
} 