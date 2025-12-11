import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Monitor, User, Briefcase, Code, Mail } from "lucide-react";
import { userData } from "../data/user";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Toggle with Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const commands = [
    { 
        icon: <User size={18} />, 
        label: "Ir para Sobre", 
        action: () => { window.location.href = "#about"; setIsOpen(false); } 
    },
    { 
        icon: <Briefcase size={18} />, 
        label: "Ver Experiência", 
        action: () => { window.location.href = "#experience"; setIsOpen(false); } 
    },
    { 
        icon: <Code size={18} />, 
        label: "Ver Projetos", 
        action: () => { window.location.href = "#projects"; setIsOpen(false); } 
    },
    { 
        icon: <Mail size={18} />, 
        label: "Entrar em Contato", 
        action: () => { window.location.href = "#contact"; setIsOpen(false); } 
    },
    { 
        icon: <Monitor size={18} />, 
        label: "Alternar Tema", 
        action: () => { 
            const btn = document.querySelector("button[aria-label='Toggle Theme']") as HTMLButtonElement;
            if (btn) btn.click();
            setIsOpen(false); 
        } 
    },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation within list
  useEffect(() => {
    const handleNavigation = (e: KeyboardEvent) => {
        if (!isOpen) return;
        
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(i => (i + 1) % filteredCommands.length);
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(i => (i - 1 + filteredCommands.length) % filteredCommands.length);
        }
        if (e.key === "Enter") {
            e.preventDefault();
            filteredCommands[selectedIndex]?.action();
        }
    };

    window.addEventListener("keydown", handleNavigation);
    return () => window.removeEventListener("keydown", handleNavigation);
  }, [isOpen, filteredCommands, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[20vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-lg bg-[#0f1623] border border-white/10 rounded-xl shadow-2xl overflow-hidden relative"
          >
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                <Search size={20} className="text-slate-400" />
                <input
                    autoFocus
                    type="text"
                    placeholder="Warp drive to..."
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-slate-500 font-mono text-sm"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setSelectedIndex(0);
                    }}
                />
                <span className="text-xs text-slate-500 bg-white/5 py-1 px-2 rounded font-mono">ESC</span>
            </div>

            <div className="py-2 max-h-[300px] overflow-y-auto">
                {filteredCommands.length === 0 ? (
                    <div className="px-4 py-8 text-center text-slate-500 text-sm">
                        Nenhum comando encontrado.
                    </div>
                ) : (
                    filteredCommands.map((item, index) => (
                        <button
                            key={index}
                            onClick={item.action}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors ${
                                index === selectedIndex ? "bg-primary/10 text-primary" : "text-slate-300 hover:bg-white/5"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <span className="text-sm font-medium">{item.label}</span>
                            </div>
                            {index === selectedIndex && <ArrowRight size={16} />}
                        </button>
                    ))
                )}
            </div>
            
            <div className="bg-white/5 px-4 py-2 text-[10px] text-slate-500 flex justify-between border-t border-white/5">
                <span>SYSTEM.CMD_PALETTE v1.0</span>
                <span>NAVIGATE: ↑↓ SELECT: ENTER</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
