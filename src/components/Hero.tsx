import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Terminal, ChevronRight } from "lucide-react";
import { userData } from "../data/user";

const CyberGlitchText = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block group select-none">
      {/* Main Text */}
      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 font-bold tracking-tighter">
        {text}
      </span>

      {/* Glitch Layer 1 (Cyan/Blue) */}
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-500 opacity-70 animate-pulse translate-x-[2px] skew-x-12 mix-blend-screen">
        {text}
      </span>

      {/* Glitch Layer 2 (Magenta/Purple) */}
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-purple-600 opacity-70 animate-pulse -translate-x-[2px] -skew-x-12 mix-blend-screen animation-delay-75">
        {text}
      </span>

      {/* Occasional 'Snap' Glitch Line */}
      <span className="absolute top-1/2 left-0 w-full h-[1px] bg-white opacity-0 group-hover:opacity-50 group-hover:animate-ping" />
    </div>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax / Depth Effect on Scroll
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 perspective-1000">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [transform:rotateX(60deg)_scale(2)] origin-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 z-10 relative flex flex-col items-center">

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl w-full text-center"
        >
          {/* Terminal Header Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-10"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/40 border border-green-500/30 rounded-md backdrop-blur-md shadow-[0_0_15px_rgba(34,197,94,0.1)]">
              <Terminal size={14} className="text-green-500" />
              <span className="font-mono text-xs md:text-sm text-green-400 tracking-widest">
                System.Initialize(Profile);<span className="animate-pulse">_</span>
              </span>
            </div>
          </motion.div>

          {/* Holographic Avatar */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
            className="relative w-40 h-40 md:w-52 md:h-52 mx-auto mb-12"
          >
            {/* Hex Tech Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-[spin_10s_linear_infinite]" />
            <div className="absolute -inset-2 rounded-full border border-purple-500/20 border-dashed animate-[spin_15s_linear_infinite_reverse]" />

            {/* Image Container */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 bg-black/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] group">
              <img
                src="/avatar.png"
                alt="Alessandro"
                className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:brightness-110 transition-all duration-500"
              />

              {/* Scanning Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-scanline" />

              {/* Data Overlay */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            {/* ID Tag */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 border border-white/10 rounded text-[10px] font-mono text-cyan-500 tracking-[0.2em] whitespace-nowrap">
              ID: USER_ADMIN
            </div>
          </motion.div>

          {/* Glitch Name */}
          <div className="mb-8 relative perspective-1000">
            <motion.h1
              className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none relative z-10 mix-blend-lighten"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-col items-center gap-0">
                {/* The Echo Effect (User Requested) */}
                <span className="opacity-10 text-3xl md:text-5xl tracking-[0.5em] blur-sm select-none pointer-events-none mb-[-2rem] md:mb-[-4rem] text-cyan-900">
                  ALESSANDRO
                </span>

                <CyberGlitchText text="ALESSANDRO" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  MENESES
                </span>

                <span className="opacity-10 text-3xl md:text-5xl tracking-[0.5em] blur-sm select-none pointer-events-none mt-[-2rem] md:mt-[-4rem] text-purple-900">
                  MENESES
                </span>
              </div>
            </motion.h1>
          </div>

          {/* Code Tags */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 md:gap-6 text-sm md:text-base font-mono mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="px-3 py-1 rounded bg-[#1e1e1e] text-[#6a9955] border border-white/5 hover:border-white/20 transition-colors">
                    // Infraestrutura
            </span>
            <span className="px-3 py-1 rounded bg-[#1e1e1e] text-[#569cd6] border border-white/5 hover:border-white/20 transition-colors">
                    // Automação
            </span>
            <span className="px-3 py-1 rounded bg-[#1e1e1e] text-[#ce9178] border border-white/5 hover:border-white/20 transition-colors">
                    // Suporte
            </span>
          </motion.div>

          <motion.p
            className="text-slate-400 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-cyan-400 font-medium">Especialista em Infraestrutura & Automação.</span><br />
            Orquestrando operações complexas com precisão de código.
          </motion.p>

          {/* System Actions (Buttons) */}
          <motion.div
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <a
              href="#contact"
              className="group relative px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono text-sm tracking-wider clip-path-polygon-[0_0,_100%_0,_95%_100%,_5%_100%] transition-all"
              style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
            >
              <span className="flex items-center gap-2">
                FALE_COMIGO <ChevronRight size={16} />
              </span>
            </a>

            <a
              href="#experience"
              className="group px-8 py-3 border border-white/20 hover:border-white/50 text-white font-mono text-sm tracking-wider hover:bg-white/5 transition-all"
            >
              VER_EXPERIÊNCIA
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
