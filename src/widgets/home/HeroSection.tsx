import { Button } from "@/shared/ui/Button";
import { motion } from "framer-motion";
import { FADE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS } from "@/shared/lib/motion";
import { useNavigate } from "react-router-dom";
import { AvatarVisual } from "./AvatarVisual";
import { useState, useEffect } from "react";

interface MolecularTextProps {
  text: string;
  gravity: { x: number; y: number; active: boolean };
  className?: string;
}

function MolecularText({ text, gravity, className }: MolecularTextProps) {
  return (
    <span className={className}>
      {text.split("").map((char, index) => {
        // Characters closer to the right (closer to the black hole) get sucked in stronger
        const normIndex = index / text.length;
        const sensitivity = 0.4 + normIndex * 1.6;
        
        // Physics offsets
        const pullX = gravity.active ? 28 * sensitivity : 0;
        const pullY = gravity.active ? gravity.y * 22 * sensitivity : 0;
        const skew = gravity.active ? (1 + gravity.y) * 6 * sensitivity : 0;

        return (
          <motion.span
            key={index}
            className="inline-block whitespace-pre origin-center"
            animate={{
              x: pullX,
              y: pullY,
              skewX: skew,
              scale: gravity.active ? 1 + (sensitivity * 0.08) : 1,
              // Glow effect changes to hot gas orange near the horizon
              color: gravity.active ? "#f97316" : "#38bdf8",
              textShadow: gravity.active 
                ? "0 0 8px rgba(249, 115, 22, 0.6)" 
                : "0 0 8px rgba(56, 189, 248, 0)",
            }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 13,
              mass: 0.6,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
}

export function HeroSection() {
  const navigate = useNavigate();
  const [gravityOffset, setGravityOffset] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    const handleHover = () => {
      setGravityOffset(prev => ({ ...prev, active: true }));
    };
    const handleLeave = () => {
      setGravityOffset({ x: 0, y: 0, active: false });
    };
    const handleMove = (e: Event) => {
      const customEvent = e as CustomEvent<{ x: number; y: number }>;
      const pullX = 16; 
      const pullY = customEvent.detail.y * 12;
      setGravityOffset({ x: pullX, y: pullY, active: true });
    };

    window.addEventListener("blackhole-hover", handleHover);
    window.addEventListener("blackhole-leave", handleLeave);
    window.addEventListener("blackhole-move", handleMove);

    return () => {
      window.removeEventListener("blackhole-hover", handleHover);
      window.removeEventListener("blackhole-leave", handleLeave);
      window.removeEventListener("blackhole-move", handleMove);
    };
  }, []);

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={STAGGER_CONTAINER_VARIANTS}
      className="container grid lg:grid-cols-2 items-center gap-12 pb-8 pt-20 md:py-32 min-h-[85vh]"
    >
      {/* Left Column with Spaghettification Gravity Warp */}
      <motion.div 
        animate={{
          x: gravityOffset.active ? gravityOffset.x : 0,
          y: gravityOffset.active ? gravityOffset.y : 0,
          skewX: gravityOffset.active ? 1 : 0,
          scaleX: gravityOffset.active ? 1.01 : 1,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="flex flex-col items-start gap-6 text-left origin-left"
      >
        <motion.h1 
          variants={FADE_UP_VARIANTS}
          className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:text-7xl font-display drop-shadow-2xl"
        >
          <MolecularText 
            text="DevOps & Cloud." 
            gravity={gravityOffset} 
            className="block"
          />
        </motion.h1>
        <motion.p 
          variants={FADE_UP_VARIANTS}
          className="max-w-[700px] text-lg text-muted-foreground md:text-xl leading-relaxed"
        >
          Alessandro Meneses oferece soluções de nível corporativo em <span className="text-foreground font-semibold">DevOps</span>, 
          <span className="text-foreground font-semibold"> Arquitetura de Nuvem</span> e 
          <span className="text-foreground font-semibold"> Administração de Sistemas</span>. 
          Transformando complexidade técnica em estabilidade operacional.
        </motion.p>

        {/* Terminal Effect */}
        <motion.div variants={FADE_UP_VARIANTS} className="font-mono text-sm text-primary/80 bg-primary/5 px-4 py-2 rounded border border-primary/10 mt-2 inline-flex items-center gap-2">
            <span className="text-green-500">➜</span> 
            <span className="text-blue-400">~/infrastructure</span>
            <span className="animate-pulse">_</span>
        </motion.div>
        
        <motion.div variants={FADE_UP_VARIANTS} className="flex flex-wrap gap-4 mt-2">
          <Button size="lg" className="text-base px-8 h-12 shadow-lg shadow-primary/20" onClick={() => navigate("/expertise")}>
            Ver Expertise
          </Button>
          <Button size="lg" variant="outline" className="text-base px-8 h-12 border-primary/20 hover:bg-primary/10" onClick={() => navigate("/resume")}>
            Ver Currículo
          </Button>
          <Button size="lg" variant="ghost" className="text-base px-8 h-12 text-muted-foreground" onClick={() => navigate("/contact")}>
            Fale Comigo
          </Button>
        </motion.div>
      </motion.div>

      {/* Right Side Visual - Fills the empty space */}
      <motion.div variants={FADE_UP_VARIANTS} className="relative flex justify-center lg:justify-center">
         <AvatarVisual />
      </motion.div>
    </motion.section>
  );
}
