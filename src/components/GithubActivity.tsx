import React from "react";
import { Github, Star, GitFork, ArrowUpRight, FolderGit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Repository {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

// Fallback repositories if GitHub API rate limits or errors out
const fallbackRepos: Repository[] = [
  {
    name: "quantum-circuit-optimizer",
    description: "Transpile and compress quantum circuits to minimize CNOT gate depths for NISQ hardware simulation.",
    html_url: "https://github.com/thrilokmanjunath/quantum-circuit-optimizer",
    stargazers_count: 12,
    forks_count: 3,
    language: "Python",
    updated_at: "2026-06-12T14:20:00Z",
  },
  {
    name: "hybrid-rag-search",
    description: "Hybrid vector-lexical search pipeline using dense embeddings and customized sparse index rerankers.",
    html_url: "https://github.com/thrilokmanjunath/hybrid-rag-search",
    stargazers_count: 8,
    forks_count: 2,
    language: "FastAPI",
    updated_at: "2026-05-15T09:30:00Z",
  },
  {
    name: "mlops-pipeline-automation",
    description: "Continuous automated training pipelines with data profiling, DVC caching, and Docker deployments.",
    html_url: "https://github.com/thrilokmanjunath/mlops-pipeline",
    stargazers_count: 6,
    forks_count: 1,
    language: "Python",
    updated_at: "2025-10-05T18:40:00Z",
  },
];

async function getGithubRepos(username: string): Promise<Repository[]> {
  try {
    // Fetch with a 6-second timeout to prevent build hangs
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
      signal: controller.signal,
      next: { revalidate: 3600 }, // cache for 1 hour
    });
    
    clearTimeout(id);

    if (!res.ok) {
      console.warn("GitHub API responded with error status:", res.status);
      return fallbackRepos;
    }

    interface GitHubRepoResponse {
      name: string;
      description: string | null;
      html_url: string;
      stargazers_count: number;
      forks: number;
      language: string | null;
      updated_at: string;
      fork: boolean;
    }

    const repos = (await res.json()) as GitHubRepoResponse[];
    
    return repos
      .filter((r) => !r.fork) // filter out forked repositories
      .map((r) => ({
        name: r.name,
        description: r.description || "No description provided.",
        html_url: r.html_url,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks,
        language: r.language || "TypeScript",
        updated_at: r.updated_at,
      }))
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3);
  } catch (error) {
    console.warn("Error fetching GitHub repositories, using fallback data:", error);
    return fallbackRepos;
  }
}

export async function GithubActivity() {
  const username = "thrilokmanjunath";
  const repos = await getGithubRepos(username);

  return (
    <section className="py-20 px-4 border-t border-border/20 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-brand-purple uppercase tracking-widest mb-2">
              <Github className="h-4 w-4" />
              <span>Open Source Trace</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              GitHub Engineering
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-xl">
              Live-tracked public repositories displaying active coding sequences, open-source models, and scripting templates.
            </p>
          </div>
          
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0"
          >
            <Button variant="ghost" className="hover:bg-secondary rounded-full cursor-pointer group text-brand-purple hover:text-brand-purple">
              Follow on GitHub
              <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </a>
        </div>

        {/* Repository Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <Card key={repo.name} className="glass flex flex-col justify-between hover:border-brand-purple/30 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-secondary text-brand-purple">
                    <FolderGit2 className="h-4.5 w-4.5" />
                  </div>
                  <Badge variant="outline" className="text-[10px] font-mono border-brand-purple/20 text-brand-purple">
                    {repo.language}
                  </Badge>
                </div>
                <CardTitle className="font-heading text-base font-bold text-foreground group-hover:text-brand-purple transition-colors truncate">
                  {repo.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs mt-2 line-clamp-3 leading-relaxed">
                  {repo.description}
                </CardDescription>
              </CardHeader>
              
              <CardFooter className="flex items-center justify-between pt-4 border-t border-border/10 mt-auto bg-secondary/10">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground font-mono">
                  <span className="flex items-center">
                    <Star className="h-3.5 w-3.5 mr-1 text-brand-cyan fill-current" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center">
                    <GitFork className="h-3.5 w-3.5 mr-1 text-brand-pink" />
                    {repo.forks_count}
                  </span>
                </div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-brand-purple flex items-center hover:underline"
                >
                  Codebase
                  <ArrowUpRight className="ml-0.5 h-3.5 w-3.5" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
