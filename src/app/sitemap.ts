import { MetadataRoute } from 'next';
import { getBlogPosts, getProjects } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thrilok.dev'; // workspace domain placeholder

  // Static routes
  const staticPaths = ['', '/about', '/projects', '/blog', '/contact'];
  const staticRoutes = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : 0.8,
  }));

  // Dynamic project routes
  const projects = getProjects();
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects`, // projects are shown in modals, but if we route individually we map it
    lastModified: new Date(project.date || new Date()).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic blog routes
  const posts = getBlogPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date || new Date()).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
