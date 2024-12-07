import { Card } from '../types/game';
import { CARD_VALUES, SUITS } from '../constants/game';

export function createDeck(): Card[] {
  const deck: Card[] = [];
  
  SUITS.forEach(suit => {
    CARD_VALUES.forEach(value => {
      deck.push({
        id: `${suit}-${value}`,
        value,
        suit,
        display: getCardDisplay(value),
      });
    });
  });
  
  return shuffleDeck(deck);
}

function getCardDisplay(value: number): string {
  switch (value) {
    case 10: return 'Sota';
    case 11: return 'Caballo';
    case 12: return 'Rey';
    default: return value.toString();
  }
}

function shuffleDeck(deck: Card[]): Card[] {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

export function dealCards(deck: Card[], numPlayers: number, isNewHand: boolean = true): {
  remainingDeck: Card[];
  playerHands: Card[][];
  tableCards: Card[];
} {
  const cardsPerPlayer = 3;
  const tableCardsCount = isNewHand ? 4 : 0;
  const minCardsNeeded = (numPlayers * cardsPerPlayer) + tableCardsCount;

  if (deck.length < minCardsNeeded) {
    throw new Error('No hay suficientes cartas para repartir');
  }

  let currentDeck = [...deck];
  const playerHands: Card[][] = Array(numPlayers).fill([]).map(() => []);
  
  // Repartir 3 cartas a cada jugador
  for (let i = 0; i < cardsPerPlayer; i++) {
    for (let j = 0; j < numPlayers; j++) {
      const [card, ...rest] = currentDeck;
      playerHands[j] = [...playerHands[j], card];
      currentDeck = rest;
    }
  }
  
  let tableCards: Card[] = [];
  
  // Solo repartir cartas a la mesa si es una nueva mano
  if (isNewHand) {
    let attempts = 0;
    const maxAttempts = 100;
    
    // Intentar repartir 4 cartas diferentes a la mesa
    while (tableCards.length < 4 && currentDeck.length > 0 && attempts < maxAttempts) {
      const [card, ...rest] = currentDeck;
      if (!tableCards.some(tc => tc.value === card.value)) {
        tableCards.push(card);
        currentDeck = rest;
      } else {
        currentDeck = [...rest, card];
      }
      attempts++;
    }
    
    // Si no se pudieron encontrar 4 cartas diferentes, usar las últimas disponibles
    while (tableCards.length < 4 && currentDeck.length > 0) {
      const [card, ...rest] = currentDeck;
      tableCards.push(card);
      currentDeck = rest;
    }
  }
  
  return {
    remainingDeck: currentDeck,
    playerHands,
    tableCards,
  };
}