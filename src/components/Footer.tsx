import Link from "next/link";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-background/50 py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pb-8 border-b border-border/20">

          {/* Logo & Pitch */}
          <div className="text-center md:text-left">
            <Link href="/" className="font-heading font-bold text-lg text-foreground">
              thrilok.dev
            </Link>
            <p className="mt-2 text-xs text-muted-foreground max-w-xs mx-auto md:mx-0">
              Personal portfolio showcasing engineering depth in Machine Learning, Quantum Computing, and Full-Stack Systems.
            </p>
          </div>

          {/* Sitemaps */}
          <div className="flex justify-center space-x-6">
            <Link href="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/projects" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/blog" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end space-x-4">
            <Link
              href="https://github.com/thrilokmanjunath"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted/80 rounded-full"
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/thrilokmanjunath"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted/80 rounded-full"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link
              href="mailto:thrilokmanjunath@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted/80 rounded-full"
              aria-label="Email Contact"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 text-[11px] text-muted-foreground">
          <p>© {currentYear} Thrilok M. All rights reserved.</p>
          <p className="italic mt-2 sm:mt-0 text-center sm:text-right font-light">
            &ldquo;Innovation distinguishes between a leader and a follower&rdquo; &mdash; Steve Jobs
          </p>
        </div>
      </div>
    </footer>
  );
}
