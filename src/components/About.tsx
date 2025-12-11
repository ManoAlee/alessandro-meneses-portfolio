import { useState } from "react";
import { userData } from "../data/user";
import { Server, ShieldCheck, Database, Code } from "lucide-react";
import Reveal from "./Reveal";
import { motion } from "framer-motion";
import { DecryptText } from "./DecryptText";

export default function About() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const features = [
    { 
        icon: <Server className="text-cyan-400" />, 
        title: "Infraestrutura", 
        desc: "Gestão robusta de servidores e redes.",
        cmd: "check_infra_status",
        output: "Servers: ONLINE\nNetwork Latency: <1ms\nCluster Health: 100%"
    },
    { 
        icon: <ShieldCheck className="text-purple-400" />, 
        title: "Segurança", 
        desc: "Implementação de políticas e backups seguros.",
        cmd: "verify_security_protocols",
        output: "Firewall: ACTIVE\nEncryption: AES-256\nIntrusion Detection: ENABLED"
    },
    { 
        icon: <Code className="text-blue-400" />, 
        title: "Automação", 
        desc: "Scripts em PowerShell, Bash e Python.",
        cmd: "list_automations",
        output: "Scripts Loaded: 142\nEfficiency Gain: +400%\nManual Tasks: 0"
    },
    { 
        icon: <Database className="text-green-400" />, 
        title: "Dados", 
        desc: "Análise e administração de bancos de dados.",
        cmd: "query_db_metrics",
        output: "Data Integrity: VERIFIED\nQueries/sec: 2500\nBackup Status: SYNCED"
    },
  ];

  return (
    <section id="about" className="py-32 bg-background relative overflow-hidden">
       {/* Background Decoration */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[100px] rounded-full -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <Reveal>
               <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                 <DecryptText text="SOBRE MIM" />
               </h2>
            </Reveal>
            
            <Reveal>
                <div className="text-slate-400 text-lg leading-relaxed mb-8 space-y-4">
                    <p>
                        Profissional focado em transformar complexidade técnica em soluções elegantes e funcionais.
                        Minha abordagem une <strong>UX (Experiência do Usuário)</strong> refinada com <strong>QA (Garantia de Qualidade)</strong> rigorosa.
                    </p>
                    <p>
                        Não apenas construo sistemas; construo experiências confiáveis, escaláveis e intuitivas.
                    </p>
                </div>
            </Reveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {features.map((item, index) => (
                <Reveal key={index} width="100%">
                    <div 
                        onMouseEnter={() => setActiveFeature(index)}
                        onMouseLeave={() => setActiveFeature(null)}
                        className={`
                            p-6 rounded-xl border transition-all duration-300 cursor-default group relative overflow-hidden
                            ${activeFeature === index 
                                ? "bg-white/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]" 
                                : "bg-white/5 border-white/10 hover:border-white/20"}
                        `}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className={`mb-4 p-3 rounded-lg w-fit transition-all duration-300 ${activeFeature === index ? "bg-cyan-500/20 scale-110" : "bg-white/5"}`}>
                            {item.icon}
                        </div>
                        <h3 className={`font-bold mb-2 transition-colors ${activeFeature === index ? "text-cyan-400" : "text-white"}`}>
                            {item.title}
                        </h3>
                        <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Connected Terminal Visual */}
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-2xl blur-3xl opacity-20 animate-pulse" />
             <div className="relative bg-[#0f1623] border border-white/10 rounded-2xl p-8 aspect-square flex flex-col justify-center items-center text-center overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                
                {/* Simulated Terminal Window */}
                <div className="w-full max-w-sm bg-black/90 backdrop-blur-md rounded-lg border border-white/10 p-6 font-mono text-sm text-left shadow-2xl relative z-10 min-h-[300px] flex flex-col">
                  {/* Terminal Header */}
                  <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-2">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase">System Monitor</span>
                  </div>

                  {/* Terminal Content */}
                  <div className="space-y-4 flex-1">
                    {activeFeature === null ? (
                        <>
                            <div className="mb-4">
                                <span className="text-green-400">$ whoami</span><br/>
                                <span className="text-slate-300">{userData.profile.name}</span>
                            </div>
                            <div className="mb-4">
                                <span className="text-green-400">$ role</span><br/>
                                <span className="text-slate-300">{userData.profile.role}</span>
                            </div>
                            <div>
                                <span className="text-green-400">$ status</span><br/>
                                <span className="text-cyan-400">READY_FOR_ACTION</span><span className="animate-pulse">_</span>
                            </div>
                        </>
                    ) : (
                        <motion.div
                            key={activeFeature}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="h-full"
                        >
                             <div className="mb-2">
                                <span className="text-green-400">$ {features[activeFeature].cmd}</span>
                            </div>
                            <div className="text-slate-300 whitespace-pre-line leading-loose pl-4 border-l-2 border-cyan-500/30">
                                {features[activeFeature].output}
                            </div>
                            <div className="mt-4 text-cyan-500 animate-pulse">
                                &gt; Executing protocol...
                            </div>
                        </motion.div>
                    )}
                  </div>
                  
                  {/* Decorative Footer */}
                  <div className="mt-auto pt-4 border-t border-white/10 flex justify-between text-[10px] text-slate-600">
                    <span>CPU: 12%</span>
                    <span>MEM: 48%</span>
                    <span>NET: <span className="text-green-500">CONN</span></span>
                  </div>

                </div>
             </div>
          </div>
        </div>
      </div>
      
      {/* New Technical Skills Section - Animated */}
      <div className="container mx-auto px-4 mt-32">
        <Reveal width="100%">
            <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    <DecryptText text="SKILLS TÉCNICAS" />
                </h3>
                <p className="text-slate-400">Tecnologias que domino para criar soluções escaláveis.</p>
            </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(userData.skills).map(([category, skills], index) => (
                <Reveal key={category} width="100%" delay={index * 0.1}>
                    <div className="bg-[#0f1623]/50 backdrop-blur-sm border border-white/5 p-6 rounded-xl hover:border-cyan-500/30 transition-all group h-full">
                        <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                            <h4 className="font-mono text-cyan-400 uppercase tracking-widest text-sm">{category}</h4>
                        </div>
                        
                        <div className="space-y-3 font-mono text-sm">
                            {(skills as string[]).map((skill, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (i * 0.05) }}
                                    className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                                >
                                    <span className="text-white/20">0{i+1}</span>
                                    <span>{skill}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}
