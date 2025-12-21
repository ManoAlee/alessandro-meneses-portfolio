import { motion } from "framer-motion";
import { Database, Server, Globe, Shield, Cpu, Code2 } from "lucide-react";

export function ExpertiseVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none lg:mx-0 hidden lg:block">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* 3D Container - Skill Constellation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 h-[400px] w-full flex items-center justify-center"
      >
         {/* Connecting Lines (SVG Layer) */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" style={{ zIndex: 0 }}>
             {/* Central Hub to Nodes */}
             <motion.line 
                x1="50%" y1="50%" x2="20%" y2="20%" 
                stroke="currentColor" strokeWidth="2" className="text-emerald-500"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
             />
             <motion.line 
                x1="50%" y1="50%" x2="80%" y2="30%" 
                stroke="currentColor" strokeWidth="2" className="text-blue-500"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.7 }}
             />
             <motion.line 
                x1="50%" y1="50%" x2="30%" y2="80%" 
                stroke="currentColor" strokeWidth="2" className="text-purple-500"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.9 }}
             />
         </svg>

         {/* Central Hub - DevOps/Expertise */}
         <motion.div 
            className="relative z-20 w-32 h-32 rounded-full bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 shadow-2xl flex items-center justify-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
         >
             <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-pulse" />
             <div className="text-center">
                 <Cpu className="w-10 h-10 text-emerald-500 mx-auto mb-1" />
                 <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Core</span>
             </div>
         </motion.div>

         {/* Node 1: Infrastructure */}
         <motion.div 
            className="absolute top-[15%] left-[15%] p-4 bg-card/80 backdrop-blur-md rounded-xl border border-white/10 shadow-lg flex items-center gap-3"
            whileHover={{ scale: 1.1 }}
         >
             <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-500"><Server className="w-5 h-5" /></div>
             <div className="text-xs font-bold">Infra as Code</div>
         </motion.div>

         {/* Node 2: Cloud */}
         <motion.div 
            className="absolute top-[25%] right-[15%] p-4 bg-card/80 backdrop-blur-md rounded-xl border border-white/10 shadow-lg flex items-center gap-3"
            whileHover={{ scale: 1.1 }}
         >
             <div className="p-2 bg-blue-500/20 rounded-lg text-blue-500"><Globe className="w-5 h-5" /></div>
             <div className="text-xs font-bold">Cloud Native</div>
         </motion.div>

         {/* Node 3: Security */}
         <motion.div 
            className="absolute bottom-[15%] left-[25%] p-4 bg-card/80 backdrop-blur-md rounded-xl border border-white/10 shadow-lg flex items-center gap-3"
            whileHover={{ scale: 1.1 }}
         >
             <div className="p-2 bg-purple-500/20 rounded-lg text-purple-500"><Shield className="w-5 h-5" /></div>
             <div className="text-xs font-bold">Security Ops</div>
         </motion.div>

         {/* Node 4: Data (Floating independent) */}
         <motion.div 
            className="absolute bottom-[30%] right-[10%] p-3 bg-card/80 backdrop-blur-md rounded-xl border border-white/10 shadow-lg flex flex-col items-center gap-2"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
         >
             <Database className="w-5 h-5 text-orange-500" />
             <span className="text-[10px] font-mono text-muted-foreground">Data Lake</span>
         </motion.div>

      </motion.div>
    </div>
  );
}
