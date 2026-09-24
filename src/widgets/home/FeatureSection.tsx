import { motion } from "framer-motion";
import { FADE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS } from "@/shared/lib/motion";
import { Code2, Terminal, Headphones, BarChart3, ArrowUpRight, Cpu, Layers } from "lucide-react";
import { Link } from "react-router-dom";

export function FeatureSection() {
  const features = [
    {
      icon: Code2,
      tag: "Web & Frontend",
      title: "Desenvolvimento de Software",
      desc: "Construção de aplicações modernas, responsivas e modulares utilizando React, TypeScript e TailwindCSS. Foco em código limpo, experiência do usuário e alta velocidade de entrega.",
      link: "/opensource",
      linkText: "Ver projetos web",
      techs: ["React", "TypeScript", "Tailwind", "Vite", "Node.js"],
      colSpan: "lg:col-span-7"
    },
    {
      icon: Terminal,
      tag: "Eficiência",
      title: "Automação de Processos & Scripts",
      desc: "Eliminação de rotinas manuais através de scripts em Python e PowerShell. Automação de onboarding de colaboradores, processamento de arquivos e integrações de APIs.",
      link: "/expertise/automation",
      linkText: "Explorar automações",
      techs: ["Python", "PowerShell", "Bash", "REST APIs"],
      colSpan: "lg:col-span-5"
    },
    {
      icon: Headphones,
      tag: "Operação & Suporte",
      title: "Sustentação & Suporte Técnico de TI",
      desc: "Atendimento corporativo N2/N3 com resolução ágil de incidentes, administração de usuários no Active Directory, suporte a Windows Server e Linux, redes e rotinas de backup.",
      link: "/expertise/systems-support",
      linkText: "Conhecer sustentação",
      techs: ["Active Directory", "Windows Server", "Linux", "TCP/IP"],
      colSpan: "lg:col-span-5"
    },
    {
      icon: BarChart3,
      tag: "Indicadores",
      title: "Dashboards & Inteligência de Dados",
      desc: "Transformação de dados brutos e relatórios dispersos em painéis visuais interativos com Power BI e planilhas dinâmicas para acompanhamento de resultados em tempo real.",
      link: "/services",
      linkText: "Ver serviços de dados",
      techs: ["Power BI", "DAX", "SQL", "ETL", "Excel Avançado"],
      colSpan: "lg:col-span-7"
    }
  ];

  return (
    <section className="container py-16 md:py-24">
      <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-primary bg-primary/10 border border-primary/20">
          <Layers className="w-3.5 h-3.5" />
          <span>Áreas de Atuação</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-foreground">
          Soluções práticas com foco em resultado real
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Combinando desenvolvimento moderno de software, automação inteligente e gestão estruturada de TI.
        </p>
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={STAGGER_CONTAINER_VARIANTS}
        className="grid gap-6 grid-cols-1 lg:grid-cols-12"
      >
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={idx}
              variants={FADE_UP_VARIANTS}
              className={`${feature.colSpan} group rounded-[1.75rem] p-1.5 bg-gradient-to-b from-white/15 to-transparent ring-1 ring-border/60 hover:ring-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5`}
            >
              <div className="rounded-[calc(1.75rem-0.375rem)] bg-card/85 backdrop-blur-md p-7 sm:p-8 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-xs">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase font-semibold text-muted-foreground px-3 py-1 rounded-full bg-secondary/80">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {feature.techs.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-secondary/60 text-foreground/80 border border-border/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-border/30 mt-6 flex items-center justify-between">
                  <Link
                    to={feature.link}
                    className="group/btn inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>{feature.linkText}</span>
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">
                      <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
