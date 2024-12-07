import React from 'react';
import { GameState } from '../types/game';

interface RoundStatusProps {
  gameState: GameState;
  onNextRound: () => void;
}

export function RoundStatus({ gameState, onNextRound }: RoundStatusProps) {
  const isRoundEnd = gameState.gameStatus === 'roundEnd';
  const remainingCards = gameState.deck.length;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Ronda {gameState.currentRound}</h3>
          <p className="text-sm text-gray-600">Cartas en el mazo: {remainingCards}</p>
        </div>
        {isRoundEnd && remainingCards > 0 && (
          <button
            onClick={onNextRound}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Siguiente Ronda
          </button>
        )}
      </div>
    </div>
  );
}