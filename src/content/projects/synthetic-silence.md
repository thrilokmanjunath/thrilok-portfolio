---
id: "proj-synthetic-silence"
title: "Synthetic Silence"
description: "An Explainable Multi-Agent Hallucination & Knowledge Void Detection Platform for LLMs using Topological Data Analysis and Sparse Autoencoders."
coverImage: ""
tags: ["Python", "PyTorch", "LLM", "AI Safety", "Multi-Agent"]
category: "ai-ml"
repoUrl: "https://github.com/thrilokmanjunath/Synthetic_Silence"
liveUrl: ""
featured: true
date: "2026-05-10"
challenge: "Detecting semantic/topological information gaps and evaluating LLM hallucinations reliably."
solution: "Developed an observatory platform with knowledge graphs, extracting atomic claims from LLM outputs and verifying them against contextual evidence."
---

# Synthetic Silence

Synthetic Silence is an advanced research platform for mapping Information Voids and Research Gaps in Generative AI Systems. It functions as a Hallucination Intelligence Platform.

## Core Capabilities

- **Hallucination Detection**: Extracts atomic claims and verifies them against a contextual knowledge graph to categorize them as Supported, Contradicted, or Unverifiable.
- **Knowledge Graphs**: Utilizes Neo4j for mapping semantic and topological relationships between claims and source documents.
- **Multi-Agent Evaluation**: Features a 'Judge LLM' architecture with adapters for Anthropic, Gemini, and OpenAI to automatically orchestrate the evaluation process.
- **Full-Stack Architecture**: Built with FastAPI, Next.js, PostgreSQL, and Redis for high-performance telemetry and evaluation management.
