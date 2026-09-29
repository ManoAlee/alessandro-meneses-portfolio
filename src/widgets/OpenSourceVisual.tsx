import { motion } from "framer-motion";
import { FolderGit2, Terminal, Code2, Globe, Cpu, CheckCircle2 } from "lucide-react";
import { GITHUB_PROJECTS } from "@/entities/project/data/github-projects";

export function OpenSourceVisual() {
  const totalRepos = GITHUB_PROJECTS.length;
  const automationCount = GITHUB_PROJECTS.filter((p) => p.type === "Automation").length;
  const webCount = GITHUB_PROJECTS.filter((p) => p.type === "Web").length;
  const dataCount = GITHUB_PROJECTS.filter((p) => p.type === "Data").length;

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none lg:mx-0 hidden lg:block">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Main Glassmorphic Overview Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30, rotateX: 4 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
        style={{ perspective: "1000px" }}
      >
        <div className="rounded-[1.75rem] p-1.5 bg-gradient-to-b from-white/15 to-transparent ring-1 ring-border/60 shadow-2xl">
          <div className="rounded-[calc(1.75rem-0.375rem)] border border-border/40 bg-card/90 backdrop-blur-xl shadow-inner overflow-hidden">
            
            {/* Header with User GitHub Profile */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/40 bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-primary/30 p-0.5 bg-background overflow-hidden flex items-center justify-center">
                  <img 
                    src="/images/tactical-avatar.png" 
                    alt="Alessandro Meneses" 
                    className="w-full h-full object-contain"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-foreground">
                    <span>ManoAlee</span>
                    <span className="text-primary text-xs">/ github</span>
                  </div>
                  <div className="text-[11px] font-mono text-muted-foreground">
                    Alessandro Meneses • Boituva - SP
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2.5 py-1 rounded-full font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Perfil Ativo</span>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-background/50 border border-border/40 text-center">
                  <div className="text-2xl font-black font-mono text-foreground">{totalRepos}</div>
                  <div className="text-[11px] font-medium text-muted-foreground mt-0.5">Repositórios</div>
                </div>
                <div className="p-3.5 rounded-xl bg-background/50 border border-border/40 text-center">
                  <div className="text-2xl font-black font-mono text-primary">{automationCount}</div>
                  <div className="text-[11px] font-medium text-muted-foreground mt-0.5">Automação/MCP</div>
                </div>
                <div className="p-3.5 rounded-xl bg-background/50 border border-border/40 text-center">
                  <div className="text-2xl font-black font-mono text-blue-500">{webCount}</div>
                  <div className="text-[11px] font-medium text-muted-foreground mt-0.5">Web & SRE</div>
                </div>
              </div>

              {/* Ecosystem Highlights */}
              <div className="space-y-2.5 pt-1">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-primary" />
                  <span>Ecossistema Tecnológico Real</span>
                </div>

                <div className="p-3.5 rounded-xl bg-secondary/30 border border-border/40 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Model Context Protocol (MCP)</span>
                    <span className="text-emerald-500 font-semibold">Python / SSH / M365</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">SRE & Observabilidade</span>
                    <span className="text-blue-400 font-semibold">TypeScript / React / Telemetria</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Automação de Sistemas</span>
                    <span className="text-purple-400 font-semibold">PowerShell / SNMP / GPO</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Status Bar */}
            <div className="px-5 py-3 border-t border-border/40 bg-muted/20 flex items-center justify-between text-xs font-mono">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5 text-primary" />
                <span>100% Open Source</span>
              </span>
              <span className="text-emerald-500 font-medium">
                ● Pronto para Colaboração
              </span>
            </div>

          </div>
        </div>

        {/* Floating Accent Badges */}
        <motion.div 
          className="absolute -right-4 -bottom-4 p-3 bg-card/95 backdrop-blur-md border border-border/60 rounded-xl shadow-xl z-20 flex items-center gap-2.5"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-muted-foreground uppercase">Projetos Reais</div>
            <div className="font-bold text-xs text-foreground">16 Repositórios</div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute -left-4 -top-3 p-3 bg-card/95 backdrop-blur-md border border-border/60 rounded-xl shadow-xl z-20 flex items-center gap-2.5"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-muted-foreground uppercase">Terminal CLI</div>
            <div className="font-bold text-xs text-emerald-500">Interativo v2.0</div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
