export interface CareerItem {
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string;
  tags: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  status?: string;
  tags?: string[];
}

export const CAREER_DATA: CareerItem[] = [
  {
    company: "Automotion",
    role: "Analista de TI",
    period: "Junho 2026 - Presente",
    location: "Boituva, SP",
    description: "Desenvolvimento e sustentação de sistemas internos, painéis analíticos e ferramentas web. Automação de processos corporativos com Python e PowerShell, aumentando a produtividade das equipes e garantindo continuidade operacional.",
    tags: ["Software", "TypeScript", "Python", "Automação"]
  },
  {
    company: "Automotion",
    role: "Assistente de TI JR",
    period: "Junho 2025 - Junho 2026",
    location: "Boituva, SP",
    description: "Atendimento de suporte técnico N2/N3 aos colaboradores locais e remotos. Administração de servidores Windows/Linux, gestão de acessos no Active Directory, rotinas de backup e scripts em PowerShell para automação de tarefas manuais.",
    tags: ["Suporte N2/N3", "Windows & Linux", "PowerShell", "Active Directory"]
  },
  {
    company: "BR Conecta",
    role: "Analista de Redes Júnior",
    period: "Janeiro 2024 - Fevereiro 2024",
    location: "Boituva, SP",
    description: "Suporte técnico focado em conectividade de dados e redes corporativas TCP/IP. Diagnóstico ágil de incidentes de rede com alto índice de satisfação do cliente.",
    tags: ["Redes TCP/IP", "Diagnóstico", "Suporte Técnico"]
  },
  {
    company: "Bellacor Indústria e Comércio",
    role: "Assistente de Produção",
    period: "Abril 2024 - Dezembro 2024",
    location: "Boituva, SP",
    description: "Preparação de materiais, operação de equipamentos e controle de qualidade operacional.",
    tags: ["Processos", "Qualidade", "Organização"]
  },
  {
    company: "Schmersal Brasil",
    role: "Assistente Administrativo",
    period: "Janeiro 2023 - Dezembro 2023",
    location: "Boituva, SP",
    description: "Controle de documentação, apoio em processos administrativos e conformidade com normas de qualidade.",
    tags: ["Administrativo", "Processos"]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
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
];
