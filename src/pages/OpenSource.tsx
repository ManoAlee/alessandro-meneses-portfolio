import { useState, useEffect, useRef, MouseEvent } from "react";
import { Button } from "@/shared/ui/Button";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { FADE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS } from "@/shared/lib/motion";
import { Github, Lock, Globe, Code2, Terminal, Database, Search, Filter, Monitor } from "lucide-react";
import { OpenSourceVisual } from "@/widgets/OpenSourceVisual";
import { GITHUB_PROJECTS } from "@/entities/project/data/github-projects";

interface ProjectCardProps {
  project: typeof GITHUB_PROJECTS[0];
}

function ProjectCard({ project }: ProjectCardProps) {
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

    const rotateXValue = ((y - height / 2) / height) * -8; // Max -8 to 8 deg
    const rotateYValue = ((x - width / 2) / width) * 8;   // Max -8 to 8 deg

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
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d" 
      }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Dynamic Lighting Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* SKETCH HEADER */}
      <div className="relative h-48 w-full overflow-hidden bg-black/50 border-b border-white/10" style={{ transform: "translateZ(10px)" }}>
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
                      className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:scale-105 shadow-xl pointer-events-auto"
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
      <div className="flex flex-1 flex-col p-5 gap-3" style={{ transform: "translateZ(20px)" }}>
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
  );
}

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
    { text: "Bem-vindo ao Automotion CLI v1.0.0", type: "output" },
    { text: "Digite 'help' para ver os comandos disponíveis.", type: "output" }
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (viewMode === "cli" && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory, viewMode]);

  // Focus input
  const focusTerminalInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...terminalHistory, { text: `alessandro@automotion-srv:~$ ${terminalInput}`, type: "input" as const }];

    switch (cmd) {
      case "help":
        newHistory.push({
          text: (
            <div className="space-y-1 text-green-400">
              <p>Comandos disponíveis:</p>
              <p>  <span className="text-cyan-400 font-bold">about</span>     - Resumo profissional</p>
              <p>  <span className="text-cyan-400 font-bold">skills</span>    - Visualizar habilidades técnicas</p>
              <p>  <span className="text-cyan-400 font-bold">projects</span>  - Listar projetos e status</p>
              <p>  <span className="text-cyan-400 font-bold">status</span>    - Status do servidor (Proxmox/RTX 2060/LocalAGI)</p>
              <p>  <span className="text-cyan-400 font-bold">neofetch</span>  - Informações de perfil com arte ASCII</p>
              <p>  <span className="text-cyan-400 font-bold">clear</span>     - Limpar tela</p>
            </div>
          ),
          type: "output"
        });
        break;

      case "about":
        newHistory.push({
          text: (
            <div className="space-y-1 text-emerald-300">
              <p className="font-bold border-b border-white/10 pb-1">Alessandro Meneses</p>
              <p>Cargo: Analista de TI na Automotion</p>
              <p>Localização: Boituva - SP (Híbrido)</p>
              <p>Educação: Graduado em Gestão da TI pela Fatec Tatuí (2022 - 2025)</p>
              <p>Foco: Liderança técnica, sustentação de ambientes de missão crítica e automação.</p>
            </div>
          ),
          type: "output"
        });
        break;

      case "skills":
        newHistory.push({
          text: (
            <div className="space-y-1 text-purple-300">
              <p className="font-bold border-b border-white/10 pb-1">Habilidades Técnicas</p>
              <p>├─ <span className="text-white">Infraestrutura:</span> Proxmox, VMware, Hyper-V, Linux, Windows Server, Docker, Kubernetes</p>
              <p>├─ <span className="text-white">Automação/DevOps:</span> PowerShell, Python, Bash, Ansible, Terraform, CI/CD (GitHub Actions)</p>
              <p>└─ <span className="text-white">Ferramentas:</span> Restic, Rclone, Git, Active Directory, VPN/SSH</p>
            </div>
          ),
          type: "output"
        });
        break;

      case "projects":
        newHistory.push({
          text: (
            <div className="space-y-1 text-amber-300">
              <p className="font-bold border-b border-white/10 pb-1">Catálogo de Projetos</p>
              {GITHUB_PROJECTS.map(p => (
                <p key={p.id}>
                  ● <span className="text-white font-bold">{p.name}</span> [{p.status}] - {p.description}
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
              <p className="font-bold border-b border-white/10 pb-1">Status do Ambiente</p>
              <p>● Servidor Principal: <span className="text-green-400">srv-automotion-01 (10.0.0.7) - Online</span></p>
              <p>● Virtualizador: <span className="text-green-400">Proxmox VE (Clusters de Produção e VDI ativos)</span></p>
              <p>● GPU Runtime: <span className="text-green-400">NVIDIA RTX 2060 (Docker runtime active)</span></p>
              <p>● Backup System: <span className="text-green-400">Restic + Rclone (Jobs imutáveis diários ativos)</span></p>
              <p>● Orchestrator: <span className="text-green-400">LocalAGI (Porta 8090 - Online)</span></p>
            </div>
          ),
          type: "output"
        });
        break;

      case "neofetch":
        newHistory.push({
          text: (
            <pre className="font-mono text-xs leading-relaxed text-indigo-300">
{`   /\\_/\\      alessandro@automotion-srv
  ( o.o )     -------------------------
   > ^ <      OS: Boituva OS (Debian based)
              Kernel: 6.1.0-proxmox-pve
              Uptime: 3 anos de experiência
              Shell: zsh 5.9
              Cargo: Analista de TI
              CPU: Intel Xeon v4
              GPU: NVIDIA GeForce RTX 2060
              RAM: 16 GB DDR4`}
            </pre>
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
          text: `Comando não reconhecido: '${cmd}'. Digite 'help' para ver os comandos.`,
          type: "error"
        });
        break;
    }

    setTerminalHistory(newHistory);
    setTerminalInput("");
  };

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
                <motion.div variants={FADE_UP_VARIANTS} className="flex flex-wrap gap-4">
                    <Button size="lg" className="gap-2 shadow-lg shadow-primary/20" onClick={() => window.open("https://github.com/ManoAlee", "_blank")}>
                    <Github className="h-5 w-5" />
                    Ver Perfil no GitHub
                    </Button>
                    <Button 
                      variant="outline"
                      size="lg" 
                      className="gap-2 border-white/10 hover:bg-white/5" 
                      onClick={() => setViewMode(viewMode === "visual" ? "cli" : "visual")}
                    >
                    {viewMode === "visual" ? <Terminal className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
                    {viewMode === "visual" ? "Modo CLI (Terminal)" : "Modo Visual"}
                    </Button>
                </motion.div>
            </div>
            {/* Visual */}
            <motion.div variants={FADE_UP_VARIANTS} className="flex justify-center lg:justify-end">
                <OpenSourceVisual />
            </motion.div>
        </div>

        {/* View Mode Content */}
        <AnimatePresence mode="wait">
          {viewMode === "cli" ? (
            <motion.div
              key="cli-terminal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full rounded-xl border border-white/10 bg-[#0c0c0d] p-6 shadow-2xl font-mono text-sm overflow-hidden"
              onClick={focusTerminalInput}
            >
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 select-none">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-muted-foreground">alessandro@automotion-srv:~</span>
                <span className="w-12" />
              </div>

              {/* Terminal Output Stream */}
              <div className="h-96 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/10">
                {terminalHistory.map((line, idx) => (
                  <div 
                    key={idx} 
                    className={`${
                      line.type === "input" ? "text-white font-bold" :
                      line.type === "error" ? "text-red-400" : "text-muted-foreground"
                    }`}
                  >
                    {line.text}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Command Form */}
              <form onSubmit={handleCommand} className="flex items-center gap-2 border-t border-white/5 pt-3 mt-4">
                <span className="text-green-400 font-bold select-none">alessandro@automotion-srv:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none border-none text-white font-bold caret-primary focus:ring-0"
                  autoFocus
                  placeholder="Digite um comando..."
                />
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="visual-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Search & Filter Controls */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/20 backdrop-blur-sm border p-4 rounded-xl border-white/5">
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
              </div>

              {/* PROJETOS GRID - GRAPHIC INTERFACE */}
              <div className="space-y-8">
                  <h2 className="text-2xl font-bold font-display border-l-4 border-primary pl-4 flex items-center gap-3">
                      <Terminal className="w-6 h-6 text-primary" />
                      Catálogo de Projetos
                  </h2>

                  <motion.div 
                    layout
                    variants={STAGGER_CONTAINER_VARIANTS}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-[300px]"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredProjects.map((project) => (
                          <ProjectCard key={project.id} project={project} />
                      ))}
                    </AnimatePresence>

                    {filteredProjects.length === 0 && (
                      <div className="col-span-full flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                        <Code2 className="w-12 h-12 mb-4 opacity-50" />
                        <p className="text-lg font-semibold">Nenhum projeto encontrado</p>
                        <p className="text-sm opacity-60">Tente buscar por outro termo ou limpar os filtros.</p>
                      </div>
                    )}
                  </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
