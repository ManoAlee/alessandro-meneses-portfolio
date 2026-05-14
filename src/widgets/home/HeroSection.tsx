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
        {/* Role badge — honest, specific */}
        <motion.div
          variants={FADE_UP_VARIANTS}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          Disponível para oportunidades
        </motion.div>

        <motion.h1
          variants={FADE_UP_VARIANTS}
          className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:text-7xl font-display text-foreground"
        >
          Alessandro
          <br />
          <span className="text-primary">Meneses.</span>
        </motion.h1>

        <motion.p
          variants={FADE_UP_VARIANTS}
          className="max-w-[600px] text-lg text-muted-foreground leading-relaxed"
        >
          Profissional de TI com foco em{" "}
          <span className="text-foreground font-semibold">infraestrutura</span>,{" "}
          <span className="text-foreground font-semibold">suporte técnico</span> e{" "}
          <span className="text-foreground font-semibold">automação</span>. Apaixonado por
          sistemas bem projetados e soluções que eliminam trabalho repetitivo.
        </motion.p>

        {/* Honest terminal — current real environment */}
        <motion.div
          variants={FADE_UP_VARIANTS}
          className="font-mono text-sm text-primary/80 bg-card px-4 py-2.5 rounded-lg border border-border mt-1 inline-flex items-center gap-2"
        >
          <span className="text-green-500">➜</span>
          <span className="text-muted-foreground">~</span>
          <span className="text-primary/70">/automotion/infra</span>
          <span className="animate-pulse">▊</span>
        </motion.div>

        <motion.div variants={FADE_UP_VARIANTS} className="flex flex-wrap gap-3 mt-1">
          <Button
            size="lg"
            className="text-base px-8 h-12"
            onClick={() => navigate("/expertise")}
          >
            Ver Especialidades
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-base px-8 h-12"
            onClick={() => navigate("/resume")}
          >
            Currículo
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="text-base px-8 h-12 text-muted-foreground"
            onClick={() => navigate("/contact")}
          >
            Fale Comigo
          </Button>
        </motion.div>
      </div>

      <motion.div
        variants={FADE_UP_VARIANTS}
        className="relative flex justify-center lg:justify-center"
      >
        <AvatarVisual />
      </motion.div>
    </motion.section>
  );
}
