export type Card = {
  id: string;
  value: number;
  suit: 'oros' | 'copas' | 'espadas' | 'bastos';
  display: string;
};

export type Player = {
  id: string;
  name: string;
  hand: Card[];
  collectedCards: Card[];
  points: number;
  roundPoints: number;
};

export type GameState = {
  deck: Card[];
  players: Player[];
  currentPlayerIndex: number;
  tableCards: Card[];
  gameStatus: 'waiting' | 'playing' | 'roundEnd' | 'gameEnd';
  lastPlayedCard: Card | null;
  currentRound: number;
  caldaAvailable: boolean;
  lastCollector: Player | null;
};