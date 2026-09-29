export interface ProjectSketch {
  id: string;
  name: string;
  description: string;
  language: "TypeScript" | "Python" | "HTML" | "JavaScript" | "Shell" | "Visual Basic .NET" | "CSS";
  status: "Public" | "Private";
  type: "Web" | "Data" | "Automation";
  imageUrl: string;
  lastUpdated?: string;
  repoUrl?: string;
}

export const GITHUB_PROJECTS: ProjectSketch[] = [
  {
    id: "mcp-ssh-tool",
    name: "MCP-SSH-TOOL",
    description: "Enterprise Model Context Protocol (MCP) server para orquestração remota segura de infraestrutura SSH, execução determinística de comandos e sincronização automatizada via SFTP.",
    language: "Python",
    status: "Public",
    type: "Automation",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/MCP-SSH-TOOL"
  },
  {
    id: "mcp-m365",
    name: "MCP-M365-MICROSOFT",
    description: "Servidor Model Context Protocol (MCP) corporativo para governança do Microsoft 365, auditoria de caixas de correio Exchange, administração Graph API e gestão automatizada de usuários.",
    language: "Python",
    status: "Public",
    type: "Automation",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/MCP-M365-MICROSOFT"
  },
  {
    id: "sre-backup-dashboard",
    name: "sre-backup-dashboard",
    description: "Plataforma de observabilidade SRE para infraestrutura corporativa: monitoramento de backups automatizados, telemetria de storage e integridade de antivírus.",
    language: "TypeScript",
    status: "Public",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/sre-backup-dashboard"
  },
  {
    id: "antigravity-models",
    name: "antigravity-models",
    description: "Hub e ecossistema de orquestração agêntica: acervo de 180+ cognitive skills, 14 servidores MCP, modelos locais e guardrails de segurança cibernética.",
    language: "JavaScript",
    status: "Public",
    type: "Automation",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/antigravity-models"
  },
  {
    id: "contadores-snmp",
    name: "contadores",
    description: "Enterprise Printer SNMP Meter Monitor: console desktop em CustomTkinter para monitoramento SNMP automatizado de impressoras corporativas Lexmark/HP e telemetria de volumetria.",
    language: "Python",
    status: "Public",
    type: "Automation",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/contadores"
  },
  {
    id: "dashboard-remuneracao",
    name: "dashboard-remuneracao",
    description: "Dashboard analítico de remuneração e RH: matriz 9-Box interativa, simuladores de metas e comissões, visualização de dados em tempo real com Recharts.",
    language: "TypeScript",
    status: "Public",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/dashboard-remuneracao"
  },
  {
    id: "gpo-plus",
    name: "GPO-Plus",
    description: "Console avançado de gerenciamento e editor de Diretivas de Grupo (GPO) para Windows: edição de políticas ADMX/ADML, desbloqueio de edições Home/Pro e orquestração Sysvol.",
    language: "Visual Basic .NET",
    status: "Public",
    type: "Automation",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/GPO-Plus"
  },
  {
    id: "custom-binary-studio",
    name: "custom-binary-studio",
    description: "Laboratório computacional de alta performance: shaders WebGPU/WebGL2, neurodinâmica Hodgkin-Huxley, relatividade de buraco negro de Kerr e atratores caóticos.",
    language: "HTML",
    status: "Public",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/custom-binary-studio"
  },
  {
    id: "bits-coins-ia",
    name: "Bits-coins-ia",
    description: "Universo Bitcoin: representação computacional viva e multicamada do Bitcoin integrando evolução orgânica, manifolds cognitivos, Next.js 15 e topologia matemática.",
    language: "Python",
    status: "Public",
    type: "Data",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/Bits-coins-ia"
  },
  {
    id: "criptcoins",
    name: "Criptcoins",
    description: "Galaxy Bitcoin System: Ψ Cognitive Engine conectando geometria diferencial, manifolds criptográficos biométricos, kernels topológicos e telemetria em tempo real.",
    language: "Python",
    status: "Public",
    type: "Data",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/Criptcoins"
  },
  {
    id: "vapine-sentinel",
    name: "VaPiNe",
    description: "VaPiNe Sentinel: motor de orquestração remota de alta resiliência, multifrequência e broker descentralizado de telemetria distribuída P2P.",
    language: "JavaScript",
    status: "Public",
    type: "Automation",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/VaPiNe"
  },
  {
    id: "observable-universe",
    name: "Observable-Universe",
    description: "Observable Universe (Zero-Entropy): grafo dinâmico de conhecimento astronômico, documentação em multiescala e motor de visualização científica interativa.",
    language: "TypeScript",
    status: "Public",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/Observable-Universe"
  },
  {
    id: "cartela",
    name: "Cartela",
    description: "Suite analítica probabilística e engine estatístico calibrado via testes de aleatoriedade NIST SP 800-22 com GUI em Python e algoritmos preditivos.",
    language: "Python",
    status: "Public",
    type: "Data",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/Cartela"
  },
  {
    id: "freelanceros",
    name: "FreelancerOS",
    description: "FreelancerOS: sistema operacional digital corporativo para automação de tarefas, orquestração de clientes e pipelines zero-touch de produtividade.",
    language: "HTML",
    status: "Public",
    type: "Automation",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/FreelancerOS"
  },
  {
    id: "giovanni-savassa-portfolio",
    name: "giovanni-savassa-portfolio",
    description: "Portfólio de Business Intelligence & Data Analytics: showcase interativo de projetos, analytics em SQL/Python, dashboards Power BI e design responsivo.",
    language: "CSS",
    status: "Public",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/giovanni-savassa-portfolio"
  },
  {
    id: "portfolio",
    name: "alessandro-meneses-portfolio",
    description: "Portfólio profissional de Engenharia de TI, Sistemas de IA & Fullstack moderno: React 18, TypeScript, TailwindCSS, performance de ponta e showcase deep-tech.",
    language: "TypeScript",
    status: "Public",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "2026",
    repoUrl: "https://github.com/ManoAlee/alessandro-meneses-portfolio"
  }
];
