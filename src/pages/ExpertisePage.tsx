import { useNavigate, useParams } from "react-router-dom";
import { EXPERTISE_DATA } from "@/entities/skill/data/expertise";
import { CareerLog } from "@/entities/user/ui/CareerLog"; // Updated import
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/utils";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { FADE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS, SCALE_ON_HOVER, TAP_ANIMATION } from "@/shared/lib/motion";
import { ExpertiseVisual } from "@/widgets/ExpertiseVisual";

// Helper to render dynamic icons
const IconRenderer = ({ name, className }: { name: string; className?: string }) => {
  // @ts-ignore - Dynamic access to Lucide icons
  const Icon = Icons[name] || Icons.HelpCircle;
  return <Icon className={className} />;
};

export default function ExpertisePage() {
  const { domainId } = useParams<{ domainId: string }>();
  const navigate = useNavigate();

  // Detail View
  if (domainId) {
    const domain = EXPERTISE_DATA.find((d) => d.id === domainId);
    if (!domain) return <div className="p-10 text-center">Domain Not Found</div>;

    return (
      <div className="container py-10 fade-in-section animate-fade-in">
        <Button variant="ghost" onClick={() => navigate("/expertise")} className="mb-6 pl-0 hover:pl-2 transition-all">
          ← Back to Overview
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sidebar Info */}
          <div className="col-span-1 space-y-6">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
               <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                 <IconRenderer name={domain.iconName} className="h-6 w-6" />
               </div>
               <h1 className="text-2xl font-bold font-display">{domain.title}</h1>
               <p className="mt-2 text-muted-foreground">{domain.description}</p>
            </div>
          </div>

          {/* Skills Grid - Interactive & Staggered */}
          <motion.div 
            className="col-span-2 grid gap-4 sm:grid-cols-2 relative"
            variants={STAGGER_CONTAINER_VARIANTS}
            initial="hidden"
            animate="visible"
          >
            {domain.skills.map((skill) => (
              <motion.div 
                key={skill.name} 
                variants={FADE_UP_VARIANTS}
                className="group relative overflow-hidden rounded-lg border bg-card/50 px-4 py-3 transition-all hover:bg-card hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm md:text-base">{skill.name}</h3>
                  <span className={cn(
                    "text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full border shadow-sm",
                    skill.category === 'Core' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : 
                    skill.category === 'Lang' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : 
                    "bg-green-500/10 text-green-500 border-green-500/20"
                  )}>
                    {skill.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }



  // Dashboard View
  return (
    <div className="container py-12 md:py-20 animate-fade-in min-h-[85vh]">
      {/* Header Grid Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
              <motion.h1 variants={FADE_UP_VARIANTS} className="text-4xl font-bold font-display leading-tight md:text-5xl">
                Especialidades <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-600">Técnicas</span>
              </motion.h1>
              <motion.p variants={FADE_UP_VARIANTS} className="text-lg text-muted-foreground leading-relaxed">
                Uma visão abrangente das minhas competências em domínios críticos de TI. Da infraestrutura como código à segurança ofensiva.
              </motion.p>
          </div>
          {/* Visual */}
          <motion.div variants={FADE_UP_VARIANTS} className="flex justify-center lg:justify-end">
              <ExpertiseVisual />
          </motion.div>
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={STAGGER_CONTAINER_VARIANTS}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-20"
      >
        {EXPERTISE_DATA.map((domain) => (
          <motion.div 
            key={domain.id}
            variants={FADE_UP_VARIANTS}
            whileHover={SCALE_ON_HOVER}
            whileTap={TAP_ANIMATION}
            onClick={() => navigate(`/expertise/${domain.id}`)} 
            className="group cursor-pointer rounded-xl border bg-card/50 backdrop-blur-sm p-6 shadow-sm transition-all hover:bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <IconRenderer name={domain.iconName} className="h-5 w-5" />
            </div>
            <h2 className="mb-2 text-xl font-bold font-display">{domain.title}</h2>
            <p className="text-sm text-muted-foreground">{domain.description}</p>
            
            <div className="mt-4 flex gap-2 flex-wrap">
               {domain.skills.slice(0, 3).map(s => (
                 <span key={s.name} className="text-[10px] bg-secondary/20 px-2 py-1 rounded text-secondary-foreground border border-transparent group-hover:border-primary/10 transition-colors">
                   {s.name}
                 </span>
               ))}
               {domain.skills.length > 3 && (
                 <span className="text-[10px] text-muted-foreground py-1">+ {domain.skills.length - 3}</span>
               )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Career Timeline Section */}
      <div className="border-t pt-16">
        <CareerLog />
      </div>
    </div>
  );
}
