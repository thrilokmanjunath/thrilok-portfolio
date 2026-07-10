import React from "react";
import { GraduationCap, Award, FolderGit2, BookOpen } from "lucide-react";
import { getProjects } from "@/lib/content";

export function QuickStats() {
  const projects = getProjects();

  const stats = [
    {
      id: 1,
      name: "Academics",
      value: "MSc Data Science",
      sub: "Christ University",
      icon: GraduationCap,
      color: "text-brand-purple bg-brand-purple/10",
    },
    {
      id: 2,
      name: "Leadership",
      value: "Club President",
      sub: "Quantum Club SJU/CU",
      icon: Award,
      color: "text-brand-cyan bg-brand-cyan/10",
    },
    {
      id: 3,
      name: "Engineering",
      value: `${projects.length}+ Projects`,
      sub: "Open-source codebase",
      icon: FolderGit2,
      color: "text-brand-pink bg-brand-pink/10",
    },
    {
      id: 4,
      name: "Publications",
      value: "Research Focused",
      sub: "Quantum & AI studies",
      icon: BookOpen,
      color: "text-brand-blue bg-brand-blue/10",
    },
  ];

  return (
    <div className="py-12 border-y border-border/40 bg-secondary/20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="flex flex-col items-center text-center p-6 rounded-2xl glass hover:scale-[1.02] transition-transform duration-300"
              >
                <div className={`p-3 rounded-xl mb-4 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">{stat.value}</h3>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.name}</p>
                <p className="text-xs text-muted-foreground/80 mt-1 font-mono">{stat.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
