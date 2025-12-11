import { userData } from "../data/user";
import { Briefcase } from "lucide-react";
import Reveal from "./Reveal";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });
  
  const scaleY = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
  });

  return (
    <section id="experience" className="py-32 bg-[#0b0f19] relative" ref={containerRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <Reveal width="100%">
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Experiência Profissional</h2>
          </Reveal>
          <Reveal width="100%">
            <p className="text-slate-400 text-lg">Minha trajetória e evoluçao na área de tecnologia.</p>
          </Reveal>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line Base */}
          <div className="absolute left-[19px] md:left-1/2 md:-ml-0.5 h-full w-0.5 bg-white/10" />
          
          {/* Glowing Path Indicator */}
          <motion.div 
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-[19px] md:left-1/2 md:-ml-0.5 h-full w-0.5 bg-gradient-to-b from-primary via-purple-500 to-primary" 
          />

          <div className="space-y-16">
            {userData.experience.map((job, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""} items-start w-full group`}>
                
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 md:-ml-[20px] w-10 h-10 rounded-full bg-[#0b0f19] border-4 border-white/10 z-10 flex items-center justify-center group-hover:border-primary transition-colors shadow-xl"> 
                   <div className="w-3 h-3 rounded-full bg-slate-500 group-hover:bg-primary transition-colors" />
                </div>

                {/* Spacer */}
                <div className="flex-1 w-full md:w-1/2" />

                {/* Card */}
                <div className="flex-1 w-full md:w-1/2 pl-16 md:pl-0 md:px-12">
                  <Reveal width="100%">
                    <div className="p-8 rounded-2xl bg-[#111827] border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Briefcase size={60} />
                       </div>
                       
                       <span className="inline-block px-3 py-1 mb-4 text-xs font-mono text-primary bg-primary/10 rounded-full border border-primary/20">
                          {job.period}
                       </span>

                       <h3 className="text-2xl font-bold text-white mb-1">{job.company}</h3>
                       <h4 className="text-lg text-slate-300 mb-6">{job.role}</h4>
                       
                       <p className="text-slate-400 leading-relaxed mb-6">
                         {job.description}
                       </p>

                       <div className="flex flex-wrap gap-2">
                         {job.tags.map((tag, i) => (
                           <span key={i} className="text-xs px-3 py-1 rounded-md bg-black/40 text-slate-300 border border-white/5 font-medium">
                             {tag}
                           </span>
                         ))}
                       </div>
                    </div>
                  </Reveal>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
