import { motion } from "framer-motion";
import { FADE_UP_VARIANTS } from "@/shared/lib/motion";

const METRICS = [
  { label: "Projetos GitHub", value: "10+" },
  { label: "Anos na Área de TI", value: "3" }, // 2022-2025 (Education + Work)
  { label: "Tecnologias", value: "15+" },
  { label: "Status Acadêmico", value: "Graduado" },
];

export function ImpactMetrics() {
  return (
    <section className="container py-12 md:py-24 border-b border-white/5">
       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
         {METRICS.map((metric, index) => (
           <motion.div 
             key={index}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={FADE_UP_VARIANTS}
             className="flex flex-col gap-2"
           >
             <span className="text-4xl md:text-5xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
               {metric.value}
             </span>
             <span className="text-sm text-muted-foreground uppercase tracking-wider font-mono">
               {metric.label}
             </span>
           </motion.div>
         ))}
       </div>
    </section>
  );
}
