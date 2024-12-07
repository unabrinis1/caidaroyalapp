import React from 'react';
import { Player } from '../types/game';
import { CircleDot } from 'lucide-react';

interface RoundTransitionModalProps {
  isOpen: boolean;
  currentRound: number;
  remainingCards: number;
  lastCollector: Player | null;
  players: Player[];
  onNextRound: () => void;
  isGeneralHandEnd: boolean;
  isTransitioning: boolean;
}

export function RoundTransitionModal({ 
  isOpen, 
  currentRound,
  remainingCards,
  lastCollector,
  players,
  onNextRound,
  isGeneralHandEnd,
  isTransitioning
}: RoundTransitionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <CircleDot className="w-12 h-12 text-blue-500 mx-auto mb-2" />
          <h2 className="text-2xl font-bold">
            {isGeneralHandEnd ? '¡Fin de la Mano General! 🎴' : `¡Fin de la Ronda ${currentRound}! 🎴`}
          </h2>
        </div>
        
        {isGeneralHandEnd && remainingCards > 0 && lastCollector && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-center">
              <span className="font-medium">{lastCollector.name}</span> se lleva{' '}
              <span className="font-bold text-blue-600">{remainingCards} cartas</span>{' '}
              de la mesa por ser el último en recoger. 🎯
            </p>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Puntuación Actual:</h3>
          {players
            .sort((a, b) => b.points - a.points)
            .map(player => (
              <div key={player.id} className="bg-gray-50 p-3 rounded-lg">
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
            onClick={onNextRound}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            {isGeneralHandEnd 
              ? '¡Nueva Mano General! 🎮' 
              : '¡Siguiente Ronda! 🎮'
            }
          </button>
        </div>
      </div>
    </div>
  );
}