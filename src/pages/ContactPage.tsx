import { motion } from "framer-motion";
import { FADE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS } from "@/shared/lib/motion";
import { ContactForm } from "@/widgets/ContactForm";
import { Mail, Phone, MapPin, Github, Linkedin, Clock } from "lucide-react";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "E-mail",
    value: "ale_meneses2004@hotmail.com",
    href: "mailto:ale_meneses2004@hotmail.com",
  },
  {
    icon: Phone,
    label: "Telefone / WhatsApp",
    value: "(15) 99801-7732",
    href: "https://wa.me/5515998017732",
  },
  {
    icon: MapPin,
    label: "Localização",
    value: "Piedade • SP, Brasil",
    href: null,
  },
  {
    icon: Clock,
    label: "Disponibilidade",
    value: "Seg – Sex, 08h – 18h (BRT)",
    href: null,
  },
];

const SOCIAL = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/ManoAlee",
    username: "ManoAlee",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alessandromeneses",
    username: "alessandromeneses",
  },
];

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-20 min-h-[85vh] animate-fade-in">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={STAGGER_CONTAINER_VARIANTS}
        className="space-y-12"
      >
        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <motion.p variants={FADE_UP_VARIANTS} className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Contato
          </motion.p>
          <motion.h1 variants={FADE_UP_VARIANTS} className="text-4xl font-bold font-display leading-tight md:text-5xl text-foreground">
            Vamos trabalhar juntos
          </motion.h1>
          <motion.p variants={FADE_UP_VARIANTS} className="text-lg text-muted-foreground leading-relaxed">
            Aberto a oportunidades, projetos ou trocas técnicas. Respondo em até 24h nos dias úteis.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info panel */}
          <motion.div variants={FADE_UP_VARIANTS} className="lg:col-span-2 space-y-8">

            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 space-y-5">
              <h2 className="font-semibold text-sm text-foreground uppercase tracking-wide">Informações</h2>
              <ul className="space-y-4">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-3">
                    <div className="mt-0.5 p-2 rounded-md border border-border/60 bg-background text-muted-foreground shrink-0">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      {href ? (
                        <a href={href} target="_blank" rel="noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-foreground">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 space-y-4">
              <h2 className="font-semibold text-sm text-foreground uppercase tracking-wide">Redes</h2>
              <div className="space-y-3">
                {SOCIAL.map(({ icon: Icon, label, href, username }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-border/40 hover:border-primary/40 hover:bg-card transition-all group"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-medium text-foreground">@{username}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Form */}
          <motion.div variants={FADE_UP_VARIANTS} className="lg:col-span-3">
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 md:p-8">
              <h2 className="font-semibold text-lg text-foreground mb-6">Enviar mensagem</h2>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
