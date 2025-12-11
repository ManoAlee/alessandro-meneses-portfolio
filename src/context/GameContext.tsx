import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface GameState {
  xp: number;
  level: number;
  achievements: string[];
  isGameStarted: boolean; // NEW
  quests: {
    visitedHero: boolean;
    visitedAbout: boolean;
    visitedSkills: boolean;
    visitedProjects: boolean;
    visitedContact: boolean;
    foundEasterEgg: boolean;
  };
}

interface GameContextType extends GameState {
  addXp: (amount: number) => void;
  unlockAchievement: (id: string) => void;
  completeQuest: (questId: keyof GameState['quests']) => void;
  startGame: () => void; // NEW
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [isGameStarted, setIsGameStarted] = useState(false); // NEW
  const [achievements, setAchievements] = useState<string[]>([]);
  const [quests, setQuests] = useState({
    visitedHero: false,
    visitedAbout: false,
    visitedSkills: false,
    visitedProjects: false,
    visitedContact: false,
    foundEasterEgg: false,
  });

  const startGame = () => setIsGameStarted(true);
  
  // ... existing effects ...
  useEffect(() => {
    const nextLevelXp = level * 1000;
    if (xp >= nextLevelXp) {
      setLevel((prev) => prev + 1);
      toast.success(`LEVEL UP! You represent Level ${level + 1}`, {
        icon: '🆙',
        style: {
          background: '#0f1623',
          color: '#06b6d4',
          border: '1px solid #06b6d4',
        },
      });
    }
  }, [xp, level]);

  const addXp = (amount: number) => {
    setXp((prev) => {
        const newXp = prev + amount;
        return newXp;
    });
  };

  const unlockAchievement = (id: string) => {
    if (!achievements.includes(id)) {
      setAchievements((prev) => [...prev, id]);
      addXp(500);
      toast(`Achievement Unlocked: ${id}`, {
        icon: '🏆',
        style: {
          background: '#0f1623',
          color: '#a855f7',
          border: '1px solid #a855f7',
        },
      });
    }
  };

  const completeQuest = (questId: keyof typeof quests) => {
    if (!quests[questId]) {
      setQuests((prev) => ({ ...prev, [questId]: true }));
      addXp(200);
      toast(`Quest Complete: ${questId.replace('visited', 'Explore ')}`, {
        icon: '⚔️',
        position: 'bottom-right',
        style: {
          background: '#0f1623',
          color: '#10b981',
          fontFamily: 'monospace',
        },
      });
    }
  };

  return (
    <GameContext.Provider value={{ xp, level, achievements, quests, isGameStarted, addXp, unlockAchievement, completeQuest, startGame }}>
      {children}
      <Toaster />
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};
