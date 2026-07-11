import React from "react";
import { Hero } from "@/components/Hero";
import { QuickStats } from "@/components/QuickStats";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { FeaturedBlog } from "@/components/FeaturedBlog";
import { StructuredData } from "@/components/StructuredData";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubActivity } from "@/components/GithubActivity";

export default function HomePage() {
  return (
    <>
      {/* Schema Structured Data for Person */}
      <StructuredData
        type="Person"
        data={{
          name: "Thrilok M",
          jobTitle: "Data Scientist ",
          url: "https://thrilok.dev",
        }}
      />

      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <Hero />

        {/* Quick Accomplishments Stats */}
        <QuickStats />

        {/* Selected Projects */}
        <FeaturedProjects />

        {/* GitHub Engineering Activity */}
        <GithubActivity />

        {/* Selected Blog Posts */}
        <FeaturedBlog />

        {/* Contact/Resume Pitch CTA */}
        <section className="py-20 px-4 text-center bg-background border-t border-border/20">
          <div className="container mx-auto max-w-3xl glass p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl -z-10" />

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground mb-6">
              <Mail className="h-3.5 w-3.5 text-brand-purple" />
              <span>Available for collaborations & internships</span>
            </div>
            
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Let&apos;s Build Something Dynamic
            </h2>
            <p className="mt-4 text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
              Interested in discussing Machine Learning pipelines, quantum computing simulations, research ventures, or frontend design systems? Drop a message.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/95 rounded-full px-8 py-5 cursor-pointer shadow-md">
                  Get In Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="rounded-full px-8 py-5 cursor-pointer border-border">
                  Read Profile
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
