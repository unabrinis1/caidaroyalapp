import React from 'react';
import { Sword } from 'lucide-react';

interface PlayerNameInputsProps {
  playerCount: number;
  playerNames: string[];
  onNameChange: (index: number, name: string) => void;
}

export function PlayerNameInputs({ playerCount, playerNames, onNameChange }: PlayerNameInputsProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: playerCount }).map((_, index) => (
        <div key={index} className="relative">
          <label className="block text-sm font-medium text-white/80 mb-1">
            Jugador {index + 1}
          </label>
          <input
            type="text"
            value={playerNames[index]}
            onChange={(e) => onNameChange(index, e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                     text-white placeholder-white/30 focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent transition-all"
            placeholder={`Nombre del Jugador ${index + 1}`}
            maxLength={20}
          />
          <Sword className="absolute right-3 top-9 w-5 h-5 text-white/20" />
        </div>
      ))}
    </div>
  );
}