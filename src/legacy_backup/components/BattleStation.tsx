import { useState } from "react";
import { motion } from "framer-motion";
import { userData } from "../data/user";
import { Monitor, Cpu, Terminal, Laptop, Gamepad2 } from "lucide-react";
import SnakeGame from "./SnakeGame";
import DataUplink from "./DataUplink"; // NEW // NEW

export default function BattleStation() {
  const [activeTab, setActiveTab] = useState<"workstation" | "hardware" | "arcade">("workstation");

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="setup" className="py-20 relative bg-[#0a0f18] overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           variants={variants}
           className="mb-16 text-center"
        >
          <div className="inline-block px-3 py-1 mb-4 text-xs font-mono text-primary/80 border border-primary/20 rounded-full bg-primary/5 uppercase tracking-widest">
            Inventory // Setup
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Meu <span className="text-primary">Equipamento</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
             As ferramentas e o hardware que utilizo para arquitetar soluções.
          </p>
        </motion.div>

        {/* Custom Tab Switcher */}
        <div className="flex justify-center mb-12">
            <div className="p-1 bg-white/5 border border-white/10 rounded-full flex relative">
                <button 
                  onClick={() => setActiveTab("workstation")}
                  className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all z-10 ${activeTab === "workstation" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
                >
                    Software
                    {activeTab === "workstation" && <motion.div layoutId="pill" className="absolute inset-0 bg-primary/20 rounded-full border border-primary/30" />}
                </button>
                <button 
                  onClick={() => setActiveTab("hardware")}
                  className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all z-10 ${activeTab === "hardware" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
                >
                    Hardware
                    {activeTab === "hardware" && <motion.div layoutId="pill" className="absolute inset-0 bg-primary/20 rounded-full border border-primary/30" />}
                </button>
                <button 
                  onClick={() => setActiveTab("arcade")}
                  className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all z-10 flex items-center gap-2 ${activeTab === "arcade" ? "text-purple-400" : "text-slate-500 hover:text-purple-400"}`}
                >
                    <Gamepad2 size={16} /> Arcade
                    {activeTab === "arcade" && <motion.div layoutId="pill" className="absolute inset-0 bg-purple-500/20 rounded-full border border-purple-500/30" />}
                </button>
            </div>
        </div>

        {/* Grid Display */}
        {activeTab === "arcade" ? (
             <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
             >
                <SnakeGame />
             </motion.div>
        ) : (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {userData.setup[activeTab].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-[#0f1623] border border-white/5 rounded-xl p-6 hover:border-primary/40 transition-all duration-300 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded-lg text-primary group-hover:scale-110 transition-transform">
                            {activeTab === "workstation" ? <Terminal size={24} /> : <Cpu size={24} />}
                            </div>
                            <div>
                                <h4 className="text-slate-400 text-xs uppercase tracking-wider mb-1">{item.name}</h4>
                                <div className="text-white font-mono text-sm md:text-base">{item.value}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            {/* Network Uplink Module */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }} // Should only animate once
                className="mt-8 flex justify-center"
            >
                <DataUplink />
            </motion.div>
            </>
        )}
      </div>
    </section>
  );
}
