import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CAREER_DATA, EDUCATION_DATA } from "@/entities/user/data/career";
import { Briefcase, GraduationCap, Terminal, ShieldCheck, Factory, Network, Building2, CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const JobIcon = ({ company }: { company: string }) => {
  if (company.includes("Automotion")) return <Terminal className="h-5 w-5 text-emerald-500" />;
  if (company.includes("Bellacor")) return <Factory className="h-5 w-5 text-amber-500" />;
  if (company.includes("BR Conecta")) return <Network className="h-5 w-5 text-blue-500" />;
  if (company.includes("Schmersal")) return <ShieldCheck className="h-5 w-5 text-purple-500" />;
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
      
      {/* Experience Section */}
      <section className="space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
                Trajetória Profissional
              </h2>
              <p className="text-xs font-mono text-muted-foreground">
                Experiências práticas em tecnologia e gestão corporativa
              </p>
            </div>
          </div>
        </div>

        <div className="relative space-y-8 lg:space-y-0">
          {/* Central Line for Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border/60 -translate-x-1/2">
             <motion.div style={{ height: lineHeight }} className="w-full bg-primary" />
          </div>

          {CAREER_DATA.map((job, index) => {
             const isEven = index % 2 === 0;
             return (
               <motion.div 
                 key={index}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-80px" }}
                 className={cn(
                   "relative lg:w-1/2",
                   isEven ? "lg:pr-12 lg:ml-auto lg:pl-12" : "lg:pr-12 lg:mr-auto"
                 )}
               >
                 {/* Desktop Connector Dot */}
                 <span className={cn(
                   "hidden lg:block absolute top-6 w-4 h-4 rounded-full border-2 border-primary bg-background shadow-xs z-10",
                   isEven ? "-left-[9px]" : "-right-[9px]"
                 )} />

                 {/* Mobile Line Connector */}
                 <div className="lg:hidden absolute left-0 top-6 bottom-0 w-px bg-primary/30" />
                 <span className="lg:hidden absolute left-[-4px] top-6 w-2 h-2 rounded-full bg-primary" />

                 <div className="group rounded-[1.5rem] p-1 bg-gradient-to-b from-white/10 to-transparent ring-1 ring-border/60 hover:ring-primary/40 transition-all duration-300 hover:shadow-lg pl-6 lg:pl-1">
                   <div className="rounded-[calc(1.5rem-0.25rem)] bg-card/85 backdrop-blur-md p-6 h-full space-y-3">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <div className="p-2 rounded-xl bg-secondary/80">
                           <JobIcon company={job.company} />
                         </div>
                         <div>
                           <h3 className="text-lg font-bold font-display text-foreground">{job.company}</h3>
                           <p className="text-xs text-muted-foreground">{job.location}</p>
                         </div>
                       </div>
                       
                       <span className="px-2.5 py-1 rounded-full bg-secondary/80 text-[11px] font-mono text-muted-foreground border border-border/40">
                         {job.period}
                       </span>
                     </div>

                     <h4 className="text-base font-semibold text-primary">{job.role}</h4>
                     
                     <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                       {job.description}
                     </p>

                     <div className="flex flex-wrap gap-1.5 pt-2">
                       {job.tags.map((tag) => (
                         <span 
                           key={tag} 
                           className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-secondary/60 text-muted-foreground border border-border/40"
                         >
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

      {/* Education Section */}
      <section className="space-y-8 pt-8 border-t border-border/40">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
              Formação Acadêmica
            </h2>
            <p className="text-xs font-mono text-muted-foreground">
              Graduação e certificações técnicas reconhecidas
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EDUCATION_DATA.map((edu, index) => (
             <motion.div 
               key={index}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="group rounded-[1.5rem] p-1 bg-gradient-to-b from-white/10 to-transparent ring-1 ring-border/60 hover:ring-primary/40 transition-all duration-300 hover:shadow-lg"
             >
               <div className="rounded-[calc(1.5rem-0.25rem)] bg-card/85 backdrop-blur-md p-6 h-full flex flex-col justify-between space-y-4">
                 <div className="space-y-2">
                   <div className="flex items-center justify-between">
                     <span className="text-xs font-mono text-muted-foreground">{edu.period}</span>
                     {edu.status && (
                       <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                         <CheckCircle2 className="w-3 h-3" />
                         {edu.status}
                       </span>
                     )}
                   </div>
                   <h3 className="text-lg font-bold font-display text-foreground group-hover:text-primary transition-colors">
                     {edu.institution}
                   </h3>
                   <p className="text-sm font-medium text-primary">
                     {edu.degree}
                   </p>
                 </div>
               </div>
             </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
