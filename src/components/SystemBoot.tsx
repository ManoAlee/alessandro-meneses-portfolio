import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LOGS = [
  "Initializing KERNEL...",
  "Loading modules: [cpu_gov, net_driver, secure_boot]",
  "Mounting file systems... OK",
  "Starting UX Engine... v2.5.0",
  "Connecting to neural interface...",
  "Establishing secure connection...",
  "Deploying portfolio assets...",
  "System Ready."
];

export default function SystemBoot({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    let delay = 0;
    BOOT_LOGS.forEach((log, index) => {
      delay += Math.random() * 300 + 100; // Random delay between 100-400ms
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        // Scroll to bottom logic if needed, but simple list is fine
        if (index === BOOT_LOGS.length - 1) {
            setTimeout(onComplete, 800); // Finish 800ms after last log
        }
      }, delay);
    });
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black font-mono p-8 overflow-hidden flex flex-col justify-end pb-20 md:justify-start md:pt-20"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
    >
        {/* Progress Bar Top */}
        <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "linear" }}
            className="absolute top-0 left-0 h-1 bg-primary"
        />

        <div className="max-w-2xl w-full mx-auto space-y-2">
            {logs.map((log, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-primary/80 text-sm md:text-base border-l-2 border-primary/20 pl-4"
                >
                    <span className="text-white/50 mr-2">[{new Date().toLocaleTimeString('pt-BR', { hour12: false })}]</span>
                    <span className={i === logs.length - 1 ? "text-primary font-bold animate-pulse" : ""}>
                        {log}
                    </span>
                </motion.div>
            ))}
        </div>

        {/* Loading Spinner */}
        <div className="absolute bottom-10 right-10">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
    </motion.div>
  );
}
