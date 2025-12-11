import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react"; // NEW
import { useGame } from "../context/GameContext"; // NEW
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import BattleStation from "../components/BattleStation";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import QuestTrigger from "../components/QuestTrigger";
import GameTitleScreen from "../components/GameTitleScreen";

export default function Home() {
  const { isGameStarted, startGame } = useGame(); // Uses Global Context

  // Lock scroll when game is not started (Title Screen Active)
  useEffect(() => {
    if (!isGameStarted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isGameStarted]);

  return (
    <main className="relative">
      <AnimatePresence>
        {!isGameStarted && (
            <motion.div 
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="fixed inset-0 z-[100]" // Matched z-index
            >
                <GameTitleScreen onStart={startGame} />
            </motion.div>
        )}
      </AnimatePresence>

      <div className="transition-opacity duration-1000 delay-500">
          <QuestTrigger questId="visitedHero"><Hero /></QuestTrigger>
          <QuestTrigger questId="visitedAbout"><About /></QuestTrigger>
          <QuestTrigger questId="visitedAbout"><Experience /></QuestTrigger>
          <QuestTrigger questId="visitedSkills"><Skills /></QuestTrigger>
          <BattleStation />
          <QuestTrigger questId="visitedProjects"><Projects /></QuestTrigger>
          <QuestTrigger questId="visitedContact"><Contact /></QuestTrigger>
      </div>
    </main>
  );
}