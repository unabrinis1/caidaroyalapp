import React from 'react';
import { Card as CardType } from '../types/game';

interface CollectedCardsProps {
  cards: CardType[];
  playerName: string;
}

export function CollectedCards({ cards, playerName }: CollectedCardsProps) {
  if (cards.length === 0) return null;

  return (
    <div className="mt-2">
      <h4 className="text-sm text-gray-600 mb-1">Cartas Recogidas ({cards.length})</h4>
      <div className="flex flex-wrap gap-1">
        {cards.map((card) => (
          <div
            key={card.id}
            className="w-8 h-12 bg-white rounded border border-gray-300 flex items-center justify-center text-xs"
            title={`${card.display} de ${card.suit}`}
          >
            {card.display}
          </div>
        ))}
      </div>
    </div>
  );
}