import React, { useState, useEffect } from 'react';
import { Card, GameState, Player } from '../types/game';
import { createDeck, dealCards } from '../utils/deck';
import { canDeclareCalda } from '../utils/scoring';
import { handleCalda, handleCardCollection, isGameOver, getWinner, handleInitialPatterns } from '../utils/gameLogic';
import { PlayerHand } from './PlayerHand';
import { Table } from './Table';
import { GameStatus } from './GameStatus';
import { RoundStatus } from './RoundStatus';
import { RoundTransitionModal } from './RoundTransitionModal';
import { GameEndModal } from './GameEndModal';
import { checkRoundEnd, finalizeRound, startNewRound, getLastCollector } from '../utils/roundManager';

const INITIAL_PLAYERS: Player[] = [
  { id: '1', name: 'Jugador 1', hand: [], collectedCards: [], points: 0, roundPoints: 0 },
  { id: '2', name: 'Jugador 2', hand: [], collectedCards: [], points: 0, roundPoints: 0 },
];

export default function Game() {
  const [gameState, setGameState] = useState<GameState>({
    deck: [],
    players: INITIAL_PLAYERS,
    currentPlayerIndex: 0,
    tableCards: [],
    gameStatus: 'waiting',
    lastPlayedCard: null,
    currentRound: 1
  });
  const [lastAction, setLastAction] = useState<string>();
  const [winner, setWinner] = useState<Player | null>(null);
  const [showRoundModal, setShowRoundModal] = useState(false);
  const [lastCollector, setLastCollector] = useState<Player | null>(null);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const deck = createDeck();
    const { remainingDeck, playerHands, tableCards } = dealCards(deck, INITIAL_PLAYERS.length);
    
    const initialPlayers = INITIAL_PLAYERS.map((player, index) => ({
      ...player,
      hand: playerHands[index],
      collectedCards: [],
      points: 0,
      roundPoints: 0
    }));

    const playersWithPatterns = handleInitialPatterns(initialPlayers);
    
    setGameState({
      deck: remainingDeck,
      players: playersWithPatterns,
      currentPlayerIndex: 0,
      tableCards,
      gameStatus: 'playing',
      lastPlayedCard: null,
      currentRound: 1
    });
    setLastAction(undefined);
    setWinner(null);
    setShowRoundModal(false);
  };

  const handleNextRound = () => {
    const newState = startNewRound(gameState);
    setGameState(newState);
    setShowRoundModal(false);
    setLastCollector(null);
  };

  const handleCardPlay = (card: Card) => {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    
    // Check for Caída
    if (gameState.lastPlayedCard && canDeclareCalda(gameState.lastPlayedCard, card)) {
      const updatedState = handleCalda(gameState, gameState.currentPlayerIndex, card);
      setGameState(updatedState);
      setLastAction(`¡${currentPlayer.name} cantó Caída!`);
      return;
    }

    // Check for card collection
    const { updatedState, collectedCards } = handleCardCollection(
      gameState,
      gameState.currentPlayerIndex,
      card
    );

    if (collectedCards.length > 0) {
      setLastAction(`${currentPlayer.name} recogió ${collectedCards.length} carta(s)`);
      setGameState(updatedState);
      return;
    }

    // Regular play
    const updatedPlayers = gameState.players.map(player => {
      if (player.id === currentPlayer.id) {
        return {
          ...player,
          hand: player.hand.filter(c => c.id !== card.id),
        };
      }
      return player;
    });

    const updatedTableCards = [...gameState.tableCards, card];
    const nextPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;

    setGameState({
      ...gameState,
      players: updatedPlayers,
      tableCards: updatedTableCards,
      currentPlayerIndex: nextPlayerIndex,
      lastPlayedCard: card
    });
    setLastAction(`${currentPlayer.name} jugó ${card.display} de ${card.suit}`);
  };

  useEffect(() => {
    if (gameState.gameStatus === 'playing' && checkRoundEnd(gameState)) {
      const collector = getLastCollector(gameState.players);
      setLastCollector(collector);
      
      const finalizedState = finalizeRound(gameState);
      setGameState(finalizedState);
      setShowRoundModal(true);
      
      if (finalizedState.gameStatus === 'gameEnd') {
        const gameWinner = getWinner(finalizedState.players);
        setWinner(gameWinner);
      }
    }
  }, [gameState]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Juego de Caída 🎴</h1>
        
        <RoundStatus 
          gameState={gameState}
          onNextRound={handleNextRound}
        />

        <GameStatus 
          currentPlayerName={gameState.players[gameState.currentPlayerIndex].name}
          lastAction={lastAction}
          winner={winner}
        />

        <div className="mb-8">
          <Table cards={gameState.tableCards} />
        </div>

        <div className="grid gap-4">
          {gameState.players.map((player, index) => (
            <PlayerHand
              key={player.id}
              player={player}
              isCurrentPlayer={index === gameState.currentPlayerIndex && gameState.gameStatus === 'playing'}
              onCardPlay={handleCardPlay}
            />
          ))}
        </div>

        <RoundTransitionModal
          isOpen={showRoundModal && !winner}
          currentRound={gameState.currentRound}
          players={gameState.players}
          remainingTableCards={gameState.tableCards.length}
          lastCollector={lastCollector}
          onNextRound={handleNextRound}
        />

        <GameEndModal
          isOpen={!!winner}
          winner={winner}
          players={gameState.players}
          onNewGame={startNewGame}
        />
      </div>
    </div>
  );
}