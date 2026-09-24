import { motion } from "framer-motion";
import { FADE_UP_VARIANTS } from "@/shared/lib/motion";

const METRICS = [
  { value: "3+", label: "Anos na Área de TI" },
  { value: "10+", label: "Projetos no GitHub" },
  { value: "15h+", label: "Poupadas/Mês em Automação" },
  { value: "FATEC", label: "Graduado em Gestão de TI" },
];

export function ImpactMetrics() {
  return (
    <section className="container py-12 md:py-16 border-b border-border/40">
       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-border/40">
         {METRICS.map((metric, index) => (
           <motion.div 
             key={index}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={FADE_UP_VARIANTS}
             className="flex flex-col gap-1.5 px-3"
           >
             <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-foreground tracking-tight">
               {metric.value}
             </span>
             <span className="text-xs sm:text-sm text-muted-foreground font-medium">
               {metric.label}
             </span>
           </motion.div>
         ))}
       </div>
    </section>
  );
}
