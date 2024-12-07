import React from 'react';
import { Player } from '../types/game';
import { Crown } from 'lucide-react';

interface GameEndModalProps {
  isOpen: boolean;
  winner: Player;
  players: Player[];
  onNewGame: () => void;
}

export function GameEndModal({ isOpen, winner, players, onNewGame }: GameEndModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-center">
            ¡FIN DEL JUEGO! 👑
          </h2>
          <p className="text-xl mt-4">
            El Rey de la partida es:
            <span className="block text-2xl font-bold text-yellow-600 mt-2">
              {winner.name} 🏆
            </span>
          </p>
          <p className="text-lg mt-2 text-gray-600">
            Puntuación final: {winner.points} puntos
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Puntuación Final:</h3>
          {players
            .sort((a, b) => b.points - a.points)
            .map(player => (
              <div 
                key={player.id} 
                className={`p-3 rounded-lg ${
                  player.id === winner.id ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{player.name}</span>
                  <span className="font-bold">{player.points} pts</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Cartas acumuladas: {player.collectedCards.length}
                </div>
              </div>
            ))}
        </div>

        <div className="text-center">
          <button
            onClick={onNewGame}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            ¡Nueva Partida! 🎮
          </button>
        </div>
      </div>
    </div>
  );
}