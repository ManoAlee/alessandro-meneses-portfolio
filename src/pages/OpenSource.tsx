import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { FADE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS } from "@/shared/lib/motion";
import { Github, Lock, Globe, Code2, Terminal, Database, Search, Filter } from "lucide-react";
import { OpenSourceVisual } from "@/widgets/OpenSourceVisual";
import { GITHUB_PROJECTS } from "@/entities/project/data/github-projects";

export default function OpenSourcePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"All" | "Web" | "Data" | "Automation">("All");

  const filteredProjects = GITHUB_PROJECTS.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.language.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || project.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container py-12 md:py-20 min-h-[85vh]">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={STAGGER_CONTAINER_VARIANTS}
        className="space-y-12"
      >
        {/* Header Grid Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <motion.h1 variants={FADE_UP_VARIANTS} className="text-4xl font-bold font-display leading-tight md:text-5xl">
                  Projetos & <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Contribuições</span>
                </motion.h1>
                <motion.p variants={FADE_UP_VARIANTS} className="text-lg text-muted-foreground leading-relaxed">
                  Uma galeria técnica dos meus trabalhos recentes. De frameworks agênticos a orquestradores de backup e plataformas web.
                </motion.p>
                <motion.div variants={FADE_UP_VARIANTS}>
                    <Button size="lg" className="gap-2 shadow-lg shadow-primary/20" onClick={() => window.open("https://github.com/ManoAlee", "_blank")}>
                    <Github className="h-5 w-5" />
                    Ver Perfil no GitHub
                    </Button>
                </motion.div>
            </div>
            {/* Visual */}
            <motion.div variants={FADE_UP_VARIANTS} className="flex justify-center lg:justify-end">
                <OpenSourceVisual />
            </motion.div>
        </div>

        {/* Search & Filter Controls */}
        <motion.div 
          variants={FADE_UP_VARIANTS} 
          className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/20 backdrop-blur-sm border p-4 rounded-xl border-white/5"
        >
          {/* Search input */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar projetos ou tecnologias..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border bg-background/50 border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {(["All", "Automation", "Web", "Data"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  activeFilter === filter
                    ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-background/40 hover:bg-card/60 text-muted-foreground border-transparent hover:border-white/10"
                }`}
              >
                {filter === "All" ? "Todos" :
                 filter === "Automation" ? "Automação" :
                 filter === "Web" ? "Web / Frontend" : "Dados / Analytics"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* PROJETOS GRID - GRAPHIC INTERFACE */}
        <div className="space-y-8">
            <motion.h2 variants={FADE_UP_VARIANTS} className="text-2xl font-bold font-display border-l-4 border-primary pl-4 flex items-center gap-3">
                <Terminal className="w-6 h-6 text-primary" />
                Catálogo de Projetos
            </motion.h2>

            <motion.div 
              layout
              variants={STAGGER_CONTAINER_VARIANTS}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-[300px]"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                    <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        key={project.id}
                        className="group relative flex flex-col overflow-hidden rounded-xl border bg-card/40 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1"
                    >
                        {/* SKETCH HEADER */}
                        <div className="relative h-48 w-full overflow-hidden bg-black/50 border-b border-white/10">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                            <img 
                                src={project.imageUrl} 
                                alt={project.name} 
                                className="h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />
                            {/* Project Type Icon Overlay */}
                            <div className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/50 backdrop-blur border border-white/10 text-white/80">
                                {project.type === 'Web' && <Globe className="w-4 h-4" />}
                                {project.type === 'Data' && <Database className="w-4 h-4" />}
                                {project.type === 'Automation' && <Terminal className="w-4 h-4" />}
                            </div>

                            {/* Status Badge & Link Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none group-hover:pointer-events-auto bg-black/40 backdrop-blur-[2px]">
                                {project.status === 'Public' && project.repoUrl && (
                                    <a 
                                        href={project.repoUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:scale-105 shadow-xl"
                                    >
                                        <Github className="w-4 h-4" /> Ver Código
                                    </a>
                                )}
                            </div>

                            <div className="absolute top-3 left-3 z-20">
                                {project.status === 'Private' ? (
                                    <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-red-500/20 border border-red-500/30 text-[10px] font-bold text-red-400 uppercase tracking-wider backdrop-blur-md">
                                        <Lock className="w-3 h-3" /> Private
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/20 border border-green-500/30 text-[10px] font-bold text-green-400 uppercase tracking-wider backdrop-blur-md">
                                        <Globe className="w-3 h-3" /> Public
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* CONTENT BODY */}
                        <div className="flex flex-1 flex-col p-5 gap-3">
                            <div>
                                <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors line-clamp-1" title={project.name}>
                                    {project.name}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 min-h-[2.5em]">
                                    {project.description}
                                </p>
                            </div>

                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${
                                        project.language === 'TypeScript' ? 'bg-blue-500' :
                                        project.language === 'Python' ? 'bg-yellow-500' :
                                        project.language === 'JavaScript' ? 'bg-yellow-300' :
                                        'bg-orange-500'
                                    }`} />
                                    <span className="text-xs font-medium text-muted-foreground">{project.language}</span>
                                </div>
                                <span className="text-[10px] text-muted-foreground/60">
                                    {project.lastUpdated}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
              </AnimatePresence>

              {filteredProjects.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full flex flex-col items-center justify-center py-12 text-center text-muted-foreground"
                >
                  <Code2 className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-lg font-semibold">Nenhum projeto encontrado</p>
                  <p className="text-sm opacity-60">Tente buscar por outro termo ou limpar os filtros.</p>
                </motion.div>
              )}
            </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
