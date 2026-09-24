import { motion } from "framer-motion";
import { GitBranch, GitCommit, GitPullRequest, Star, CircleDot } from "lucide-react";

export function OpenSourceVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none lg:mx-0 hidden lg:block">
      {/* Abstract Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* 3D Container with Doppelrand */}
      <motion.div 
        initial={{ opacity: 0, y: 30, rotateX: 5 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 group"
        style={{ perspective: "1000px" }}
      >
        <div className="rounded-[1.75rem] p-1.5 bg-gradient-to-b from-white/15 to-transparent ring-1 ring-border/60 shadow-2xl">
          {/* Repo Window - Glassmorphism */}
          <div className="rounded-[calc(1.75rem-0.375rem)] border border-border/40 bg-card/90 backdrop-blur-xl shadow-inner overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/40 bg-muted/40">
               <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <GitBranch className="w-3.5 h-3.5 text-primary" />
                  <span className="font-semibold text-foreground">ManoAlee/FreelancerOS</span>
               </div>
               <div className="flex gap-2">
                  <span className="flex items-center gap-1 text-[11px] font-mono bg-secondary/80 px-2.5 py-0.5 rounded-full text-foreground/80 border border-border/40">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> 14
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-mono bg-secondary/80 px-2.5 py-0.5 rounded-full text-foreground/80 border border-border/40">
                    <GitBranch className="w-3 h-3 text-emerald-500" /> main
                  </span>
               </div>
            </div>

            {/* Activity Content */}
            <div className="p-6 font-mono text-sm space-y-4">
               {/* Simulated Commits */}
               <div className="relative pl-4 border-l border-border/60 space-y-6">
                  {[
                    { msg: "feat: pipeline de automacao em Python", hash: "a1b2c3d", time: "2h atrás", color: "text-emerald-500" },
                    { msg: "feat: interface modular em React & TypeScript", hash: "9f8e7d6", time: "5h atrás", color: "text-blue-500" },
                    { msg: "perf: otimizacao de consumo de APIs REST", hash: "4a5b6c7", time: "1d atrás", color: "text-purple-400" }
                  ].map((commit, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (i * 0.15) }}
                      className="relative"
                    >
                       <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-background border-2 border-primary" />
                       <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{commit.hash}</span>
                          <span className="text-muted-foreground/60">{commit.time}</span>
                       </div>
                       <div className={`text-xs sm:text-sm font-medium mt-1 ${commit.color}`}>{commit.msg}</div>
                    </motion.div>
                  ))}
               </div>

               {/* Animated PR Card */}
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.8 }}
                 className="mt-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3.5"
               >
                  <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold mb-1">
                     <GitPullRequest className="w-4 h-4" />
                     <span>Pull Request Homologado</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                     merged commit <span className="text-foreground font-mono font-semibold">f34d12</span> into <span className="text-foreground font-mono font-semibold">main</span>
                  </div>
               </motion.div>
            </div>
          </div>
        </div>

        {/* Floating Widgets */}
        <motion.div 
           className="absolute -right-6 top-16 p-3 bg-card/95 backdrop-blur-md border border-border/60 rounded-xl shadow-xl z-20 flex items-center gap-3"
           animate={{ y: [0, -8, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
           <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><GitCommit className="w-4 h-4"/></div>
           <div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase">Repositórios</div>
              <div className="font-bold text-sm text-foreground">14+ Ativos</div>
           </div>
        </motion.div>

         <motion.div 
           className="absolute -left-4 bottom-8 p-3 bg-card/95 backdrop-blur-md border border-border/60 rounded-xl shadow-xl z-20 flex items-center gap-3"
           animate={{ y: [0, 8, 0] }}
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
           <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><CircleDot className="w-4 h-4"/></div>
           <div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase">Status</div>
              <div className="font-bold text-sm text-emerald-500">Automotion TI</div>
           </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
