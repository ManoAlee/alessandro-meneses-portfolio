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
    id: "help-desk",
    title: "Suporte Técnico & Help Desk",
    description: "Operações de Nível 1, 2 e 3, garantindo continuidade de negócios e resolução ágil de incidentes.",
    iconName: "Headset",
    skills: [
      { name: "Service Desk", category: "Core", featured: true },
      { name: "SLA Management", category: "Core" },
      { name: "Hardware Troubleshooting", category: "Core" },
      { name: "Gestão de Ativos", category: "Core" },
      { name: "Office 365", category: "Tool", featured: true },
      { name: "Jira / ServiceNow", category: "Tool" },
      { name: "Acesso Remoto (AnyDesk/TeamViewer)", category: "Tool" },
      { name: "Manutenção de Periféricos", category: "Core" },
      { name: "Suporte a Usuário Final", category: "Core" }
    ]
  },
  {
    id: "sysadmin",
    title: "Administração de Sistemas",
    description: "Gerenciamento robusto de servidores Windows e Linux, focando em segurança e estabilidade.",
    iconName: "Server",
    skills: [
      { name: "Windows Server (2012-2022)", category: "Core", featured: true },
      { name: "Linux (Ubuntu/Debian/CentOS)", category: "Core", featured: true },
      { name: "Active Directory", category: "Core", featured: true },
      { name: "Group Policy (GPO)", category: "Core" },
      { name: "DNS / DHCP / TCP-IP", category: "Core" },
      { name: "PowerShell Scripting", category: "Lang", featured: true },
      { name: "Bash Scripting", category: "Lang" },
      { name: "Gestão de Backups", category: "Core" }
    ]
  },
  {
    id: "cloud",
    title: "Cloud Computing & FinOps",
    description: "Arquitetura de nuvem escalável e otimização de custos em ambientes híbridos.",
    iconName: "Cloud",
    skills: [
      { name: "AWS (EC2, S3, RDS)", category: "Tool", featured: true },
      { name: "Azure (AD, VMs)", category: "Tool" },
      { name: "Google Cloud", category: "Tool" },
      { name: "Terraform (IaC)", category: "Tool", featured: true },
      { name: "Cloudflare", category: "Tool" },
      { name: "Otimização de Custos (FinOps)", category: "Core" },
      { name: "Migração de Servidores", category: "Core" }
    ]
  },
  {
    id: "security",
    title: "Cibersegurança & Compliance",
    description: "Implementação de defesa em profundidade, análise de vulnerabilidades e conformidade LGPD.",
    iconName: "ShieldAlert",
    skills: [
      { name: "Firewall Configuration", category: "Core" },
      { name: "VPN (OpenVPN/WireGuard)", category: "Tool" },
      { name: "Análise de Vulnerabilidade", category: "Core" },
      { name: "LGPD Compliance", category: "Core" },
      { name: "ISO 27001 Práticas", category: "Core", featured: true },
      { name: "Gestão de Identidade (IAM)", category: "Core" },
      { name: "Antivírus Corporativo", category: "Tool" }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Automação",
    description: "Criação de pipelines CI/CD e cultura de automação para acelerar entregas.",
    iconName: "Infinity",
    skills: [
      { name: "Docker & Containers", category: "Tool", featured: true },
      { name: "Kubernetes (K8s)", category: "Tool" },
      { name: "CI/CD (GitHub Actions)", category: "Tool", featured: true },
      { name: "Git & Version Control", category: "Tool" },
      { name: "Jenkins", category: "Tool" },
      { name: "Ansible", category: "Tool" },
      { name: "Automação de Infraestrutura", category: "Core" }
    ]
  },
  {
    id: "data",
    title: "Dados & Analytics",
    description: "Transformando dados brutos em inteligência de negócios acionável.",
    iconName: "Database",
    skills: [
      { name: "SQL (MySQL/PostgreSQL/SQL Server)", category: "Lang", featured: true },
      { name: "Power BI", category: "Tool", featured: true },
      { name: "Modelagem de Dados", category: "Core" },
      { name: "ETL Processes", category: "Core" },
      { name: "Excel Avançado / VBA", category: "Tool" },
      { name: "Python Pandas", category: "Lang" }
    ]
  }
];
