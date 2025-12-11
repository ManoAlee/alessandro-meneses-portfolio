import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SystemToast from "../components/SystemToast";

interface GameState {
  xp: number;
  level: number;
  achievements: string[];
  isGameStarted: boolean;
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
  startGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);
export function GameProvider({ children }: { children: ReactNode }) {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [isGameStarted, setIsGameStarted] = useState(false);
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

  const addXp = (amount: number) => {
    setXp((prev) => prev + amount);
  };

  useEffect(() => {
    const nextLevelXp = level * 1000;
    if (xp >= nextLevelXp) {
      setLevel((prev) => prev + 1);
      toast.custom((t) => (
        <SystemToast 
            t={t} 
            title="SYSTEM UPGRADE" 
            message={`Clearance Level ${level + 1} Granted`} 
            type="level" 
        />
      ));
    }
  }, [xp, level]);

  const unlockAchievement = (id: string) => {
    if (!achievements.includes(id)) {
      setAchievements((prev) => [...prev, id]);
      addXp(500);
      toast.custom((t) => (
        <SystemToast 
            t={t} 
            title="ACHIEVEMENT UNLOCKED" 
            message={id} 
            type="achievement" 
        />
      ));
    }
  };

  const completeQuest = (questId: keyof typeof quests) => {
    if (!quests[questId]) {
      setQuests((prev) => ({ ...prev, [questId]: true }));
      addXp(200);
      toast.custom((t) => (
        <SystemToast 
            t={t} 
            title="QUEST COMPLETE" 
            message={questId.replace('visited', 'Explore ')} 
            type="quest" 
        />
      ), { duration: 4000 });
    }
  };

  return (
    <GameContext.Provider value={{ xp, level, achievements, quests, isGameStarted, addXp, unlockAchievement, completeQuest, startGame }}>
      {children}
      <Toaster position="top-center" reverseOrder={false} /> {/* Changed Position to avoid Avatar overlap */}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};
