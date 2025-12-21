import { useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Shield, Activity, Layers } from "lucide-react";

// Components
import SystemVitals from "../components/ops/SystemVitals";
import PipelineViewer from "../components/ops/PipelineViewer";
import SkillGraph from "../components/ops/SkillGraph";

export default function OpsCenter() {

    // Set page title
    useEffect(() => {
        document.title = "AM | Operations Center";
    }, []);

    return (
        <div className="pt-24 pb-20 px-4 md:px-12 max-w-[1400px] mx-auto min-h-screen">

            {/* Header */}
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 text-cyan-400 mb-2"
                    >
                        <Terminal size={24} />
                        <span className="font-mono text-xs tracking-widest border border-cyan-500/30 px-2 py-0.5 rounded bg-cyan-950/30">
                            SYS.ADMIN_MODE
                        </span>
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Operations Center
                    </h1>
                    <p className="text-slate-400 mt-2 max-w-xl">
                        Real-time monitoring of professional capabilities, infrastructure experience, and project deployments.
                    </p>
                </div>

                <div className="flex gap-2">
                    <Badge icon={Shield} label="SECURITY: HIGH" color="text-emerald-400 border-emerald-500/20 bg-emerald-500/5" />
                    <Badge icon={Activity} label="STATUS: ONLINE" color="text-cyan-400 border-cyan-500/20 bg-cyan-500/5" />
                </div>
            </header>

            {/* Vitals Section */}
            <SystemVitals />

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Col: Pipeline (2/3 width on LG) */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="flex items-center gap-2 text-slate-300 mb-[-10px]">
                        <Layers size={16} />
                        <span className="text-xs font-mono font-bold tracking-wider">CAREER PIPELINE</span>
                    </div>
                    <PipelineViewer />
                </div>

                {/* Right Col: Network Graph (2/3 width) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="flex items-center gap-2 text-slate-300 mb-[-10px]">
                        <Activity size={16} />
                        <span className="text-xs font-mono font-bold tracking-wider">SKILL NEURAL NETWORK</span>
                    </div>
                    <SkillGraph />

                    {/* Quick Stats Grid underneath graph */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatBox title="PROJECTS DEPLOYED" value="12+" sub="In Production" />
                        <StatBox title="STACK COVERAGE" value="Full" sub="Front to Back to Infra" />
                        <StatBox title="AUTO. SUCCESS" value="99.9%" sub="Script Execution Rate" />
                    </div>
                </div>

            </div>

        </div>
    );
}

// Helper Components
function Badge({ icon: Icon, label, color }: any) {
    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono font-bold ${color}`}>
            <Icon size={12} />
            {label}
        </div>
    )
}

function StatBox({ title, value, sub }: any) {
    return (
        <div className="bg-[#0f1623]/40 border border-white/5 p-4 rounded-xl">
            <div className="text-[10px] text-slate-500 font-mono mb-1">{title}</div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs text-slate-400">{sub}</div>
        </div>
    )
}
