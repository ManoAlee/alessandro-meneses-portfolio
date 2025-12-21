import { userData } from "@/entities/user/data/user";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

export function Timeline() {
  return (
    <div className="space-y-16">
      {/* Experience Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
           <Briefcase className="h-6 w-6 text-primary" />
           <h2 className="text-2xl font-bold font-display">Experiência Profissional</h2>
        </div>
        
        <div className="relative border-l-2 border-muted ml-2 md:ml-0 pl-6 md:pl-8 space-y-12">
          {userData.experience.map((job, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-4 rounded-lg hover:bg-white/5 transition-all duration-300 hover:scale-[1.01] hover:border hover:border-white/10 group cursor-default"
            >
              {/* Dot - Blue for Experience - Pulses on Hover */}
              <span className="absolute -left-[33px] md:-left-[41px] top-6 h-5 w-5 rounded-full border-4 border-background bg-blue-600 shadow-sm shadow-blue-600/50 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.6)] transition-all duration-300" />
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold">{job.company}</h3>
                <span className="text-sm font-medium text-muted-foreground bg-secondary/10 px-3 py-1 rounded-full">
                  {job.period}
                </span>
              </div>
              
              <p className="text-lg font-medium text-primary mb-2">{job.role}</p>
              <p className="text-muted-foreground mb-4 max-w-3xl">{job.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {job.tags.map(tag => (
                  <span key={tag} className="text-xs border px-2 py-0.5 rounded font-mono text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
           <GraduationCap className="h-6 w-6 text-primary" />
           <h2 className="text-2xl font-bold font-display">Formação Acadêmica</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {userData.education.map((edu, index) => (
            <motion.div 
               key={index}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="p-6 rounded-lg border bg-card hover:bg-secondary/5 transition-colors"
            >
              <h3 className="font-bold text-lg">{edu.institution}</h3>
              <p className="text-primary font-medium">{edu.degree}</p>
              <p className="text-sm text-muted-foreground mt-2">{edu.period}</p>
              {edu.status && (
                <span className="mt-3 inline-block text-xs font-semibold bg-green-500/10 text-green-600 px-2 py-0.5 rounded">
                  {edu.status}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
