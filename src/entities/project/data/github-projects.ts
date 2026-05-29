export interface ProjectSketch {
  id: string;
  name: string;
  description: string;
  language: "TypeScript" | "Python" | "HTML" | "JavaScript" | "CSS" | "VB.NET" | "Shell" | "Rich Text" | "Other";
  status: "Public" | "Private";
  type: "Web" | "Data" | "Automation";
  imageUrl: string;
  lastUpdated?: string;
  repoUrl?: string;
}

export const GITHUB_PROJECTS: ProjectSketch[] = [
  {
    id: "portfolio",
    name: "alessandro-meneses-portfólio",
    description: "Meu portfólio profissional de Infraestrutura, Cloud & DevOps. Arquitetura FSD, React, TypeScript e Tailwind CSS.",
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
    description: "Servidor Model Context Protocol (MCP) desenvolvido para gerenciamento e execução de comandos SSH de forma integrada.",
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
    description: "Interface gráfica e ferramentas analíticas para sugestões e backtesting estatístico do sorteio da Mega da Virada.",
    language: "Python",
    status: "Public",
    type: "Data",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "Updated recently",
    repoUrl: "https://github.com/ManoAlee/Cartela"
  },
  {
    id: "portal-ativos",
    name: "Portal-de-Ativos-Automotion",
    description: "Sistema completo de automação e controle de inventário de hardware, termos de responsabilidade e ciclo de vida de ativos corporativos. (Projeto Corporativo / Privado)",
    language: "Python",
    status: "Private",
    type: "Automation",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "Updated recently"
  },
  {
    id: "backup-orch",
    name: "automacao-backup-orquestrador",
    description: "Orquestrador de backups corporativos automatizados, com relatórios inteligentes e suporte a Restic/Rclone. (Projeto Corporativo / Privado)",
    language: "Python",
    status: "Private",
    type: "Automation",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "Updated recently"
  },
  {
    id: "pouso-medola",
    name: "pouso medola",
    description: "Plataforma web interativa desenvolvida com foco em turismo, reserva e experiência do usuário final. (Projeto Confidencial)",
    language: "JavaScript",
    status: "Private",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "Updated recently"
  },
  {
    id: "petyoo-web",
    name: "petyoo-web",
    description: "Plataforma web moderna em TypeScript para agendamentos, serviços pet e gerenciamento administrativo. (Projeto Confidencial)",
    language: "TypeScript",
    status: "Private",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "Updated recently"
  },
  {
    id: "gpo-plus",
    name: "GPO-Plus",
    description: "Interface e scripts utilitários para criação, auditoria e facilitação de distribuição de diretivas de grupo (GPO). (Projeto Corporativo / Privado)",
    language: "VB.NET",
    status: "Private",
    type: "Automation",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "Updated recently"
  }
];
