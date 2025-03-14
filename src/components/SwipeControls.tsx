
import React from 'react';
import { cn } from '@/lib/utils';
import { X, Heart, MessageCircle, RotateCcw } from 'lucide-react';

interface SwipeControlsProps {
  onLike: () => void;
  onDislike: () => void;
  onMessage?: () => void;
  onUndo?: () => void;
  canUndo?: boolean;
  className?: string;
}

const SwipeControls: React.FC<SwipeControlsProps> = ({
  onLike,
  onDislike,
  onMessage,
  onUndo,
  canUndo = false,
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-center gap-4', className)}>
      <button
        onClick={onDislike}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-subtle transition-transform hover:scale-105 active:scale-95 focus-ring"
        aria-label="Dislike"
      >
        <X className="h-7 w-7 text-rose-500" />
      </button>
      
      {onUndo && (
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-subtle transition-transform hover:scale-105 active:scale-95 focus-ring",
            !canUndo && "opacity-50 cursor-not-allowed"
          )}
          aria-label="Undo"
        >
          <RotateCcw className="h-5 w-5 text-amber-500" />
        </button>
      )}
      
      {onMessage && (
        <button
          onClick={onMessage}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-subtle transition-transform hover:scale-105 active:scale-95 focus-ring"
          aria-label="Message"
        >
          <MessageCircle className="h-5 w-5 text-husky-blue" />
        </button>
      )}
      
      <button
        onClick={onLike}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-subtle transition-transform hover:scale-105 active:scale-95 focus-ring"
        aria-label="Like"
      >
        <Heart className="h-7 w-7 text-husky-blue" />
      </button>
    </div>
  );
};

export default SwipeControls;
