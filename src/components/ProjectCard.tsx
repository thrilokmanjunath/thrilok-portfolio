"use client";

import React from "react";
import { Project } from "@/types/portfolio";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Github, ExternalLink, Code, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="glass flex flex-col h-full overflow-hidden hover:border-brand-purple/40 transition-all duration-300 group">
      {/* Category header indicator */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan opacity-80" />
      
      <CardHeader className="flex-grow">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-mono border-brand-purple/30 text-brand-purple">
            {project.category}
          </Badge>
          <div className="flex items-center text-[10px] text-muted-foreground font-mono">
            <Calendar className="h-3 w-3 mr-1" />
            {project.date}
          </div>
        </div>
        <CardTitle className="font-heading text-xl font-bold group-hover:text-brand-purple transition-colors">
          {project.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm mt-2 leading-relaxed">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] font-mono rounded">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="gap-2 border-t border-border/20 pt-4 bg-secondary/10">
        <Dialog>
          <DialogTrigger render={
            <Button variant="default" size="sm" className="flex-grow rounded-full cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90" />
          }>
            Read Details
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto border-border/60 glass">
            <DialogHeader className="border-b border-border/20 pb-4">
              <div className="flex items-center space-x-2 text-xs text-brand-purple uppercase tracking-wider font-mono mb-2">
                <Code className="h-3 w-3" />
                <span>{project.category} project</span>
              </div>
              <DialogTitle className="font-heading text-2xl font-bold">{project.title}</DialogTitle>
              <DialogDescription className="text-muted-foreground mt-1">
                Completed on {project.date}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4 text-sm leading-relaxed">
              {/* Challenge & Solution details */}
              {project.challenge && (
                <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/10">
                  <h4 className="font-bold text-foreground mb-1 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mr-2" />
                    The Challenge
                  </h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{project.challenge}</p>
                </div>
              )}
              {project.solution && (
                <div className="p-4 rounded-xl bg-brand-cyan/5 border border-brand-cyan/10">
                  <h4 className="font-bold text-foreground mb-1 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan mr-2" />
                    The Solution
                  </h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{project.solution}</p>
                </div>
              )}

              {/* Long Description rendered via Markdown */}
              {project.longDescription && (
                <div className="prose dark:prose-invert prose-xs max-w-none border-t border-border/10 pt-4">
                  <ReactMarkdown>{project.longDescription}</ReactMarkdown>
                </div>
              )}
            </div>

            {/* Modal actions */}
            <div className="flex justify-end gap-3 border-t border-border/20 pt-4 mt-6">
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="rounded-full cursor-pointer">
                    <Github className="h-4 w-4 mr-2" />
                    Codebase
                  </Button>
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="default" size="sm" className="rounded-full cursor-pointer bg-brand-purple hover:bg-brand-purple/90 text-white">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                </a>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Quick icon actions */}
        <div className="flex gap-1">
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="View codebase on GitHub">
              <Button variant="ghost" size="icon" className="w-9 h-9 hover:bg-muted/80 rounded-full">
                <Github className="h-4 w-4" />
              </Button>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="View live deployment">
              <Button variant="ghost" size="icon" className="w-9 h-9 hover:bg-muted/80 rounded-full">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
