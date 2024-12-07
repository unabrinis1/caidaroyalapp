import React from 'react';
import { Trophy, Crown, Spade, Swords } from 'lucide-react';

export function GameRules() {
  return (
    <div className="bg-white/5 p-6 border-t border-white/10">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white/90">
        <Trophy className="w-5 h-5 text-yellow-500" />
        Reglas del Juego
      </h3>
      <ul className="space-y-3 text-sm text-white/70">
        <li className="flex items-start gap-2">
          <Crown className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
          <span>Gana el primer jugador en alcanzar 24 puntos</span>
        </li>
        <li className="flex items-start gap-2">
          <Spade className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <span>Cada jugador recibe 3 cartas por ronda</span>
        </li>
        <li className="flex items-start gap-2">
          <Swords className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
          <span>Recoge cartas del mismo valor de la mesa</span>
        </li>
        <li className="flex items-start gap-2">
          <Trophy className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
          <span>Declara "Caída" cuando tengas una carta igual a la última jugada</span>
        </li>
      </ul>
    </div>
  );
}