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
    id: "freelanceros",
    name: "FreelancerOS",
    description: "The Ultimate Agentic Framework for Freelancers. Sistema operacional agêntico para gestão autônoma.",
    language: "HTML",
    status: "Public",
    type: "Web",
    imageUrl: "/images/projects/sketch-data.png", // Fits "Framework/OS"
    lastUpdated: "Updated 2 days ago",
    repoUrl: "https://github.com/ManoAlee/FreelancerOS"
  },
  {
    id: "cartela",
    name: "Cartela",
    description: "GUI and tools for Mega da Virada analysis, suggestions and backtesting. Project reorganized for distribution.",
    language: "Python",
    status: "Public",
    type: "Data",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "Updated 4 days ago",
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
    lastUpdated: "Updated 36 minutes ago"
  },
  {
    id: "portal-ativos",
    name: "Portal-de-Ativos-Automotion",
    description: "Sistema de automação para controle de ativos corporativos.",
    language: "Python",
    status: "Private",
    type: "Automation",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "Updated 3 days ago"
  },
  {
    id: "app-chamados",
    name: "app-chamados-ti",
    description: "Sistema de HelpDesk para gestão de tickets e incidentes de TI.",
    language: "JavaScript",
    status: "Private",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "Updated 4 days ago"
  },
  {
    id: "backup-orch",
    name: "automacao-backup-orquestrador",
    description: "Orquestrador de backups automatizados com verificação de integridade.",
    language: "Python",
    status: "Private",
    type: "Automation",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "Updated 4 days ago"
  },
  {
    id: "medola",
    name: "medola-landing",
    description: "Landing page de alta conversão para cliente corporativo.",
    language: "JavaScript",
    status: "Private",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "Updated last week"
  }
];
