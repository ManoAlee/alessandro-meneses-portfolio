import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";
import { Menu, X, Home, FolderGit2, Layers, Briefcase, FileText, Mail, Github, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { name: "Início", path: "/", icon: Home },
  { name: "Projetos", path: "/opensource", icon: FolderGit2 },
  { name: "Especialidades", path: "/expertise", icon: Layers },
  { name: "Serviços", path: "/services", icon: Briefcase },
  { name: "Currículo", path: "/resume", icon: FileText },
  { name: "Contato", path: "/contact", icon: Mail },
];

export function GooeyNavBar() {
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeItem = NAV_ITEMS.find(
    (item) => pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path))
  ) || NAV_ITEMS[0];

  return (
    <>
      {/* ================= DESKTOP FLOATING PILL NAVBAR ================= */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden sm:flex items-center justify-center gap-2 max-w-fit">
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
          className="flex items-center gap-1 rounded-full border border-black/10 bg-white/80 p-1.5 shadow-md shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-black/75 dark:shadow-black/20"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
             
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative whitespace-nowrap px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 rounded-full",
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
        
        {/* Theme Toggle Button */}
        <div className="rounded-full border border-black/10 bg-white/80 p-1.5 shadow-md shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-black/75">
          <ThemeToggle />
        </div>
      </header>

      {/* ================= MOBILE COMPACT HEADER ================= */}
      <header className="fixed top-3 left-0 right-0 z-50 flex sm:hidden items-center justify-between px-3 w-full max-w-full">
        {/* Brand Logo */}
        <Link 
          to="/" 
          onClick={() => setMobileMenuOpen(false)}
          className="rounded-full border border-black/10 bg-white/85 p-1.5 shadow-md backdrop-blur-md dark:border-white/15 dark:bg-black/85 flex items-center justify-center shrink-0 w-9 h-9"
          aria-label="Início"
        >
          <img 
            src="/logo-dark.png" 
            alt="Logo" 
            className="w-5 h-5 hidden dark:block object-contain"
          />
          <img 
            src="/logo-light.png" 
            alt="Logo" 
            className="w-5 h-5 block dark:hidden object-contain"
          />
        </Link>

        {/* Center Active Page Indicator & Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 bg-white/85 backdrop-blur-md dark:border-white/15 dark:bg-black/85 shadow-md text-xs font-semibold text-foreground active:scale-95 transition-all"
          aria-expanded={mobileMenuOpen}
          aria-label="Abrir menu de navegação"
        >
          <activeItem.icon className="w-3.5 h-3.5 text-primary" />
          <span>{activeItem.name}</span>
          <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center ml-0.5 text-primary">
            {mobileMenuOpen ? <X className="w-3 h-3" /> : <Menu className="w-3 h-3" />}
          </span>
        </button>

        {/* Theme Toggle Button */}
        <div className="rounded-full border border-black/10 bg-white/85 p-1.5 shadow-md backdrop-blur-md dark:border-white/15 dark:bg-black/85 shrink-0">
          <ThemeToggle />
        </div>
      </header>

      {/* ================= MOBILE EXPANDED MENU DRAWER ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden"
            />

            {/* Menu Modal Sheet */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 inset-x-3 z-50 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-2xl p-4 shadow-2xl sm:hidden space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-border/40 text-xs font-mono text-muted-foreground">
                <span className="uppercase tracking-wider font-semibold text-primary">Navegação Principal</span>
                <span>Alessandro Meneses</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all",
                        isActive
                          ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                          : "bg-secondary/40 hover:bg-secondary/80 text-foreground"
                      )}
                    >
                      <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-primary-foreground" : "text-primary")} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Quick GitHub Link */}
              <div className="pt-2 border-t border-border/40">
                <a
                  href="https://github.com/ManoAlee"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-secondary/30 hover:bg-secondary/60 text-xs font-mono text-muted-foreground transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-3.5 h-3.5 text-foreground" />
                    <span>github.com/ManoAlee</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
