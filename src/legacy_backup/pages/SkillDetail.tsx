import { useParams, useNavigate } from "react-router-dom";
import { userData } from "../data/user";
import { ArrowLeft, Cpu, Network, Share2, Layers, Database, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";

export default function SkillDetail() {
  const { skillId } = useParams();
  const navigate = useNavigate();

  // Helper to find skill category and details
  const findSkill = () => {
    for (const [category, skills] of Object.entries(userData.skills)) {
        if (skills.includes(skillId || "")) {
            return { category, name: skillId };
        }
    }
    return null;
  };

  const skill = findSkill();

  if (!skill) {
    return (
        <div className="min-h-screen flex items-center justify-center text-white font-mono">
            ERR: SKILL_NOT_FOUND // RETURN_TO_BASE
        </div>
    );
  }

  // Find related projects using this skill
  const relatedProjects = userData.projects.filter(p => p.tech.includes(skill.name!));

  return (
    <div className="min-h-screen bg-[#050a14] text-white pt-24 pb-12 relative overflow-hidden">
        {/* Schematic Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 z-10 relative">
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-2 text-primary hover:text-white mb-8 group font-mono"
            >
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
                BACK_TO_GRID
            </button>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Left: Hologram Visual */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative border border-primary/30 bg-[#0f1623]/80 backdrop-blur rounded-2xl p-8 overflow-hidden group"
                >
                    {/* Rotating Rings Animation */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-dashed border-purple-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                    
                    <div className="text-center relative z-10 py-20">
                        <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center border border-primary mb-6 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                            <Cpu size={48} className="text-primary" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-2 uppercase tracking-tight">{skill.name}</h1>
                        <div className="text-sm font-mono text-primary/60 border border-primary/20 inline-block px-3 py-1 rounded">
                            ID: {skill.name?.toUpperCase().replace(/\s+/g, "_")} // CAT: {skill.category.toUpperCase()}
                        </div>
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />
                </motion.div>

                {/* Right: Technical Details */}
                <div className="space-y-8">
                    <Reveal>
                        <div className="border-l-2 border-primary/20 pl-6">
                            <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
                                <Database size={20} className="text-purple-400" />
                                CORE_DESCRIPTION
                            </h2>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                {getDescription(skill.name!)}
                            </p>
                        </div>
                    </Reveal>

                    <Reveal>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
                                <Layers size={20} className="text-green-400" />
                                ASSOCIATED_MODULES (Projetos)
                            </h2>
                            {relatedProjects.length > 0 ? (
                                <div className="space-y-4">
                                    {relatedProjects.map((p, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 bg-black/20 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-white/5 hover:border-primary/30">
                                            <div className="mt-1 text-primary">
                                                <Terminal size={16} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white">{p.title}</h3>
                                                <p className="text-sm text-slate-400 line-clamp-1">{p.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-500 italic">Nenhum projeto registrado diretamente com esta tecnologia.</p>
                            )}
                        </div>
                    </Reveal>

                    {/* Stats Graph Simulation */}
                    <Reveal>
                        <div className="bg-black/40 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                            <h2 className="text-sm font-bold text-slate-500 mb-4 uppercase">Proficiency_Graph</h2>
                            <div className="flex items-end gap-2 h-24">
                                {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ delay: i * 0.1, duration: 0.5 }}
                                        className="flex-1 bg-primary/20 border-t border-primary/50 relative group"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.div>
                                ))}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    </div>
  );
}

// Helper to fake descriptions since user.ts doesn't have them for skills
function getDescription(skill: string) {
    const map: Record<string, string> = {
        "Windows Server": "Experiência avançada em administração de ambientes Windows Server (2016/2019/2022), incluindo gestão de AD DS, GPOs, DNS e DHCP em infraestruturas híbridas.",
        "Linux": "Domínio de distribuições Debian/Ubuntu/CentOS para servidores web, bancos de dados e automação. Shell Scripting avançado e hardening de segurança.",
        "PowerShell": "Automação de tarefas administrativas, scripts de backup, gerenciamento de usuários em massa e integração com APIs.",
        "Python": "Desenvolvimento de scripts para monitoramento, web scraping de dados e automação de processos de infraestrutura.",
        "Proxmox": "Gerenciamento de clusters de virtualização, containers LXC e VMs, focando em alta disponibilidade e backup.",
    };
    return map[skill] || `Expertise técnica aplicada em ${skill}, focada em implementação otimizada, segurança e escalabilidade em ambientes corporativos.`;
}
