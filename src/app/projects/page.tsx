import React from "react";
import { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { ProjectsDirectory } from "./ProjectsDirectory";
import { FolderGit2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects Portfolio",
  description: "Explore the technology and engineering behind Thrilok M's projects, featuring machine learning, quantum simulation, and automated system pipelines.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12">
        <div className="flex items-center space-x-2 text-xs font-semibold text-brand-purple uppercase tracking-widest mb-2">
          <FolderGit2 className="h-4 w-4" />
          <span>Technical Portfolio</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Engineering Artifacts
        </h1>
        <p className="text-muted-foreground text-sm mt-3 max-w-2xl leading-relaxed">
          A showcase of code architectures, scientific computing runs, and data engineering pipelines. Filter by category or search specific technologies to audit the code quality.
        </p>
      </div>

      {/* Projects Directory Container */}
      <ProjectsDirectory initialProjects={projects} />
    </div>
  );
}
