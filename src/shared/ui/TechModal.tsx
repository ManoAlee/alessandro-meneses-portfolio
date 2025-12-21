import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, CheckCircle2 } from "lucide-react";

interface TechModalProps {
  tech: {
    name: string;
    desc: string;
    category?: string;
    useCase?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TechModal({ tech, isOpen, onClose }: TechModalProps) {
  if (!tech) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] grid place-items-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative"
            >
              {/* Header Gradient */}
              <div className="h-32 bg-gradient-to-r from-primary/20 via-blue-600/20 to-purple-600/20 relative overflow-hidden">
                 <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/30 blur-[50px] rounded-full" />
              </div>

              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="px-8 pb-8 -mt-12 relative z-10">
                {/* Icon/Title */}
                <div className="flex items-end gap-6 mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-black border border-white/10 shadow-xl flex items-center justify-center relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
                     <Cpu className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="mb-2">
                    <span className="text-xs font-mono text-primary/80 uppercase tracking-widest border border-primary/20 px-2 py-0.5 rounded mb-2 inline-block">
                        {tech.category || "Technology"}
                    </span>
                    <h2 className="text-3xl font-bold font-display text-white">{tech.name}</h2>
                  </div>
                </div>

                {/* Body */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> Definição
                    </h3>
                    <p className="text-lg text-slate-300 leading-relaxed font-light">
                      {tech.desc}
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-white mb-2">Como utilizo no dia-a-dia:</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {tech.useCase || "Utilizado em larga escala para garantir performance, segurança e escalabilidade em projetos críticos."}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                 <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                    <button 
                      onClick={onClose}
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      Fechar Detalhes
                    </button>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
