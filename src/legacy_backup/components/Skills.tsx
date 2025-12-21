import { userData } from "../data/user";
import Reveal from "./Reveal";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // NEW

export default function Skills() {
  return (
    <section id="skills" className="py-32 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <Reveal width="100%">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Skills Técnicas</h2>
          </Reveal>
          <Reveal width="100%">
             <p className="text-slate-400 text-lg">Tecnologias que domino para criar soluções escaláveis.</p>
          </Reveal>
        </div>

        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {Object.entries(userData.skills).map(([category, skills], index) => (
            <motion.div 
                key={index} 
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                }}
            >
                <div className="h-full bg-[#0f1623] border border-white/5 rounded-2xl p-8 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 group hover:-translate-y-2">
                <h3 className="text-xl font-bold text-white mb-6 capitalize border-b border-white/10 pb-4 group-hover:border-primary/50 transition-colors">
                    {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                    {skills.map((skill, i) => (
                    <Link 
                        key={i} 
                        to={`/skill/${encodeURIComponent(skill)}`}
                        className="px-3 py-1.5 text-sm bg-white/5 text-slate-300 rounded-md border border-white/5 hover:bg-primary hover:text-black hover:font-bold hover:scale-105 transition-all duration-300 cursor-pointer block"
                    >
                        {skill}
                    </Link>
                    ))}
                </div>
                </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
