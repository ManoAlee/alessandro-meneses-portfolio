export interface Project {
    title: string;
    description: string;
    details: string;
    impact: string;
    codeSnippet: string;
    tech: string[];
    type: string;
    github?: string;
    complexity: number;
    stats?: Record<string, string>;
}

export interface ExperienceJob {
    company: string;
    role: string;
    period: string;
    description: string;
    tags: string[];
}

export interface Education {
    institution: string;
    degree: string;
    period: string;
    status?: string;
}

export interface UserProfile {
    name: string;
    role: string;
    bio: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    github: string;
    location: string;
}

export interface UserSkills {
    infrastructure: string[];
    automation: string[];
    support: string[];
    data: string[];
    languages: string[];
}

export interface SetupItem {
    name: string;
    value: string;
}

export interface UserData {
    profile: UserProfile;
    skills: UserSkills;
    experience: ExperienceJob[];
    education: Education[];
    certifications: string[];
    projects: Project[];
    setup: {
        workstation: SetupItem[];
        hardware: SetupItem[];
    };
}