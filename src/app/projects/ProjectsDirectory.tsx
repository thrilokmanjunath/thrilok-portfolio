"use client";

import React, { useState, useMemo } from "react";
import { Project } from "@/types/portfolio";
import { ProjectCard } from "@/components/ProjectCard";
import { Search, SlidersHorizontal, Tag } from "lucide-react";

interface ProjectsDirectoryProps {
  initialProjects: Project[];
}

export function ProjectsDirectory({ initialProjects }: ProjectsDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Categories list
  const categories = [
    { value: "all", label: "All Projects" },
    { value: "ai-ml", label: "AI & Machine Learning" },
    { value: "research", label: "Research & Systems" },
    { value: "fullstack", label: "Fullstack" },
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
  ];

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialProjects.forEach((proj) => {
      proj.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [initialProjects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;

      // Tag filter
      const matchesTag = !selectedTag || project.tags.includes(selectedTag);

      // Search query filter
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [initialProjects, searchQuery, selectedCategory, selectedTag]);

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-6 border-b border-border/20">
        
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects by name, description, or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary/30 border border-border/80 rounded-full py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all"
          />
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCategory(cat.value);
                setSelectedTag(null); // clear tag filter when changing category
              }}
              className={`text-xs font-semibold px-4 py-2 rounded-full cursor-pointer transition-all border shrink-0 ${
                selectedCategory === cat.value
                  ? "bg-brand-purple border-brand-purple text-white shadow-sm"
                  : "bg-secondary/40 border-border hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tech Tags Sub-filter Cloud */}
      <div className="flex flex-wrap items-center gap-1.5 py-2">
        <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground mr-2 flex items-center">
          <Tag className="h-3 w-3 mr-1" /> Filter tech:
        </span>
        <button
          onClick={() => setSelectedTag(null)}
          className={`text-[10px] font-mono px-2.5 py-1 rounded cursor-pointer border transition-all ${
            !selectedTag
              ? "bg-foreground text-background border-foreground font-semibold"
              : "bg-secondary/20 border-border/40 text-muted-foreground hover:text-foreground"
          }`}
        >
          CLEAR
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className={`text-[10px] font-mono px-2.5 py-1 rounded cursor-pointer border transition-all ${
              selectedTag === tag
                ? "bg-brand-pink border-brand-pink text-white font-semibold shadow-sm"
                : "bg-secondary/20 border-border/40 text-muted-foreground hover:border-brand-pink/30 hover:text-foreground"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Projects Display Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredProjects.map((project) => (
            <div key={project.id} className="h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-border/60 rounded-2xl">
          <SlidersHorizontal className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-bold text-lg text-foreground">No Projects Found</h3>
          <p className="text-muted-foreground text-xs mt-1">
            Try adjusting your search query, selecting another category, or clearing technology tags.
          </p>
        </div>
      )}
    </div>
  );
}
