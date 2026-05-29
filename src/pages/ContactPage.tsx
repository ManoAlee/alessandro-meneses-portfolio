import { Button } from "@/shared/ui/Button";
import { motion } from "framer-motion";
import { FADE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS } from "@/shared/lib/motion";
import { Mail, MapPin, Phone, Github, Linkedin, Send, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function ContactPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  // Function to trigger particle explosion on keystroke
  const handleKeystroke = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Dispatch custom event to canvas loop
    window.dispatchEvent(new CustomEvent("keystroke-particle"));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const sparks: Spark[] = [];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Event listener for keystrokes
    const handleKeystrokeEvent = () => {
      // Spawn particles near the right column (form position)
      // and let them shoot leftwards towards the contact icons
      const spawnX = width * 0.75 + (Math.random() * 100 - 50);
      const spawnY = height * 0.5 + (Math.random() * 200 - 100);

      const count = 6;
      for (let i = 0; i < count; i++) {
        const angle = Math.PI + (Math.random() * 0.6 - 0.3); // Shoot generally leftwards (angle around Math.PI)
        const speed = Math.random() * 6 + 3;
        const colors = ["#38bdf8", "#0ea5e9", "#10b981", "#a855f7"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        sparks.push({
          x: spawnX,
          y: spawnY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed + (Math.random() * 2 - 1),
          color,
          size: Math.random() * 3 + 1,
          alpha: 1,
          life: 0,
          maxLife: Math.random() * 50 + 55
        });
      }
    };

    window.addEventListener("keystroke-particle", handleKeystrokeEvent);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life++;

        // Physics updates: drift leftwards (wind) and fall slightly
        s.vx += -0.05; // Wind blowing left
        s.vy += 0.02;  // Gravity pull
        s.x += s.vx;
        s.y += s.vy;
        s.alpha = 1 - s.life / s.maxLife;

        // Render spark
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Remove dead sparks
        if (s.life >= s.maxLife) {
          sparks.splice(i, 1);
        }
      }
      ctx.globalAlpha = 1.0; // Reset alpha

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keystroke-particle", handleKeystrokeEvent);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-[85vh] overflow-hidden">
      {/* Keystroke Spark Flow Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={STAGGER_CONTAINER_VARIANTS}
        className="container grid lg:grid-cols-2 items-start gap-12 pb-8 pt-20 md:py-32 relative z-10"
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-0 w-64 h-64 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-20 right-0 w-64 h-64 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

        {/* Left Column: Context & Info */}
        <div className="space-y-10 lg:sticky lg:top-32">
          <div className="space-y-4">
            <motion.div variants={FADE_UP_VARIANTS} className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
               </span>
               Status: Disponível para novos projetos
            </motion.div>
            
            <motion.h1 variants={FADE_UP_VARIANTS} className="text-4xl font-bold font-display md:text-5xl leading-tight">
              Vamos <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">Conversar?</span>
            </motion.h1>
            <motion.p variants={FADE_UP_VARIANTS} className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Tem um desafio de infraestrutura ou uma ideia disruptiva? Estou pronto para atuar seja com consultoria DevOps, arquitetura Cloud ou desenvolvimento Fullstack.
            </motion.p>
          </div>

          <motion.div variants={FADE_UP_VARIANTS} className="space-y-6">
            <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-card/50 transition-colors border border-transparent hover:border-primary/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">E-mail</p>
                <a href="mailto:ale_meneses2004@hotmail.com" className="text-base font-semibold hover:text-primary transition-colors">
                  ale_meneses2004@hotmail.com
                </a>
              </div>
            </div>

            <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-card/50 transition-colors border border-transparent hover:border-primary/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Telefone / WhatsApp</p>
                <a href="tel:+5515998017732" className="text-base font-semibold hover:text-primary transition-colors">
                  (15) 99801-7732
                </a>
              </div>
            </div>

            <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-card/50 transition-colors border border-transparent hover:border-primary/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Localização</p>
                <p className="text-base font-semibold">Boituva - SP, Brasil</p>
                <p className="text-xs text-muted-foreground mt-1">Av. Alexandrina Bertoldi Vercellino, 461</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={FADE_UP_VARIANTS} className="flex gap-4 pt-4">
            <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto" onClick={() => window.open("https://github.com/ManoAlee", "_blank")}>
              <Github className="h-5 w-5" />
              GitHub
            </Button>
            <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto" onClick={() => window.open("https://www.linkedin.com/in/alessandromeneses/", "_blank")}>
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </Button>
          </motion.div>
        </div>

        {/* Right Column: Holographic Form */}
        <motion.div variants={FADE_UP_VARIANTS} className="relative" ref={formRef}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 blur-xl opacity-20 transform -rotate-1 rounded-2xl animate-pulse" />
          
          <div className="relative rounded-2xl border border-white/10 bg-card/40 backdrop-blur-xl p-8 shadow-2xl">
            <div className="mb-8 flex items-center gap-3 border-b border-white/5 pb-4">
               <MessageSquare className="h-5 w-5 text-primary" />
               <h2 className="text-lg font-semibold tracking-wide">Nova Mensagem</h2>
            </div>

            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              alert("Mensagem enviada com sucesso! (Simulação)");
            }}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground ml-1">Nome</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      handleKeystroke();
                    }}
                    placeholder="Seu nome"
                    className="w-full rounded-lg border bg-background/50 p-4 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground ml-1">E-mail</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      handleKeystroke();
                    }}
                    placeholder="seu@email.com"
                    className="w-full rounded-lg border bg-background/50 p-4 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground ml-1">Assunto</label>
                <input 
                  required
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData({ ...formData, subject: e.target.value });
                    handleKeystroke();
                  }}
                  placeholder="Ex: Consultoria DevOps"
                  className="w-full rounded-lg border bg-background/50 p-4 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground ml-1">Mensagem</label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    handleKeystroke();
                  }}
                  className="min-h-[200px] w-full rounded-lg border bg-background/50 p-4 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50 resize-none"
                  placeholder="Descreva seu projeto ou dúvida..."
                />
              </div>

              <Button className="w-full h-14 text-lg font-semibold shadow-lg shadow-primary/25 rounded-xl gap-2 hover:scale-[1.02] transition-transform" size="lg" type="submit">
                <Send className="h-5 w-5" />
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
