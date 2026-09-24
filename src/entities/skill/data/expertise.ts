export interface SkillItem {
  name: string;
  level?: number; 
  category: "Core" | "Tool" | "Lang";
  featured?: boolean;
}

export interface DomainData {
  id: string;
  title: string;
  description: string;
  iconName: string;
  skills: SkillItem[];
}

export type SkillDomain = DomainData;

export const EXPERTISE_DATA: DomainData[] = [
  {
    id: "software",
    title: "Desenvolvimento de Software",
    description: "Construção de aplicações modernas, responsivas e modulares utilizando o ecossistema TypeScript, React e Python.",
    iconName: "Code2",
    skills: [
      { name: "TypeScript", category: "Lang", featured: true },
      { name: "JavaScript (ES6+)", category: "Lang", featured: true },
      { name: "React", category: "Core", featured: true },
      { name: "HTML5 / Semantic Web", category: "Core" },
      { name: "Tailwind CSS", category: "Tool", featured: true },
      { name: "Node.js", category: "Core" },
      { name: "REST APIs", category: "Core", featured: true },
      { name: "Git & GitHub", category: "Tool", featured: true }
    ]
  },
  {
    id: "automation",
    title: "Automação & Scripting",
    description: "Desenvolvimento de scripts para automatizar processos manuais, integração de sistemas e rotinas corporativas.",
    iconName: "Terminal",
    skills: [
      { name: "Python Scripting", category: "Lang", featured: true },
      { name: "PowerShell", category: "Lang", featured: true },
      { name: "Bash", category: "Lang" },
      { name: "Automação de Rotinas", category: "Core", featured: true },
      { name: "Manipulação de Arquivos e APIs", category: "Core" },
      { name: "CLI Tools", category: "Core" },
      { name: "Integração de Sistemas", category: "Core" }
    ]
  },
  {
    id: "systems-support",
    title: "Sistemas & Suporte de TI",
    description: "Sustentação contínua de infraestrutura de TI, atendimento técnico N2/N3 e administração de estações de trabalho.",
    iconName: "Headphones",
    skills: [
      { name: "Windows Server & Desktop", category: "Core", featured: true },
      { name: "Linux (Debian/Ubuntu)", category: "Core", featured: true },
      { name: "Active Directory (AD)", category: "Core", featured: true },
      { name: "Redes TCP/IP & VPN", category: "Core" },
      { name: "Troubleshooting de Hardware", category: "Core" },
      { name: "Gestão de Backups Corporativos", category: "Core", featured: true },
      { name: "HelpDesk N2 / N3", category: "Core", featured: true }
    ]
  },
  {
    id: "data-bi",
    title: "Dados & Dashboards",
    description: "Organização, modelagem e visualização de dados operacionais para acompanhamento claro de indicadores.",
    iconName: "BarChart3",
    skills: [
      { name: "Power BI", category: "Tool", featured: true },
      { name: "Modelagem de Dados", category: "Core" },
      { name: "Dashboards Interativos", category: "Core", featured: true },
      { name: "Excel Avançado", category: "Tool" },
      { name: "SQL Básico", category: "Lang" },
      { name: "Indicadores e Métricas", category: "Core" }
    ]
  }
];
