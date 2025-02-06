'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useFlashcards } from '@/context/FlashcardContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Header from '@/components/Header';

export default function FlashcardsPage() {
  const { state, dispatch } = useFlashcards();
  const [isCreateDeckOpen, setIsCreateDeckOpen] = useState(false);
  const [newDeckName, setNewDeckName] = useState('');
  const [newDeckDescription, setNewDeckDescription] = useState('');

  const handleCreateDeck = () => {
    if (!newDeckName.trim()) return;

    dispatch({
      type: 'CREATE_DECK',
      payload: {
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        name: newDeckName.trim(),
        description: newDeckDescription.trim(),
      },
    });

    setNewDeckName('');
    setNewDeckDescription('');
    setIsCreateDeckOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Flashcards</h1>
            <p className="text-gray-600">Master medical concepts through spaced repetition</p>
          </div>
          <Button onClick={() => setIsCreateDeckOpen(true)}>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Create Deck
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {state.decks.map((deck) => (
            <Link key={deck.id} href={`/flashcards/${deck.id}`}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">{deck.name}</h2>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (confirm('Are you sure you want to delete this deck?')) {
                        dispatch({ type: 'DELETE_DECK', payload: deck.id });
                      }
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{deck.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {deck.cards.length} cards
                  </div>
                  {deck.lastStudied && (
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Last studied {new Date(deck.lastStudied).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <Dialog open={isCreateDeckOpen} onOpenChange={setIsCreateDeckOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Deck</DialogTitle>
              <DialogDescription>
                Create a new flashcard deck to organize your study materials.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label htmlFor="deckName" className="block text-sm font-medium text-gray-700">
                  Deck Name
                </label>
                <input
                  id="deckName"
                  type="text"
                  value={newDeckName}
                  onChange={(e) => setNewDeckName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter deck name"
                />
              </div>
              <div>
                <label htmlFor="deckDescription" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="deckDescription"
                  value={newDeckDescription}
                  onChange={(e) => setNewDeckDescription(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter deck description"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateDeckOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateDeck}>
                  Create Deck
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
} 