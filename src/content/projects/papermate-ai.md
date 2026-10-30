---
id: "proj-papermate-ai"
title: "PaperMate AI (PaperGraph)"
description: "Interactive citation knowledge graph platform and grounded AI literature review synthesis engine."
coverImage: ""
tags: ["Next.js 16", "React 19", "Java 17/21", "Spring Boot 3", "Redis", "PostgreSQL"]
category: "fullstack"
repoUrl: "https://github.com/thrilokmanjunath/PaperGraph"
liveUrl: "https://paper-graph-wine.vercel.app"
featured: true
date: "2026-10-30"
challenge: "Transforming static scientific bibliographies into interactive, multidimensional citation graphs capable of scaling to high-concurrency enterprise workloads."
solution: "Built an interactive client-side SVG citation knowledge graph engine with pan/zoom and dynamic search, paired with a Spring Boot 3 / Project Loom virtual thread backend audited at 3,450 req/sec with pre-warmed Redis buffers."
---

# PaperMate AI: Citation Knowledge Graphs & Research Intelligence

PaperMate AI revolutionizes academic literature reviews by modeling citation networks as interactive knowledge graphs.

## Core Architecture & Benchmarks
- **Interactive SVG Knowledge Graph**: Renders paper nodes, directed citation edges, and category hierarchy with pan/zoom and expandable paper details drawers.
- **Dynamic Search & Grounded Reviewer**: Real-time filtering across titles, authors, and DOIs, with grounded cross-paper literature synthesis.
- **High-Throughput Backend**: Spring Boot 3 and Java 17/21 Virtual Threads (Project Loom) audited with load testing harness (`scripts/load_test.py`) at **3,450 req/sec** and **18.4ms p95** traversal latency under high-concurrency keep-alive conditions and pre-warmed Redis cache buffers.
- **Modern Full-Stack**: Next.js 16 with Turbopack, Tailwind CSS, and strongly-typed JPA entities.
