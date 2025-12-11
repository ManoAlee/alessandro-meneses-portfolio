import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Command } from "cmdk";
import {
  Search,
  Terminal,
  Home,
  User,
  Briefcase,
  Cpu,
  Code,
  Mail,
  Moon,
  Sun,
  Laptop,
  FileText
} from "lucide-react";
import { useGame } from "../context/GameContext";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isGameStarted } = useGame();

  // Toggle with Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const handleScroll = (id: string) => {
    navigate("/");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Only show if game is active or user knows the shortcut
  if (!isGameStarted) return null;

  return (
    <div className={open ? "fixed inset-0 z-[999]" : "hidden"}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-[640px] px-4">
        <Command
          label="System Command Palette"
          className="w-full bg-[#0f1623] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
            <Terminal size={18} className="text-cyan-500" />
            <Command.Input
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent text-white placeholder:text-slate-500 outline-none text-sm font-mono"
            />
            <div className="flex gap-1">
              <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-400">ESC</span>
            </div>
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 scrollbar-thin scrollbar-thumb-white/10">
            <Command.Empty className="py-6 text-center text-sm text-slate-500">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-xs font-medium text-slate-500 mb-2 px-2">
              <SystemItem icon={Home} label="Go to Home" onSelect={() => runCommand(() => handleScroll("hero"))} />
              <SystemItem icon={User} label="Go to About" onSelect={() => runCommand(() => handleScroll("about"))} />
              <SystemItem icon={Briefcase} label="Go to Experience" onSelect={() => runCommand(() => handleScroll("experience"))} />
              <SystemItem icon={Cpu} label="Go to Skills" onSelect={() => runCommand(() => handleScroll("skills"))} />
              <SystemItem icon={Code} label="Go to Projects" onSelect={() => runCommand(() => handleScroll("projects"))} />
              <SystemItem icon={Mail} label="Go to Contact" onSelect={() => runCommand(() => handleScroll("contact"))} />
            </Command.Group>

            <Command.Group heading="System" className="text-xs font-medium text-slate-500 mb-2 px-2">
              <SystemItem icon={FileText} label="View Resume (CV)" onSelect={() => runCommand(() => window.open("/cv", "_blank"))} />
              <SystemItem icon={Laptop} label="System Diagnostics" onSelect={() => runCommand(() => console.log("Running diagnostics..."))} />
            </Command.Group>

          </Command.List>

          <div className="px-4 py-2 border-t border-white/10 bg-black/20 flex justify-between items-center text-[10px] text-slate-500">
            <div>
              <span className="text-cyan-500">SYSTEM.OS</span> v2.0.4
            </div>
            <div className="flex gap-2">
              <span>Use <kbd className="bg-white/10 px-1 rounded">↑</kbd> <kbd className="bg-white/10 px-1 rounded">↓</kbd> to navigate</span>
              <span><kbd className="bg-white/10 px-1 rounded">↵</kbd> to select</span>
            </div>
          </div>
        </Command>
      </div>
    </div>
  );
}

function SystemItem({ icon: Icon, label, onSelect }: { icon: any, label: string, onSelect: () => void }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 data-[selected=true]:bg-cyan-500/10 data-[selected=true]:text-cyan-400 cursor-pointer transition-colors"
    >
      <Icon size={16} />
      <span>{label}</span>
    </Command.Item>
  );
}
