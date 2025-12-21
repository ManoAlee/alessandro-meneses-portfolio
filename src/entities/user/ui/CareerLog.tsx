import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CAREER_DATA, EDUCATION_DATA } from "@/entities/user/data/career";
import { Briefcase, GraduationCap, Terminal, ShieldCheck, Factory, Network, Building2, Box } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const JobIcon = ({ company }: { company: string }) => {
  if (company.includes("Automotion")) return <Terminal className="h-5 w-5 text-emerald-400" />;
  if (company.includes("Bellacor")) return <Factory className="h-5 w-5 text-amber-400" />;
  if (company.includes("BR Conecta")) return <Network className="h-5 w-5 text-blue-400" />;
  if (company.includes("Schmersal")) return <ShieldCheck className="h-5 w-5 text-purple-400" />;
  return <Briefcase className="h-5 w-5 text-primary" />;
};

export function CareerLog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative space-y-20">
      
      {/* Experience Section - System Logs */}
      <section>
        <div className="flex items-center gap-3 mb-10">
           <Terminal className="h-6 w-6 text-primary" />
           <h2 className="text-2xl font-bold font-display uppercase tracking-wider">System Logs <span className="text-muted-foreground text-sm normal-case font-mono ml-2">// Professional Experience</span></h2>
        </div>

        <div className="relative space-y-8 lg:space-y-0">
          {/* Central Line for Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2">
             <motion.div style={{ height: lineHeight }} className="w-full bg-primary/80" />
          </div>

          {CAREER_DATA.map((job, index) => {
             const isEven = index % 2 === 0;
             return (
               <motion.div 
                 key={index}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 className={cn(
                   "relative lg:w-1/2",
                   isEven ? "lg:pr-12 lg:ml-auto lg:pl-12" : "lg:pr-12 lg:mr-auto lg:text-right"
                 )}
               >
                 {/* Desktop Connector Dot */}
                 <span className={cn(
                   "hidden lg:block absolute top-6 w-4 h-4 rounded-full border-2 border-primary bg-background shadow-[0_0_10px_rgba(var(--primary),0.5)] z-10",
                   isEven ? "-left-[9px]" : "-right-[9px]"
                 )} />

                 {/* Mobile Line Connector */}
                 <div className="lg:hidden absolute left-0 top-6 bottom-0 w-px bg-primary/20" />
                 <span className="lg:hidden absolute left-[-4px] top-6 w-2 h-2 rounded-full bg-primary" />

                 <div className={cn(
                   "group relative overflow-hidden rounded-xl border border-primary/10 bg-card/40 backdrop-blur-sm p-6 transition-all hover:bg-card/60 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 pl-8 lg:pl-6",
                   isEven ? "lg:text-left" : "lg:text-right" // Reset text alignment inside card logic if needed, but flex row is better
                 )}>
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    <div className={cn("flex flex-col gap-2", isEven ? "items-start" : "lg:items-end")}>
                        <div className="flex items-center gap-3 mb-1">
                           <div className="p-2 rounded-md bg-primary/10">
                              <JobIcon company={job.company} />
                           </div>
                           <h3 className="text-xl font-bold font-mono tracking-tight">{job.company}</h3>
                        </div>
                        
                        <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-xs font-mono text-secondary-foreground border border-secondary/20">
                           {job.period}
                        </span>

                        <h4 className="text-lg font-semibold text-primary mt-1">{job.role}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
                           {job.description}
                        </p>

                        <div className={cn("flex flex-wrap gap-2 mt-4", isEven ? "justify-start" : "lg:justify-end")}>
                           {job.tags.map(tag => (
                             <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-white/10 text-muted-foreground font-mono group-hover:border-primary/30 group-hover:text-primary transition-colors">
                               {tag}
                             </span>
                           ))}
                        </div>
                    </div>
                 </div>
               </motion.div>
             );
          })}
        </div>
      </section>

      {/* Education Section - Firmware Updates */}
      <section>
        <div className="flex items-center gap-3 mb-8">
           <GraduationCap className="h-6 w-6 text-primary" />
           <h2 className="text-2xl font-bold font-display uppercase tracking-wider">Firmware Updates <span className="text-muted-foreground text-sm normal-case font-mono ml-2">// Education & Certs</span></h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {EDUCATION_DATA.map((edu, index) => (
             <motion.div 
               key={index}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               whileHover={{ scale: 1.02 }}
               className="group relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-card/50 to-background/50 p-6 hover:border-primary/20 transition-all"
             >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Box className="h-16 w-16" />
                </div>

                <h3 className="text-lg font-bold font-display mb-1 group-hover:text-primary transition-colors">{edu.institution}</h3>
                <p className="text-sm font-medium text-muted-foreground mb-4">{edu.period}</p>
                
                <div className="space-y-2">
                   <p className="font-mono text-sm text-primary/80 border-l-2 border-primary/20 pl-3">
                      {edu.degree}
                   </p>
                   {edu.status && (
                     <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        {edu.status}
                     </span>
                   )}
                </div>
             </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
