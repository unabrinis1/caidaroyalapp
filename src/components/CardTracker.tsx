import React from 'react';
import { GameState } from '../types/game';

interface CardTrackerProps {
  gameState: GameState;
}

export function CardTracker({ gameState }: CardTrackerProps) {
  // Calcular el total de cartas en cada ubicación
  const totalCardsInDeck = gameState.deck.length;
  const totalCardsInTable = gameState.tableCards.length;
  const totalCardsInHands = gameState.players.reduce(
    (sum, player) => sum + player.hand.length, 
    0
  );
  const totalCardsCollected = gameState.players.reduce(
    (sum, player) => sum + player.collectedCards.length, 
    0
  );
  const totalCards = totalCardsInDeck + totalCardsInTable + totalCardsInHands + totalCardsCollected;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2">Control de Cartas</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Mazo: {totalCardsInDeck}</p>
          <p className="text-sm text-gray-600">Mesa: {totalCardsInTable}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">En Manos: {totalCardsInHands}</p>
          <p className="text-sm text-gray-600">Recogidas: {totalCardsCollected}</p>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t">
        <p className="text-sm font-medium text-blue-600">
          Total de Cartas: {totalCards}/40
        </p>
      </div>
    </div>
  );
}