import { Card } from '../types/game';

export interface Pattern {
  name: string;
  points: number;
  description: string;
  cards: Card[];
}

export function detectPatterns(cards: Card[]): Pattern[] {
  const sortedCards = [...cards].sort((a, b) => a.value - b.value);
  
  // Verificar patrones en orden de prioridad (mayor a menor puntos)
  
  // 1. Registro (8 puntos)
  const registro = checkRegistro(sortedCards);
  if (registro) return [registro];
  
  // 2. Vigía (7 puntos)
  const vigia = checkVigia(sortedCards);
  if (vigia) return [vigia];
  
  // 3. Patrulla (6 puntos)
  const patrulla = checkPatrulla(sortedCards);
  if (patrulla) return [patrulla];
  
  // 4. Trivilín (5 puntos)
  const trivilin = checkTrivilin(sortedCards);
  if (trivilin) return [trivilin];
  
  // 5. Ronda (1-4 puntos)
  const ronda = checkRonda(sortedCards);
  if (ronda) return [ronda];
  
  return [];
}

function checkTrivilin(cards: Card[]): Pattern | null {
  for (let i = 0; i < cards.length - 2; i++) {
    if (cards[i].value === cards[i + 1].value && 
        cards[i].value === cards[i + 2].value) {
      const matchingCards = [cards[i], cards[i + 1], cards[i + 2]];
      return {
        name: 'Trivilín',
        points: 5,
        description: `Tres ${cards[i].display}`,
        cards: matchingCards
      };
    }
  }
  return null;
}

function checkRonda(cards: Card[]): Pattern | null {
  for (let i = 0; i < cards.length - 1; i++) {
    if (cards[i].value === cards[i + 1].value) {
      const matchingCards = [cards[i], cards[i + 1]];
      const points = calculateRondaPoints(cards[i].value);
      return {
        name: 'Ronda',
        points,
        description: `Ronda de ${cards[i].display}s`,
        cards: matchingCards
      };
    }
  }
  return null;
}

function checkPatrulla(cards: Card[]): Pattern | null {
  for (let i = 0; i < cards.length - 2; i++) {
    if (isConsecutive(cards[i], cards[i + 1]) && 
        isConsecutive(cards[i + 1], cards[i + 2])) {
      const matchingCards = [cards[i], cards[i + 1], cards[i + 2]];
      return {
        name: 'Patrulla',
        points: 6,
        description: `Secuencia ${cards[i].display}-${cards[i + 1].display}-${cards[i + 2].display}`,
        cards: matchingCards
      };
    }
  }
  return null;
}

function checkVigia(cards: Card[]): Pattern | null {
  for (let i = 0; i < cards.length - 1; i++) {
    if (cards[i].value === cards[i + 1].value) {
      // Buscar una carta consecutiva
      const otherCard = cards.find(c => 
        c !== cards[i] && 
        c !== cards[i + 1] && 
        (isConsecutive(cards[i], c) || isConsecutive(c, cards[i]))
      );
      
      if (otherCard) {
        return {
          name: 'Vigía',
          points: 7,
          description: `Par de ${cards[i].display}s con ${otherCard.display}`,
          cards: [cards[i], cards[i + 1], otherCard]
        };
      }
    }
  }
  return null;
}

function checkRegistro(cards: Card[]): Pattern | null {
  const as = cards.find(c => c.value === 1);
  const caballo = cards.find(c => c.value === 11);
  const rey = cards.find(c => c.value === 12);

  if (as && caballo && rey) {
    return {
      name: 'Registro',
      points: 8,
      description: 'As, Caballo y Rey',
      cards: [as, caballo, rey]
    };
  }
  return null;
}

function calculateRondaPoints(value: number): number {
  if (value >= 1 && value <= 7) return 1;
  if (value === 10) return 2; // Sota
  if (value === 11) return 3; // Caballo
  if (value === 12) return 4; // Rey
  return 0;
}

function isConsecutive(card1: Card, card2: Card): boolean {
  // Manejo especial para secuencias con figuras
  if (card1.value === 7 && card2.value === 10) return true; // 7-Sota
  if (card1.value === 10 && card2.value === 11) return true; // Sota-Caballo
  if (card1.value === 11 && card2.value === 12) return true; // Caballo-Rey
  
  // Secuencia normal
  return card2.value === card1.value + 1;
}