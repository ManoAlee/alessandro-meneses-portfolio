import { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Search, Monitor, User, Code, Mail, Terminal, FileText, 
    Download, Copy, Cpu, Shield, Zap 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SystemContext } from "../context/SystemContext";
import toast from "react-hot-toast";
import SystemToast from "./SystemToast";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  
  const { toggleMatrix, isLowPower, toggleLowPower } = useContext(SystemContext);


  const commands = [
    // NAVIGATION
    { category: "Navigation", title: "Go Home", icon: <Monitor size={16} />, action: () => navigate("/") },
    { category: "Navigation", title: "Go to About", icon: <User size={16} />, action: () => { navigate("/"); setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 100); } },
    { category: "Navigation", title: "Go to Projects", icon: <Code size={16} />, action: () => { navigate("/"); setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), 100); } },
    { category: "Navigation", title: "Contact Me", icon: <Mail size={16} />, action: () => { navigate("/"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100); } },
    
    // TOOLS
    { category: "Tools", title: "Identity Editor (CV Builder)", icon: <FileText size={16} />, action: () => navigate("/cv") },
    { category: "Tools", title: "Download Resume PDF", icon: <Download size={16} />, action: () => window.open("/cv.pdf", "_blank") },
    { category: "Tools", title: "Copy Email Address", icon: <Copy size={16} />, action: () => { 
        navigator.clipboard.writeText("dev@byale.com"); // Replace with actual email
        toast.custom((t) => <SystemToast t={t} title="COPIED" message="Email copied to clipboard" type="success" />);
    }},

    // SYSTEM
    { category: "System", title: "Toggle Matrix Mode", icon: <Terminal size={16} />, action: () => toggleMatrix(), value: "matrix" },
    { category: "System", title: isLowPower ? "Enable High Performance" : "Enable Low Power Mode", icon: <Zap size={16} />, action: () => toggleLowPower() },
    { category: "System", title: "Run Diagnostics", icon: <Cpu size={16} />, action: () => {
         toast.custom((t) => <SystemToast t={t} title="DIAGNOSTICS" message="All Systems Nominal. Kernel: v4.2" type="info" />);
    }},
    { category: "System", title: "Security Scan", icon: <Shield size={16} />, action: () => {
         toast.custom((t) => <SystemToast t={t} title="SECURITY" message="No intrusions detected. Firewall Active." type="success" />);
    }},
  ];

  // Filter commands
  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase()) || 
    (cmd.value && cmd.value.includes(query.toLowerCase())) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (index: number) => {
    const command = filteredCommands[index];
    if (command) {
        command.action();
        setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") setIsOpen(false);
      
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
  }, [isOpen, selectedIndex, query, filteredCommands]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-xl bg-[#0f1623] border border-cyan-500/30 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden relative z-10"
          >
            {/* Search Bar */}
            <div className="flex items-center border-b border-white/10 px-4 py-4 relative">
              <Search className="text-cyan-400 mr-4" size={24} />
              <input
                autoFocus
                type="text"
                placeholder="What is your command, User?"
                className="w-full bg-transparent border-none outline-none text-white placeholder-slate-600 font-mono text-lg"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 font-mono px-2 py-1 border border-white/5 rounded bg-white/5">ESC</div>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto py-2">
              {filteredCommands.length === 0 ? (
                <div className="px-4 py-12 text-center text-slate-500 font-mono">
                  &gt; ERROR: COMMAND_NOT_FOUND
                </div>
              ) : (
                <div className="py-1">
                    {/* Render Grouped logic could go here, but flat list is fine for speed */}
                    {filteredCommands.map((command, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelect(index)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full px-4 py-3 flex items-center justify-between transition-all relative group
                        ${index === selectedIndex ? "bg-cyan-500/10 border-l-2 border-cyan-500" : "border-l-2 border-transparent hover:bg-white/5"}
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${index === selectedIndex ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-slate-400"}`}>
                                {command.icon}
                            </div>
                            <div className="text-left">
                                <span className={`block text-sm font-medium ${index === selectedIndex ? "text-white" : "text-slate-300"}`}>
                                    {command.title}
                                </span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                                    {command.category}
                                </span>
                            </div>
                        </div>
                        {index === selectedIndex && (
                            <motion.div layoutId="arrow" className="text-xs font-mono text-cyan-500 flex items-center gap-1">
                                EXECUTE <span className="text-[10px] border border-cyan-500/50 px-1 rounded">↵</span>
                            </motion.div>
                        )}
                    </button>
                    ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="bg-[#0a0f18] px-4 py-2 text-[10px] text-slate-500 border-t border-white/5 flex justify-between font-mono">
                <div className="flex gap-4">
                     <span>Use <span className="text-slate-300">↑↓</span> to navigate</span>
                     <span><span className="text-slate-300">↵</span> to select</span>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    SYSTEM ONLINE
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
