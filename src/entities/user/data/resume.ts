export interface ResumeData {
  personal: {
    name: string;
    role: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: {
    company: string;
    role: string;
    period: string;
    location: string;
    highlights: string[];
    isCurrent?: boolean;
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
    status?: string;
  }[];
  languages: {
    name: string;
    level: string;
  }[];
}

export const RESUME_CONTENT: ResumeData = {
  personal: {
    name: "Alessandro Meneses",
    role: "Desenvolvedor de Software & Analista de TI",
    email: "ale_meneses2004@hotmail.com",
    phone: "+55 (15) 99801-7732",
    location: "Boituva, SP - Brasil",
    linkedin: "https://www.linkedin.com/in/alessandro-meneses/",
    github: "https://github.com/ManoAlee",
  },
  summary: "Profissional de TI graduado em Gestão da Tecnologia da Informação pela FATEC. Atuo na Automotion desenvolvendo softwares, scripts de automação e sustentando soluções tecnológicas. Foco em desenvolvimento de aplicações modernas (TypeScript, React, Python), automação de rotinas corporativas e resolução ágil de problemas técnicos.",
  experience: [
    {
      company: "Automotion",
      role: "Analista de TI",
      period: "Jun 2026 - Presente",
      location: "Boituva, SP",
      isCurrent: true,
      highlights: [
        "Desenvolvimento e sustentação de sistemas, ferramentas internas e dashboards.",
        "Automação de processos corporativos com Python e PowerShell, aumentando a produtividade operacional.",
        "Suporte técnico avançado N2/N3 e administração de sistemas Windows e Linux."
      ]
    },
    {
      company: "Automotion",
      role: "Assistente de TI JR",
      period: "Jun 2025 - Jun 2026",
      location: "Boituva, SP",
      highlights: [
        "Automação de Rotinas: Criação de scripts em PowerShell para gestão de usuários, poupando 15h+ mensais da equipe.",
        "Segurança & Backups: Implementação de rotinas seguras e automatizadas de backup corporativo.",
        "Suporte & Diagnóstico: Atendimento N2/N3 e sustentação contínua de estações de trabalho e servidores."
      ]
    },
    {
      company: "BR Conecta",
      role: "Analista de Redes Júnior",
      period: "Jan 2024 - Fev 2024",
      location: "Boituva, SP",
      highlights: [
        "Conectividade: Diagnóstico e suporte direto a redes TCP/IP e conectividade de links corporativos.",
        "Satisfação do Cliente: Resolução ágil de chamados (First Call Resolution) mantendo alto índice de satisfação."
      ]
    }
  ],
  skills: [
    {
      category: "Desenvolvimento de Software",
      items: ["TypeScript", "JavaScript", "React", "Python", "Tailwind CSS", "Node.js", "REST APIs"]
    },
    {
      category: "Automação & Ferramentas",
      items: ["PowerShell", "Python Scripts", "Bash", "Git", "GitHub", "Automações Corporativas"]
    },
    {
      category: "Sistemas & Infraestrutura",
      items: ["Linux", "Windows Server", "Redes TCP/IP", "Active Directory", "Segurança da Informação"]
    }
  ],
  education: [
    {
      institution: "Fatec Tatuí",
      degree: "Gestão da Tecnologia da Informação",
      period: "2022 - 2025",
      status: "Graduado"
    },
    {
      institution: "SENAI 'Ítalo Bologna'",
      degree: "Power BI e Administração",
      period: "2023"
    }
  ],
  languages: [
    { name: "Português", level: "Nativo" },
    { name: "Inglês", level: "Técnico (B1)" }
  ]
};
