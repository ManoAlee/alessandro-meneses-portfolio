import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Power, User, FolderGit2, Cpu, MessageSquare, ArrowRight } from "lucide-react";
import { useGame } from "../context/GameContext";

interface GameTitleScreenProps {
  onStart: () => void;
}

export default function GameTitleScreen({ onStart }: GameTitleScreenProps) {
  const [activeMenu, setActiveMenu] = useState(0);
  const { unlockAchievement } = useGame();

  const menuItems = [
    { label: "INITIALIZE SYSTEM", sub: "Load Portfolio v3.0", icon: Power, action: onStart },
    { label: "PROFILE DATA", sub: "Identify User Role", icon: User, action: () => document.getElementById("about")?.scrollIntoView() },
    { label: "PROJECT LOGS", sub: "View Mission History", icon: FolderGit2, action: () => document.getElementById("projects")?.scrollIntoView() },
    { label: "TECH STACK", sub: "Analyze Arsenal", icon: Cpu, action: () => document.getElementById("skills")?.scrollIntoView() },
    { label: "COMMS LINK", sub: "Establish Connection", icon: MessageSquare, action: () => document.getElementById("contact")?.scrollIntoView() },
  ];

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        setActiveMenu((prev) => (prev - 1 + menuItems.length) % menuItems.length);
      }
      if (e.key === "ArrowDown") {
        setActiveMenu((prev) => (prev + 1) % menuItems.length);
      }
      if (e.key === "Enter") {
        const item = menuItems[activeMenu];
        onStart(); // Always start first to ensure visibility
        setTimeout(() => {
           if (activeMenu !== 0 && item.action) item.action();
        }, 300);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMenu]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#030712] flex flex-col md:flex-row font-sans overflow-hidden text-white h-[100dvh]">
      
      {/* LEFT SIDE: VISUALS - 40% height on mobile, 50% width on desktop */}
      <div className="relative w-full md:w-1/2 h-[40dvh] md:h-full bg-gradient-to-br from-[#050a14] to-[#0f172a] flex flex-col justify-center p-6 md:p-16 border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
         {/* Background */}
         <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-20" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl opacity-20" />
         </div>

         <div className="relative z-10 flex flex-col gap-4 md:gap-10 mt-auto md:mt-0">
            {/* Header Badge */}
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="inline-flex items-center gap-3 self-start scale-90 md:scale-100 origin-left"
            >
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-2 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] md:text-xs font-mono tracking-widest text-primary/80">SYSTEM ONLINE</span>
                </div>
            </motion.div>

            {/* Main Title */}
            <div>
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9]"
                >
                    ALESSANDRO<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">MENESES</span>
                </motion.h1>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 md:mt-6 pl-1 border-l-4 border-primary hidden md:block"
                >
                    <p className="text-slate-400 text-sm md:text-2xl font-light pl-4 md:pl-6">
                        Architecture. Automation. <span className="text-white font-medium">Excellence.</span>
                    </p>
                </motion.div>
            </div>
         </div>
      </div>

      {/* RIGHT SIDE: MENU - 60% height on mobile */}
      <div className="w-full md:w-1/2 h-[60dvh] md:h-full bg-[#030712] flex flex-col justify-center p-6 md:p-16 relative">
         {/* Menu Items */}
         <div className="w-full max-w-lg mx-auto flex flex-col gap-2 md:gap-6">
            <div className="text-[10px] md:text-xs font-mono text-slate-600 mb-2 uppercase tracking-widest">
                // Initialize Protocol
            </div>
            
            {menuItems.map((item, index) => (
               <motion.button
                  key={index}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  onMouseEnter={() => setActiveMenu(index)}
                  onClick={() => {
                     onStart();
                     setTimeout(() => { if (index !== 0) item.action(); }, 300);
                  }}
                  className={`w-full group px-4 py-3 md:px-6 md:py-6 flex items-center justify-between border-b transition-all duration-300 ${
                    activeMenu === index 
                        ? "border-primary bg-primary/5 pl-6 md:pl-8" 
                        : "border-white/10 bg-transparent hover:pl-8 text-slate-500"
                  }`}
               >
                  <div className="flex items-center gap-3 md:gap-4">
                      <span className={`text-[10px] md:text-xs font-mono ${activeMenu === index ? "text-primary" : "text-slate-700"}`}>
                          0{index + 1}
                      </span>
                      <div>
                          <div className={`text-lg md:text-3xl font-black uppercase tracking-tight transition-colors ${activeMenu === index ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}>
                              {item.label}
                          </div>
                      </div>
                  </div>

                  <ArrowRight 
                     size={20} 
                     className={`transition-all duration-300 ${activeMenu === index ? "text-primary opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`} 
                  />
               </motion.button>
            ))}
         </div>
         
         {/* Footer Info */}
         <div className="absolute bottom-4 left-0 w-full text-center text-[8px] md:text-[10px] text-slate-700 font-mono tracking-widest">
             SECURE CONNECTION • ID: {Math.random().toString(36).substr(2, 8).toUpperCase()}
         </div>
      </div>

    </div>
  );
}
