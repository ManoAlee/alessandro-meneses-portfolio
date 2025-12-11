import { useState } from "react";
import { userData } from "../data/user";
import { FolderGit2, ArrowUpRight } from "lucide-react";
import ProjectModal from "./ProjectModal";
import SpotlightCard from "./SpotlightCard";
import Reveal from "./Reveal";

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
    <section id="projects" className="py-32 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Reveal width="100%">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Projetos & Automações</h2>
          </Reveal>
          <Reveal width="100%">
             <p className="text-slate-400 text-lg">Soluções desenvolvidas para otimizar infraestrutura e segurança.</p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {userData.projects.map((project: any, index) => (
            <Reveal key={index} width="100%">
                <div onClick={() => handleOpenModal(project)} className="cursor-pointer h-full group/card perspective-1000">
                    <SpotlightCard className="h-full hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-500 group-hover/card:scale-[1.02] group-hover/card:-translate-y-2">
                        {/* Decorative Header Line */}
                        <div className="h-1 w-full bg-gradient-to-r from-primary to-purple-500 opacity-50 group-hover/card:opacity-100 transition-opacity" />
                        
                        <div className="p-8 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-white/5 rounded-lg text-primary group-hover/card:bg-primary group-hover/card:text-black transition-colors duration-300">
                                    <FolderGit2 size={24} />
                                </div>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 text-xs font-medium text-purple-300 bg-purple-500/10 rounded-full border border-purple-500/20 group-hover/card:border-purple-500/50 transition-colors">
                                    {project.type}
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3 group-hover/card:text-primary transition-colors">
                            {project.title}
                            </h3>
                            
                            <p className="text-slate-400 mb-6 leading-relaxed line-clamp-3 group-hover/card:text-slate-300 transition-colors">
                            {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                            {project.tech.map((tech, i) => (
                                <span key={i} className="text-xs text-slate-300 px-2 py-1 bg-white/5 rounded border border-white/5">
                                {tech}
                                </span>
                            ))}
                            </div>

                            <div className="flex items-center gap-4 pt-6 border-t border-white/5 group-hover/card:border-white/20 transition-colors">
                                <span className="flex items-center gap-2 text-sm font-semibold text-white group-hover/card:text-primary transition-colors">
                                    Ver Detalhes
                                </span>
                                {project.github && (
                                    <div className="ml-auto p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                                    <ArrowUpRight size={18} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </SpotlightCard>
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
