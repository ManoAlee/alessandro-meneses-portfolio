import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Shield, Cpu, Terminal, Wifi } from "lucide-react";
import { PortfolioEventDetail } from "@/shared/lib/events";

const PERSONAS = [
  { id: "devops", name: "DevOps Agent", icon: Terminal, color: "text-green-500", bg: "bg-green-500/10" },
  { id: "secops", name: "SecOps Guardian", icon: Shield, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "cloud", name: "Cloud Architect", icon: Cpu, color: "text-purple-500", bg: "bg-purple-500/10" },
];

export function SystemMonitor() {
  const [activePersona, setActivePersona] = useState(0);
  const [logs, setLogs] = useState<{ id: number; text: string }[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-cycle personas
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePersona((prev) => (prev + 1) % PERSONAS.length);
    }, 5000); // Change persona every 5s
    return () => clearInterval(interval);
  }, []);

  // Listen for interactions - DISABLED by user request (Quiet Mode)
  /*
  useEffect(() => {
    const handleInteraction = (e: CustomEvent<PortfolioEventDetail>) => {
      // ... logic removed to silence messages
    };
    window.addEventListener("portfolio-interaction", handleInteraction as EventListener);
    return () => window.removeEventListener("portfolio-interaction", handleInteraction as EventListener);
  }, []);
  */

  const CurrentPersona = PERSONAS[activePersona];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <motion.div 
        layout
        className="flex flex-col items-center bg-background/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden min-w-[300px]"
      >
        {/* Status Bar */}
        <div className="flex items-center gap-3 px-4 py-2 w-full border-b border-white/5 bg-black/40">
           <div className={`p-1.5 rounded-lg ${CurrentPersona.bg}`}>
             <CurrentPersona.icon className={`w-4 h-4 ${CurrentPersona.color}`} />
           </div>
           <div className="flex-1 flex flex-col">
             <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Active Persona</span>
             <span className="text-xs font-mono font-medium text-foreground flex items-center gap-2">
               {CurrentPersona.name}
               <span className="flex h-1.5 w-1.5">
                 <span className={`animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full ${CurrentPersona.color} opacity-75`}></span>
                 <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${CurrentPersona.color}`}></span>
               </span>
             </span>
           </div>
           <Wifi className="w-3 h-3 text-muted-foreground opacity-50" />
        </div>

        {/* Logs Console - Revealed upon interaction */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full bg-black/80 font-mono text-[10px] px-4 py-2 space-y-1 text-muted-foreground"
            >
              {logs.map((log) => (
                <motion.div key={log.id} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                  <span className="text-primary">➜</span> {log.text}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
