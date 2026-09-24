import { useState } from "react";
import { SERVICES_DATA } from "@/entities/skill/data/services";
import { ServiceCard } from "@/entities/skill/ui/ServiceCard";
import { Button } from "@/shared/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { FADE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS } from "@/shared/lib/motion";
import { useNavigate } from "react-router-dom";
import { Mail, CheckCircle2, ChevronDown, Layers, Sparkles, ArrowRight, ShieldCheck, Zap, Laptop } from "lucide-react";

export default function ServicesPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const workflowSteps = [
    {
      step: "01",
      title: "Diagnóstico & Escopo",
      desc: "Análise precisa do problema técnico ou necessidade de negócio. Mapeamento de regras, integrações de APIs e requisitos de segurança.",
      icon: SearchIcon
    },
    {
      step: "02",
      title: "Arquitetura & Prototipação",
      desc: "Desenho da solução com foco em escalabilidade, simplicidade e código limpo, eliminando complexidades desnecessárias.",
      icon: Zap
    },
    {
      step: "03",
      title: "Desenvolvimento & Testes",
      desc: "Implementação ágil com TypeScript, Python ou PowerShell, realizando validações estáticas e testes de funcionamento.",
      icon: Laptop
    },
    {
      step: "04",
      title: "Homologação & Entrega",
      desc: "Publicação assistida, documentação clara para o usuário final e acompanhamento inicial para garantir estabilidade operacional.",
      icon: ShieldCheck
    }
  ];

  function SearchIcon(props: any) {
    return <Sparkles {...props} />;
  }

  const faqs = [
    {
      q: "Que tipo de solução você desenvolve sob medida?",
      a: "Desenvolvo desde aplicações web completas e responsivas (React, TypeScript, TailwindCSS) até scripts de automação de processos internos (Python, PowerShell), integrações de APIs e dashboards de análise de dados (Power BI)."
    },
    {
      q: "Como as automações podem ajudar minha empresa no dia a dia?",
      a: "Automações eliminam tarefas manuais repetitivas — como sincronização de usuários no Active Directory, processamento de relatórios em lote, envio programado de alertas e backups — reduzindo erros e liberando horas da equipe."
    },
    {
      q: "Você presta suporte após a entrega do projeto?",
      a: "Sim. Todas as soluções entregues acompanham documentação técnica acessível e período de garantia/acompanhamento para garantir estabilidade contínua."
    },
    {
      q: "Como solicitar um orçamento ou proposta técnica?",
      a: "Basta clicar em 'Entrar em Contato' ou enviar uma mensagem direta pelo WhatsApp informando brevemente seu objetivo ou desafio técnico."
    }
  ];

  return (
    <div className="container py-12 md:py-20 min-h-[85vh] animate-fade-in space-y-20">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={STAGGER_CONTAINER_VARIANTS}
        className="space-y-16"
      >
        {/* Header Section */}
        <div className="max-w-3xl space-y-5 text-left">
          <motion.div variants={FADE_UP_VARIANTS} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            <Layers className="w-3.5 h-3.5" />
            <span>Soluções Técnicas & Capacidades</span>
          </motion.div>

          <motion.h1 variants={FADE_UP_VARIANTS} className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-foreground leading-[1.1]">
            Serviços & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-600">Capacidades</span>
          </motion.h1>

          <motion.p variants={FADE_UP_VARIANTS} className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Desenvolvimento de software web modular, automação de rotinas em Python e PowerShell e sustentação corporativa de sistemas. Soluções diretas que resolvem problemas reais com máxima eficiência.
          </motion.p>

          <motion.div variants={FADE_UP_VARIANTS} className="pt-2">
            <Button size="lg" onClick={() => navigate("/contact")} className="rounded-full px-7 gap-2 shadow-md shadow-primary/20">
              <Mail className="w-4 h-4" /> Solicitar Proposta / Falar Comigo
            </Button>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="space-y-8">
          <motion.div variants={FADE_UP_VARIANTS} className="flex items-center gap-4">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
              Catálogo de Especialidades
            </span>
            <div className="h-px bg-border/60 flex-1" />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {SERVICES_DATA.map((service, index) => (
              <ServiceCard 
                key={index} 
                // @ts-ignore
                domain={service} 
                onNavigate={(id) => navigate(service.link || "/contact")} 
              />
            ))}
          </div>
        </div>

        {/* Workflow / Methodology Section */}
        <div className="space-y-10 pt-10 border-t border-border/40">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              Metodologia de Engenharia
            </span>
            <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">
              Como Funciona o Ciclo de Entrega
            </h2>
            <p className="text-sm text-muted-foreground">
              Processo estruturado para garantir previsibilidade, alta qualidade de código e suporte confiável.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-border/60 bg-card/60 p-6 flex flex-col justify-between hover:border-primary/40 transition-all hover:shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-black text-primary/40">{item.step}</span>
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-base text-foreground font-display">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6 pt-10 border-t border-border/40 max-w-3xl mx-auto">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              Dúvidas Frequentes
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
              Perguntas & Respostas
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-xl border border-border/60 bg-card/60 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-sm text-foreground hover:text-primary transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-4 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Doppelrand CTA Card */}
        <div className="rounded-[2rem] p-1.5 bg-gradient-to-b from-white/20 via-white/5 to-transparent ring-1 ring-border/60 shadow-xl max-w-3xl mx-auto">
          <div className="rounded-[calc(2rem-0.375rem)] bg-card p-8 sm:p-12 text-center space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
              Tem um desafio técnico em mente?
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Estou à disposição para entender sua necessidade, avaliar alternativas técnicas e construir uma solução sólida e ágil.
            </p>
            <div className="pt-3">
              <Button 
                size="lg" 
                onClick={() => navigate("/contact")} 
                className="rounded-full px-8 gap-2 shadow-md shadow-primary/20"
              >
                Conversar com Alessandro <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
