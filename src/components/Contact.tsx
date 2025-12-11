import { useState } from "react"; // NEW
import { userData } from "../data/user";
import { Mail, Linkedin, Github, Send, Terminal, Copy, Check } from "lucide-react"; // Added Copy, Check
import Reveal from "./Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(userData.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 bg-[#050a14] relative overflow-hidden">
        {/* Matrix Rain / Hex Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
            <Reveal width="100%">
                <div className="bg-[#0b101b]/80 backdrop-blur-md border border-primary/20 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden">
                    {/* Decorative Top Bar */}
                    <div className="absolute top-0 left-0 w-full h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        <div className="ml-auto text-[10px] font-mono text-white/30">SECURE_TRANSMISSION_PROTOCOL</div>
                    </div>

                    <div className="text-center mb-12 mt-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wider">
                            <span className="text-primary">&lt;</span> Fale Comigo <span className="text-primary">/&gt;</span>
                        </h2>
                        <p className="text-slate-400 text-lg">
                            Estou disponível para projetos de infraestrutura, automação ou uma conversa sobre tecnologia.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Direct Links */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-mono text-primary mb-6 flex items-center gap-2">
                                <Terminal size={18} /> CANAIS_DIRETOS:
                            </h3>
                            
                            <div className="relative group">
                                <a 
                                    href={`mailto:${userData.profile.email}`}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-primary/10 hover:border-primary/50 transition-all pr-16"
                                >
                                    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wider">Email Protocol</div>
                                        <div className="text-white font-mono text-sm md:text-base">{userData.profile.email}</div>
                                    </div>
                                </a>
                                
                                <button
                                    onClick={(e) => { e.preventDefault(); handleCopy(); }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-slate-400 hover:text-white transition-all"
                                    title="Copiar Email"
                                >
                                    {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                                </button>
                            </div>

                            <div className="flex gap-4">
                                <a 
                                    href="https://www.linkedin.com/in/alessandro-meneses/"
                                    target="_blank" rel="noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl bg-[#0077b5]/10 border border-[#0077b5]/30 hover:bg-[#0077b5] hover:text-white text-[#0077b5] transition-all"
                                >
                                    <Linkedin size={20} /> LinkedIn
                                </a>
                                <a 
                                    href="https://github.com/ManoAlee"
                                    target="_blank" rel="noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl bg-white/5 border border-white/20 hover:bg-white hover:text-black text-white transition-all"
                                >
                                    <Github size={20} /> GitHub
                                </a>
                            </div>
                        </div>

                        {/* Visual Form Decor */}
                        <div className="relative border-l border-white/10 pl-12 hidden md:block">
                            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary to-transparent opacity-50" />
                            <div className="font-mono text-sm text-slate-500 space-y-4">
                                <p><span className="text-purple-400">const</span> <span className="text-blue-400">Contact</span> = <span className="text-yellow-400">{"{"}</span></p>
                                <p className="pl-4">status: <span className="text-green-400">'Open to Work'</span>,</p>
                                <p className="pl-4">response_time: <span className="text-green-400">'&lt; 24h'</span>,</p>
                                <p className="pl-4">location: <span className="text-green-400">'{userData.profile.location}'</span>,</p>
                                <p className="pl-4">focus: <span className="text-yellow-400">['DevOps', 'Infra', 'Sec']</span></p>
                                <p><span className="text-yellow-400">{"}"}</span>;</p>
                                
                                <div className="mt-8 p-4 bg-black/50 rounded border border-green-500/30 text-green-400 text-xs animate-pulse">
                                    _Aguardando input do usuário...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>

            {/* Footer */}
            <div className="text-center mt-20 pb-8 border-t border-white/5 pt-8">
                <p className="text-slate-600 text-sm font-mono">
                    DESIGNED_BY: SYSTEM.AI // DEPLOYED_FOR: {userData.profile.name.toUpperCase()}
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}
