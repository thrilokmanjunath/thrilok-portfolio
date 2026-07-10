"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPost } from "@/types/portfolio";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Search, Clock, Tag, BookOpen } from "lucide-react";

interface BlogDirectoryProps {
  initialPosts: BlogPost[];
}

export function BlogDirectory({ initialPosts }: BlogDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get categories dynamically
  const categories = useMemo(() => {
    const cats = new Set<string>();
    initialPosts.forEach((post) => {
      if (post.category) cats.add(post.category);
    });
    return ["all", ...Array.from(cats).sort()];
  }, [initialPosts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;

      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search and Category Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-6 border-b border-border/20">
        
        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search posts by title, description, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary/30 border border-border/80 rounded-full py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-semibold px-4 py-2 rounded-full cursor-pointer transition-all border capitalize shrink-0 ${
                selectedCategory === cat
                  ? "bg-brand-purple border-brand-purple text-white shadow-sm"
                  : "bg-secondary/40 border-border hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat === "all" ? "All Notes" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {filteredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <Card className="glass h-full hover:border-brand-purple/40 transition-all duration-300 flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground font-mono">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readingTime}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <CardTitle className="font-heading text-xl font-bold group-hover:text-brand-purple transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm mt-2 line-clamp-3 leading-relaxed">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                
                <CardFooter className="flex items-center justify-between pt-4 border-t border-border/10 mt-auto bg-secondary/10">
                  <div className="flex items-center space-x-1.5 overflow-hidden">
                    <Tag className="h-3.5 w-3.5 text-brand-pink shrink-0" />
                    <span className="text-xs text-muted-foreground truncate font-mono">
                      {post.tags.join(", ")}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-brand-purple flex items-center shrink-0">
                    Read Article
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-border/60 rounded-2xl">
          <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-bold text-lg text-foreground">No Articles Found</h3>
          <p className="text-muted-foreground text-xs mt-1">
            Try adjusting your search keywords or switching categories.
          </p>
        </div>
      )}
    </div>
  );
}
