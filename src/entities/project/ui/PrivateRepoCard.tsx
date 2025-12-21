import { motion } from "framer-motion";
import { Lock, ShieldAlert, Code2 } from "lucide-react";
import { PrivateProject } from "../data/privateProjects";

interface PrivateRepoCardProps {
  project: PrivateProject;
}

export function PrivateRepoCard({ project }: PrivateRepoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative flex flex-col justify-between rounded-xl border border-red-500/10 bg-gradient-to-br from-card/80 to-red-950/5 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-red-500/30 hover:shadow-red-500/10"
    >
      {/* Locked Overlay Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(#ef4444 1px, transparent 1px)", backgroundSize: "20px 20px" }} 
      />

      <div className="space-y-4">
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-red-400">
                <ShieldAlert className="h-5 w-5" />
                <h3 className="font-semibold">{project.name}</h3>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-0.5 text-[10px] font-medium uppercase text-red-500">
                <Lock className="h-3 w-3" />
                <span>NDA / Classificado</span>
            </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((tech) => (
                <span key={tech} className="text-[10px] px-2 py-1 rounded bg-secondary text-secondary-foreground font-mono">
                    {tech}
                </span>
            ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-red-500/10 pt-4">
         <div className="text-xs font-semibold text-foreground/80">
            Impacto: <span className="text-muted-foreground">{project.impact}</span>
         </div>
         
         <div className="group/btn relative overflow-hidden rounded-md bg-muted px-4 py-2 text-xs font-medium text-muted-foreground cursor-not-allowed opacity-70">
            <span className="flex items-center gap-2">
                <Code2 className="h-3 w-3" />
                Código Fonte
            </span>
            {/* Tooltip-ish overlay */}
            <div className="absolute inset-0 bg-red-500/90 text-white flex items-center justify-center translate-y-full group-hover/btn:translate-y-0 transition-transform duration-200">
                Acesso Negado
            </div>
         </div>
      </div>

    </motion.div>
  );
}
