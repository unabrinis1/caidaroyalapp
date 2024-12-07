import React from 'react';

interface GameLogProps {
  messages: string[];
}

export function GameLog({ messages }: GameLogProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 max-h-40 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-2">Registro del Juego</h3>
      <div className="space-y-1">
        {messages.map((message, index) => (
          <p key={index} className="text-sm text-gray-600">
            {message}
          </p>
        ))}
      </div>
    </div>
  );
}