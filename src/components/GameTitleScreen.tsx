import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Power, User, FolderGit2, Cpu, MessageSquare } from "lucide-react";

interface GameTitleScreenProps {
  onStart: () => void;
}

export default function GameTitleScreen({ onStart }: GameTitleScreenProps) {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const menuItems = [
    { label: "INITIALIZE", icon: Power, action: onStart },
    { label: "PROFILE", icon: User, action: () => { onStart(); setTimeout(() => document.getElementById("about")?.scrollIntoView(), 500); } },
    { label: "PROJECTS", icon: FolderGit2, action: () => { onStart(); setTimeout(() => document.getElementById("projects")?.scrollIntoView(), 500); } },
    { label: "STACK", icon: Cpu, action: () => { onStart(); setTimeout(() => document.getElementById("skills")?.scrollIntoView(), 500); } },
    { label: "CONTACT", icon: MessageSquare, action: () => { onStart(); setTimeout(() => document.getElementById("contact")?.scrollIntoView(), 500); } },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-[#030712] flex items-center justify-center font-sans overflow-hidden text-white h-[100dvh] w-full selection:bg-cyan-500/30">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Main Glass Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl mx-4 p-8 md:p-12 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center gap-8"
      >
        
        {/* Header Status */}
        <div className="flex flex-col items-center gap-2">
            <div className="px-4 py-1.5 bg-cyan-950/30 border border-cyan-500/30 rounded-full flex items-center gap-3 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-xs md:text-sm font-mono tracking-[0.2em] text-cyan-400 font-bold">SYSTEM ONLINE</span>
            </div>
        </div>

        {/* Main Branding */}
        <div className="space-y-2 md:space-y-4">
            <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <span className="block text-white mb-1 md:mb-2">ALESSANDRO</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-lg">
                    MENESES
                </span>
            </motion.h1>

            <motion.div 
                className="flex items-center justify-center gap-3 text-slate-400 text-sm md:text-xl font-light tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <span>Infraestrutura</span>
                <span className="text-cyan-500">•</span>
                <span>Automação</span>
                <span className="text-cyan-500">•</span>
                <span className="text-white font-medium">Excelência</span>
            </motion.div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full mt-4">
            {menuItems.map((item, index) => (
                <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                    onMouseEnter={() => setActiveMenu(index)}
                    onMouseLeave={() => setActiveMenu(null)}
                    onClick={item.action}
                    className={`group relative p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-3 overflow-hidden
                        ${index === 0 ? 'col-span-2 md:col-span-1 bg-cyan-500/10 border-cyan-500/50 hover:bg-cyan-500/20' : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'}
                    `}
                >
                    <div className={`p-2 rounded-lg transition-colors ${index === 0 ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-slate-400 group-hover:text-white'}`}>
                        <item.icon size={24} />
                    </div>
                    <span className={`text-xs font-mono tracking-wider font-bold ${index === 0 ? 'text-cyan-400' : 'text-slate-400 group-hover:text-white'}`}>
                        {item.label}
                    </span>
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
            ))}
        </div>

        {/* Footer ID */}
        <div className="absolute bottom-6 text-[10px] text-slate-600 font-mono">
            ID: {Math.random().toString(36).substr(2, 8).toUpperCase()} // SECURE_CONN
        </div>

      </motion.div>
    </div>
  );
}
