import { GameState } from '../types/game';
import { INITIAL_PLAYERS } from './game';
import { createDeck, dealCards } from '../utils/deck';

function createInitialState(): GameState {
  const deck = createDeck();
  const { remainingDeck, playerHands, tableCards } = dealCards(deck, INITIAL_PLAYERS.length, true);

  const playersWithHands = INITIAL_PLAYERS.map((player, index) => ({
    ...player,
    hand: playerHands[index]
  }));

  return {
    deck: remainingDeck,
    players: playersWithHands,
    currentPlayerIndex: 0,
    tableCards,
    gameStatus: 'playing',
    lastPlayedCard: null,
    currentRound: 1,
    caldaAvailable: false,
    lastCollector: null
  };
}

export const INITIAL_STATE = createInitialState();