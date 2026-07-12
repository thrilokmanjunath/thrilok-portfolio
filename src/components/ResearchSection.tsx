import React from 'react';
import { BookOpen, ExternalLink, Calendar, Bookmark } from 'lucide-react';
import Link from 'next/link';
import publications from '@/content/publications.json';

export function ResearchSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">Research & <span className="text-brand-cyan">Publications</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Academic contributions and technical papers pushing the boundaries of ML and Quantum Computing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publications.map((pub) => (
            <div key={pub.id} className="glass p-8 rounded-3xl border border-border/50 hover:border-brand-cyan/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <BookOpen className="w-32 h-32" />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {pub.tags.map((tag) => (
                  <span key={tag} className="text-[10px] uppercase font-mono tracking-wider px-2 py-1 rounded-full border border-border/50 text-muted-foreground bg-background/50">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 leading-tight group-hover:text-brand-cyan transition-colors">
                {pub.title}
              </h3>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center"><Bookmark className="w-4 h-4 mr-1" /> {pub.conference}</span>
                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {pub.date}</span>
              </div>
              
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                {pub.description}
              </p>
              
              <Link href={pub.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-foreground hover:text-brand-cyan transition-colors">
                Read Paper <ExternalLink className="ml-1 w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
