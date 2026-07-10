export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  coverImage?: string;
  tags: string[];
  category: 'frontend' | 'backend' | 'fullstack' | 'ai-ml' | 'systems' | 'research' | 'other';
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
  date: string;
  challenge?: string;
  solution?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance' | 'Academic';
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
  skills: string[];
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  institutionUrl?: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  grade?: string;
  activities?: string[];
  description?: string;
}

export interface Leadership {
  id: string;
  role: string;
  organization: string;
  organizationUrl?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
  highlights?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  category: string;
  coverImage?: string;
  content: string;
  featured: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  logo?: string;
}

export interface SkillGroup {
  category: string;
  items: {
    name: string;
    level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    iconName?: string;
  }[];
}
