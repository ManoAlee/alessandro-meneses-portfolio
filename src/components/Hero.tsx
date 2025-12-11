import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Terminal, Cpu, Network } from "lucide-react";
import { userData } from "../data/user";
import ScrambleText from "./ScrambleText";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
            <div className="absolute -inset-10 bg-gradient-to-r from-primary/30 to-purple-600/30 blur-3xl -z-10 rounded-full opacity-50 animate-pulse" />

            <div className="text-center p-8 md:p-12 border border-white/10 bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl relative overflow-hidden group">
                
                {/* Scanner Line Animation */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/50 shadow-[0_0_20px_rgba(6,182,212,0.8)] animate-scan opacity-0 group-hover:opacity-100 transition-opacity" />

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-8 tracking-wider"
                >
                    <Terminal size={12} />
                    <ScrambleText text="System.Initialize(Profile);" />
                </motion.div>

                <motion.div 
                    style={{ transform: "translateZ(100px)" }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, y: [0, -10, 0] }}
                    transition={{ 
                        scale: { type: "spring", stiffness: 260, damping: 20, delay: 0.2 },
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    whileHover={{ scale: 1.1, rotate: 5, filter: "brightness(1.2)" }}
                    className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-10 rounded-full border-4 border-primary/40 relative cursor-pointer bg-black/50 overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.4)] ring-4 ring-primary/10"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-primary/20 z-20 pointer-events-none" />
                    <img 
                      src="/avatar.png" 
                      alt="Alessandro Meneses" 
                      className="w-full h-full object-cover"
                    />
                </motion.div>

                <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6 uppercase relative">
                    <span className="relative z-10 block">
                         <ScrambleText text={userData.profile.name} />
                    </span>
                    <span className="absolute top-[2px] left-[2px] -z-10 text-primary opacity-50 select-none block" aria-hidden="true">
                        {userData.profile.name}
                    </span>
                    <span className="absolute top-[-2px] left-[-2px] -z-10 text-purple-500 opacity-50 select-none block" aria-hidden="true">
                        {userData.profile.name}
                    </span>
                </h1>

                <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base font-mono text-primary/80 mb-8 border-y border-white/5 py-4">
                    <span className="flex items-center gap-2">
                        <Cpu size={16} /> Infraestrutura //
                    </span>
                    <span className="flex items-center gap-2">
                        <Terminal size={16} /> Automação //
                    </span>
                    <span className="flex items-center gap-2">
                        <Network size={16} /> Suporte
                    </span>
                </div>

                <p className="max-w-xl mx-auto text-slate-400 text-lg mb-10 leading-relaxed">
                    {userData.profile.headline}
                </p>

                <motion.div 
                    className="flex flex-col md:flex-row gap-4 justify-center items-center"
                    style={{ transform: "translateZ(50px)" }} // Pop out in 3D
                >
                    <a 
                    href="#contact"
                    className="px-8 py-4 bg-primary text-background font-bold uppercase tracking-widest text-xs rounded hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all flex items-center gap-2 group/btn"
                    >
                    Fale Comigo 
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                    <a 
                    href="#experience"
                    className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded hover:bg-white/5 hover:border-white transition-all"
                    >
                    Ver Experiência
                    </a>
                </motion.div>
            </div>
        </motion.div>

      </div>
    </section>
  );
}
