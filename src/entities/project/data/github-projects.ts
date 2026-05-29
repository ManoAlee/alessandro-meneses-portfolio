export interface ProjectSketch {
  id: string;
  name: string;
  description: string;
  language: "TypeScript" | "Python" | "HTML" | "JavaScript";
  status: "Public" | "Private";
  type: "Web" | "Data" | "Automation";
  imageUrl: string;
  lastUpdated?: string;
  repoUrl?: string;
}

export const GITHUB_PROJECTS: ProjectSketch[] = [
  {
    id: "portfolio",
    name: "alessandro-meneses-portfolio",
    description: "Meu portfólio profissional. Arquitetura FSD, React, Framer Motion e UX avançada.",
    language: "TypeScript",
    status: "Public",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "Updated now",
    repoUrl: "https://github.com/ManoAlee/alessandro-meneses-portfolio"
  },
  {
    id: "mcp-ssh",
    name: "MCP-SSH-TOOL",
    description: "Servidor MCP para conexões SSH.",
    language: "Python",
    status: "Public",
    type: "Automation",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "Updated recently",
    repoUrl: "https://github.com/ManoAlee/MCP-SSH-TOOL"
  },
  {
    id: "cartela",
    name: "Cartela",
    description: "Cartela — Interface gráfica e ferramentas para análise, sugestões e backtesting do Mega da Virada. Projeto reorganizado para distribuição.",
    language: "Python",
    status: "Public",
    type: "Data",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "Updated recently",
    repoUrl: "https://github.com/ManoAlee/Cartela"
  },
  {
    id: "petyoo",
    name: "petyoo-web",
    description: "Plataforma web para gestão de serviços pet e agendamentos. (Projeto Confidencial)",
    language: "TypeScript",
    status: "Private",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "Updated recently"
  },
  {
    id: "portal-ativos",
    name: "Portal-de-Ativos-Automotion",
    description: "Sistema de automação para controle de ativos corporativos.",
    language: "Python",
    status: "Private",
    type: "Automation",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "Updated recently"
  },
  {
    id: "app-chamados",
    name: "app-chamados-ti",
    description: "Sistema de HelpDesk para gestão de tickets e incidentes de TI.",
    language: "JavaScript",
    status: "Private",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "Updated recently"
  },
  {
    id: "backup-orch",
    name: "automacao-backup-orquestrador",
    description: "Orquestrador de backups automatizados com verificação de integridade.",
    language: "Python",
    status: "Private",
    type: "Automation",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "Updated recently"
  },
  {
    id: "medola",
    name: "pouso medola",
    description: "Landing page de alta conversão para cliente corporativo.",
    language: "JavaScript",
    status: "Private",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "Updated recently"
  }
];
