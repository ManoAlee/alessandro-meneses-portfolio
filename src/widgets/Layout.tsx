import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { GooeyNavBar } from "@/widgets/GooeyNavBar";
import { MagneticCursor } from "@/widgets/MagneticCursor";
import Lenis from "@studio-freight/lenis";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="relative mt-32 border-t bg-card/30">
    <div className="container py-16 grid gap-12 lg:grid-cols-4">
      {/* Brand */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold font-display text-foreground">
          Alessandro Meneses
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
          Profissional de TI focado em infraestrutura resiliente, automação inteligente e suporte técnico de qualidade.
        </p>
      </div>

      {/* Navigation */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm tracking-wide uppercase text-foreground/70">Menu</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><a href="/" className="hover:text-primary transition-colors">Início</a></li>
          <li><a href="/services" className="hover:text-primary transition-colors">Serviços</a></li>
          <li><a href="/expertise" className="hover:text-primary transition-colors">Especialidades</a></li>
          <li><a href="/opensource" className="hover:text-primary transition-colors">Projetos</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm tracking-wide uppercase text-foreground/70">Contato</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <a href="mailto:ale_meneses2004@hotmail.com" className="hover:text-primary transition-colors break-all">
              ale_meneses2004@hotmail.com
            </a>
          </li>
          <li>
            <a href="tel:+5515998017732" className="hover:text-primary transition-colors">
              (15) 99801-7732
            </a>
          </li>
          <li className="text-muted-foreground">Piedade • SP, Brasil</li>
        </ul>
      </div>

      {/* Social */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm tracking-wide uppercase text-foreground/70">Social</h4>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/ManoAlee"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-lg bg-background border border-border hover:border-primary hover:text-primary transition-all"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/alessandromeneses"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-lg bg-background border border-border hover:border-blue-500 hover:text-blue-500 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>

    <div className="container py-6 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
      <p>© 2026 Alessandro Meneses. Todos os direitos reservados.</p>
      <div className="flex items-center gap-3">
        <span>Infraestrutura</span>
        <span>•</span>
        <span>Automação</span>
        <span>•</span>
        <span>Suporte Técnico</span>
      </div>
    </div>
  </footer>
);

export function MainLayout() {
  const { pathname } = useLocation();

  // Lenis is instantiated ONCE for the app lifetime, not per route change
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background antialiased overflow-x-hidden">
      {/* Subtle grid pattern — static, no animated blobs */}
      <div
        className="fixed inset-0 z-[-1] pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808009_1px,transparent_1px),linear-gradient(to_bottom,#80808009_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,transparent_0%,#000_100%)]" />
      </div>

      {/* Cinema grain — kept, it’s subtle and good */}
      <div className="pointer-events-none fixed inset-0 z-[99] opacity-[0.025] mix-blend-overlay" aria-hidden="true">
        <svg className="h-full w-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <MagneticCursor />
      <GooeyNavBar />

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 pt-24 relative"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
