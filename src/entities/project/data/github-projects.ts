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
    description: "Portfólio profissional interativo desenvolvido com arquitetura Feature-Sliced Design (FSD), React 18, TypeScript e Framer Motion. Apresenta animações avançadas, sistema de temas dark/light, navegação fluida e componentes modernos com glassmorphism.",
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
    description: "Framework agêntico completo para freelancers e profissionais autônomos. Sistema operacional web que integra gestão de projetos, automação de tarefas, controle financeiro e workflows inteligentes. Projetado para maximizar produtividade através de agentes autônomos.",
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
    description: "Sistema completo de análise estatística para Mega da Virada com interface gráfica moderna. Inclui ferramentas avançadas de análise de padrões, geração de sugestões baseadas em dados históricos, backtesting de estratégias e visualização de resultados. Desenvolvido em Python com foco em ciência de dados.",
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
    description: "Plataforma web completa para gestão de serviços veterinários e pet shops. Sistema integrado com agendamento online, gestão de clientes e pets, controle de serviços, histórico médico e notificações automatizadas. Interface responsiva e moderna desenvolvida em TypeScript. (Projeto Confidencial)",
    language: "TypeScript",
    status: "Private",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "Updated 36 minutes ago"
  },
  {
    id: "portal-ativos",
    name: "Portal-de-Ativos-Automotion",
    description: "Portal corporativo automatizado para gestão completa de ativos e inventário de TI. Sistema robusto com rastreamento em tempo real, automação de relatórios, alertas de manutenção preventiva, integração com Active Directory e dashboards analíticos. Desenvolvido em Python para máxima eficiência operacional.",
    language: "Python",
    status: "Private",
    type: "Automation",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "Updated 3 days ago"
  },
  {
    id: "app-chamados",
    name: "app-chamados-ti",
    description: "Sistema completo de HelpDesk para gestão profissional de tickets e incidentes de TI. Plataforma com sistema de priorização automática, SLA tracking, base de conhecimento integrada, notificações em tempo real, relatórios analíticos e dashboards gerenciais. Interface intuitiva desenvolvida em JavaScript.",
    language: "JavaScript",
    status: "Private",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "Updated 4 days ago"
  },
  {
    id: "backup-orch",
    name: "automacao-backup-orquestrador",
    description: "Orquestrador avançado de backups automatizados com múltiplas camadas de segurança. Sistema robusto com verificação de integridade de dados, criptografia AES-256, rotação automática, monitoramento em tempo real, alertas inteligentes e relatórios detalhados. Suporta múltiplos destinos e estratégias de retenção.",
    language: "Python",
    status: "Private",
    type: "Automation",
    imageUrl: "/images/projects/sketch-data.png",
    lastUpdated: "Updated 4 days ago"
  },
  {
    id: "medola",
    name: "medola-landing",
    description: "Landing page corporativa de alta performance com foco em conversão e experiência do usuário. Design responsivo otimizado para SEO, carregamento ultra-rápido, animações suaves, formulários inteligentes com validação em tempo real e integração com ferramentas de analytics. Desenvolvida em JavaScript moderno.",
    language: "JavaScript",
    status: "Private",
    type: "Web",
    imageUrl: "/images/projects/sketch-app.png",
    lastUpdated: "Updated last week"
  }
];
