import { GameState, Card, Player } from '../types/game';
import { detectPatterns } from './patterns';

function handleRegularPlay(gameState: GameState, playedCard: Card, patternPoints: number): GameState {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const nextPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;

  // Verificar si hay cartas del mismo valor en la mesa
  const matchingCards = gameState.tableCards.filter(card => card.value === playedCard.value);

  if (matchingCards.length > 0) {
    // El jugador debe recoger las cartas que coinciden
    const updatedPlayers = gameState.players.map((player, index) => {
      if (index === gameState.currentPlayerIndex) {
        return {
          ...player,
          hand: player.hand.filter(c => c.id !== playedCard.id),
          collectedCards: [...player.collectedCards, playedCard, ...matchingCards],
          points: player.points + patternPoints
        };
      }
      return player;
    });

    return {
      ...gameState,
      players: updatedPlayers,
      tableCards: gameState.tableCards.filter(card => !matchingCards.includes(card)),
      currentPlayerIndex: nextPlayerIndex,
      lastPlayedCard: null,
      caldaAvailable: false,
      lastCollector: currentPlayer
    };
  }

  // Si no hay coincidencias, la carta se queda en la mesa
  return {
    ...gameState,
    players: gameState.players.map((player, index) => {
      if (index === gameState.currentPlayerIndex) {
        return {
          ...player,
          hand: player.hand.filter(c => c.id !== playedCard.id),
          points: player.points + patternPoints
        };
      }
      return player;
    }),
    tableCards: [...gameState.tableCards, playedCard],
    currentPlayerIndex: nextPlayerIndex,
    lastPlayedCard: playedCard,
    caldaAvailable: true
  };
}

export function handleCardPlay(gameState: GameState, playedCard: Card): GameState {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const patterns = detectPatterns(currentPlayer.hand);
  const patternPoints = patterns.reduce((sum, pattern) => sum + pattern.points, 0);

  return handleRegularPlay(gameState, playedCard, patternPoints);
}