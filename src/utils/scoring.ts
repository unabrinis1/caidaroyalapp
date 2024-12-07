import { Card, Player } from '../types/game';

export function calculateCardPoints(value: number): number {
  if (value >= 1 && value <= 7) return 1;
  if (value === 10) return 2; // Sota
  if (value === 11) return 3; // Caballo
  if (value === 12) return 4; // Rey
  return 0;
}

export function calculateCaidaPoints(card: Card): number {
  return calculateCardPoints(card.value);
}

export function getCardLimit(numPlayers: number, isDealer: boolean): number {
  switch (numPlayers) {
    case 2:
      return 20;
    case 3:
      return isDealer ? 14 : 13;
    case 4:
      return 10;
    default:
      return 20;
  }
}

export function calculateExcessPoints(player: Player, numPlayers: number, isDealer: boolean): number {
  const limit = getCardLimit(numPlayers, isDealer);
  const excess = Math.max(0, player.collectedCards.length - limit);
  return excess;
}

export function distributeRemainingCards(players: Player[], tableCards: Card[]): Player[] {
  if (tableCards.length === 0) return players;

  const lastCollector = players.reduce((prev, current) => {
    if (!prev) return current;
    return prev.collectedCards.length > current.collectedCards.length ? prev : current;
  });

  return players.map(player => {
    if (player.id === lastCollector.id) {
      return {
        ...player,
        collectedCards: [...player.collectedCards, ...tableCards]
      };
    }
    return player;
  });
}