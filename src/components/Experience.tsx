import { useRef } from "react";
import { userData } from "../data/user";
import { Briefcase, Cpu, Network, Database, Box } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { DecryptText } from "./DecryptText";

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="experience" className="py-0 relative bg-[#030712]" ref={containerRef}>
      <div className="container mx-auto px-4 py-32">
        <div className="text-center mb-32 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="inline-block px-4 py-1 mb-4 border border-cyan-500/30 rounded-full bg-cyan-900/10 backdrop-blur-md">
                    <span className="text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase">System_Memory_Log</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 mb-6">
                    CAREER_PATH
                </h2>
            </motion.div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Central Data Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent md:-translate-x-1/2 hidden md:block" />

          <div className="space-y-32">
            {userData.experience.map((job, index) => {
                const isEven = index % 2 === 0;
                
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`flex flex-col md:flex-row items-center gap-12 ${isEven ? "" : "md:flex-row-reverse"}`}
                    >
                        {/* Timeline Node */}
                        <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[#030712] border border-cyan-500 rounded-full md:-translate-x-1/2 z-20 shadow-[0_0_15px_rgba(6,182,212,0.5)] hidden md:block">
                            <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-20" />
                        </div>

                        {/* Content Side */}
                        <div className="flex-1 w-full relative group perspective-1000">
                             <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                             
                             <div className="relative p-8 rounded-2xl bg-[#0a0f1c]/90 border border-white/5 backdrop-blur-xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500 group-hover:transform group-hover:rotate-x-2 group-hover:scale-[1.02]">
                                {/* Holographic Scan Effect */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent -translate-x-full group-hover:animate-scan" />
                                
                                <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            <DecryptText text={job.company} />
                                        </h3>
                                        <div className="text-primary font-mono text-sm tracking-wider">
                                            <DecryptText text={job.role} />
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
                                            {job.period}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-slate-400 leading-relaxed mb-8 text-lg font-light">
                                    {job.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {job.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 text-xs font-medium text-cyan-200/70 bg-cyan-900/20 rounded border border-cyan-500/10">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                             </div>
                        </div>

                        {/* Empty Side for layout balance */}
                        <div className="flex-1 hidden md:block" />
                    </motion.div>
                );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
