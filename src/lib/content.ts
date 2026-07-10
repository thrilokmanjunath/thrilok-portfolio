import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project, Experience, BlogPost, Certification, SkillGroup, Education, Leadership } from '@/types/portfolio';

const contentDirectory = path.join(process.cwd(), 'src/content');

// Helper to calculate reading time
function getReadingTime(text: string): string {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return `${time} min read`;
}

// Experience Loader
export function getExperiences(): Experience[] {
  const filePath = path.join(contentDirectory, 'experience.json');
  if (!fs.existsSync(filePath)) return [];
  const fileContent = fs.readFileSync(filePath, 'utf8');
  try {
    const data = JSON.parse(fileContent) as Experience[];
    return data.sort((a, b) => {
      if (a.current) return -1;
      if (b.current) return 1;
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
  } catch (error) {
    console.error('Error parsing experience.json:', error);
    return [];
  }
}

// Education Loader
export function getEducation(): Education[] {
  const filePath = path.join(contentDirectory, 'education.json');
  if (!fs.existsSync(filePath)) return [];
  const fileContent = fs.readFileSync(filePath, 'utf8');
  try {
    const data = JSON.parse(fileContent) as Education[];
    return data.sort((a, b) => {
      if (a.current) return -1;
      if (b.current) return 1;
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
  } catch (error) {
    console.error('Error parsing education.json:', error);
    return [];
  }
}

// Leadership Loader
export function getLeadership(): Leadership[] {
  const filePath = path.join(contentDirectory, 'leadership.json');
  if (!fs.existsSync(filePath)) return [];
  const fileContent = fs.readFileSync(filePath, 'utf8');
  try {
    const data = JSON.parse(fileContent) as Leadership[];
    return data.sort((a, b) => {
      if (a.current) return -1;
      if (b.current) return 1;
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
  } catch (error) {
    console.error('Error parsing leadership.json:', error);
    return [];
  }
}

// Certifications Loader
export function getCertifications(): Certification[] {
  const filePath = path.join(contentDirectory, 'certifications.json');
  if (!fs.existsSync(filePath)) return [];
  const fileContent = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(fileContent) as Certification[];
  } catch (error) {
    console.error('Error parsing certifications.json:', error);
    return [];
  }
}

// Skills Loader
export function getSkills(): SkillGroup[] {
  const filePath = path.join(contentDirectory, 'skills.json');
  if (!fs.existsSync(filePath)) return [];
  const fileContent = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(fileContent) as SkillGroup[];
  } catch (error) {
    console.error('Error parsing skills.json:', error);
    return [];
  }
}

// Projects Loader
export function getProjects(): Project[] {
  const dirPath = path.join(contentDirectory, 'projects');
  if (!fs.existsSync(dirPath)) return [];
  
  const files = fs.readdirSync(dirPath);
  const projects = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace(/\.md$/, '');
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      return {
        id: data.id || slug,
        slug,
        title: data.title || 'Untitled Project',
        description: data.description || '',
        longDescription: content, // use markdown body as long description
        coverImage: data.coverImage || '',
        tags: data.tags || [],
        category: data.category || 'other',
        repoUrl: data.repoUrl || '',
        liveUrl: data.liveUrl || '',
        featured: !!data.featured,
        date: data.date || '',
        challenge: data.challenge || '',
        solution: data.solution || '',
      } as Project;
    });

  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(contentDirectory, 'projects', `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  return {
    id: data.id || slug,
    slug,
    title: data.title || 'Untitled Project',
    description: data.description || '',
    longDescription: content,
    coverImage: data.coverImage || '',
    tags: data.tags || [],
    category: data.category || 'other',
    repoUrl: data.repoUrl || '',
    liveUrl: data.liveUrl || '',
    featured: !!data.featured,
    date: data.date || '',
    challenge: data.challenge || '',
    solution: data.solution || '',
  } as Project;
}

// Blog Posts Loader
export function getBlogPosts(): BlogPost[] {
  const dirPath = path.join(contentDirectory, 'blog');
  if (!fs.existsSync(dirPath)) return [];
  
  const files = fs.readdirSync(dirPath);
  const posts = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace(/\.md$/, '');
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      return {
        slug,
        title: data.title || 'Untitled Post',
        description: data.description || '',
        date: data.date || '',
        readingTime: getReadingTime(content),
        tags: data.tags || [],
        category: data.category || 'General',
        coverImage: data.coverImage || '',
        content,
        featured: !!data.featured,
      } as BlogPost;
    });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(contentDirectory, 'blog', `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  return {
    slug,
    title: data.title || 'Untitled Post',
    description: data.description || '',
    date: data.date || '',
    readingTime: getReadingTime(content),
    tags: data.tags || [],
    category: data.category || 'General',
    coverImage: data.coverImage || '',
    content,
    featured: !!data.featured,
  } as BlogPost;
}
