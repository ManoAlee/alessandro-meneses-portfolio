import { userData } from "../data/user";
import { Server, ShieldCheck, Database, Code } from "lucide-react";
import Reveal from "./Reveal";

export default function About() {
  const features = [
    { icon: <Server className="text-primary" />, title: "Infraestrutura", desc: "Gestão robusta de servidores e redes." },
    { icon: <ShieldCheck className="text-purple-400" />, title: "Segurança", desc: "Implementação de políticas e backups seguros." },
    { icon: <Code className="text-blue-400" />, title: "Automação", desc: "Scripts em PowerShell, Bash e Python." },
    { icon: <Database className="text-green-400" />, title: "Dados", desc: "Análise e administração de bancos de dados." },
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
               <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Sobre Mim</h2>
            </Reveal>
            
            <Reveal>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {userData.profile.about}
                </p>
            </Reveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {features.map((item, index) => (
                <Reveal key={index} width="100%">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-primary/50 transition-all cursor-default group">
                    <div className="mb-4 p-3 bg-white/5 w-fit rounded-lg group-hover:scale-110 transition-transform">{item.icon}</div>
                    <h3 className="text-white font-bold mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Visual Element (Abstract or Photo Placeholder) */}
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur-3xl opacity-20 animate-pulse" />
             <div className="relative bg-[#0f1623] border border-white/10 rounded-2xl p-8 aspect-square flex flex-col justify-center items-center text-center overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                
                {/* Simulated Terminal Window */}
                <div className="w-full max-w-sm bg-black/80 backdrop-blur-md rounded-lg border border-white/10 p-6 font-mono text-sm text-left shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-green-400">$ whoami</p>
                    <p className="text-slate-300 pl-4">{userData.profile.name}</p>
                    <p className="text-green-400">$ current_role</p>
                    <p className="text-slate-300 pl-4">{userData.profile.role}</p>
                    <p className="text-green-400">$ uptime</p>
                    <p className="text-slate-300 pl-4">24/7 (Always Learning)</p>
                    <p className="text-green-400"><span className="animate-pulse">_</span></p>
                  </div>
                </div>

             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
