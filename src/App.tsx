import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { GameStatus } from './components/GameStatus';
import { CardTracker } from './components/CardTracker';
import { Table } from './components/Table';
import { PlayerHand } from './components/PlayerHand';
import { GameLog } from './components/GameLog';
import { RoundTransitionModal } from './components/RoundTransitionModal';
import { GameEndModal } from './components/GameEndModal';
import { LoginPage } from './components/LoginPage';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const { 
    gameState, 
    gameLog, 
    onCardPlay, 
    startNewRound, 
    isTransitioning,
    initializeGame 
  } = useGameState();

  const handleLogin = (playerNames: string[]) => {
    initializeGame(playerNames);
    setHasStarted(true);
  };

  if (!hasStarted) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const isGeneralHandEnd = gameState.deck.length === 0 && gameState.gameStatus === 'roundEnd';

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-center mb-8">Juego de Caída 🎴</h1>
        
        <GameStatus gameState={gameState} />
        <CardTracker gameState={gameState} />
        <GameLog messages={gameLog} />
        
        <div className="mb-8">
          <Table cards={gameState.tableCards} />
        </div>

        <div className="space-y-4">
          {gameState.players.map((player, index) => (
            <PlayerHand
              key={player.id}
              player={player}
              isCurrentPlayer={index === gameState.currentPlayerIndex}
              onCardPlay={onCardPlay}
            />
          ))}
        </div>

        <RoundTransitionModal
          isOpen={gameState.gameStatus === 'roundEnd'}
          currentRound={gameState.currentRound}
          remainingCards={gameState.tableCards.length}
          lastCollector={gameState.lastCollector}
          players={gameState.players}
          onNextRound={startNewRound}
          isGeneralHandEnd={isGeneralHandEnd}
          isTransitioning={isTransitioning}
        />

        <GameEndModal
          isOpen={gameState.gameStatus === 'gameEnd'}
          winner={gameState.players.reduce((a, b) => b.points > a.points ? b : a)}
          players={gameState.players}
          onNewGame={() => window.location.reload()}
        />
      </div>
    </div>
  );
}

export default App;