import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content";
import { StructuredData } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Thrilok M"],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Article Schema Structured Data */}
      <StructuredData
        type="BlogPosting"
        data={{
          title: post.title,
          description: post.description,
          date: post.date,
          url: `https://thrilok.dev/blog/${post.slug}`,
        }}
      />

      <article className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>

        {/* Article Header */}
        <header className="border-b border-border/20 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-mono mb-4">
            <span className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {post.date}
            </span>
            <span className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {post.readingTime}
            </span>
            <Badge variant="outline" className="text-[10px] uppercase font-mono border-brand-purple/30 text-brand-purple">
              {post.category}
            </Badge>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {post.title}
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg mt-4 leading-relaxed font-light">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="flex items-center space-x-1.5">
              <Tag className="h-3.5 w-3.5 text-brand-pink shrink-0" />
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px] font-mono rounded-md py-0.5">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Share placeholder logic */}
            <Button variant="ghost" size="sm" className="rounded-full text-xs text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer">
              <Share2 className="h-3.5 w-3.5 mr-1.5" />
              Share Article
            </Button>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose dark:prose-invert prose-sm sm:prose-base max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-brand-purple prose-pre:bg-secondary/40 prose-pre:border prose-pre:border-border/30 prose-img:rounded-2xl leading-relaxed">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

      </article>
    </>
  );
}
