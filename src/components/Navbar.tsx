import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Home, User, Briefcase, Cpu, Code, Mail } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useGame } from "../context/GameContext"; // NEW

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const { isGameStarted } = useGame(); // NEW

  // Smart Scroll Direction Detection
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Use Custom Hook for Active State
  const activeSection = useScrollSpy(
    ["hero", "about", "experience", "skills", "projects", "contact"],
    200 // Offset
  );

  // Handle Navigation Click
  const handleNavClick = (id: string) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
        navigate("/");
        // Wait for route change then scroll
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 100);
    } else {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Início", id: "hero", icon: <Home size={16} /> },
    { name: "Sobre", id: "about", icon: <User size={16} /> },
    { name: "Exp", id: "experience", icon: <Briefcase size={16} /> },
    { name: "Skills", id: "skills", icon: <Cpu size={16} /> },
    { name: "Projetos", id: "projects", icon: <Code size={16} /> },
    { name: "Contato", id: "contact", icon: <Mail size={16} /> },
  ];

  // Hide if game not started
  if (!isGameStarted) return null;

  return (
    <>
        <motion.nav
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: -20, opacity: 0 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
        >
            <div className={`
                flex items-center gap-2 p-2 rounded-full border transition-all duration-300
                ${scrollY.get() > 50 || isOpen 
                    ? "bg-[#0f1623]/80 backdrop-blur-xl border-white/10 shadow-lg shadow-primary/5" 
                    : "bg-transparent border-transparent"
                }
            `}>
                {/* Logo / Home Trigger */}
                <button 
                    onClick={() => handleNavClick("hero")}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold shadow-lg"
                >
                    AM
                </button>

                {/* Desktop Nav Items */}
                <ul className="hidden md:flex items-center gap-1 mx-2">
                    {navLinks.map((link) => (
                        <li key={link.id} className="relative">
                            <button
                                onClick={() => handleNavClick(link.id)}
                                className={`
                                    relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                                    ${activeSection === link.id ? "text-white" : "text-slate-400 hover:text-white hover:bg-white/5"}
                                `}
                            >
                                {activeSection === link.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white/10 rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    {link.icon} {link.name}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Vertical Divider */}
                <div className="w-[1px] h-6 bg-white/10 mx-1 hidden md:block" />

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    
                    {/* Socials (Desktop) */}
                    <div className="hidden md:flex gap-2 ml-1">
                        <a href="https://github.com/ManoAlee" target="_blank" rel="noreferrer" className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                            <Github size={18} />
                        </a>
                        <a href="https://www.linkedin.com/in/alessandro-meneses/" target="_blank" rel="noreferrer" className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                            <Linkedin size={18} />
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <a 
                        href="/cv" 
                        target="_blank"
                        className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/50 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-black transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                    >
                        Sys.View_CV
                    </a>

                    <button 
                        className="md:hidden p-2 rounded-full text-white hover:bg-white/10" 
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>
        </motion.nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="fixed top-24 left-4 right-4 md:hidden z-40 bg-[#0f1623] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-4"
                >
                    <div className="grid grid-cols-2 gap-2">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNavClick(link.id)}
                                className={`
                                    flex flex-col items-center justify-center p-4 rounded-xl border transition-all
                                    ${activeSection === link.id 
                                        ? "bg-primary/10 border-primary/30 text-primary" 
                                        : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10"
                                    }
                                `}
                            >
                                {link.icon}
                                <span className="mt-2 text-xs font-medium">{link.name}</span>
                            </button>
                        ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-center gap-4">
                        <a href="https://github.com/ManoAlee" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-white">
                            <Github size={20} /> GitHub
                        </a>
                        <div className="w-[1px] h-6 bg-white/10" />
                        <a href="https://www.linkedin.com/in/alessandro-meneses/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-white">
                            <Linkedin size={20} /> LinkedIn
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </>
  );
}
