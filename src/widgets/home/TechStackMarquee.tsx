import { motion, useAnimationControls } from "framer-motion";
import { useState, useEffect } from "react";
import { TechModal } from "@/shared/ui/TechModal";

const TECH_DATA = [
  { 
      name: "Docker", 
      category: "Containerization",
      desc: "Plataforma líder para desenvolvimento, envio e execução de aplicações em containers.",
      useCase: "Criação de ambientes de desenvolvimento reproduzíveis e deploy de microsserviços isolados."
  },
  { 
      name: "Kubernetes", 
      category: "Orchestration",
      desc: "Sistema open-source para automação de deployment, escalabilidade e gerenciamento de aplicações em containers.",
      useCase: "Gerenciamento de clusters de produção com self-healing e auto-scaling horizontal."
  },
  { 
      name: "AWS", 
      category: "Cloud Provider",
      desc: "Plataforma de computação em nuvem mais abrangente e adotada do mundo.",
      useCase: "Hospedagem de infraestrutura escalável utilizando EC2, S3, RDS e arquiteturas Serverless."
  },
  { 
      name: "Terraform", 
      category: "IaC",
      desc: "Ferramenta de infraestrutura como código (IaC) para construir, alterar e versionar infraestrutura com segurança.",
      useCase: "Provisionamento declarativo de recursos multi-cloud (AWS/Azure) garantindo consistência entre ambientes."
  },
  { 
      name: "Ansible", 
      category: "Automation",
      desc: "Ferramenta de automação de TI simples, sem agentes, que automatiza provisionamento e gerenciamento de configurações.",
      useCase: "Automação de rotinas de patch management e configuração padronizada de servidores Linux/Windows."
  },
  { 
      name: "Python", 
      category: "Language",
      desc: "Linguagem de programação interpretada de alto nível, famosa por sua legibilidade e vasto ecossistema.",
      useCase: "Desenvolvimento de scripts de automação, ferramentas CLI e análise de dados para observabilidade."
  },
  { 
      name: "Proxmox", 
      category: "Virtualization",
      desc: "Ambiente de gerenciamento de servidores open-source completo para virtualização empresarial.",
      useCase: "Gestão do Homelab e ambientes de virtualização on-premise com containers LXC e VMs KVM."
  },
  { 
      name: "React", 
      category: "Frontend",
      desc: "Biblioteca JavaScript para criar interfaces de usuário baseadas em componentes.",
      useCase: "Desenvolvimento deste portfólio e dashboards administrativos modernos e responsivos."
  },
  { 
      name: "Git", 
      category: "VCS",
      desc: "Sistema de controle de versão distribuído gratuito e de código aberto.",
      useCase: "Versionamento de código-fonte e colaboração segura com fluxos de CI/CD baseados em GitFlow."
  }
];

export function TechStackMarquee() {
  const controls = useAnimationControls();
  const [selectedTech, setSelectedTech] = useState<typeof TECH_DATA[0] | null>(null);

  const startAnimation = () => controls.start({ x: "-50%", transition: { duration: 40, ease: "linear", repeat: Infinity } });
  
  useEffect(() => { startAnimation(); }, []);

  return (
    <>
      <div className="w-full overflow-hidden bg-background/50 border-y border-white/5 py-8 backdrop-blur-sm relative group/marquee">
        <div className="flex relative items-center">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div 
            className="flex gap-20 whitespace-nowrap px-4 w-max"
            animate={controls}
            initial={{ x: 0 }}
            onHoverStart={() => controls.stop()}
            onHoverEnd={() => startAnimation()}
            onTapStart={() => controls.stop()}
            onTapCancel={() => startAnimation()}
            onTap={() => controls.stop()}
          >
            {[...TECH_DATA, ...TECH_DATA, ...TECH_DATA].map((tech, index) => (
               <div 
                 key={`${tech.name}-${index}`}
                 className="relative group cursor-pointer"
                 onClick={() => setSelectedTech(tech)}
               >
                  <span className="text-2xl md:text-3xl font-display font-medium text-muted-foreground/30 transition-all duration-300 group-hover:text-primary group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] block">
                    {tech.name}
                  </span>
                  
                  {/* Click Hint */}
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to info
                  </span>
               </div>
            ))}
          </motion.div>
        </div>
      </div>

      <TechModal 
        tech={selectedTech} 
        isOpen={!!selectedTech} 
        onClose={() => setSelectedTech(null)} 
      />
    </>
  );
}
