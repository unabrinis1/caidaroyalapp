import React from 'react';
import { Users } from 'lucide-react';

interface PlayerCounterProps {
  playerCount: number;
  onCountChange: (count: number) => void;
}

export function PlayerCounter({ playerCount, onCountChange }: PlayerCounterProps) {
  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium text-white/90">
        Número de Jugadores
      </label>
      <div className="grid grid-cols-3 gap-3">
        {[2, 3, 4].map(count => (
          <button
            key={count}
            type="button"
            onClick={() => onCountChange(count)}
            className={`py-3 rounded-lg border-2 transition-all ${
              playerCount === count
                ? 'border-blue-400 bg-blue-500/20 text-blue-300'
                : 'border-white/10 hover:border-blue-400/50 text-white/70'
            }`}
          >
            <Users className="w-5 h-5 mx-auto mb-1" />
            {count}
          </button>
        ))}
      </div>
    </div>
  );
}