import { Button } from "@/shared/ui/Button";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { FADE_UP_VARIANTS } from "@/shared/lib/motion";
import * as Icons from "lucide-react";
import { DomainData } from "@/entities/skill/data/expertise";
import { MouseEvent } from "react";

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

    const rotateXValue = ((y - height / 2) / height) * -10; // Max -10 to 10 deg
    const rotateYValue = ((x - width / 2) / width) * 10;   // Max -10 to 10 deg

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
      className="group relative flex flex-col rounded-xl border border-white/10 bg-card/30 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Dynamic Lighting Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Technical Top Border Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
      
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent -mr-8 -mt-8 rotate-45" />

      <div className="p-6 md:p-8 flex-1 flex flex-col relative z-20" style={{ transform: "translateZ(20px)" }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]">
             <IconRenderer name={domain.iconName} className="h-6 w-6" />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest border border-white/5 px-2 py-1 rounded">
            Service_ID: {domain.id.split('-')[1]?.toUpperCase() || 'SYS'}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-4 flex-1">
           <h3 className="text-2xl font-bold font-display tracking-tight text-foreground group-hover:text-primary transition-colors">
            {domain.title}
           </h3>
           <p className="text-sm md:text-base text-muted-foreground/90 leading-relaxed font-light border-l-2 border-primary/20 pl-4">
            {domain.description}
           </p>
        </div>

        {/* Tech Specs */}
        <div className="mt-8 pt-6 border-t border-white/5">
             <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest mb-3 block">
               Technical Specs
             </span>
             <div className="flex flex-wrap gap-2">
               {domain.skills.slice(0, 6).map((skill: any) => (
                 <span key={typeof skill === 'string' ? skill : skill.name} className="inline-flex items-center rounded-sm bg-secondary/50 border border-white/5 px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary/20">
                   {typeof skill === 'string' ? skill : skill.name}
                 </span>
               ))}
               {domain.skills.length > 6 && (
                 <span className="inline-flex items-center text-[10px] text-muted-foreground px-1">
                   +{domain.skills.length - 6} more
                 </span>
               )}
             </div>
        </div>
      </div>
      
      {/* Action Footer */}
      <div className="bg-muted/10 p-4 flex justify-between items-center border-t border-white/5 group-hover:bg-primary/5 transition-colors relative z-20" style={{ transform: "translateZ(10px)" }}>
          <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
            Status: Active
          </span>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-primary hover:text-primary hover:bg-primary/10 gap-2 p-0 h-auto font-mono text-xs uppercase tracking-wider hover:underline underline-offset-4"
            onClick={() => onNavigate(domain.id)}
          >
            Access Module <Icons.ChevronRight className="w-3 h-3" />
          </Button>
      </div>
    </motion.div>
  );
}
