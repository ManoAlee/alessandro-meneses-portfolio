import { motion } from "framer-motion";
import { FADE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS } from "@/shared/lib/motion";
import { Server, ShieldCheck, Terminal } from "lucide-react";

const features = [
  {
    icon: Server,
    label: "01 — Infraestrutura",
    title: "Ambientes Vírtüais e Híbridos",
    description:
      "Gerenciamento de servidores com Proxmox, Hyper-V e VMware. Migração segura, Active Directory, redes corporativas VPN e TCP/IP do zero.",
    tags: ["Proxmox", "Hyper-V", "Active Directory", "VPN"],
  },
  {
    icon: ShieldCheck,
    label: "02 — Segurança",
    title: "Backup Imútavel e Proteção de Dados",
    description:
      "Estratégias de backup automatizadas com Restic e Rclone. Criptografia AES-256, proteção contra ransomware e conformidade ISO/LGPD.",
    tags: ["Restic", "Rclone", "AES-256", "LGPD"],
  },
  {
    icon: Terminal,
    label: "03 — Automação",
    title: "Scripts que Eliminam Trabalho Manual",
    description:
      "Criação de ferramentas CLI e scripts em PowerShell, Bash e Python para onboarding de usuários, gestão de infra e tarefas repetitivas.",
    tags: ["PowerShell", "Bash", "Python", "CLI"],
  },
];

export function FeatureSection() {
  return (
    <section className="container py-20 border-t border-border/30">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={STAGGER_CONTAINER_VARIANTS}
        className="space-y-6"
      >
        {/* Section label */}
        <motion.p variants={FADE_UP_VARIANTS} className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
          O que faço
        </motion.p>

        {/* Asymmetric layout: large card + 2 stacked cards */}
        <div className="grid gap-4 lg:grid-cols-5">
          {/* Large featured card — col 3 */}
          <motion.div
            variants={FADE_UP_VARIANTS}
            className="lg:col-span-3 rounded-2xl border border-border/50 bg-card/60 p-8 md:p-10 flex flex-col justify-between gap-8 group hover:border-primary/30 hover:bg-card transition-all duration-300"
          >
            <div className="space-y-4">
              <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">{features[0].label}</p>
              <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground leading-tight">
                {features[0].title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{features[0].description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {features[0].tags.map((t) => (
                <span key={t} className="text-xs px-3 py-1 rounded-full border border-border/60 text-muted-foreground bg-background/50">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stacked 2 cards — col 2 */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {features.slice(1).map((f) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.label}
                  variants={FADE_UP_VARIANTS}
                  className="flex-1 rounded-2xl border border-border/50 bg-card/60 p-6 flex flex-col gap-4 group hover:border-primary/30 hover:bg-card transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 p-2.5 rounded-lg border border-border/60 bg-background text-muted-foreground group-hover:text-primary group-hover:border-primary/40 transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">{f.label}</p>
                      <h3 className="font-bold text-foreground text-sm leading-snug">{f.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {f.tags.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-border/50 text-muted-foreground bg-background/50">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
