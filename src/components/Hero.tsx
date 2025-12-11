import { useRef } from "react";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Terminal, Cpu, Network } from "lucide-react";
import { userData } from "../data/user";
import Reveal from "./Reveal";

// Minimalist Glitch: Clean by default, subtle effect on hover
const GlitchText = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block group cursor-default">
      <span className="relative z-10 text-white group-hover:text-cyan-50 transition-colors duration-300">{text}</span>
      {/* Glitch layers only appear on hover for minimalism */}
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-0 group-hover:opacity-50 animate-pulse translate-x-[2px] transition-opacity duration-200">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-purple-500 opacity-0 group-hover:opacity-50 animate-pulse -translate-x-[2px] transition-opacity duration-200 delay-75">
        {text}
      </span>
    </div>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Logic (Subtle)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]); // Reduced tilt
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]); // Reduced tilt

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
    y.set(0);
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Elements - Minimalist Aurora */}
      <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
       </div>
      
      <div className="container mx-auto px-4 z-10 relative flex flex-col items-center">
        
        <motion.div
           style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 1 }}
           className="relative max-w-3xl w-full"
        >
            <div className="text-center p-8 md:p-12 relative">
                
                {/* Minimal Header Tag */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center mb-8"
                >
                    <span className="py-1 px-3 rounded-full bg-white/5 border border-white/10 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-mono hover:bg-white/10 transition-colors">
                        System.Initialize(Profile);
                    </span>
                </motion.div>

                {/* Avatar - Clean Hologram */}
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                    className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-10 group cursor-pointer"
                >
                   {/* Subtle Ring */}
                   <div className="absolute -inset-4 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
                   
                   <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20 bg-black shadow-2xl">
                        <img 
                            src="/avatar.png" 
                            alt="Alessandro" 
                            className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                        />
                        {/* Scanline - Very subtle */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/40 animate-scanline" />
                   </div>
                   
                   <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="text-[9px] font-mono text-primary/60 tracking-widest">ID: USER_ADMIN</span>
                   </div>
                </motion.div>

                {/* Name - Clean Typography */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                     <GlitchText text={userData.profile.name} />
                </h1>

                {/* Role / Tags - Clean Row */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400 font-medium mb-10 tracking-wide">
                    <span className="hover:text-primary transition-colors cursor-default">// Infraestrutura</span>
                    <span className="hover:text-primary transition-colors cursor-default">// Automação</span>
                    <span className="hover:text-primary transition-colors cursor-default">// Suporte</span>
                </div>

                {/* Main Role Description */}
                <p className="max-w-xl mx-auto text-slate-300 text-lg md:text-xl font-light mb-12 leading-relaxed">
                    {userData.profile.role}
                </p>

                {/* Buttons - Minimalist Outline */}
                <motion.div 
                    className="flex flex-col md:flex-row gap-6 justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <a 
                        href="#contact"
                        className="group flex items-center gap-2 text-white border-b border-primary pb-1 hover:text-primary transition-all"
                    >
                        Fale Comigo 
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a 
                        href="#experience"
                        className="text-slate-500 hover:text-white transition-colors text-sm"
                    >
                        Ver Experiência
                    </a>
                    
                    <a 
                        href="/cv" 
                        target="_blank"
                        className="md:hidden flex items-center gap-2 text-primary/80 text-sm border border-primary/20 px-4 py-2 rounded-full hover:bg-primary/10 transition-colors"
                    >
                        Ver CV Completo
                    </a>
                </motion.div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
