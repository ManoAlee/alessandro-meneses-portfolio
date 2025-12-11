import { useState } from "react";
import { userData } from "../data/user";
import { FolderGit2, ArrowUpRight } from "lucide-react";
import ProjectModal from "./ProjectModal";
import SpotlightCard from "./SpotlightCard";
import Reveal from "./Reveal";
import { DecryptText } from "./DecryptText";
import { motion } from "framer-motion";

// Define interface for Project to fix TS errors
interface Project {
  title: string;
  description: string;
  details: string;
  impact: string;
  codeSnippet: string;
  tech: string[];
  type: string;
  github?: string; // Optional property
  complexity?: number;
  stats?: Record<string, string>;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenModal = (project: any) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-32 bg-[#030712] relative overflow-hidden">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
            <Reveal width="100%">
                <div className="inline-block px-4 py-1 mb-4 border border-purple-500/30 rounded-full bg-purple-900/10 backdrop-blur-md">
                    <span className="text-purple-400 font-mono text-xs tracking-[0.2em] uppercase">
                        <DecryptText text="COMPILED_MODULES" />
                    </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    <DecryptText text="PROJECT_ARCHIVE" speed={50} />
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Soluções de infraestrutura e automação implantadas com sucesso.
                </p>
            </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {userData.projects.map((project: any, index: number) => (
            <Reveal key={index} width="100%" delay={index * 0.1}>
                <div onClick={() => handleOpenModal(project)} className="cursor-pointer h-full group/card perspective-1000">
                    <div className="h-full relative p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent hover:from-cyan-500/50 hover:to-purple-500/50 transition-all duration-500">
                        <div className="absolute inset-0 bg-transparent group-hover/card:bg-cyan-500/20 blur-xl transition-all duration-500 opacity-0 group-hover/card:opacity-100" />
                        
                        <div className="relative h-full bg-[#0a0f1c] rounded-xl overflow-hidden border border-white/5 group-hover/card:translate-z-10 transition-transform">
                             {/* Scanner Beam */}
                             <div className="absolute top-0 left-0 w-[200%] h-[50%] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent -skew-y-12 translate-y-[-200%] group-hover/card:animate-scan-vertical pointer-events-none" />

                             <div className="p-8 flex flex-col h-full">
                                {/* Complexity Bar */}
                                <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-1">
                                    <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider group-hover/card:text-cyan-400 transition-colors">Complexity_Lvl</span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div 
                                                key={i} 
                                                initial={{ height: 4, opacity: 0.3 }}
                                                whileInView={{ height: i < (project.complexity / 20) ? 12 : 4, opacity: 1 }}
                                                transition={{ delay: 0.5 + (i * 0.1) }}
                                                className={`w-1 rounded-sm ${i < (project.complexity / 20) ? "bg-cyan-400 shadow-[0_0_5px_rgba(6,182,212,0.8)]" : "bg-slate-800"}`} 
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-cyan-400 group-hover/card:bg-cyan-500 group-hover/card:text-black transition-all duration-300 mb-4">
                                        <FolderGit2 size={24} />
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover/card:text-cyan-400 transition-colors">
                                        <DecryptText text={project.title} />
                                    </h3>
                                    <p className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-4 border-l-2 border-purple-500/50 pl-2">
                                        // {project.type}
                                    </p>
                                </div>
                                
                                <p className="text-slate-400 mb-8 leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Stats Grid */}
                                {project.stats && (
                                    <div className="grid grid-cols-3 gap-2 mb-8 p-4 bg-black/40 rounded-lg border border-white/5">
                                        {Object.entries(project.stats).map(([key, value]: [string, any], i) => (
                                            <div key={key} className="text-center">
                                                <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">{key}</div>
                                                <div className="text-sm font-mono font-bold text-white group-hover/card:text-cyan-300">
                                                    {value}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-auto">
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech.map((tech: string, i: number) => (
                                            <span key={i} className="text-[10px] text-slate-300 px-2 py-1 bg-white/5 rounded border border-white/5 font-mono">
                                            {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2 text-sm font-mono text-white group-hover/card:text-cyan-400 transition-colors">
                                        <span className="opacity-0 group-hover/card:opacity-100 transition-opacity">&gt;</span> 
                                        ACCESS_DETAILS
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectModal 
        isOpen={!!selectedProject} 
        onClose={handleCloseModal} 
        project={selectedProject} 
      />
    </section>
  );
}
