import { X, Github, Terminal, Zap, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
}

import { createPortal } from "react-dom"; // NEW

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!project) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal Overlay */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0f1623] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <div className="relative h-64 overflow-hidden rounded-t-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-[#0f1623] to-transparent">
                  <div className="flex items-center gap-2 mb-2">
                     <span className="px-3 py-1 text-xs font-mono font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
                      {project.type}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{project.title}</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 grid md:grid-cols-3 gap-8">
                
                {/* Left Column: Details */}
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Terminal size={20} className="text-primary" />
                        O Desafio & Solução
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-lg">
                      {project.details}
                    </p>
                  </div>

                  <div>
                     <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Zap size={20} className="text-yellow-400" />
                        Impacto & Resultados
                    </h3>
                    <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-lg">
                        <p className="text-yellow-100/90 font-medium">
                            "{project.impact}"
                        </p>
                    </div>
                  </div>

                  {project.codeSnippet && (
                    <div>
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Snippet (Core Logic)</h3>
                      <div className="bg-[#0a0a0a] p-4 rounded-lg border border-white/5 font-mono text-sm overflow-x-auto text-slate-300">
                        <pre>{project.codeSnippet}</pre>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Meta & Actions */}
                <div className="space-y-6">
                    <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                        <h4 className="text-white font-semibold mb-4">Tecnologias</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech: string, i: number) => (
                                <span key={i} className="px-3 py-1 text-xs bg-black/40 text-primary border border-primary/20 rounded">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {project.github && (
                        <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="block w-full py-3 px-4 bg-primary text-primary-foreground text-center font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                        >
                        <Github size={20} /> Ver Código Fonte
                        </a>
                    )}
                </div>

              </div>



            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
