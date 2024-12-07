import React from 'react';
import { Card } from '../types/game';

interface CollectedCardsDisplayProps {
  cards: Card[];
  playerName: string;
}

export function CollectedCardsDisplay({ cards, playerName }: CollectedCardsDisplayProps) {
  if (cards.length === 0) return null;

  return (
    <div className="mt-3 p-2 bg-gray-50 rounded-lg">
      <h4 className="text-sm font-medium text-gray-700">
        Cartas Recogidas: {cards.length}
      </h4>
      <div className="flex flex-wrap gap-1 mt-1">
        {cards.map((card) => (
          <div
            key={card.id}
            className="w-8 h-12 bg-white rounded border border-gray-200 flex items-center justify-center text-xs"
            title={`${card.display} de ${card.suit}`}
          >
            {card.display}
          </div>
        ))}
      </div>
    </div>
  );
}