import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGame } from "../context/GameContext";

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

  // Hide if game not started (Moved after all hooks)
  if (!isGameStarted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* SCANLINES OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%] pointer-events-none" />

      {/* Top Left: System Bio & RPG Stats */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col gap-4 pointer-events-auto">
          {/* Metadata - Hidden on mobile */}
          <div className="hidden md:block text-[10px] font-mono text-primary/60 tracking-widest uppercase mb-2">
            <div>SYS.VER: 3.0.0-GAMIFIED</div>
            <div>USR: ADMIN</div>
            <div>NET: SECURE</div>
            <div className="mt-2 text-white animate-pulse">PRESS [CTRL+K] FOR CMD</div>
          </div>

          {/* RPG Level Badge - Compact on Mobile */}
          <div className="flex items-center gap-3 bg-[#0f1623]/80 backdrop-blur-md p-2 md:p-3 rounded border border-white/10 shadow-lg scale-90 md:scale-100 origin-top-left transition-transform">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded bg-primary/20 flex items-center justify-center border border-primary text-primary font-bold text-sm md:text-lg">
                  {level}
              </div>
              <div className="flex flex-col gap-1 w-24 md:w-32">
                  <div className="flex justify-between text-[8px] md:text-[10px] text-primary uppercase font-bold">
                      <span>Level {level}</span>
                      <span>{Math.floor(xp)} XP</span>
                  </div>
                  {/* XP Bar */}
                  <div className="w-full h-1 md:h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-gradient-to-r from-primary to-purple-500"
                      />
                  </div>
              </div>
          </div>
      </div>

      {/* Bottom Rights: Metrics - Hidden on mobile to save space */}
      <div className="hidden md:block absolute bottom-8 right-8 text-right font-mono text-[10px] text-primary/40">
         <div>CPU: 12%</div>
         <div>MEM: 480MB</div>
         <div>{time.toLocaleTimeString()}</div>
      </div>
      
      {/* Corner Accents - Subtle on mobile */}
      <div className="absolute top-0 left-0 w-8 h-8 md:w-16 md:h-16 border-t border-l border-white/10 rounded-tl-3xl opacity-50" />
      <div className="absolute top-0 right-0 w-8 h-8 md:w-16 md:h-16 border-t border-r border-white/10 rounded-tr-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-8 h-8 md:w-16 md:h-16 border-b border-l border-white/10 rounded-bl-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 w-8 h-8 md:w-16 md:h-16 border-b border-r border-white/10 rounded-br-3xl opacity-50" />
    </div>
  );
}
