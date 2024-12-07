import React, { useState } from 'react';
import { LoginHeader } from './login/LoginHeader';
import { PlayerCounter } from './login/PlayerCounter';
import { PlayerNameInputs } from './login/PlayerNameInputs';
import { GameRules } from './login/GameRules';

interface LoginPageProps {
  onLogin: (playerNames: string[]) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState(['', '']);
  const [error, setError] = useState('');

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    setPlayerNames(Array(count).fill(''));
    setError('');
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (playerNames.some(name => !name.trim())) {
      setError('Por favor, ingresa todos los nombres de jugadores');
      return;
    }

    if (new Set(playerNames).size !== playerNames.length) {
      setError('Los nombres de los jugadores deben ser únicos');
      return;
    }

    onLogin(playerNames);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white/20">
          <LoginHeader />

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <PlayerCounter 
              playerCount={playerCount}
              onCountChange={handlePlayerCountChange}
            />

            <PlayerNameInputs
              playerCount={playerCount}
              playerNames={playerNames}
              onNameChange={handleNameChange}
            />

            {error && (
              <p className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                       py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 
                       transition-all transform hover:scale-[1.02] active:scale-[0.98]
                       shadow-lg hover:shadow-blue-500/25"
            >
              ¡Comenzar Juego! 🎮
            </button>
          </form>

          <GameRules />
        </div>
      </div>
    </div>
  );
}