import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../context/GameContext";
import { ChevronRight } from "lucide-react";

export default function SystemHUD() {
  const [time, setTime] = useState(new Date());

  // Connect to Game Engine
  const { level, xp, isGameStarted } = useGame();

  // Level 1: 0-1000, Level 2: 1000-2000, etc.
  const nextLevelXp = level * 1000;
  const currentLevelBase = (level - 1) * 1000;
  const progress = Math.min(100, Math.max(0, ((xp - currentLevelBase) / (nextLevelXp - currentLevelBase)) * 100));

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Interaction State
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Combine states: open if hovered OR clicked
  const isOpen = isHovered || isClicked;

  // Hide if game not started (Moved after all hooks)
  if (!isGameStarted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* SCANLINES OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%] pointer-events-none" />

      {/* Top Left: System Bio & RPG Stats */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col gap-4 pointer-events-auto">
        {/* Metadata - Hidden by default for clean UX */}

        {/* RPG Level Badge */}
        <div
          className={`
                flex items-center gap-3 bg-[#0f1623]/90 backdrop-blur-xl border rounded-full p-2 shadow-2xl cursor-pointer group transition-all duration-300
                ${isOpen ? 'border-primary/50 pr-6' : 'border-white/10 hover:border-white/30'}
            `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsClicked(!isClicked)}
        >
          {/* Level Circle */}
          <div className="w-10 h-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center border border-primary text-primary font-bold text-sm shadow-[0_0_10px_rgba(6,182,212,0.3)] relative z-10">
            {level}
          </div>

          {/* Collapsible Info */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                  className="flex flex-col gap-1 whitespace-nowrap pl-1"
                >
                  <div className="w-32">
                    <div className="flex justify-between text-[10px] text-primary uppercase font-bold mb-1 px-1">
                      <span>Level {level}</span>
                      <span>{Math.floor(xp)} XP</span>
                    </div>
                    {/* XP Bar */}
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-primary to-purple-500 shadow-[0_0_5px_currentColor]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Chevron Hint */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="text-slate-500 hidden md:block"
          >
            <ChevronRight size={14} />
          </motion.div>
        </div>
      </div>

      {/* Bottom Rights: Metrics */}
      <div className="hidden md:block absolute bottom-8 right-8 text-right font-mono text-[10px] text-primary/40 pointer-events-auto hover:text-primary transition-colors cursor-help">
        <div>CPU: 12%</div>
        <div>MEM: 480MB</div>
        <div>{time.toLocaleTimeString()}</div>
      </div>

      {/* Corner Accents */}
      <div className="fixed top-0 left-0 w-8 h-8 md:w-16 md:h-16 border-t border-l border-white/5 rounded-tl-3xl opacity-30 pointer-events-none" />
      <div className="fixed top-0 right-0 w-8 h-8 md:w-16 md:h-16 border-t border-r border-white/5 rounded-tr-3xl opacity-30 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-8 h-8 md:w-16 md:h-16 border-b border-l border-white/5 rounded-bl-3xl opacity-30 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-8 h-8 md:w-16 md:h-16 border-b border-r border-white/5 rounded-br-3xl opacity-30 pointer-events-none" />
    </div>
  );
}
