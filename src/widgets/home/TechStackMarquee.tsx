import { motion, useAnimationControls } from "framer-motion";
import { useState, useEffect } from "react";
import { TechModal } from "@/shared/ui/TechModal";

const TECH_DATA = [
  { 
    name: "TypeScript", 
    category: "Linguagem",
    desc: "Superset tipado do JavaScript que traz robustez, produtividade e menos erros em produção.",
    useCase: "Desenvolvimento de aplicações web modulares e seguras com tipagem estrita."
  },
  { 
    name: "React", 
    category: "Frontend",
    desc: "Biblioteca para construção de interfaces de usuário dinâmicas e reativas baseadas em componentes.",
    useCase: "Desenvolvimento de portfólios, dashboards corporativos e aplicações SPA modernas."
  },
  { 
    name: "Python", 
    category: "Linguagem & Automação",
    desc: "Linguagem de alto nível ideal para desenvolvimento ágil, scripting e automações.",
    useCase: "Criação de scripts de processamento de dados, automações corporativas e integrações de APIs."
  },
  { 
    name: "PowerShell", 
    category: "Automação",
    desc: "Ambiente de linha de comando e scripting focado em automação de tarefas e administração de sistemas.",
    useCase: "Automação de rotinas corporativas, gestão de usuários e economia de tempo da equipe técnica."
  },
  { 
    name: "Tailwind CSS", 
    category: "Estilização",
    desc: "Framework CSS utility-first que permite construir designs rápidos, responsivos e de alto padrão.",
    useCase: "Construção de layouts limpos, consistentes e com ótimo acabamento visual."
  },
  { 
    name: "Node.js", 
    category: "Backend",
    desc: "Ambiente de execução JavaScript assíncrono para construção de APIs e ferramentas CLI.",
    useCase: "Desenvolvimento de pequenos microsserviços, automações e tooling de desenvolvimento."
  },
  { 
    name: "Git & GitHub", 
    category: "Versionamento",
    desc: "Controle de versão distribuído essencial para rastreabilidade de código e colaboração contínua.",
    useCase: "Versionamento seguro de todos os projetos de software e repositórios open-source."
  },
  { 
    name: "Linux", 
    category: "Sistema Operacional",
    desc: "Sistema operacional robusto, estável e amplamente utilizado em servidores e ambientes de TI.",
    useCase: "Configuração de serviços, servidores Debian/Ubuntu e scripts em Bash."
  },
  { 
    name: "Windows Server", 
    category: "Infraestrutura",
    desc: "Plataforma de servidores para gestão centralizada de identidades, arquivos e recursos.",
    useCase: "Administração de Active Directory, permissões, políticas e suporte N2/N3."
  },
  { 
    name: "Power BI", 
    category: "Dados & Métricas",
    desc: "Ferramenta líder para análise de dados e geração de dashboards e relatórios interativos.",
    useCase: "Modelagem de indicadores de TI e apresentação clara de métricas para tomada de decisão."
  }
];

export function TechStackMarquee() {
  const [selectedTech, setSelectedTech] = useState<typeof TECH_DATA[0] | null>(null);
  const controls = useAnimationControls();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      controls.stop();
    } else {
      controls.start({
        x: [0, -1000],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          },
        },
      });
    }
  }, [isHovered, controls]);

  return (
    <div className="py-12 border-y border-border/40 bg-muted/20 relative overflow-hidden">
      <div className="container mb-6 text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Tecnologias & Ferramentas do Dia a Dia
        </span>
      </div>

      <div 
        className="flex w-max relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={controls}
          className="flex gap-4 sm:gap-6 items-center px-4"
        >
          {/* Double items for smooth infinite loop */}
          {[...TECH_DATA, ...TECH_DATA].map((tech, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedTech(tech)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-border/60 bg-card hover:border-primary/50 hover:bg-secondary/40 transition-all text-xs sm:text-sm font-medium shadow-sm hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-primary/80" />
              <span className="font-semibold text-foreground">{tech.name}</span>
              <span className="text-muted-foreground text-[11px]">({tech.category})</span>
            </div>
          ))}
        </motion.div>
      </div>

      <TechModal 
        isOpen={!!selectedTech} 
        onClose={() => setSelectedTech(null)} 
        tech={selectedTech} 
      />
    </div>
  );
}
