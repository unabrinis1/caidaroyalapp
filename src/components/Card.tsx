import React from 'react';
import { Card as CardType } from '../types/game';

interface CardProps {
  card: CardType;
  isSelectable?: boolean;
  onClick?: () => void;
}

export function Card({ card, isSelectable = false, onClick }: CardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSelectable && onClick) {
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={isSelectable ? 0 : undefined}
      onClick={handleClick}
      className={`
        w-24 h-36 
        bg-white 
        rounded-lg 
        shadow-md 
        border-2 
        ${isSelectable 
          ? 'border-blue-200 hover:border-blue-500 cursor-pointer transform hover:-translate-y-1 transition-all' 
          : 'border-gray-200'
        }
        flex 
        flex-col 
        items-center 
        justify-center 
        p-2 
        m-2
        relative
        select-none
        ${isSelectable ? 'hover:shadow-lg active:transform active:scale-95' : ''}
      `}
    >
      <div 
        className={`
          text-2xl 
          font-bold 
          ${card.suit === 'copas' || card.suit === 'oros' ? 'text-red-600' : 'text-black'}
        `}
      >
        {card.display}
      </div>
      <div className="text-sm mt-2 capitalize">{card.suit}</div>
      
      {isSelectable && (
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
      )}
    </div>
  );
}