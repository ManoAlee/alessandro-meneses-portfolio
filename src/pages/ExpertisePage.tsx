import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EXPERTISE_DATA } from "@/entities/skill/data/expertise";
import { CareerLog } from "@/entities/user/ui/CareerLog";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/utils";
import * as Icons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FADE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS, SCALE_ON_HOVER, TAP_ANIMATION } from "@/shared/lib/motion";
import { ExpertiseVisual } from "@/widgets/ExpertiseVisual";
import { ChevronLeft, ArrowUpRight, Sparkles, Cpu, Layers } from "lucide-react";

// Helper to render dynamic icons
const IconRenderer = ({ name, className }: { name: string; className?: string }) => {
  // @ts-ignore
  const Icon = Icons[name] || Icons.Code2;
  return <Icon className={className} />;
};

export default function ExpertisePage() {
  const { domainId } = useParams<{ domainId: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Core" | "Lang" | "Tool">("All");

  // Detail View for a Specific Domain
  if (domainId) {
    const domain = EXPERTISE_DATA.find((d) => d.id === domainId);
    if (!domain) return <div className="p-10 text-center text-muted-foreground">Especialidade não encontrada</div>;

    const filteredSkills = domain.skills.filter((skill) => {
      if (selectedCategory === "All") return true;
      return skill.category === selectedCategory;
    });

    return (
      <div className="container py-10 animate-fade-in max-w-4xl space-y-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/expertise")} 
          className="pl-0 hover:pl-2 transition-all text-muted-foreground hover:text-foreground gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Voltar para Todas as Especialidades
        </Button>

        {/* Domain Header Card */}
        <div className="rounded-[1.75rem] p-1.5 bg-gradient-to-b from-white/15 to-transparent ring-1 ring-border/60">
          <div className="rounded-[calc(1.75rem-0.375rem)] bg-card/85 backdrop-blur-md p-6 sm:p-8 space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <IconRenderer name={domain.iconName} className="h-6 w-6" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-foreground">{domain.title}</h1>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">{domain.description}</p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 items-center justify-between border-b border-border/40 pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            Competências Práticas ({filteredSkills.length})
          </span>
          <div className="flex gap-2">
            {(["All", "Core", "Lang", "Tool"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  selectedCategory === cat
                    ? "bg-primary border-primary text-primary-foreground shadow-xs"
                    : "bg-secondary/40 text-muted-foreground border-transparent hover:bg-secondary"
                }`}
              >
                {cat === "All" ? "Todas" : cat === "Core" ? "Essenciais" : cat === "Lang" ? "Linguagens" : "Ferramentas"}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div 
          className="grid gap-3 sm:grid-cols-2"
          variants={STAGGER_CONTAINER_VARIANTS}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div 
                key={skill.name} 
                layout
                variants={FADE_UP_VARIANTS}
                className="rounded-2xl border border-border/60 bg-card/60 p-4 flex justify-between items-center transition-all hover:border-primary/40 hover:bg-card/90"
              >
                <div>
                  <span className="font-semibold text-sm text-foreground block">{skill.name}</span>
                  <span className="text-[11px] font-mono text-muted-foreground">Proficiência corporativa comprovada</span>
                </div>
                <span className={cn(
                  "text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border",
                  skill.category === 'Core' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : 
                  skill.category === 'Lang' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : 
                  "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                )}>
                  {skill.category === "Core" ? "Principal" : skill.category === "Lang" ? "Linguagem" : "Ferramenta"}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  // Dashboard Overview View
  return (
    <div className="container py-12 md:py-20 animate-fade-in min-h-[85vh] space-y-20">
      {/* Header Grid Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5 text-left">
          <motion.div variants={FADE_UP_VARIANTS} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            <Cpu className="w-3.5 h-3.5" />
            <span>Matriz de Conhecimento</span>
          </motion.div>

          <motion.h1 variants={FADE_UP_VARIANTS} className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-foreground leading-[1.1]">
            Especialidades <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-600">
              Técnicas
            </span>
          </motion.h1>

          <motion.p variants={FADE_UP_VARIANTS} className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Visão detalhada das minhas competências em desenvolvimento de software moderno, automação corporativa, suporte de sistemas e análise de dados.
          </motion.p>
        </div>

        <motion.div variants={FADE_UP_VARIANTS} className="flex justify-center lg:justify-end">
          <ExpertiseVisual />
        </motion.div>
      </div>

      {/* Domain Cards */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
            Domínios de Especialidade
          </span>
          <div className="h-px bg-border/60 flex-1" />
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={STAGGER_CONTAINER_VARIANTS}
          className="grid gap-6 sm:grid-cols-2"
        >
          {EXPERTISE_DATA.map((domain) => (
            <motion.div 
              key={domain.id}
              variants={FADE_UP_VARIANTS}
              whileHover={SCALE_ON_HOVER}
              whileTap={TAP_ANIMATION}
              onClick={() => navigate(`/expertise/${domain.id}`)} 
              className="group cursor-pointer rounded-[1.75rem] p-1.5 bg-gradient-to-b from-white/15 to-transparent ring-1 ring-border/60 hover:ring-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 flex flex-col justify-between"
            >
              <div className="rounded-[calc(1.75rem-0.375rem)] bg-card/85 backdrop-blur-md p-7 sm:p-8 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <IconRenderer name={domain.iconName} className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase border border-border/50 px-2 py-0.5 rounded-full bg-secondary/50">
                      {domain.skills.length} Habilidades
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
                    {domain.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {domain.description}
                  </p>
                </div>
                
                <div className="mt-6 pt-5 border-t border-border/40 flex items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                     {domain.skills.slice(0, 3).map((s) => (
                       <span key={s.name} className="text-[11px] font-mono bg-secondary/80 px-2 py-0.5 rounded text-foreground font-medium border border-border/40">
                         {s.name}
                       </span>
                     ))}
                     {domain.skills.length > 3 && (
                       <span className="text-[11px] font-mono text-muted-foreground py-0.5">
                         +{domain.skills.length - 3} mais
                       </span>
                     )}
                  </div>
                  <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Career Timeline Section */}
      <div className="border-t border-border/40 pt-16">
        <CareerLog />
      </div>
    </div>
  );
}
