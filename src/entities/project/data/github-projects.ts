export interface ProjectSketch {
  id: string;
  name: string;
  description: string;
  language: "TypeScript" | "Python" | "HTML" | "JavaScript" | "Shell";
  status: "Public" | "Private";
  type: "Web" | "Data" | "Automation";
  imageUrl: string;
  lastUpdated?: string;
  repoUrl?: string;
}

export const GITHUB_PROJECTS: ProjectSketch[] = [
  {
    id: "freelanceros",
    name: "FreelancerOS",
    description: "Framework agêntico para freelancers — orquestração inteligente de tarefas, pipelines de trabalho e automações.",
    language: "TypeScript",
    status: "Public",
    type: "Automation",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/FreelancerOS"
  },
  {
    id: "portfolio",
    name: "alessandro-meneses-portfolio",
    description: "Portfólio profissional moderno construído com React, TypeScript, TailwindCSS e arquitetura modular.",
    language: "TypeScript",
    status: "Public",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/alessandro-meneses-portfolio"
  },
  {
    id: "dashboard-remuneracao",
    name: "dashboard-remuneracao",
    description: "Dashboard analítico e interativo para visualização clara de métricas, metas e remuneração.",
    language: "TypeScript",
    status: "Public",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/dashboard-remuneracao"
  },
  {
    id: "bits-coins-ia",
    name: "Bits-coins-ia",
    description: "Ferramenta em Python para análise e inteligência de dados de criptomoedas com processamento automatizado.",
    language: "Python",
    status: "Public",
    type: "Data",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/Bits-coins-ia"
  },
  {
    id: "cartela",
    name: "Cartela",
    description: "Aplicação GUI em Python para análise probabilística, filtros e backtesting estatístico com visualização clara.",
    language: "Python",
    status: "Public",
    type: "Data",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/Cartela"
  },
  {
    id: "custom-binary-studio",
    name: "custom-binary-studio",
    description: "Interface web para inspeção, estúdio de formatos binários e análise estruturada.",
    language: "HTML",
    status: "Public",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/custom-binary-studio"
  },
  {
    id: "portal-ativos",
    name: "Portal de Ativos Corporativos",
    description: "Sistema interno para inventário, gestão e controle automatizado de ativos de TI corporativos.",
    language: "Python",
    status: "Private",
    type: "Automation",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "Automotion"
  },
  {
    id: "app-chamados",
    name: "Sistema de Chamados & HelpDesk",
    description: "Plataforma de gestão de chamados técnicos, SLA e atendimento N2/N3 para equipe de suporte.",
    language: "TypeScript",
    status: "Private",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "Automotion"
  }
];
