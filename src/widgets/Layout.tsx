import { Outlet, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { GooeyNavBar } from "@/widgets/GooeyNavBar";
import { MagneticCursor } from "@/widgets/MagneticCursor";
import Lenis from "@studio-freight/lenis";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const Footer = () => (
  <footer className="relative mt-24 border-t border-border/40 bg-card/30 backdrop-blur-md">
    <div className="container relative z-10 py-12 md:py-16 grid gap-10 md:grid-cols-4">
      {/* Brand */}
      <div className="md:col-span-2 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-card border border-border/60 p-1.5 flex items-center justify-center shadow-xs">
            <img 
              src="/logo-dark.png" 
              alt="Alessandro Meneses Logo" 
              className="w-6 h-6 hidden dark:block object-contain"
            />
            <img 
              src="/logo-light.png" 
              alt="Alessandro Meneses Logo" 
              className="w-6 h-6 block dark:hidden object-contain"
            />
          </div>
          <h3 className="text-xl font-bold font-display tracking-tight text-foreground">
            Alessandro Meneses
          </h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
          Desenvolvimento de software moderno, automações corporativas e soluções de TI que transformam desafios técnicos em resultados práticos.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <a 
            href="https://github.com/ManoAlee" 
            target="_blank" 
            rel="noreferrer" 
            className="p-2.5 rounded-full bg-secondary/50 border border-border/50 hover:border-primary hover:text-primary transition-all shadow-sm"
            aria-label="GitHub Profile"
          >
            <Github className="h-4 w-4" />
          </a>
          <a 
            href="https://www.linkedin.com/in/alessandro-meneses/" 
            target="_blank" 
            rel="noreferrer" 
            className="p-2.5 rounded-full bg-secondary/50 border border-border/50 hover:border-blue-500 hover:text-blue-500 transition-all shadow-sm"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a 
            href="mailto:ale_meneses2004@hotmail.com" 
            className="p-2.5 rounded-full bg-secondary/50 border border-border/50 hover:border-primary hover:text-primary transition-all shadow-sm"
            aria-label="Enviar Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Navigation */}
      <div className="space-y-4">
        <h4 className="font-semibold text-xs tracking-wider uppercase text-foreground/80">Navegação</h4>
        <ul className="space-y-2.5 text-sm text-muted-foreground">
          <li><Link to="/" className="hover:text-primary transition-colors">Início</Link></li>
          <li><Link to="/opensource" className="hover:text-primary transition-colors">Projetos</Link></li>
          <li><Link to="/expertise" className="hover:text-primary transition-colors">Especialidades</Link></li>
          <li><Link to="/services" className="hover:text-primary transition-colors">Serviços</Link></li>
          <li><Link to="/resume" className="hover:text-primary transition-colors">Currículo</Link></li>
          <li><Link to="/contact" className="hover:text-primary transition-colors">Contato</Link></li>
        </ul>
      </div>

      {/* Contact & Status */}
      <div className="space-y-4">
        <h4 className="font-semibold text-xs tracking-wider uppercase text-foreground/80">Status</h4>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Disponível para projetos
        </div>
        <p className="text-xs text-muted-foreground">
          Boituva, SP — Brasil<br />
          Graduado em Gestão da TI (FATEC)
        </p>
      </div>
    </div>
    
    <div className="container relative z-10 py-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
      <p>© 2026 Alessandro Meneses. Todos os direitos reservados.</p>
      <div className="flex items-center gap-3">
        <span>Software</span>
        <span>•</span>
        <span>Automação</span>
        <span>•</span>
        <span>TI</span>
      </div>
    </div>
  </footer>
);

export function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Smooth Scroll (Lenis)
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background antialiased selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {/* Subtle Background Mesh */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <MagneticCursor />
      <GooeyNavBar />

      <AnimatePresence mode="wait">
        <motion.main 
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 pt-24 relative"
        > 
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
