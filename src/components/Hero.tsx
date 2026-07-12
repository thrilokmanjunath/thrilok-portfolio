"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantumGrid } from "@/components/QuantumGrid";
import { ThreeDElement } from "@/components/ThreeDElement";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Background visual components */}
      <QuantumGrid />
      <ThreeDElement />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl -z-10 animate-pulse duration-10000" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl -z-10 animate-pulse duration-8000" />

      <div className="container mx-auto max-w-5xl text-center z-10 relative">
        {/* Leadership Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full glass text-xs font-semibold text-brand-purple mb-6 glow-purple"
        >
          <Sparkles className="h-3 w-3 text-brand-cyan fill-current" />
          <span> Head, Quantum Club @ CHRIST University</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
        >
          <span className="bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
            Hi, I&apos;m{" "}
          </span>
          <span className="bg-gradient-to-r from-foreground via-foreground/50 to-foreground bg-[length:200%_auto] bg-clip-text text-transparent animate-shine">
            Thrilok M
          </span>
        </motion.h1>

        {/* Dynamic Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light"
        >
          MSc Data Science student specializing in{" "}
          <span className="text-foreground font-medium underline decoration-brand-purple decoration-2 underline-offset-4">
            Machine Learning
          </span>
          ,{" "}
          <span className="text-foreground font-medium underline decoration-brand-cyan decoration-2 underline-offset-4">
            Generative AI
          </span>
          , and{" "}
          <span className="text-foreground font-medium underline decoration-brand-pink decoration-2 underline-offset-4">
            Quantum Computing
          </span>
          .
        </motion.p>

        {/* Buttons CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/projects">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/95 rounded-full px-8 py-6 font-medium cursor-pointer shadow-lg hover:shadow-xl transition-all"
            >
              Explore Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 font-medium border-border/80 hover:bg-secondary cursor-pointer"
            >
              Get in Touch
            </Button>
          </Link>
        </motion.div>

        {/* Social Bar & Resume */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex items-center justify-center space-x-6 text-muted-foreground"
        >
          <Link
            href="https://github.com/thrilokmanjunath"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="h-6 w-6" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/thrilokmanjunath"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link
            href="mailto:thrilokmanjunath@gmail.com"
            className="hover:text-foreground transition-colors"
            aria-label="Email Address"
          >
            <Mail className="h-6 w-6" />
          </Link>
          <div className="h-4 w-px bg-border/80" />
          <Link href="https://docs.google.com/document/d/1uvdhGEcj2xlH8UHIdfPkk2PfqsIUFqT1/edit?usp=sharing&ouid=116342752114562191582&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center space-x-2 text-sm font-semibold">
            <FileText className="h-5 w-5" />
            <span>Resume</span>
          </Link>
        </motion.div>
      </div>

      {/* Down arrow indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce hidden sm:block">
        <div className="flex flex-col items-center text-[10px] uppercase tracking-widest font-mono">
          <span>Scroll</span>
          <ArrowRight className="rotate-90 mt-1 h-4 w-4" />
        </div>
      </div>
    </section>
  );
}
