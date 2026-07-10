import React from "react";
import { Metadata } from "next";
import { getBlogPosts } from "@/lib/content";
import { BlogDirectory } from "./BlogDirectory";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Technical Writing & Research Notes",
  description: "Read articles and guides by Thrilok M on machine learning algorithms, deep learning configurations, quantum computing systems, and fullstack engineering details.",
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12">
        <div className="flex items-center space-x-2 text-xs font-semibold text-brand-purple uppercase tracking-widest mb-2">
          <BookOpen className="h-4 w-4" />
          <span>Technical Journal</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Scientific Writing
        </h1>
        <p className="text-muted-foreground text-sm mt-3 max-w-2xl leading-relaxed">
          Documenting technical breakthroughs, describing algorithmic solutions to complex problems, and writing educational guides for quantum mechanics and physics.
        </p>
      </div>

      {/* Blog Directory Container */}
      <BlogDirectory initialPosts={posts} />
    </div>
  );
}
