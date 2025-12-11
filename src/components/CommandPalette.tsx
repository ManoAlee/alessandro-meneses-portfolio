import { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Monitor, User, Code, Mail, Terminal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SystemContext } from "../context/SystemContext"; // Updated Import

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  
  // Use System Context
  const { toggleMatrix } = useContext(SystemContext);

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
      
      if (isOpen) {
          if (e.key === "ArrowDown") {
              e.preventDefault();
              setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
          }
          if (e.key === "ArrowUp") {
              e.preventDefault();
              setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
          }
          if (e.key === "Enter") {
              e.preventDefault();
              handleSelect(selectedIndex);
          }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, query]); // Added dependencies

  const commands = [
    { title: "Home", icon: <Monitor size={16} />, action: () => { navigate("/"); setIsOpen(false); } },
    { title: "Sobre / About", icon: <User size={16} />, action: () => { navigate("/"); setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 100); setIsOpen(false); } },
    { title: "Projetos", icon: <Code size={16} />, action: () => { navigate("/"); setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), 100); setIsOpen(false); } },
    { title: "Setup / Gear", icon: <Terminal size={16} />, action: () => { navigate("/"); setTimeout(() => document.getElementById("setup")?.scrollIntoView({ behavior: "smooth" }), 100); setIsOpen(false); } },
    { title: "Contato", icon: <Mail size={16} />, action: () => { navigate("/"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100); setIsOpen(false); } },
    { title: "Matrix Mode", icon: <Terminal size={16} />, action: () => { toggleMatrix(); setIsOpen(false); }, value: "matrix" },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase()) || 
    (cmd.value && cmd.value.includes(query.toLowerCase()))
  );

  const handleSelect = (index: number) => {
    const command = filteredCommands[index];
    if (command) {
        command.action();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[20vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-lg bg-[#0f1623] border border-white/10 rounded-xl shadow-2xl overflow-hidden relative z-10"
          >
            <div className="flex items-center border-b border-white/10 px-4 py-3">
              <Search className="text-slate-400 mr-3" size={20} />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                className="w-full bg-transparent border-none outline-none text-white placeholder-slate-500 font-mono text-sm"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
              />
              <div className="text-[10px] text-slate-500 font-mono px-2 py-1 border border-white/5 rounded">ESC</div>
            </div>

            <div className="max-h-[300px] overflow-y-auto py-2">
              {filteredCommands.length === 0 ? (
                <div className="px-4 py-8 text-center text-slate-500 text-sm">
                  No commands found.
                </div>
              ) : (
                filteredCommands.map((command, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full px-4 py-3 flex items-center justify-between transition-colors relative ${
                      index === selectedIndex ? "bg-primary/10 text-primary" : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {command.icon}
                      <span className="text-sm font-medium">{command.title}</span>
                    </div>
                    {index === selectedIndex && <motion.span layoutId="arrow" className="text-xs">Select ↵</motion.span>}
                  </button>
                ))
              )}
            </div>
            
            <div className="bg-black/20 px-4 py-2 text-[10px] text-slate-500 border-t border-white/5 flex justify-between">
                <span>Protip: Try typing 'matrix'</span>
                <span>Navigation & Actions</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
