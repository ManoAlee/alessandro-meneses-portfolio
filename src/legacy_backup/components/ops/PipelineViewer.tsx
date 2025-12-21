import { motion } from "framer-motion";
import { GitCommit, GitPullRequest, CheckCircle2, Circle } from "lucide-react";
import { userData } from "../../data/user";

export default function PipelineViewer() {
    const experiences = userData.experience; // Assuming user.ts has this structure based on previous reads

    return (
        <div className="bg-[#0f1623]/60 border border-white/5 rounded-xl p-6 h-full backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <GitPullRequest className="text-cyan-400" size={20} />
                <h3 className="text-sm font-bold font-mono text-slate-300 uppercase tracking-widest">
                    Career_Pipeline.yml
                </h3>
                <span className="ml-auto text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    PIPELINE PASSING
                </span>
            </div>

            <div className="relative space-y-8 pl-2">
                {/* Connector Line */}
                <div className="absolute top-2 bottom-2 left-[19px] w-[2px] bg-white/5" />

                {experiences.map((job, index) => {
                    const isCurrent = index === 0;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-10 group"
                        >
                            {/* Node Dot */}
                            <div className={`
                        absolute left-[11px] top-1 w-4 h-4 rounded-full border-2 z-10 bg-[#0b101b] transition-all duration-300
                        ${isCurrent ? 'border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] scale-110' : 'border-slate-700 group-hover:border-slate-500'}
                    `}>
                                {isCurrent && <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-20" />}
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
                                <h4 className={`text-sm font-bold ${isCurrent ? 'text-cyan-400' : 'text-slate-300'}`}>
                                    {job.role}
                                </h4>
                                <span className="text-xs font-mono text-slate-500">@{job.company}</span>
                            </div>

                            <div className="text-xs font-mono text-slate-600 mb-2">{job.period}</div>

                            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
                                {job.description}
                            </p>

                            {/* Tech Tags */}
                            {job.tags && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {job.tags.map(tag => (
                                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5 group-hover:border-white/10 transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    );
                })}

                {/* Start Node */}
                <div className="relative pl-10 opacity-50">
                    <div className="absolute left-[13px] top-1 w-3 h-3 rounded-full bg-slate-800 z-10" />
                    <div className="text-xs font-mono text-slate-600">Initial Commit: Education Started</div>
                </div>
            </div>
        </div>
    );
}
