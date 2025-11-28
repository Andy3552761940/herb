import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { GameState, HerbInventory, WeatherType, RegionType } from '@/types/game';

interface GameContextType {
  gameState: GameState;
  updateScore: (points: number) => void;
  addHerbToInventory: (herbId: string, quantity: number, quality: number) => void;
  removeHerbFromInventory: (herbId: string, quantity: number) => void;
  completeFormula: (formulaId: string) => void;
  setCurrentRegion: (region: RegionType) => void;
  setWeather: (weather: WeatherType) => void;
  getHerbQuantity: (herbId: string) => number;
  saveGame: () => void;
  loadGame: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const INITIAL_GAME_STATE: GameState = {
  score: 0,
  level: 1,
  collectedHerbs: [],
  completedFormulas: [],
  currentRegion: 'mountain',
  weather: 'sunny',
  inventory: []
};

const STORAGE_KEY = 'shennong_game_state';

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

  useEffect(() => {
    loadGame();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      saveGame();
    }, 30000);

    return () => clearInterval(timer);
  }, [gameState]);

  const updateScore = (points: number) => {
    setGameState(prev => {
      const newScore = prev.score + points;
      const newLevel = Math.floor(newScore / 1000) + 1;
      return {
        ...prev,
        score: newScore,
        level: newLevel
      };
    });
  };

  const addHerbToInventory = (herbId: string, quantity: number, quality: number) => {
    setGameState(prev => {
      const existingHerb = prev.inventory.find(item => item.herbId === herbId);
      
      let newInventory: HerbInventory[];
      if (existingHerb) {
        newInventory = prev.inventory.map(item =>
          item.herbId === herbId
            ? { ...item, quantity: item.quantity + quantity, quality: Math.max(item.quality, quality) }
            : item
        );
      } else {
        newInventory = [...prev.inventory, { herbId, quantity, quality }];
      }

      const newCollectedHerbs = prev.collectedHerbs.includes(herbId)
        ? prev.collectedHerbs
        : [...prev.collectedHerbs, herbId];

      return {
        ...prev,
        inventory: newInventory,
        collectedHerbs: newCollectedHerbs
      };
    });
  };

  const removeHerbFromInventory = (herbId: string, quantity: number) => {
    setGameState(prev => {
      const newInventory = prev.inventory
        .map(item =>
          item.herbId === herbId
            ? { ...item, quantity: item.quantity - quantity }
            : item
        )
        .filter(item => item.quantity > 0);

      return {
        ...prev,
        inventory: newInventory
      };
    });
  };

  const completeFormula = (formulaId: string) => {
    setGameState(prev => {
      if (prev.completedFormulas.includes(formulaId)) {
        return prev;
      }

      return {
        ...prev,
        completedFormulas: [...prev.completedFormulas, formulaId]
      };
    });
  };

  const setCurrentRegion = (region: RegionType) => {
    setGameState(prev => ({
      ...prev,
      currentRegion: region
    }));
  };

  const setWeather = (weather: WeatherType) => {
    setGameState(prev => ({
      ...prev,
      weather
    }));
  };

  const getHerbQuantity = (herbId: string): number => {
    const herb = gameState.inventory.find(item => item.herbId === herbId);
    return herb?.quantity || 0;
  };

  const saveGame = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (error) {
      console.error('Failed to save game:', error);
    }
  };

  const loadGame = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const loadedState = JSON.parse(saved);
        setGameState(loadedState);
      }
    } catch (error) {
      console.error('Failed to load game:', error);
    }
  };

  const resetGame = () => {
    setGameState(INITIAL_GAME_STATE);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        updateScore,
        addHerbToInventory,
        removeHerbFromInventory,
        completeFormula,
        setCurrentRegion,
        setWeather,
        getHerbQuantity,
        saveGame,
        loadGame,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
