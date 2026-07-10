import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { getBlogPosts } from "@/lib/content";

export function FeaturedBlog() {
  const posts = getBlogPosts();
  const featured = posts.slice(0, 2);

  if (featured.length === 0) return null;

  return (
    <section className="py-20 px-4 border-t border-border/20 bg-secondary/10">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-brand-purple uppercase tracking-widest mb-2">
              <BookOpen className="h-4 w-4" />
              <span>Technical Notes</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Recent Writing
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-xl">
              Sharing technical research insights, deep-dives into algorithms, and practical guides on quantum computer simulators.
            </p>
          </div>
          
          <Link href="/blog" className="mt-4 sm:mt-0">
            <Button variant="ghost" className="hover:bg-secondary rounded-full cursor-pointer group text-brand-purple hover:text-brand-purple">
              Read All Posts
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Grid of posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((post) => (
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
                  <CardTitle className="font-heading text-lg font-bold group-hover:text-brand-purple transition-colors line-clamp-2">
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
                      {post.tags.slice(0, 2).join(", ")}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-brand-purple flex items-center shrink-0">
                    Read Article
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
