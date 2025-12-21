import { Button } from "@/shared/ui/Button";
import { motion } from "framer-motion";
import { FADE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS } from "@/shared/lib/motion";
import { useNavigate } from "react-router-dom";
import { AvatarVisual } from "./AvatarVisual";

export function HeroSection() {
  const navigate = useNavigate();
  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={STAGGER_CONTAINER_VARIANTS}
      className="container grid lg:grid-cols-2 items-center gap-12 pb-8 pt-20 md:py-32 min-h-[85vh]"
    >
      <div className="flex flex-col items-start gap-6 text-left">
        <motion.h1 
          variants={FADE_UP_VARIANTS}
          className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:text-7xl font-display drop-shadow-2xl"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-blue-600 animate-pulse">
            DevOps & Cloud.
          </span>
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
        
        <motion.div variants={FADE_UP_VARIANTS} className="flex gap-4 mt-2">
          <Button size="lg" className="text-base px-8 h-12 shadow-lg shadow-primary/20" onClick={() => navigate("/expertise")}>
            Ver Expertise
          </Button>
          <Button size="lg" variant="outline" className="text-base px-8 h-12" onClick={() => navigate("/contact")}>
            Fale Comigo
          </Button>
        </motion.div>
      </div>

      {/* Right Side Visual - Fills the empty space */}
      <motion.div variants={FADE_UP_VARIANTS} className="relative flex justify-center lg:justify-center">
         <AvatarVisual />
      </motion.div>
    </motion.section>
  );
}
