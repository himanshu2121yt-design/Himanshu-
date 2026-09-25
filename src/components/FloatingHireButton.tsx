import React from 'react';
import { Sparkles } from 'lucide-react';

interface FloatingHireButtonProps {
  onClick: () => void;
}

export const FloatingHireButton: React.FC<FloatingHireButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 left-5 z-40 sm:hidden">
      <button
        onClick={onClick}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 px-4 py-3 text-xs font-extrabold text-black shadow-xl shadow-amber-500/30 active:scale-95 transition-all border border-amber-300/40"
      >
        <Sparkles className="h-4 w-4 fill-black" />
        <span>Hire Me (₹10)</span>
      </button>
    </div>
  );
};
