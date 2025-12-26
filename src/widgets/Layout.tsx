import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { GooeyNavBar } from "@/widgets/GooeyNavBar";
import { MagneticCursor } from "@/widgets/MagneticCursor";
import Lenis from "@studio-freight/lenis";
import { AnimatePresence, motion } from "framer-motion";
import { SystemMonitor } from "@/widgets/SystemMonitor";

import { Github, Linkedin } from "lucide-react";
import { Button } from "@/shared/ui/Button";

const Footer = () => (
  <footer className="relative mt-32 border-t bg-card/20 backdrop-blur-lg">
    <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
    <div className="container relative z-10 py-16 grid gap-12 lg:grid-cols-4">
      {/* Brand */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
          Alessandro Meneses
        </h3>
        <p className="text-base text-muted-foreground leading-relaxed max-w-xs">
          Infraestrutura resiliente, automação inteligente e estratégias de nuvem para negócios que não podem parar.
        </p>
      </div>

      {/* Navigation */}
      <div className="space-y-6">
        <h4 className="font-bold text-base tracking-wide uppercase text-foreground/80">Menu</h4>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li><a href="/" className="hover:text-primary transition-colors hover:translate-x-1 block duration-200">Início</a></li>
          <li><a href="/services" className="hover:text-primary transition-colors hover:translate-x-1 block duration-200">Serviços</a></li>
          <li><a href="/expertise" className="hover:text-primary transition-colors hover:translate-x-1 block duration-200">Especialidades</a></li>
          <li><a href="/opensource" className="hover:text-primary transition-colors hover:translate-x-1 block duration-200">Projetos</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div className="space-y-6">
        <h4 className="font-bold text-base tracking-wide uppercase text-foreground/80">Conexão</h4>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li>
            <a href="mailto:ale_meneses2004@hotmail.com" className="hover:text-primary flex items-center gap-2 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              ale_meneses2004@hotmail.com
            </a>
          </li>
          <li>
             <a href="tel:+5515998017732" className="hover:text-primary flex items-center gap-2 transition-colors">
               <span className="w-1.5 h-1.5 rounded-full bg-primary" />
               (15) 99801-7732
             </a>
          </li>
          <li>Boituva - SP, Brasil</li>
        </ul>
      </div>

      {/* Social */}
      <div className="space-y-6">
        <h4 className="font-bold text-base tracking-wide uppercase text-foreground/80">Social</h4>
        <div className="flex items-center gap-4">
           <a 
             href="https://github.com/ManoAlee" 
             target="_blank" 
             rel="noreferrer" 
             className="p-3 rounded-full bg-background border hover:border-primary hover:text-primary transition-all hover:scale-110 shadow-sm"
             aria-label="GitHub Profile"
           >
              <Github className="h-5 w-5" />
           </a>
           <a 
             href="https://www.linkedin.com/in/alessandro-meneses/" 
             target="_blank" 
             rel="noreferrer" 
             className="p-3 rounded-full bg-background border hover:border-blue-500 hover:text-blue-500 transition-all hover:scale-110 shadow-sm"
             aria-label="LinkedIn Profile"
           >
              <Linkedin className="h-5 w-5" />
           </a>
        </div>
      </div>
    </div>
    
    <div className="container relative z-10 py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
      <p>© 2025 Alessandro Meneses. Todos os direitos reservados.</p>
      <div className="flex items-center gap-4">
        <span>DevOps</span>
        <span>•</span>
        <span>Cloud</span>
        <span>•</span>
        <span>Security</span>
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
      duration: 1.2,
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
    <div className="relative flex min-h-screen w-full flex-col bg-background antialiased cursor-none selection:bg-primary/20 selection:text-primary overflow-x-hidden" style={{ maxWidth: "100vw", overflowX: "hidden" }}>
       {/* Global Background Gradient & Grid */}
       <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
         {/* Grid Pattern */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
         
         {/* Radial Gradient Mask for softness */}
         <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Aurora Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[100px] animate-pulse delay-1000" />
      </div>

       {/* <SystemMonitor />  Persona System Disabled by User Request */}
       <MagneticCursor />
       <GooeyNavBar />

       {/* Cinema Grain Texture (Global Overlay) */}
       <div className="pointer-events-none fixed inset-0 z-[99] opacity-[0.03] mix-blend-overlay">
         <svg className="h-full w-full">
           <filter id="noiseFilter">
             <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
           </filter>
           <rect width="100%" height="100%" filter="url(#noiseFilter)" />
         </svg>
       </div>

       <AnimatePresence mode="wait">
         <motion.main 
           key={pathname}
           initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
           animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
           exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
           transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
           className="flex-1 pt-24 relative"
         > 
           <Outlet />
         </motion.main>
       </AnimatePresence>
       <Footer />
    </div>
  );
}
