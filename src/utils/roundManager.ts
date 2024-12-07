import { GameState, Player } from '../types/game';
import { createDeck, dealCards } from './deck';
import { calculateExcessCardPoints } from './cardCounting';
import { handleInitialPatterns } from './gameLogic';

export function checkRoundEnd(gameState: GameState): boolean {
  return gameState.deck.length === 0 && 
         gameState.players.every(player => player.hand.length === 0);
}

export function getLastCollector(players: Player[]): Player | null {
  let lastCollector = null;
  let lastCollectionTime = -1;

  players.forEach(player => {
    if (player.collectedCards.length > 0 && 
        player.collectedCards.length > lastCollectionTime) {
      lastCollector = player;
      lastCollectionTime = player.collectedCards.length;
    }
  });

  return lastCollector;
}

export function finalizeRound(gameState: GameState): GameState {
  const lastCollector = getLastCollector(gameState.players);
  
  // Asignar cartas restantes al último colector
  const updatedPlayers = gameState.players.map(player => {
    if (lastCollector && player.id === lastCollector.id) {
      return {
        ...player,
        collectedCards: [...player.collectedCards, ...gameState.tableCards]
      };
    }
    return player;
  });

  // Calcular puntos por exceso de cartas
  const playersWithExcessPoints = calculateExcessCardPoints(updatedPlayers);

  // Verificar fin del juego (24 puntos o más)
  const gameEnded = playersWithExcessPoints.some(player => player.points >= 24);

  return {
    ...gameState,
    players: playersWithExcessPoints,
    tableCards: [],
    gameStatus: gameEnded ? 'gameEnd' : 'roundEnd'
  };
}

export function startNewRound(gameState: GameState): GameState {
  const deck = createDeck();
  const { remainingDeck, playerHands, tableCards } = dealCards(deck, gameState.players.length);
  
  const updatedPlayers = gameState.players.map((player, index) => ({
    ...player,
    hand: playerHands[index],
    roundPoints: 0
  }));

  const playersWithPatterns = handleInitialPatterns(updatedPlayers);
  
  return {
    ...gameState,
    deck: remainingDeck,
    players: playersWithPatterns,
    tableCards,
    currentPlayerIndex: 0,
    gameStatus: 'playing',
    lastPlayedCard: null,
    currentRound: gameState.currentRound + 1
  };
}