import { Button } from "@/shared/ui/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FADE_UP_VARIANTS } from "@/shared/lib/motion";
import { ArrowRight, FileText } from "lucide-react";

export function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="container py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={FADE_UP_VARIANTS}
        className="rounded-2xl border border-border/60 bg-card/50 px-8 py-16 md:px-16 md:py-20 flex flex-col items-start gap-8"
      >
        <div className="space-y-4 max-w-2xl">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Vamos conversar</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground leading-tight">
            Tem um projeto ou oportunidade em mente?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Estou aberto a novas oportunidades de trabalho, projetos freelance ou apenas uma boa troca de idéias sobre tecnologia.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            size="lg"
            className="h-12 px-8 gap-2"
            onClick={() => navigate("/contact")}
          >
            Entrar em Contato <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 gap-2"
            onClick={() => navigate("/resume")}
          >
            <FileText className="h-4 w-4" /> Ver Currículo
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
