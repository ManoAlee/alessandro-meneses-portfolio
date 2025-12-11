import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-mono">
      {/* Background Glitch Effect */}
      <div className="absolute inset-0 z-0 opacity-20">
         <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#ff0000_3px)] animate-[vhs_0.5s_infinite]" />
      </div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="z-10 text-center max-w-md bg-[#0f1623]/90 border border-red-500/50 p-8 rounded-xl shadow-[0_0_50px_rgba(239,68,68,0.2)]"
      >
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500 animate-pulse">
            <AlertTriangle size={40} className="text-red-500" />
        </div>

        <h1 className="text-6xl font-black text-white mb-2 tracking-tighter">404</h1>
        <h2 className="text-xl text-red-400 font-bold mb-6">SYSTEM ERROR // SIGNAL LOST</h2>

        <p className="text-slate-400 mb-8 text-sm leading-relaxed">
          The requested sector coordinates could not be resolved. This memory block may have been corrupted or does not exist.
        </p>

        <div className="flex flex-col gap-3">
            <button 
                onClick={() => navigate("/")}
                className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 px-6 rounded flex items-center justify-center gap-2 transition-all"
            >
                <Home size={18} /> RETURN_TO_BASE
            </button>
            
            <button 
                onClick={() => window.location.reload()}
                className="w-full bg-white/5 hover:bg-white/10 text-slate-300 font-bold py-3 px-6 rounded flex items-center justify-center gap-2 transition-all border border-white/10"
            >
                <RefreshCw size={18} /> SYSTEM_REBOOT
            </button>
        </div>
      </motion.div>
      
      <div className="absolute bottom-8 text-xs text-red-900 font-bold tracking-[0.5em]">
        CRITICAL_FAILURE_DETECTED
      </div>
    </div>
  );
}
