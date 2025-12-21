import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";

// Add no-scrollbar style


const NAV_ITEMS = [
  { name: "Início", path: "/" },
  { name: "Serviços", path: "/services" },
  { name: "Especialidades", path: "/expertise" },
  { name: "Projetos", path: "/opensource" },
  { name: "Contato", path: "/contact" },
];

export function GooeyNavBar() {
  const { pathname } = useLocation();
  const [hoveredPath, setHoveredPath] = useState(pathname);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95vw] sm:max-w-fit flex items-center justify-center gap-3">
      <nav className="flex items-center gap-1 sm:gap-2 rounded-full border border-black/5 bg-white/80 p-1.5 sm:p-2 shadow-lg shadow-black/5 backdrop-blur-lg dark:border-white/10 dark:bg-black/80">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
           
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium transition-colors duration-200",
                isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
              onMouseEnter={() => setHoveredPath(item.path)}
              onMouseLeave={() => setHoveredPath(pathname)}
            >
              {isActive && (
                <motion.div
                  layoutId="gooey-pill"
                  className="absolute inset-0 z-[-1] rounded-full bg-primary"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* Theme Toggle - Visual Separator */}
      <div className="h-8 w-px bg-border/50 hidden sm:block" />
      
      <div className="rounded-full border border-black/5 bg-white/80 p-1.5 shadow-lg shadow-black/5 backdrop-blur-lg dark:border-white/10 dark:bg-black/80">
        <ThemeToggle />
      </div>
    </div>
  );
}
