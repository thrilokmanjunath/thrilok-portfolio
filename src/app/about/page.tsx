import React from "react";
import { Metadata } from "next";
import { getExperiences, getEducation, getSkills, getCertifications, getLeadership } from "@/lib/content";
import { StructuredData } from "@/components/StructuredData";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, Award, ExternalLink, Calendar, MapPin, CheckCircle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About & Experience",
  description: "Learn about Thrilok M's academic qualifications, professional career history, technical skills, and leadership achievements.",
};

export default function AboutPage() {
  const experiences = getExperiences();
  const education = getEducation();
  const skills = getSkills();
  const certifications = getCertifications();
  const leadership = getLeadership();

  return (
    <>
      <StructuredData
        type="Person"
        data={{
          name: "Thrilok M",
          jobTitle: "Data Scientist & Quantum Computing Student",
        }}
      />

      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Profile Intro */}
        <section className="mb-20">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-grow lg:max-w-2xl">
              <span className="text-xs font-semibold text-brand-purple uppercase tracking-widest">About Me</span>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground mt-2">
                Pioneering Data & Quantum Architectures
              </h1>
              <p className="mt-6 text-muted-foreground text-sm leading-relaxed">
                I am Thrilok M, currently pursuing my MSc in Data Science at Christ University, Bangalore (Yeshwanthpur Campus). My academic and professional journey is defined by a strong curiosity for computing paradigms, leading me from a BCA in Data Analytics at St. Joseph&apos;s University to exploring the frontiers of Machine Learning, Generative AI, and Quantum Computing.
              </p>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                As the Head of the Quantum Club at Christ University, I focus on building communities around quantum information sciences, organizing Qiskit hackathons, and developing algorithmic simulation models. I am passionate about engineering production-grade software architectures, MLOps automation pipelines, and high-performance frontend interfaces.
              </p>
            </div>
            
            {/* Visual Callout Card */}
            <div className="w-full lg:w-80 shrink-0 glass p-8 rounded-3xl relative overflow-hidden bg-secondary/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 rounded-full blur-2xl" />
              <h3 className="font-heading font-bold text-lg text-foreground mb-4">Core Interests</h3>
              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-brand-purple shrink-0" />
                  <span>Machine & Deep Learning</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-brand-cyan shrink-0" />
                  <span>Quantum Information Systems</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-brand-pink shrink-0" />
                  <span>MLOps & Cloud Engineering</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-brand-blue shrink-0" />
                  <span>Full-Stack Development</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-brand-purple shrink-0" />
                  <span>Academic & Applied Research</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-20 border-t border-border/20 pt-16">
          <div className="mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">Technical Mastery</h2>
            <p className="text-muted-foreground text-xs mt-1">Categorized expertise across coding, modeling, and system architectures.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((group) => (
              <Card key={group.category} className="glass">
                <CardHeader className="pb-3">
                  <CardTitle className="font-heading text-base font-bold text-foreground">{group.category}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Badge key={skill.name} variant="secondary" className="text-xs font-mono py-1">
                      {skill.name}
                      {skill.level && (
                        <span className="ml-1 opacity-60 text-[9px] uppercase font-sans">
                          • {skill.level}
                        </span>
                      )}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience & Education Layout */}
        <section className="mb-20 border-t border-border/20 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Experience Column */}
            <div>
              <div className="flex items-center space-x-2 text-brand-purple font-semibold uppercase tracking-wider text-xs mb-8">
                <Briefcase className="h-4 w-4" />
                <span>Work Experience</span>
              </div>
              <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-3.5 before:w-0.5 before:bg-border/60">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-10 group">
                    {/* Timeline Node dot */}
                    <div className="absolute left-1.5 top-1.5 h-4.5 w-4.5 rounded-full border-2 border-brand-purple bg-background z-10 group-hover:scale-110 transition-transform" />
                    
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-heading text-lg font-bold text-foreground leading-tight">
                          {exp.role}
                        </h3>
                        <Badge variant="outline" className="text-[10px] uppercase font-mono">
                          {exp.type}
                        </Badge>
                      </div>
                      
                      <div className="text-sm font-semibold text-brand-purple mt-1 flex items-center">
                        {exp.companyUrl ? (
                          <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                            {exp.company}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        ) : (
                          exp.company
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-2 font-mono">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {exp.location}
                        </span>
                      </div>

                      <ul className="mt-4 space-y-2 text-xs text-muted-foreground list-disc pl-4 leading-relaxed">
                        {exp.description.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {exp.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-[9px] font-mono rounded">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Column */}
            <div>
              <div className="flex items-center space-x-2 text-brand-cyan font-semibold uppercase tracking-wider text-xs mb-8">
                <GraduationCap className="h-4 w-4" />
                <span>Education History</span>
              </div>
              <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-3.5 before:w-0.5 before:bg-border/60">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-10 group">
                    {/* Timeline Node dot */}
                    <div className="absolute left-1.5 top-1.5 h-4.5 w-4.5 rounded-full border-2 border-brand-cyan bg-background z-10 group-hover:scale-110 transition-transform" />
                    
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-heading text-lg font-bold text-foreground leading-tight">
                          {edu.degree} in {edu.field}
                        </h3>
                        {edu.grade && (
                          <Badge variant="secondary" className="text-[10px] font-mono">
                            {edu.grade}
                          </Badge>
                        )}
                      </div>

                      <div className="text-sm font-semibold text-brand-cyan mt-1 flex items-center">
                        {edu.institutionUrl ? (
                          <a href={edu.institutionUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                            {edu.institution}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        ) : (
                          edu.institution
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-2 font-mono">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {edu.location}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                        {edu.description}
                      </p>

                      {edu.activities && edu.activities.length > 0 && (
                        <div className="mt-4">
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-foreground/80 block mb-1">
                            Co-Curriculars:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {edu.activities.map((act) => (
                              <Badge key={act} variant="outline" className="text-[9px] rounded">
                                {act}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Leadership spotlight & Certifications Grid */}
        <section className="mb-20 border-t border-border/20 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Leadership Spot */}
            <div>
              <div className="flex items-center space-x-2 text-brand-pink font-semibold uppercase tracking-wider text-xs mb-8">
                <Award className="h-4 w-4" />
                <span>Leadership Highlights</span>
              </div>
              <div className="space-y-6">
                {leadership.map((lead) => (
                  <Card key={lead.id} className="glass">
                    <CardHeader>
                      <CardTitle className="font-heading text-lg font-bold">
                        {lead.role}
                      </CardTitle>
                      <CardDescription className="text-brand-pink font-medium text-xs">
                        {lead.organization}
                      </CardDescription>
                      <span className="text-[10px] text-muted-foreground font-mono block mt-1">
                        {lead.startDate} – {lead.current ? "Present" : lead.endDate}
                      </span>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4 leading-relaxed">
                        {lead.description.map((pt, idx) => (
                          <li key={idx}>{pt}</li>
                        ))}
                      </ul>
                      
                      {lead.highlights && lead.highlights.length > 0 && (
                        <div className="border-t border-border/10 pt-4 mt-4">
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-foreground/80 block mb-2">
                            Key Achievements:
                          </span>
                          <ul className="space-y-1.5 text-xs text-muted-foreground list-none">
                            {lead.highlights.map((h, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-brand-pink mr-2">•</span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Certifications Grid */}
            <div>
              <div className="flex items-center space-x-2 text-brand-blue font-semibold uppercase tracking-wider text-xs mb-8">
                <ShieldCheck className="h-4 w-4" />
                <span>Credentials & Certifications</span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {certifications.map((cert) => (
                  <Card key={cert.id} className="glass flex items-center justify-between p-5 hover:border-brand-blue/30 transition-all duration-300">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-foreground">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-brand-blue font-medium mt-0.5">
                        {cert.issuer}
                      </p>
                      <div className="flex items-center space-x-3 text-[10px] text-muted-foreground font-mono mt-2">
                        <span>Issued: {cert.issueDate}</span>
                        {cert.credentialId && (
                          <span>ID: {cert.credentialId}</span>
                        )}
                      </div>
                    </div>
                    
                    {cert.credentialUrl && (
                      <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" className="w-9 h-9 hover:bg-muted/80 rounded-full">
                          <ExternalLink className="h-4.5 w-4.5" />
                        </Button>
                      </a>
                    )}
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}
