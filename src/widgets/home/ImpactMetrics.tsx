import { motion } from "framer-motion";
import { FADE_UP_VARIANTS } from "@/shared/lib/motion";

const METRICS = [
  {
    value: "19",
    label: "Repositórios GitHub",
    note: "públicos e privados",
  },
  {
    value: "3+",
    label: "Anos em TI",
    note: "desde 2022",
  },
  {
    value: "15+",
    label: "Tecnologias",
    note: "infraestrutura e dev",
  },
  {
    value: "GTI",
    label: "Graduação",
    note: "Gestão de TI",
  },
];

export function ImpactMetrics() {
  return (
    <section className="container py-12 md:py-20 border-b border-border/30">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/30">
        {METRICS.map((metric, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={FADE_UP_VARIANTS}
            className="flex flex-col gap-1 px-4"
          >
            <span className="text-4xl md:text-5xl font-bold font-display text-foreground">
              {metric.value}
            </span>
            <span className="text-sm font-medium text-foreground/80">
              {metric.label}
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              {metric.note}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
