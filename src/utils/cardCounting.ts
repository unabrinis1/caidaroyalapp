import { Player } from '../types/game';

// Límites de cartas según número de jugadores
const CARD_LIMITS = {
  2: 20,
  3: {
    dealer: 14,
    others: 13
  },
  4: 10
};

export function calculateExcessCardPoints(players: Player[]): Player[] {
  const numPlayers = players.length;
  
  return players.map((player, index) => {
    const cardLimit = getCardLimit(numPlayers, index === 0);
    const excessCards = Math.max(0, player.collectedCards.length - cardLimit);
    const penaltyPoints = excessCards;
    
    return {
      ...player,
      points: player.points + penaltyPoints,
      roundPoints: penaltyPoints // Guardamos los puntos de esta ronda
    };
  });
}

function getCardLimit(numPlayers: number, isDealer: boolean): number {
  if (numPlayers === 2) return CARD_LIMITS[2];
  if (numPlayers === 3) return isDealer ? CARD_LIMITS[3].dealer : CARD_LIMITS[3].others;
  return CARD_LIMITS[4];
}