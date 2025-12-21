import { motion } from "framer-motion";
import { Terminal, Cpu, Shield, Activity, GitBranch, Server } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none lg:mx-0 hidden lg:block">
      {/* Abstract Background Glow - "Right side empty" fix */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* 3D Tilt Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30, rotateX: 5 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 group"
        style={{ perspective: "1000px" }}
      >
        {/* Terminal Window - Glassmorphism & DevOps Style */}
        <div className="rounded-xl border border-white/10 bg-[#0c0c0c]/90 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-primary/10 hover:border-primary/20">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm" />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground opacity-60">
              <Terminal className="w-3 h-3" />
              <span>alessandro@cloud-station:~/deploy</span>
            </div>
            <div className="w-12" /> {/* Spacer for centering */}
          </div>

          {/* Console Content */}
          <div className="p-6 font-mono text-sm leading-relaxed text-blue-100 overflow-hidden min-h-[320px]">
            {/* Command 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.5 }}
              className="flex gap-2 items-center"
            >
              <span className="text-green-400">➜</span>
              <span className="text-cyan-400">~</span>
              <span className="text-yellow-300">k6 run</span>
              <span className="text-white">performance-test.js</span>
            </motion.div>

            {/* Output 1 */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1 }}
              className="mt-2 space-y-1 pl-4 opacity-80 text-xs"
            >
              <div className="flex justify-between w-[90%]"><span className="text-gray-400">execution: local</span> <span className="text-green-400">✓ passed</span></div>
              <div className="flex justify-between w-[90%]"><span className="text-gray-400">iterations: 1000</span> <span className="text-blue-400">100%</span></div>
              <div className="flex justify-between w-[90%]"><span className="text-gray-400">avg_latency:</span> <span className="text-yellow-400">12ms</span></div>
            </motion.div>

            {/* Command 2 */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 2.5 }}
              className="flex gap-2 items-center mt-6"
            >
              <span className="text-green-400">➜</span>
              <span className="text-cyan-400">~</span>
              <span className="text-yellow-300">terraform apply</span>
              <span className="text-white">-auto-approve</span>
            </motion.div>

             {/* Output 2 */}
            <div className="mt-2 space-y-2 pl-4 text-xs">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} className="flex items-center gap-2">
                 <span className="text-green-500 font-bold">+</span>
                 <span className="text-gray-300">aws_eks_cluster.main</span>
                 <span className="text-gray-500 dashed-line flex-1 border-b border-dashed border-gray-700 mx-2"></span>
                 <span className="text-green-400">creating...</span>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }} className="flex items-center gap-2">
                 <span className="text-green-500 font-bold">+</span>
                 <span className="text-gray-300">aws_s3_bucket.logs</span>
                 <span className="text-gray-500 dashed-line flex-1 border-b border-dashed border-gray-700 mx-2"></span>
                 <span className="text-green-400">created [0.4s]</span>
              </motion.div>
            </div>

            {/* Active Typing Line */}
             <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 6 }}
              className="flex gap-2 items-center mt-6"
            >
              <span className="text-green-400">➜</span>
              <span className="text-cyan-400">~</span>
              <span className="text-white">_</span>
              <motion.span 
                animate={{ opacity: [0, 1, 0] }} 
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-2 h-4 bg-gray-400 block"
              />
            </motion.div>
          </div>

          {/* Footer Status Bar */}
          <div className="bg-[#1a1a1a] border-t border-white/5 py-1.5 px-4 flex justify-between items-center text-[10px] text-gray-400 font-mono">
             <div className="flex gap-3">
               <span className="flex items-center gap-1"><GitBranch className="w-3 h-3" /> main</span>
               <span className="flex items-center gap-1"><Server className="w-3 h-3" /> us-east-1</span>
             </div>
             <div className="flex items-center gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
               <span>Online</span>
             </div>
          </div>
        </div>

        {/* Floating Widgets - Contextual floating elements */}
        <motion.div 
           className="absolute -right-6 top-10 p-4 bg-card/90 backdrop-blur-md border border-primary/20 rounded-lg shadow-xl z-20"
           animate={{ y: [0, -15, 0] }}
           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
           <div className="flex items-center gap-3">
             <div className="p-2 bg-primary/20 rounded-md text-primary"><Cpu className="w-5 h-5"/></div>
             <div>
               <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Cluster Status</div>
               <div className="text-sm font-bold text-foreground">Healthy</div>
             </div>
           </div>
        </motion.div>

         <motion.div 
           className="absolute -left-6 bottom-20 p-4 bg-card/90 backdrop-blur-md border border-blue-500/20 rounded-lg shadow-xl z-20"
           animate={{ y: [0, 15, 0] }}
           transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
           <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-500/20 rounded-md text-blue-500"><Shield className="w-5 h-5"/></div>
             <div>
               <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">WAF Rules</div>
               <div className="text-sm font-bold text-foreground">Active: 420</div>
             </div>
           </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
