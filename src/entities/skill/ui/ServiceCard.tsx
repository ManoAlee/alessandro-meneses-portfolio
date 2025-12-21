import { Button } from "@/shared/ui/Button";
import { motion } from "framer-motion";
import { FADE_UP_VARIANTS } from "@/shared/lib/motion";
import * as Icons from "lucide-react";
import { DomainData } from "@/entities/skill/data/expertise";

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
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={FADE_UP_VARIANTS}
      className="flex gap-4 p-6 rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02] group cursor-default"
    >
      <div className="mt-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
           <IconRenderer name={domain.iconName} className="h-5 w-5" />
        </div>
      </div>
      
      <div className="space-y-2">
         <h3 className="text-xl font-bold font-display">{domain.title}</h3>
         <p className="text-sm text-muted-foreground">{domain.description}</p>
         
         <div className="pt-4 flex flex-wrap gap-2">
           {domain.skills.map((skill: any) => (
             <span key={typeof skill === 'string' ? skill : skill.name} className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
               {typeof skill === 'string' ? skill : skill.name}
             </span>
           ))}
         </div>

         <Button 
          variant="link" 
          className="px-0 pt-2 h-auto text-primary hover:text-primary/80"
          onClick={() => onNavigate(domain.id)}
        >
          Ver Detalhes →
        </Button>
      </div>
    </motion.div>
  );
}
