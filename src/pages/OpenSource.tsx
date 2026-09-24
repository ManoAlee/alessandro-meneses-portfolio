import { useState, useEffect, useRef, MouseEvent, forwardRef } from "react";
import { Button } from "@/shared/ui/Button";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { FADE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS } from "@/shared/lib/motion";
import { Github, Lock, Globe, Code2, Terminal, Search, Monitor, ArrowUpRight, FolderGit2 } from "lucide-react";
import { OpenSourceVisual } from "@/widgets/OpenSourceVisual";
import { GITHUB_PROJECTS } from "@/entities/project/data/github-projects";

interface ProjectCardProps {
  project: typeof GITHUB_PROJECTS[0];
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(({ project }, ref) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    
    mouseX.set(x);
    mouseY.set(y);

    const rotateXValue = ((y - height / 2) / height) * -6;
    const rotateYValue = ((x - width / 2) / width) * 6;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div 
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d" 
      }}
      className="group rounded-[1.5rem] p-1.5 bg-gradient-to-b from-white/10 to-transparent ring-1 ring-border/60 hover:ring-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 flex flex-col justify-between"
    >
      <div className="rounded-[calc(1.5rem-0.375rem)] bg-card/85 backdrop-blur-md p-6 h-full flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Header Status & Type */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase font-semibold text-muted-foreground px-2.5 py-0.5 rounded-full bg-secondary/80">
              {project.type}
            </span>
            {project.status === 'Private' ? (
              <span className="flex items-center gap-1 text-[10px] font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                <Lock className="w-3 h-3" /> Privado
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <Globe className="w-3 h-3" /> Público
              </span>
            )}
          </div>

          {/* Title & Description */}
          <div>
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-primary shrink-0" />
              <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {project.name}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* Footer Info & Actions */}
        <div className="pt-4 border-t border-border/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${
              project.language === 'TypeScript' ? 'bg-blue-500' :
              project.language === 'Python' ? 'bg-emerald-500' :
              project.language === 'JavaScript' ? 'bg-yellow-400' :
              project.language === 'HTML' ? 'bg-orange-500' :
              'bg-purple-500'
            }`} />
            <span className="font-medium text-foreground text-xs">{project.language}</span>
          </div>

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              aria-label={`Ver repositório ${project.name} no GitHub`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">
                <ArrowUpRight className="w-3 h-3 text-primary" />
              </span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

interface TerminalLine {
  text: string | React.ReactNode;
  type: "input" | "output" | "error";
}

export default function OpenSourcePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"All" | "Web" | "Data" | "Automation">("All");
  const [viewMode, setViewMode] = useState<"visual" | "cli">("visual");

  // Terminal State
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { text: "Alessandro Meneses CLI v2.0", type: "output" },
    { text: "Digite ou clique em um comando para executar:", type: "output" }
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (viewMode === "cli" && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory, viewMode]);

  const focusTerminalInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...terminalHistory, { text: `alessandro@automotion:~$ ${cmd}`, type: "input" as const }];

    switch (cmd) {
      case "help":
        newHistory.push({
          text: (
            <div className="space-y-1 text-emerald-400">
              <p>Comandos disponíveis no terminal:</p>
              <p>  <span className="text-cyan-400 font-bold">about</span>     - Perfil e atuação na Automotion</p>
              <p>  <span className="text-cyan-400 font-bold">skills</span>    - Habilidades técnicas e linguagens</p>
              <p>  <span className="text-cyan-400 font-bold">projects</span>  - Catálogo de repositórios GitHub</p>
              <p>  <span className="text-cyan-400 font-bold">status</span>    - Disponibilidade e ambiente ativo</p>
              <p>  <span className="text-cyan-400 font-bold">clear</span>     - Limpar o terminal</p>
            </div>
          ),
          type: "output"
        });
        break;

      case "about":
        newHistory.push({
          text: (
            <div className="space-y-1 text-foreground">
              <p className="font-bold border-b border-border/40 pb-1 text-primary">Alessandro Meneses</p>
              <p>● Cargo: Analista de TI na Automotion</p>
              <p>● Formação: Graduado em Gestão da TI pela FATEC Tatuí (2022 - 2025)</p>
              <p>● Foco: Desenvolvimento web moderno com TypeScript/React e automações em Python/PowerShell.</p>
            </div>
          ),
          type: "output"
        });
        break;

      case "skills":
        newHistory.push({
          text: (
            <div className="space-y-1 text-purple-300">
              <p className="font-bold border-b border-border/40 pb-1">Habilidades Técnicas</p>
              <p>├─ <span className="text-foreground">Desenvolvimento:</span> TypeScript, React, Python, Node.js, TailwindCSS, REST APIs</p>
              <p>├─ <span className="text-foreground">Automação:</span> Python Scripts, PowerShell, Bash, Git, GitHub Actions</p>
              <p>└─ <span className="text-foreground">Sistemas:</span> Linux, Windows Server, Active Directory, Redes TCP/IP, HelpDesk N2/N3</p>
            </div>
          ),
          type: "output"
        });
        break;

      case "projects":
        newHistory.push({
          text: (
            <div className="space-y-1 text-amber-300">
              <p className="font-bold border-b border-border/40 pb-1">Principais Repositórios</p>
              {GITHUB_PROJECTS.map((p) => (
                <p key={p.id}>
                  ● <span className="text-foreground font-bold">{p.name}</span> [{p.language}] - {p.description}
                </p>
              ))}
            </div>
          ),
          type: "output"
        });
        break;

      case "status":
        newHistory.push({
          text: (
            <div className="space-y-1 text-cyan-300">
              <p className="font-bold border-b border-border/40 pb-1">Status Operacional</p>
              <p>● Empresa: <span className="text-emerald-400">Automotion</span></p>
              <p>● Localização: <span className="text-emerald-400">Boituva - SP, Brasil</span></p>
              <p>● Status: <span className="text-emerald-400">Disponível para novos projetos e demandas técnicas</span></p>
            </div>
          ),
          type: "output"
        });
        break;

      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;

      default:
        newHistory.push({
          text: `Comando desconhecido: '${cmd}'. Digite 'help' para ver os comandos válidos.`,
          type: "error"
        });
        break;
    }

    setTerminalHistory(newHistory);
    setTerminalInput("");
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(terminalInput);
  };

  const filteredProjects = GITHUB_PROJECTS.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.language.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || project.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container py-12 md:py-20 min-h-[85vh] animate-fade-in space-y-12">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={STAGGER_CONTAINER_VARIANTS}
        className="space-y-12"
      >
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-left">
            <motion.div variants={FADE_UP_VARIANTS} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Portfólio de Código</span>
            </motion.div>

            <motion.h1 variants={FADE_UP_VARIANTS} className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-foreground leading-[1.1]">
              Projetos & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-600">Repositórios</span>
            </motion.h1>

            <motion.p variants={FADE_UP_VARIANTS} className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Catálogo de ferramentas, frameworks agênticos, dashboards analíticos e soluções corporativas desenvolvidas com TypeScript, Python e React.
            </motion.p>

            <motion.div variants={FADE_UP_VARIANTS} className="flex flex-wrap gap-3">
              <Button 
                size="lg" 
                className="gap-2 rounded-full px-6 shadow-md shadow-primary/20" 
                onClick={() => window.open("https://github.com/ManoAlee", "_blank")}
              >
                <Github className="h-4 w-4" />
                Abrir GitHub (ManoAlee)
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2 rounded-full px-6 border-border" 
                onClick={() => setViewMode(viewMode === "visual" ? "cli" : "visual")}
              >
                {viewMode === "visual" ? <Terminal className="h-4 w-4 text-emerald-500" /> : <Monitor className="h-4 w-4 text-blue-500" />}
                {viewMode === "visual" ? "Modo Terminal CLI" : "Modo Visual Gráfico"}
              </Button>
            </motion.div>
          </div>

          <motion.div variants={FADE_UP_VARIANTS} className="flex justify-center lg:justify-end">
            <OpenSourceVisual />
          </motion.div>
        </div>

        {/* View Mode Content */}
        <AnimatePresence mode="wait">
          {viewMode === "cli" ? (
            <motion.div
              key="cli-terminal"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="w-full rounded-[1.75rem] p-1.5 bg-gradient-to-b from-white/15 to-transparent ring-1 ring-border/80 shadow-2xl"
              onClick={focusTerminalInput}
            >
              <div className="rounded-[calc(1.75rem-0.375rem)] bg-[#09090b] p-6 shadow-inner font-mono text-sm overflow-hidden space-y-4">
                <div className="flex items-center justify-between border-b border-border/40 pb-3 select-none">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">alessandro@automotion:~</span>
                  <div className="flex gap-1.5">
                    {(["help", "about", "skills", "projects", "status", "clear"] as const).map((c) => (
                      <button
                        key={c}
                        onClick={(e) => {
                          e.stopPropagation();
                          executeCommand(c);
                        }}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors text-muted-foreground"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-80 overflow-y-auto space-y-2 pr-2 no-scrollbar">
                  {terminalHistory.map((line, idx) => (
                    <div 
                      key={idx} 
                      className={`${
                        line.type === "input" ? "text-primary font-bold" :
                        line.type === "error" ? "text-red-400" : "text-muted-foreground"
                      }`}
                    >
                      {line.text}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                <form onSubmit={handleCommand} className="flex items-center gap-2 border-t border-border/40 pt-3">
                  <span className="text-emerald-400 font-bold select-none text-xs sm:text-sm">alessandro@automotion:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none border-none text-foreground font-medium caret-primary focus:ring-0 text-xs sm:text-sm"
                    autoFocus
                    placeholder="digite help, about, skills, projects..."
                  />
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="visual-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Search & Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card/60 backdrop-blur-md border border-border/60 p-4 rounded-2xl">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar projetos..."
                    className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border bg-background/50 border-border/60 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  {(["All", "Automation", "Web", "Data"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        activeFilter === filter
                          ? "bg-primary border-primary text-primary-foreground shadow-xs"
                          : "bg-secondary/40 hover:bg-secondary text-muted-foreground border-transparent"
                      }`}
                    >
                      {filter === "All" ? "Todos" :
                       filter === "Automation" ? "Automação" :
                       filter === "Web" ? "Web & Frontend" : "Dados & Analytics"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Projects Grid */}
              <motion.div 
                layout
                variants={STAGGER_CONTAINER_VARIANTS}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </AnimatePresence>

                {filteredProjects.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                    <Code2 className="w-10 h-10 mb-3 opacity-40" />
                    <p className="text-base font-semibold text-foreground">Nenhum projeto encontrado</p>
                    <p className="text-xs text-muted-foreground">Tente buscar por outro termo ou limpar os filtros.</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
