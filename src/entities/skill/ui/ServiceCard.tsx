import { Button } from "@/shared/ui/Button";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { FADE_UP_VARIANTS } from "@/shared/lib/motion";
import * as Icons from "lucide-react";
import { DomainData } from "@/entities/skill/data/expertise";
import { MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";

const IconRenderer = ({ name, className }: { name: string; className?: string }) => {
  // @ts-ignore
  const Icon = Icons[name] || Icons.HelpCircle;
  return <Icon className={className} />;
};

interface ServiceCardProps {
  domain: DomainData;
  onNavigate: (id: string) => void;
}

export function ServiceCard({ domain, onNavigate }: ServiceCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    
    mouseX.set(x);
    mouseY.set(y);

    const rotateXValue = ((y - height / 2) / height) * -6;
    const rotateYValue = ((x - width / 2) / width) * 6;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={FADE_UP_VARIANTS}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d" 
      }}
      className="group relative rounded-[1.75rem] p-1.5 bg-gradient-to-b from-white/15 to-transparent ring-1 ring-border/60 hover:ring-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
    >
      <div className="rounded-[calc(1.75rem-0.375rem)] bg-card/85 backdrop-blur-md overflow-hidden flex flex-col justify-between h-full border border-border/40">
        {/* Dynamic Lighting Overlay */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                500px circle at ${mouseX}px ${mouseY}px,
                rgba(14, 165, 233, 0.12),
                transparent 80%
              )
            `,
          }}
        />

        <div className="p-7 sm:p-8 flex-1 flex flex-col relative z-20">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="p-3.5 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-xs">
              <IconRenderer name={domain.iconName} className="h-6 w-6" />
            </div>
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest border border-border/50 bg-secondary/40 px-2.5 py-1 rounded-full">
              Módulo: {domain.id.split('-')[0]?.toUpperCase() || 'SOLUÇÃO'}
            </span>
          </div>

          {/* Content */}
          <div className="space-y-3 flex-1">
            <h3 className="text-2xl font-bold font-display tracking-tight text-foreground group-hover:text-primary transition-colors">
              {domain.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {domain.description}
            </p>
          </div>

          {/* Tech Specs */}
          <div className="mt-8 pt-6 border-t border-border/40">
            <span className="text-[10px] font-mono text-primary uppercase tracking-widest mb-3 block font-semibold">
              Competências & Tecnologias
            </span>
            <div className="flex flex-wrap gap-1.5">
              {domain.skills.slice(0, 6).map((skill: any) => (
                <span 
                  key={typeof skill === 'string' ? skill : skill.name} 
                  className="inline-flex items-center rounded-md bg-secondary/60 border border-border/40 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {typeof skill === 'string' ? skill : skill.name}
                </span>
              ))}
              {domain.skills.length > 6 && (
                <span className="inline-flex items-center text-[11px] text-muted-foreground px-1.5 py-1">
                  +{domain.skills.length - 6} outras
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Action Footer */}
        <div className="bg-muted/30 px-7 py-4 flex justify-between items-center border-t border-border/40 relative z-20">
          <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Disponível para implementação
          </span>
          <button 
            className="group/btn inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
            onClick={() => onNavigate(domain.id)}
          >
            <span>Ver Detalhes</span>
            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">
              <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
