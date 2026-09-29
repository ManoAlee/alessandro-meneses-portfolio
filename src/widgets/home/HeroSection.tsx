import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, FileText, Terminal, CheckCircle2, Sparkles, Gamepad2 } from "lucide-react";
import { MetalSlugGameModal } from "@/widgets/game/MetalSlugGameModal";

export function HeroSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"avatar" | "profile" | "automation" | "stack">("avatar");
  const [isGameOpen, setIsGameOpen] = useState(false);

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
          {/* Eyebrow Badge & Arcade Easter Egg */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>Alessandro Meneses • Boituva, SP</span>
            </div>

            <button
              onClick={() => setIsGameOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 hover:scale-105 transition-all cursor-pointer shadow-xs group"
              title="Jogar Mini-Game Arcade: IT Defender"
            >
              <Gamepad2 className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform text-amber-500" />
              <span className="font-bold">Arcade 2D</span>
              <span className="text-[10px] px-1 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-300 font-bold">JOGAR</span>
            </button>
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Button 
              size="lg" 
              onClick={() => navigate("/opensource")}
              className="group gap-3 rounded-full pl-6 pr-2 py-2 shadow-md shadow-primary/20 hover:shadow-lg transition-all w-full sm:w-auto justify-between sm:justify-center"
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
              className="gap-2 rounded-full px-6 border-border hover:bg-secondary/60 transition-all w-full sm:w-auto justify-center"
            >
              <FileText className="w-4 h-4" /> Ver Currículo
            </Button>

            <Button 
              variant="ghost" 
              size="lg" 
              onClick={() => navigate("/contact")}
              className="rounded-full px-5 text-muted-foreground hover:text-foreground w-full sm:w-auto justify-center"
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
              <div className="px-3 sm:px-4 py-2.5 border-b border-border/40 bg-muted/40 flex items-center justify-between gap-2 overflow-hidden">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>

                {/* Interactive File Tabs */}
                <div className="flex items-center gap-1 bg-background/60 p-0.5 rounded-lg border border-border/40 text-[11px] font-mono overflow-x-auto no-scrollbar max-w-[210px] sm:max-w-none">
                  <button
                    onClick={() => setActiveTab("avatar")}
                    className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === "avatar"
                        ? "bg-amber-500/20 text-amber-500 dark:text-amber-400 font-bold shadow-xs border border-amber-500/30"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Gamepad2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>avatar.slug</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap ${
                      activeTab === "profile"
                        ? "bg-card text-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    perfil.ts
                  </button>
                  <button
                    onClick={() => setActiveTab("automation")}
                    className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap ${
                      activeTab === "automation"
                        ? "bg-card text-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    automacao.py
                  </button>
                  <button
                    onClick={() => setActiveTab("stack")}
                    className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap ${
                      activeTab === "stack"
                        ? "bg-card text-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    stack.json
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
                  <Sparkles className="w-3 h-3" /> Online
                </div>
              </div>

              {/* Code Snippet / Avatar Content with Tab Animation */}
              <div className={`font-mono text-xs bg-card ${activeTab === "avatar" ? "p-4" : "p-5"} min-h-[300px] flex flex-col justify-center`}>
                <AnimatePresence mode="wait">
                  {activeTab === "avatar" && (
                    <motion.div
                      key="avatar-tab"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.22 }}
                      className="flex flex-col items-center justify-center text-center space-y-3 relative py-2"
                    >
                      {/* Big Persona Avatar Presentation */}
                      <div 
                        onClick={() => setIsGameOpen(true)}
                        className="relative group cursor-pointer"
                        title="Clique no Avatar para jogar o Mini-Game Arcade: IT Defender!"
                      >
                        {/* Glow halo */}
                        <div className="absolute inset-0 rounded-full bg-amber-500/15 blur-2xl group-hover:bg-amber-500/30 transition-all scale-110" />

                        {/* Large Crisp Sprite (Metal Slug Authentic) */}
                        <div className="relative w-48 sm:w-56 h-52 sm:h-60 flex items-center justify-center">
                          <img
                            src="/images/tactical-avatar.png"
                            alt="Alessandro Meneses - Tactical Operative"
                            style={{ imageRendering: "pixelated" }}
                            className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300 select-none animate-pulse-subtle"
                          />

                          {/* Hover Play Overlay Badge */}
                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-3xl backdrop-blur-[2px]">
                            <span className="px-4 py-2 rounded-full bg-amber-500 text-black font-extrabold text-xs tracking-wider shadow-xl flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                              <Gamepad2 className="w-4 h-4 fill-black" /> JOGAR ARCADE
                            </span>
                          </div>
                        </div>

                        {/* Holographic Platform Base */}
                        <div className="w-40 sm:w-48 h-4 mx-auto rounded-[100%] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent blur-[3px] -mt-2" />
                      </div>

                      {/* Identity & Status */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-bold text-foreground text-sm font-mono tracking-tight">ALESSANDRO MENESES</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">OPERADOR TI</span>
                        </div>
                        <p className="text-xs text-muted-foreground font-mono">DevOps & Automação Corporativa • Boituva - SP</p>
                      </div>

                      {/* Interactive Button */}
                      <button
                        onClick={() => setIsGameOpen(true)}
                        className="w-full max-w-xs py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-primary/20 to-amber-500/20 hover:from-amber-500/30 hover:to-amber-500/30 border border-amber-500/40 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold shadow-md hover:shadow-amber-500/10 transition-all flex items-center justify-center gap-2 group"
                      >
                        <Gamepad2 className="w-4 h-4 group-hover:rotate-12 transition-transform text-amber-500" />
                        <span>INICIAR SIMULAÇÃO ARCADE</span>
                      </button>
                    </motion.div>
                  )}
                  {activeTab === "profile" && (
                    <motion.div
                      key="profile-tab"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3 text-foreground/90 leading-relaxed"
                    >
                      {/* Avatar Profile Header with Game Launcher */}
                      <div className="flex items-center gap-3.5 pb-3 border-b border-border/30">
                        <div 
                          onClick={() => setIsGameOpen(true)}
                          className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 via-blue-500/10 to-indigo-500/15 border border-primary/25 p-1 flex items-center justify-center overflow-hidden shrink-0 group cursor-pointer shadow-xs hover:border-primary transition-all"
                          title="Clique para jogar o Mini-Game Arcade: IT Defender!"
                        >
                          <img 
                            src="/images/tactical-avatar.png" 
                            alt="Alessandro Meneses Pixel Avatar" 
                            className="w-full h-full object-contain filter drop-shadow select-none group-hover:scale-110 transition-transform" 
                            style={{ imageRendering: "pixelated" }}
                          />
                          <div className="absolute inset-0 bg-primary/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                            <Gamepad2 className="w-4 h-4 text-white animate-bounce" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground text-sm truncate">Alessandro Meneses</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">OPERACIONAL</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">Analista de TI na Automotion • Boituva, SP</p>
                          <button 
                            onClick={() => setIsGameOpen(true)} 
                            className="text-[11px] text-amber-500 hover:text-amber-400 flex items-center gap-1.5 mt-0.5 font-mono group font-semibold"
                          >
                            <Gamepad2 className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                            <span>Jogar Arcade: IT Defender</span>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        <p><span className="text-purple-400">const</span> <span className="text-blue-400">profissional</span> = &#123;</p>
                        <p className="pl-4"><span className="text-primary">nome</span>: <span className="text-emerald-400">"Alessandro Meneses"</span>,</p>
                        <p className="pl-4"><span className="text-primary">cargo</span>: <span className="text-emerald-400">"Analista de TI na Automotion"</span>,</p>
                        <p className="pl-4"><span className="text-primary">formacao</span>: <span className="text-emerald-400">"Gestão da TI (FATEC Tatuí)"</span>,</p>
                        <p className="pl-4"><span className="text-primary">localizacao</span>: <span className="text-emerald-400">"Boituva, SP"</span>,</p>
                        <p className="pl-4"><span className="text-primary">repositorios</span>: <span className="text-amber-400">14</span>,</p>
                        <p className="pl-4"><span className="text-primary">foco</span>: <span className="text-emerald-400">"Aplicações web & automações eficientes"</span></p>
                        <p>&#125;;</p>
                      </div>
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
                  <span>{activeTab === "avatar" ? "Simulação Arcade • Clique no Avatar ou Iniciar" : "Ambiente operacional ativo"}</span>
                </div>
                <span className={activeTab === "avatar" ? "text-amber-500 dark:text-amber-400 font-semibold font-mono" : "text-emerald-500 font-semibold"}>
                  {activeTab === "avatar" ? "Metal Slug 2D" : "Boituva - SP"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Arcade Mini-Game Modal */}
      <MetalSlugGameModal 
        isOpen={isGameOpen} 
        onClose={() => setIsGameOpen(false)} 
      />
    </section>
  );
}
