import React from "react";
import Link from "next/link";
import { ArrowRight, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/lib/content";

export function FeaturedProjects() {
  // Get all projects and filter for featured ones
  const allProjects = getProjects();
  const featured = allProjects.filter((p) => p.featured).slice(0, 2);

  if (featured.length === 0) return null;

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-brand-purple uppercase tracking-widest mb-2">
              <FolderGit2 className="h-4 w-4" />
              <span>Selected Work</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Featured Engineering
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-xl">
              Highlighting technical depth in machine learning architectures, statistical model designs, and quantum circuit optimizations.
            </p>
          </div>
          
          <Link href="/projects" className="mt-4 sm:mt-0">
            <Button variant="ghost" className="hover:bg-secondary rounded-full cursor-pointer group text-brand-purple hover:text-brand-purple">
              All Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Grid of cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((project) => (
            <div key={project.id} className="h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
