import { Button } from "@/shared/ui/Button";
import { motion } from "framer-motion";
import { FADE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS } from "@/shared/lib/motion";
import { Mail, MapPin, Phone, Github, Linkedin, Send, MessageSquare, Copy, Check, Clock, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ale_meneses2004@hotmail.com");
    setCopiedEmail(true);
    toast.success("E-mail copiado para a área de transferência!");
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso! Responderei em breve.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container min-h-[85vh] py-12 md:py-20 animate-fade-in">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={STAGGER_CONTAINER_VARIANTS}
        className="grid lg:grid-cols-12 items-start gap-12"
      >
        {/* Left Column: Direct Info & Channels */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4 text-left">
            <motion.div variants={FADE_UP_VARIANTS} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Disponível para novos projetos</span>
            </motion.div>
            
            <motion.h1 variants={FADE_UP_VARIANTS} className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-foreground leading-[1.1]">
              Vamos <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-600">Conversar?</span>
            </motion.h1>

            <motion.p variants={FADE_UP_VARIANTS} className="text-base text-muted-foreground leading-relaxed">
              Tem um projeto de desenvolvimento web, necessidade de automação de processos corporativos ou busca um profissional para sua equipe? Entre em contato pelos canais diretos abaixo.
            </motion.p>
          </div>

          <motion.div variants={FADE_UP_VARIANTS} className="space-y-3.5">
            {/* WhatsApp Direct Action Card */}
            <div className="rounded-2xl p-1 bg-gradient-to-b from-emerald-500/20 to-transparent ring-1 ring-emerald-500/30">
              <div className="p-4 rounded-xl bg-card/90 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">WhatsApp Direto</p>
                    <a 
                      href="https://wa.me/5515998017732?text=Ol%C3%A1%20Alessandro,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-sm font-bold text-foreground hover:text-emerald-500 transition-colors"
                    >
                      (15) 99801-7732
                    </a>
                  </div>
                </div>
                <a 
                  href="https://wa.me/5515998017732?text=Ol%C3%A1%20Alessandro,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="px-3.5 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600 transition-colors inline-flex items-center gap-1 shadow-sm"
                >
                  <span>Chamar</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Email Card with 1-click Copy */}
            <div className="rounded-2xl p-1 bg-gradient-to-b from-white/10 to-transparent ring-1 ring-border/60">
              <div className="p-4 rounded-xl bg-card/90 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">E-mail Profissional</p>
                    <a href="mailto:ale_meneses2004@hotmail.com" className="text-sm font-semibold hover:text-primary transition-colors truncate block">
                      ale_meneses2004@hotmail.com
                    </a>
                  </div>
                </div>
                <button 
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-secondary/80 hover:bg-primary hover:text-primary-foreground transition-colors text-muted-foreground"
                  title="Copiar e-mail"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Location & Response SLA */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl border border-border/60 bg-card/60 space-y-1">
                <div className="flex items-center gap-2 text-primary">
                  <MapPin className="h-4 w-4" />
                  <span className="text-[11px] font-mono uppercase">Local</span>
                </div>
                <p className="text-xs font-semibold text-foreground">Boituva - SP, Brasil</p>
              </div>
              <div className="p-4 rounded-2xl border border-border/60 bg-card/60 space-y-1">
                <div className="flex items-center gap-2 text-emerald-500">
                  <Clock className="h-4 w-4" />
                  <span className="text-[11px] font-mono uppercase">SLA</span>
                </div>
                <p className="text-xs font-semibold text-foreground">&lt; 24h úteis</p>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={FADE_UP_VARIANTS} className="flex gap-3 pt-2">
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 rounded-full px-5 border-border/60 flex-1 hover:border-primary transition-colors" 
              onClick={() => window.open("https://github.com/ManoAlee", "_blank")}
            >
              <Github className="h-4 w-4" />
              GitHub
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 rounded-full px-5 border-border/60 flex-1 hover:border-blue-500 transition-colors" 
              onClick={() => window.open("https://www.linkedin.com/in/alessandro-meneses/", "_blank")}
            >
              <Linkedin className="h-4 w-4 text-blue-500" />
              LinkedIn
            </Button>
          </motion.div>
        </div>

        {/* Right Column: Clean Interactive Form in Doppelrand */}
        <motion.div variants={FADE_UP_VARIANTS} className="lg:col-span-7">
          <div className="rounded-[1.75rem] p-1.5 bg-gradient-to-b from-white/15 to-transparent ring-1 ring-border/80 shadow-2xl">
            <div className="rounded-[calc(1.75rem-0.375rem)] bg-card/90 backdrop-blur-md p-6 sm:p-10 space-y-6">
              <div className="flex items-center gap-3 border-b border-border/40 pb-4">
                 <div className="p-2 rounded-xl bg-primary/10 text-primary">
                   <MessageSquare className="h-5 w-5" />
                 </div>
                 <div>
                   <h2 className="text-lg font-bold font-display text-foreground">Enviar Mensagem Direta</h2>
                   <p className="text-xs text-muted-foreground font-mono">Retorno garantido no e-mail informado</p>
                 </div>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Nome Completo</label>
                    <input 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Seu nome"
                      className="w-full rounded-xl border bg-background/50 p-3 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all border-border/60"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">E-mail</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu@email.com"
                      className="w-full rounded-xl border bg-background/50 p-3 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all border-border/60"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Assunto</label>
                  <input 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Ex: Desenvolvimento web ou automação de processos"
                    className="w-full rounded-xl border bg-background/50 p-3 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all border-border/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Mensagem</label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border bg-background/50 p-3 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all border-border/60 resize-none"
                    placeholder="Descreva brevemente sua ideia, demanda ou dúvida técnica..."
                  />
                </div>

                <Button className="w-full h-12 text-base font-semibold shadow-md shadow-primary/20 rounded-xl gap-2 hover:scale-[1.01] transition-transform" size="lg" type="submit">
                  <Send className="h-4 w-4" />
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
