import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, FileText, Terminal, CheckCircle2, Sparkles, Code2, Database, Shield } from "lucide-react";

export function HeroSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"profile" | "automation" | "stack">("profile");

  return (
    <section className="container py-12 md:py-24 relative">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline & Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Alessandro Meneses • Boituva, SP</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-foreground leading-[1.1]">
            Desenvolvedor de Software <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-600">
              & Analista de TI.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
            Graduado em Gestão da TI pela FATEC. Atuo na <strong className="text-foreground font-semibold">Automotion</strong> desenvolvendo aplicações web com TypeScript e React, criando automações inteligentes em Python e PowerShell e otimizando processos corporativos.
          </p>

          {/* Action CTAs with Button-in-Button Pattern */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button 
              size="lg" 
              onClick={() => navigate("/opensource")}
              className="group gap-3 rounded-full pl-6 pr-2 py-2 shadow-md shadow-primary/20 hover:shadow-lg transition-all"
            >
              <span>Explorar Projetos</span>
              <span className="w-8 h-8 rounded-full bg-primary-foreground/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                <ArrowUpRight className="w-4 h-4 text-primary-foreground" />
              </span>
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate("/resume")}
              className="gap-2 rounded-full px-6 border-border hover:bg-secondary/60 transition-all"
            >
              <FileText className="w-4 h-4" /> Ver Currículo
            </Button>

            <Button 
              variant="ghost" 
              size="lg" 
              onClick={() => navigate("/contact")}
              className="rounded-full px-5 text-muted-foreground hover:text-foreground"
            >
              Fale Comigo
            </Button>
          </div>

          {/* Quick Highlights */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-border/40 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Fullstack TypeScript & React</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Automações Python & PowerShell</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
              <span>Graduado FATEC Tatuí</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive Doppelrand Code & System Inspector */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          {/* Doppelrand (Double-Bezel Hardware aesthetic) */}
          <div className="rounded-[1.75rem] p-1.5 bg-gradient-to-b from-white/20 via-white/5 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent ring-1 ring-black/10 dark:ring-white/10 shadow-2xl shadow-primary/5">
            <div className="rounded-[calc(1.75rem-0.375rem)] bg-card/95 backdrop-blur-xl border border-border/60 overflow-hidden shadow-inner flex flex-col">
              {/* Window Bar & Tabs */}
              <div className="px-4 py-2.5 border-b border-border/40 bg-muted/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>

                {/* Interactive File Tabs */}
                <div className="flex items-center gap-1 bg-background/60 p-0.5 rounded-lg border border-border/40 text-[11px] font-mono">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      activeTab === "profile"
                        ? "bg-card text-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    perfil.ts
                  </button>
                  <button
                    onClick={() => setActiveTab("automation")}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      activeTab === "automation"
                        ? "bg-card text-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    automacao.py
                  </button>
                  <button
                    onClick={() => setActiveTab("stack")}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      activeTab === "stack"
                        ? "bg-card text-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    stack.json
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <Sparkles className="w-3 h-3" /> Online
                </div>
              </div>

              {/* Code Snippet Content with Tab Animation */}
              <div className="p-5 font-mono text-xs bg-card min-h-[220px]">
                <AnimatePresence mode="wait">
                  {activeTab === "profile" && (
                    <motion.div
                      key="profile-tab"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-1 text-foreground/90 leading-relaxed"
                    >
                      <p className="text-muted-foreground pb-2 border-b border-border/30 flex justify-between">
                        <span>// Perfil Profissional</span>
                        <span className="text-primary text-[10px]">Automotion • TI</span>
                      </p>
                      <p><span className="text-purple-400">const</span> <span className="text-blue-400">profissional</span> = &#123;</p>
                      <p className="pl-4"><span className="text-primary">nome</span>: <span className="text-emerald-400">"Alessandro Meneses"</span>,</p>
                      <p className="pl-4"><span className="text-primary">cargo</span>: <span className="text-emerald-400">"Analista de TI na Automotion"</span>,</p>
                      <p className="pl-4"><span className="text-primary">formacao</span>: <span className="text-emerald-400">"Gestão da TI (FATEC Tatuí)"</span>,</p>
                      <p className="pl-4"><span className="text-primary">localizacao</span>: <span className="text-emerald-400">"Boituva, SP"</span>,</p>
                      <p className="pl-4"><span className="text-primary">repositorios</span>: <span className="text-amber-400">14</span>,</p>
                      <p className="pl-4"><span className="text-primary">foco</span>: <span className="text-emerald-400">"Aplicações web & automações eficientes"</span></p>
                      <p>&#125;;</p>
                    </motion.div>
                  )}

                  {activeTab === "automation" && (
                    <motion.div
                      key="automation-tab"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-1 text-foreground/90 leading-relaxed"
                    >
                      <p className="text-muted-foreground pb-2 border-b border-border/30 flex justify-between">
                        <span># Pipeline de Automação & Scripting</span>
                        <span className="text-emerald-400 text-[10px]">Python 3.12</span>
                      </p>
                      <p><span className="text-purple-400">def</span> <span className="text-blue-400">executar_rotina_corporativa</span>():</p>
                      <p className="pl-4 text-muted-foreground"># Integração de usuários e auditoria de sistemas</p>
                      <p className="pl-4">rotina = <span className="text-amber-400">PipelineCorporativo</span>(empresa=<span className="text-emerald-400">"Automotion"</span>)</p>
                      <p className="pl-4">rotina.<span className="text-blue-300">sincronizar_diretorio_ativo</span>()</p>
                      <p className="pl-4">rotina.<span className="text-blue-300">gerar_relatorios_analiticos</span>()</p>
                      <p className="pl-4"><span className="text-purple-400">return</span> &#123;<span className="text-primary">"status"</span>: <span className="text-emerald-400">"100% automatizado"</span>&#125;</p>
                    </motion.div>
                  )}

                  {activeTab === "stack" && (
                    <motion.div
                      key="stack-tab"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-1 text-foreground/90 leading-relaxed"
                    >
                      <p className="text-muted-foreground pb-2 border-b border-border/30 flex justify-between">
                        <span>// Tecnologias em Produção</span>
                        <span className="text-amber-400 text-[10px]">Stack 2026</span>
                      </p>
                      <p>&#123;</p>
                      <p className="pl-4"><span className="text-primary">"frontend"</span>: [<span className="text-emerald-400">"React"</span>, <span className="text-emerald-400">"TypeScript"</span>, <span className="text-emerald-400">"TailwindCSS"</span>],</p>
                      <p className="pl-4"><span className="text-primary">"automacao"</span>: [<span className="text-emerald-400">"Python"</span>, <span className="text-emerald-400">"PowerShell"</span>, <span className="text-emerald-400">"Bash"</span>],</p>
                      <p className="pl-4"><span className="text-primary">"sistemas"</span>: [<span className="text-emerald-400">"Windows Server"</span>, <span className="text-emerald-400">"Linux"</span>, <span className="text-emerald-400">"Active Directory"</span>],</p>
                      <p className="pl-4"><span className="text-primary">"dados"</span>: [<span className="text-emerald-400">"Power BI"</span>, <span className="text-emerald-400">"SQL"</span>, <span className="text-emerald-400">"REST APIs"</span>]</p>
                      <p>&#125;</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Status Footer */}
              <div className="px-5 py-3 border-t border-border/40 bg-muted/30 flex items-center justify-between text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-primary" />
                  <span>Ambiente operacional ativo</span>
                </div>
                <span className="text-emerald-500 font-semibold">Boituva - SP</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
