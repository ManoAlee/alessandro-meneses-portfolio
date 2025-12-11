import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Cpu, Database, Wifi } from "lucide-react";

export default function SystemVitals() {
    const [cpuLoad, setCpuLoad] = useState(12);
    const [memoryUsage, setMemoryUsage] = useState(45);
    const [networkPing, setNetworkPing] = useState(24);

    // Simulate live data fluctuation
    useEffect(() => {
        const interval = setInterval(() => {
            setCpuLoad(prev => Math.min(100, Math.max(5, prev + (Math.random() * 10 - 5))));
            setMemoryUsage(prev => Math.min(100, Math.max(30, prev + (Math.random() * 4 - 2))));
            setNetworkPing(prev => Math.max(1, prev + (Math.random() * 10 - 5)));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const calculateUptime = () => {
        const startDate = new Date("2022-01-01"); // Approximate start of career
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} DAYS`;
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <VitalCard
                label="COGNITIVE LOAD"
                value={`${cpuLoad.toFixed(1)}%`}
                icon={<Cpu size={18} />}
                color="text-emerald-400"
                progress={cpuLoad}
            />
            <VitalCard
                label="KNOWLEDGE BASE"
                value={`${memoryUsage.toFixed(1)} GB`}
                sub="32 GB ALLOCATED"
                icon={<Database size={18} />}
                color="text-blue-400"
                progress={memoryUsage}
            />
            <VitalCard
                label="NET.LATENCY"
                value={`${Math.floor(networkPing)} ms`}
                icon={<Wifi size={18} />}
                color="text-amber-400"
                progress={100 - networkPing} // Inverse for good/bad
            />
            <VitalCard
                label="SYSTEM UPTIME"
                value={calculateUptime()}
                icon={<Activity size={18} />}
                color="text-purple-400"
                progress={100}
                isStatic
            />
        </div>
    );
}

function VitalCard({ label, value, sub, icon, color, progress, isStatic = false }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0f1623]/60 border border-white/5 rounded-xl p-4 flex flex-col justify-between overflow-hidden relative group"
        >
            <div className={`absolute top-0 left-0 bottom-0 bg-current opacity-[0.03] transition-all duration-1000 ${color}`} style={{ width: `${progress}%` }} />

            <div className="flex justify-between items-start mb-2 relative z-10">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{label}</span>
                <span className={`${color}`}>{icon}</span>
            </div>

            <div className="relative z-10">
                <div className="text-xl font-bold font-mono tracking-tight text-white">{value}</div>
                {sub && <div className="text-[10px] text-slate-600 font-mono mt-1">{sub}</div>}
            </div>

            {/* Micro Chart Decoration */}
            {!isStatic && (
                <div className="absolute bottom-0 right-0 left-0 h-1 bg-white/5">
                    <motion.div
                        className={`h-full ${color.replace('text-', 'bg-')}`}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", bounce: 0, duration: 2 }}
                    />
                </div>
            )}
        </motion.div>
    )
}
