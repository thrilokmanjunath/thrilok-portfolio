import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import certifications from '@/content/certifications.json';

export function Certifications() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">Professional <span className="text-brand-purple">Certifications</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Industry-recognized credentials validating expertise in Cloud, Data Science, and Security.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div key={cert.id} className="glass p-6 rounded-2xl border border-border/50 hover:border-brand-purple/50 transition-colors group flex flex-col h-full">
              <div className="mb-4">
                <Award className="h-10 w-10 text-brand-purple group-hover:scale-110 transition-transform" />
              </div>
              
              <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
                {cert.title}
              </h3>
              
              <p className="text-sm font-medium text-brand-cyan mb-1">
                {cert.issuer}
              </p>
              
              <div className="mt-auto pt-4 flex flex-col space-y-1">
                <p className="text-xs text-muted-foreground flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" /> Issued: {cert.issueDate}
                </p>
                {cert.credentialId && (
                  <p className="text-[10px] text-muted-foreground font-mono">
                    ID: {cert.credentialId}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
