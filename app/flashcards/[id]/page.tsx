'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useFlashcards } from '@/context/FlashcardContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Flashcard } from '@/components/ui/flashcard';

export default function DeckPage() {
  const { id } = useParams();
  const router = useRouter();
  const { state, dispatch } = useFlashcards();
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [newCardFront, setNewCardFront] = useState('');
  const [newCardBack, setNewCardBack] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All Cards');

  const deck = state.decks.find((d) => d.id === id);

  useEffect(() => {
    if (!deck) {
      router.push('/flashcards');
    }
  }, [deck, router]);

  const handleAddCard = () => {
    if (!newCardFront.trim() || !newCardBack.trim()) return;

    dispatch({
      type: 'ADD_CARD',
      payload: {
        deckId: id as string,
        card: {
          front: newCardFront.trim(),
          back: newCardBack.trim(),
        },
      },
    });

    setNewCardFront('');
    setNewCardBack('');
    setIsAddCardOpen(false);
  };

  const filteredCards = deck?.cards.filter(card => {
    const matchesSearch = searchQuery.toLowerCase() === '' || 
      card.front.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.back.toLowerCase().includes(searchQuery.toLowerCase());

    switch (filterType) {
      case 'Due for Review':
        return matchesSearch && card.nextReview && new Date(card.nextReview) <= new Date();
      case 'Mastered':
        return matchesSearch && card.repetitions >= 5;
      default:
        return matchesSearch;
    }
  }) || [];

  const stats = {
    totalCards: deck?.cards.length || 0,
    dueForReview: deck?.cards.filter(card => card.nextReview && new Date(card.nextReview) <= new Date()).length || 0,
    mastered: deck?.cards.filter(card => card.repetitions >= 5).length || 0,
    avgStreak: deck?.cards ? 
      deck.cards.reduce((acc, card) => acc + (card.repetitions || 0), 0) / (deck.cards.length || 1) 
      : 0,
  };

  if (!deck) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex justify-between items-center p-4 border-b">
        <Link href="/flashcards" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Decks
        </Link>
        <button className="text-gray-600 hover:text-gray-900">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{deck.name}</h1>
          <p className="text-gray-600 mb-4">{deck.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Last studied: {deck.lastStudied ? new Date(deck.lastStudied).toLocaleDateString() : 'Never'}
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Avg streak: {stats.avgStreak.toFixed(1)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.totalCards}</div>
            <div className="text-sm text-gray-600">Total Cards</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{stats.dueForReview}</div>
            <div className="text-sm text-gray-600">Due for Review</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">{stats.mastered}</div>
            <div className="text-sm text-gray-600">Mastered</div>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All Cards</option>
              <option>Due for Review</option>
              <option>Mastered</option>
            </select>
            <Button onClick={() => setIsAddCardOpen(true)}>
              Add Card
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <Button
            size="lg"
            className="w-full py-6 text-lg"
            onClick={() => router.push(`/flashcards/${id}/study`)}
            disabled={deck.cards.length === 0}
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start Study Session
          </Button>
        </div>

        <div className="space-y-6">
          {filteredCards.map((card) => (
            <div key={card.id} className="relative">
              <Flashcard
                front={card.front}
                back={card.back}
                className="hover:shadow-lg transition-shadow"
              />
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this card?')) {
                    dispatch({
                      type: 'DELETE_CARD',
                      payload: { deckId: deck.id, cardId: card.id },
                    });
                  }
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 z-10"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <Dialog open={isAddCardOpen} onOpenChange={setIsAddCardOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Card</DialogTitle>
              <DialogDescription>
                Create a new flashcard for your deck.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label htmlFor="cardFront" className="block text-sm font-medium text-gray-700">
                  Front
                </label>
                <textarea
                  id="cardFront"
                  value={newCardFront}
                  onChange={(e) => setNewCardFront(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter the front of the card"
                  rows={3}
                />
              </div>
              <div>
                <label htmlFor="cardBack" className="block text-sm font-medium text-gray-700">
                  Back
                </label>
                <textarea
                  id="cardBack"
                  value={newCardBack}
                  onChange={(e) => setNewCardBack(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter the back of the card"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddCardOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCard}>
                  Add Card
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
} 