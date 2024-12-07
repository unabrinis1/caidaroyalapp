import React from 'react';
import { Card as CardType } from '../types/game';
import { Card } from './Card';

interface TableProps {
  cards: CardType[];
}

export function Table({ cards }: TableProps) {
  return (
    <div className="p-8 bg-green-800 rounded-xl min-h-[300px]">
      <h2 className="text-white text-xl mb-4">Mesa</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}