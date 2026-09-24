import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";

const NAV_ITEMS = [
  { name: "Início", path: "/" },
  { name: "Projetos", path: "/opensource" },
  { name: "Especialidades", path: "/expertise" },
  { name: "Serviços", path: "/services" },
  { name: "Currículo", path: "/resume" },
  { name: "Contato", path: "/contact" },
];

export function GooeyNavBar() {
  const { pathname } = useLocation();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95vw] sm:max-w-fit flex items-center justify-center gap-2">
      {/* Brand Logo Monogram */}
      <Link 
        to="/" 
        className="rounded-full border border-black/10 bg-white/80 p-1.5 shadow-md shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-black/75 hover:scale-105 transition-transform flex items-center justify-center shrink-0 w-9 h-9"
        title="Alessandro Meneses - Início"
        aria-label="Alessandro Meneses - Página Inicial"
      >
        <img 
          src="/logo-dark.png" 
          alt="Alessandro Meneses Logo" 
          className="w-5 h-5 hidden dark:block object-contain"
        />
        <img 
          src="/logo-light.png" 
          alt="Alessandro Meneses Logo" 
          className="w-5 h-5 block dark:hidden object-contain"
        />
      </Link>

      {/* Navigation Pills */}
      <nav 
        aria-label="Navegação Principal"
        className="flex items-center gap-1 rounded-full border border-black/10 bg-white/80 p-1.5 shadow-md shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-black/75 dark:shadow-black/20 overflow-x-auto no-scrollbar"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
           
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative whitespace-nowrap px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors duration-200 rounded-full",
                isActive 
                  ? "text-primary-foreground font-semibold" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute inset-0 z-[-1] rounded-full bg-primary shadow-sm"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* Theme Toggle Button Container */}
      <div className="rounded-full border border-black/10 bg-white/80 p-1.5 shadow-md shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-black/75">
        <ThemeToggle />
      </div>
    </header>
  );
}
