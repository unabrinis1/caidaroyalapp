import React from 'react';
import { GameState } from '../types/game';

interface GameStatusProps {
  gameState: GameState;
}

export function GameStatus({ gameState }: GameStatusProps) {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const cardsNeededForNextRound = gameState.players.length * 3 + 4;
  const canPlayNextRound = gameState.deck.length >= cardsNeededForNextRound;
  
  // Calcular el total de cartas en el juego
  const totalCardsInDeck = gameState.deck.length;
  const totalCardsInTable = gameState.tableCards.length;
  const totalCardsInHands = gameState.players.reduce((sum, player) => sum + player.hand.length, 0);
  const totalCardsCollected = gameState.players.reduce((sum, player) => sum + player.collectedCards.length, 0);
  const totalCards = totalCardsInDeck + totalCardsInTable + totalCardsInHands + totalCardsCollected;
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Ronda {gameState.currentRound}</h2>
          <div className="text-sm space-y-1">
            <p className={`${canPlayNextRound ? 'text-green-600' : 'text-red-600'}`}>
              Cartas en el mazo: {totalCardsInDeck}
              {!canPlayNextRound && totalCardsInDeck > 0 && ' (Insuficientes para otra ronda)'}
            </p>
            <p className="text-gray-600">Cartas en mesa: {totalCardsInTable}</p>
            <p className="text-gray-600">Cartas en manos: {totalCardsInHands}</p>
            <p className="text-gray-600">Cartas recogidas: {totalCardsCollected}</p>
            <p className="font-medium text-blue-600">Total de cartas: {totalCards}/40</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">Turno de: {currentPlayer.name}</p>
          {gameState.lastPlayedCard && (
            <p className="text-sm text-gray-600">
              Última carta: {gameState.lastPlayedCard.display} de {gameState.lastPlayedCard.suit}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}