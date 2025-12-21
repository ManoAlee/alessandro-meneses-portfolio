import { motion } from "framer-motion";
import { GitBranch, GitCommit, GitPullRequest, Star, CircleDot } from "lucide-react";

export function OpenSourceVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none lg:mx-0 hidden lg:block">
      {/* Abstract Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* 3D Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30, rotateX: 5 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 group"
        style={{ perspective: "1000px" }}
      >
        {/* Repo Window - Glassmorphism */}
        <div className="rounded-xl border border-white/10 bg-[#0d1117]/90 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-500 hover:border-blue-500/30">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
             <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <GitBranch className="w-3 h-3" />
                <span>ManoAlee/infra-core</span>
             </div>
             <div className="flex gap-2">
                <span className="flex items-center gap-1 text-[10px] bg-white/5 px-2 py-0.5 rounded-full"><Star className="w-3 h-3 text-yellow-500" /> 128</span>
                <span className="flex items-center gap-1 text-[10px] bg-white/5 px-2 py-0.5 rounded-full"><GitBranch className="w-3 h-3 text-green-500" /> 42</span>
             </div>
          </div>

          {/* Activity Content */}
          <div className="p-6 font-mono text-sm space-y-4">
             {/* Simulated Commits */}
             <div className="relative pl-4 border-l border-white/10 space-y-6">
                {[
                  { msg: "feat: implement k8s autoscaling", hash: "a1b2c3d", time: "2h ago", color: "text-green-400" },
                  { msg: "fix: terraform state lock issue", hash: "9f8e7d6", time: "5h ago", color: "text-yellow-400" },
                  { msg: "chore: update dependencies", hash: "4a5b6c7", time: "1d ago", color: "text-blue-400" }
                ].map((commit, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.2) }}
                    className="relative"
                  >
                     <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-background border-2 border-muted-foreground" />
                     <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{commit.hash}</span>
                        <span className="text-muted-foreground/60">{commit.time}</span>
                     </div>
                     <div className={`text-sm font-medium mt-0.5 ${commit.color}`}>{commit.msg}</div>
                  </motion.div>
                ))}
             </div>

             {/* Animated PR Card */}
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.5 }}
               className="mt-6 rounded-lg bg-green-500/5 border border-green-500/20 p-3"
             >
                <div className="flex items-center gap-2 text-green-400 text-xs font-bold mb-1">
                   <GitPullRequest className="w-4 h-4" />
                   <span>Pull Request Merged</span>
                </div>
                <div className="text-xs text-muted-foreground">
                   merged commit <span className="text-white font-mono">f34d12</span> into <span className="text-white font-mono">main</span>
                </div>
             </motion.div>
          </div>
        </div>

        {/* Floating Widgets */}
        <motion.div 
           className="absolute -right-8 top-20 p-3 bg-card/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl z-20 flex items-center gap-3"
           animate={{ y: [0, -10, 0] }}
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
           <div className="p-2 bg-purple-500/20 rounded-md text-purple-500"><GitCommit className="w-5 h-5"/></div>
           <div>
              <div className="text-[10px] text-muted-foreground">Total Commits</div>
              <div className="font-bold text-sm">2,453</div>
           </div>
        </motion.div>

         <motion.div 
           className="absolute -left-4 bottom-10 p-3 bg-card/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl z-20 flex items-center gap-3"
           animate={{ y: [0, 10, 0] }}
           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
           <div className="p-2 bg-orange-500/20 rounded-md text-orange-500"><CircleDot className="w-5 h-5"/></div>
           <div>
              <div className="text-[10px] text-muted-foreground">Issues Fixed</div>
              <div className="font-bold text-sm">142</div>
           </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
