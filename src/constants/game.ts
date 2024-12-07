export const INITIAL_PLAYERS = [
  { id: '1', name: 'Jugador 1', hand: [], collectedCards: [], points: 0, roundPoints: 0 },
  { id: '2', name: 'Jugador 2', hand: [], collectedCards: [], points: 0, roundPoints: 0 },
];

export const CARD_VALUES = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
export const SUITS = ['oros', 'copas', 'espadas', 'bastos'] as const;

export const WINNING_POINTS = 24;
export const ROUND_TRANSITION_DELAY = 4000; // 4 segundos
export const TOTAL_CARDS = 40;