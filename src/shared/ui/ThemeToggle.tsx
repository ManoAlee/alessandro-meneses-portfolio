import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/Button";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Check system preference or saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-9 h-9 border border-transparent hover:border-primary/20 hover:bg-primary/10 transition-all"
      title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
    >
      {theme === "light" ? (
        <Sun className="h-4 w-4 text-orange-500 fill-orange-500/20" />
      ) : (
        <Moon className="h-4 w-4 text-blue-400 fill-blue-400/20" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
