import React from "react";
import { Hero } from "@/components/Hero";
import { QuantumStoryteller } from "@/components/QuantumStoryteller";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { FeaturedBlog } from "@/components/FeaturedBlog";
import { StructuredData } from "@/components/StructuredData";
import { ResearchSection } from "@/components/ResearchSection";
import { Certifications } from "@/components/Certifications";
import { ContactForm } from "@/components/ContactForm";
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

        {/* Interactive Quantum & Data Storytelling Journey */}
        <QuantumStoryteller />

        {/* Selected Projects */}
        <FeaturedProjects />

        {/* Research & Publications */}
        <ResearchSection />

        {/* Certifications */}
        <Certifications />

        {/* GitHub Engineering Activity */}
        <GithubActivity />

        {/* Selected Blog Posts */}
        <FeaturedBlog />

        {/* Contact Form */}
        <ContactForm />
      </div>
    </>
  );
}
