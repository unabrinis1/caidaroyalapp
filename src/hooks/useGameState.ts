import { useState, useCallback, useEffect } from 'react';
import { GameState, Card, Player } from '../types/game';
import { INITIAL_STATE } from '../constants/initialState';
import { createDeck, dealCards } from '../utils/deck';
import { handleCardPlay } from '../utils/gameLogic';
import { detectPatterns } from '../utils/patterns';
import { calculateCaidaPoints, distributeRemainingCards, calculateExcessPoints } from '../utils/scoring';
import { WINNING_POINTS, ROUND_TRANSITION_DELAY } from '../constants/game';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [gameLog, setGameLog] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const addLogMessage = useCallback((message: string) => {
    setGameLog(prev => [...prev, message]);
  }, []);

  const checkForWinner = useCallback((players: Player[]) => {
    return players.find(player => player.points >= WINNING_POINTS);
  }, []);

  const onCardPlay = useCallback((card: Card) => {
    setGameState(prevState => {
      const currentPlayer = prevState.players[prevState.currentPlayerIndex];
      const nextPlayerIndex = (prevState.currentPlayerIndex + 1) % prevState.players.length;
      const nextPlayer = prevState.players[nextPlayerIndex];

      // Verificar Caída
      if (prevState.caldaAvailable && 
          prevState.lastPlayedCard && 
          prevState.lastPlayedCard.value === card.value) {
        const caidaPoints = calculateCaidaPoints(card);
        addLogMessage(`¡${currentPlayer.name} cantó Caída! (+${caidaPoints} puntos)`);

        const updatedPlayers = prevState.players.map((player, index) => {
          if (index === prevState.currentPlayerIndex) {
            return {
              ...player,
              hand: player.hand.filter(c => c.id !== card.id),
              collectedCards: [...player.collectedCards, card, prevState.lastPlayedCard!],
              points: player.points + caidaPoints
            };
          }
          return player;
        });

        const winner = checkForWinner(updatedPlayers);
        if (winner) {
          return {
            ...prevState,
            players: updatedPlayers,
            tableCards: prevState.tableCards.filter(c => c.id !== prevState.lastPlayedCard!.id),
            currentPlayerIndex: nextPlayerIndex,
            lastPlayedCard: null,
            caldaAvailable: false,
            gameStatus: 'gameEnd'
          };
        }

        return {
          ...prevState,
          players: updatedPlayers,
          tableCards: prevState.tableCards.filter(c => c.id !== prevState.lastPlayedCard!.id),
          currentPlayerIndex: nextPlayerIndex,
          lastPlayedCard: null,
          caldaAvailable: false
        };
      }

      // Juego normal
      const updatedState = handleCardPlay(prevState, card);
      const winner = checkForWinner(updatedState.players);
      
      if (winner) {
        return {
          ...updatedState,
          gameStatus: 'gameEnd'
        };
      }

      // Verificar fin de ronda
      const allHandsEmpty = updatedState.players.every(p => p.hand.length === 0);
      if (allHandsEmpty) {
        setIsTransitioning(true);
        setTimeout(() => {
          setIsTransitioning(false);
        }, ROUND_TRANSITION_DELAY);

        return {
          ...updatedState,
          gameStatus: 'roundEnd'
        };
      }

      return updatedState;
    });
  }, [addLogMessage, checkForWinner]);

  const startNewRound = useCallback(() => {
    setGameState(prevState => {
      const isNewHand = prevState.deck.length === 0;
      
      let updatedPlayers = prevState.players;
      let updatedTableCards = prevState.tableCards;

      if (isNewHand) {
        // Distribuir cartas restantes al último colector
        if (prevState.lastCollector && prevState.tableCards.length > 0) {
          updatedPlayers = distributeRemainingCards(prevState.players, prevState.tableCards);
          addLogMessage(`${prevState.lastCollector.name} recoge las ${prevState.tableCards.length} cartas restantes de la mesa`);
        }
        
        // Calcular puntos por exceso de cartas
        updatedPlayers = updatedPlayers.map((player, index) => {
          const isDealer = index === 0;
          const excessPoints = calculateExcessPoints(player, updatedPlayers.length, isDealer);
          if (excessPoints > 0) {
            addLogMessage(`${player.name} recibe ${excessPoints} puntos por exceso de cartas`);
          }
          return {
            ...player,
            points: player.points + excessPoints,
            roundPoints: excessPoints,
            collectedCards: [] // Limpiar cartas recogidas solo al iniciar nueva mano general
          };
        });

        // Crear nuevo mazo para nueva mano general
        const newDeck = createDeck();
        const { remainingDeck, playerHands, tableCards } = dealCards(newDeck, prevState.players.length, true);
        
        addLogMessage('Nueva mano general iniciada');
        
        return {
          ...prevState,
          deck: remainingDeck,
          players: updatedPlayers.map((player, index) => ({
            ...player,
            hand: playerHands[index],
            roundPoints: 0
          })),
          tableCards,
          currentPlayerIndex: 0,
          gameStatus: 'playing',
          lastPlayedCard: null,
          currentRound: prevState.currentRound + 1,
          caldaAvailable: false,
          lastCollector: null
        };
      }

      // Ronda normal dentro de la misma mano
      const { remainingDeck, playerHands } = dealCards(prevState.deck, prevState.players.length, false);
      
      return {
        ...prevState,
        deck: remainingDeck,
        players: updatedPlayers.map((player, index) => ({
          ...player,
          hand: playerHands[index],
          roundPoints: 0
        })),
        tableCards: updatedTableCards,
        currentPlayerIndex: 0,
        gameStatus: 'playing',
        lastPlayedCard: null,
        caldaAvailable: false
      };
    });
  }, [addLogMessage]);

  const initializeGame = useCallback((playerNames: string[]) => {
    const deck = createDeck();
    const { remainingDeck, playerHands, tableCards } = dealCards(deck, playerNames.length, true);

    const initialPlayers = playerNames.map((name, index) => ({
      id: (index + 1).toString(),
      name,
      hand: playerHands[index],
      collectedCards: [],
      points: 0,
      roundPoints: 0
    }));

    setGameState({
      deck: remainingDeck,
      players: initialPlayers,
      currentPlayerIndex: 0,
      tableCards,
      gameStatus: 'playing',
      lastPlayedCard: null,
      currentRound: 1,
      caldaAvailable: false,
      lastCollector: null
    });

    addLogMessage('¡Comienza el juego!');
  }, [addLogMessage]);

  return {
    gameState,
    gameLog,
    onCardPlay,
    startNewRound,
    isTransitioning,
    initializeGame
  };
}