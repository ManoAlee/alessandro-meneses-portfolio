import { useEffect } from "react";
import { useInView } from "framer-motion"; // Or just use IntersectionObserver, but Framer Motion is available
import { useRef } from "react";
import { useGame } from "../context/GameContext";

interface QuestTriggerProps {
  questId: "visitedHero" | "visitedAbout" | "visitedSkills" | "visitedProjects" | "visitedContact";
  children: React.ReactNode;
}

export default function QuestTrigger({ questId, children }: QuestTriggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const { completeQuest } = useGame();

  useEffect(() => {
    if (isInView) {
      completeQuest(questId);
    }
  }, [isInView, questId, completeQuest]);

  return (
    <div ref={ref} className="relative">
      {children}
    </div>
  );
}
