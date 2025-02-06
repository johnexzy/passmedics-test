import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FlashcardProps {
  front: string;
  back: string;
  onClick?: () => void;
  className?: string;
}

export function Flashcard({ front, back, onClick, className }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    onClick?.();
  };

  return (
    <div
      className={cn(
        "relative w-full h-[300px] cursor-pointer perspective-1000",
        className
      )}
      onClick={handleClick}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 500, damping: 40 }}
        className="w-full h-full preserve-3d"
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="w-full h-full p-6 rounded-xl border bg-card text-card-foreground shadow-lg flex flex-col">
            <div className="flex-1 overflow-auto whitespace-pre-wrap">
              {front}
            </div>
            <div className="mt-4 text-sm text-muted-foreground text-center">
              Click to flip
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full p-6 rounded-xl border bg-card text-card-foreground shadow-lg flex flex-col">
            <div className="flex-1 overflow-auto whitespace-pre-wrap">
              {back}
            </div>
            <div className="mt-4 text-sm text-muted-foreground text-center">
              Click to flip back
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 