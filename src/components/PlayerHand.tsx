import React from 'react';
import { Card as CardComponent } from './Card';
import { CollectedCardsDisplay } from './CollectedCardsDisplay';
import { PatternDisplay } from './PatternDisplay';
import { Card, Player } from '../types/game';
import { detectPatterns } from '../utils/patterns';

interface PlayerHandProps {
  player: Player;
  isCurrentPlayer: boolean;
  onCardPlay: (card: Card) => void;
}

export function PlayerHand({ player, isCurrentPlayer, onCardPlay }: PlayerHandProps) {
  const patterns = detectPatterns(player.hand);

  const handleCardClick = (card: Card) => {
    if (isCurrentPlayer) {
      onCardPlay(card);
    }
  };

  return (
    <div className={`p-4 rounded-lg ${isCurrentPlayer ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className={`text-lg font-semibold ${isCurrentPlayer ? 'text-blue-600' : ''}`}>
          {player.name}
          {isCurrentPlayer && ' (Tu turno)'}
        </h3>
        <span className="text-sm font-medium">Puntos: {player.points}</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {player.hand.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            isSelectable={isCurrentPlayer}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>

      <PatternDisplay patterns={patterns} />
      <CollectedCardsDisplay cards={player.collectedCards} playerName={player.name} />
    </div>
  );
}