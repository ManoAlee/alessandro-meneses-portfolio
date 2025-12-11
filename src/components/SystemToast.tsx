import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SystemToastProps {
  t: any; // Toast instance from react-hot-toast
  title: string;
  message: string;
  type?: "success" | "info" | "warning" | "error" | "achievement" | "quest" | "level";
}

const variants = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

const colors = {
  success: "border-green-500 bg-green-500/10 text-green-400",
  info: "border-blue-500 bg-blue-500/10 text-blue-400",
  warning: "border-yellow-500 bg-yellow-500/10 text-yellow-400",
  error: "border-red-500 bg-red-500/10 text-red-400",
  achievement: "border-purple-500 bg-purple-500/10 text-purple-400",
  quest: "border-emerald-500 bg-emerald-500/10 text-emerald-400",
  level: "border-cyan-500 bg-cyan-500/10 text-cyan-400",
};

const icons = {
  success: "✓",
  info: "i",
  warning: "!",
  error: "✕",
  achievement: "🏆",
  quest: "⚔️",
  level: "🆙",
};

export default function SystemToast({ t, title, message, type = "info" }: SystemToastProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className={`
        pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg 
        border backdrop-blur-md shadow-2xl
        ${colors[type]} border-l-4
      `}
    >
        <div className="p-4 bg-[#0f1623]/80 relative">
             {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%] opacity-20" />
            
            <div className="flex items-start gap-4 relative z-10">
                <div className="flex-shrink-0 text-2xl pt-0.5">
                    {icons[type]}
                </div>
                <div className="flex-1 pt-0.5">
                    <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-1 font-mono">
                        {title}
                    </h3>
                    <p className="text-sm text-slate-300 font-medium">
                        {message}
                    </p>
                </div>
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="flex-shrink-0 ml-4 hover:text-white transition-colors opacity-50 hover:opacity-100"
                >
                    <X size={18} />
                </button>
            </div>
            
             {/* Progress Bar (Optional decoration) */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-current w-full opacity-30">
                 <motion.div 
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="h-full bg-current opacity-100"
                 />
            </div>
        </div>
    </motion.div>
  );
}
