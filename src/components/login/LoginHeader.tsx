import React from 'react';
import { Spade } from 'lucide-react';

export function LoginHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <div className="flex justify-center mb-4">
          <div className="bg-white/10 p-4 rounded-full">
            <Spade className="w-16 h-16" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2">Caída Royal</h1>
        <p className="text-white/80">El juego de cartas más emocionante</p>
      </div>
    </div>
  );
}