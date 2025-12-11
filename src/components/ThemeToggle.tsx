import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Check system preference or localStorage
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle("light", initialTheme === "light");
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("light", newTheme === "light");
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 h-8 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-inner overflow-hidden group"
      aria-label="Toggle Theme"
    >
      {/* Background Gradient Morph */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-primary opacity-20"
        animate={{
             background: theme === "dark" 
                ? "linear-gradient(to right, #0f172a, #1e293b)" 
                : "linear-gradient(to right, #60a5fa, #38bdf8)"
        }}
      />

      {/* The Sliding Orb */}
      <motion.div
        className="absolute top-1 left-1 w-6 h-6 rounded-full shadow-lg flex items-center justify-center z-10"
        animate={{
            x: theme === "dark" ? 0 : 32,
            backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
            rotate: theme === "dark" ? 0 : 360
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
            initial={false}
            animate={{ scale: theme === "dark" ? 1 : 0 }}
            className="absolute"
        >
            <Moon size={14} className="text-cyan-400 fill-cyan-400/20" />
        </motion.div>

        <motion.div
            initial={false}
            animate={{ scale: theme === "dark" ? 0 : 1 }}
            className="absolute"
        >
            <Sun size={14} className="text-orange-500 fill-orange-500/20" />
        </motion.div>
      </motion.div>

      {/* Stars / Clouds Background Elements */}
      <motion.div
         className="absolute top-2 right-2 flex gap-1"
         animate={{ opacity: theme === "dark" ? 1 : 0, x: theme === "dark" ? 0 : 10 }}
      >
          <div className="w-1 h-1 bg-white rounded-full opacity-50" />
          <div className="w-1 h-1 bg-white rounded-full opacity-30 mt-2" />
      </motion.div>
      
      <motion.div
         className="absolute top-2 left-2 flex gap-1"
         animate={{ opacity: theme === "dark" ? 0 : 1, x: theme === "dark" ? -10 : 0 }}
      >
          <div className="w-3 h-1 bg-white/50 rounded-full" />
          <div className="w-2 h-1 bg-white/30 rounded-full mt-2 ml-1" />
      </motion.div>

    </button>
  );
}
