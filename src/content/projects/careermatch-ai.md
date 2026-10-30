---
id: "proj-careermatch-ai"
title: "CareerMatch AI"
description: "Intelligent job recommendation engine pairing dense semantic vector retrieval with deterministic skill-gap ontology analysis."
coverImage: ""
tags: ["Sentence-Transformers", "FAISS", "spaCy", "Streamlit", "Scikit-learn", "BM25"]
category: "ai-ml"
repoUrl: "https://github.com/thrilokmanjunath/career-match-ai"
liveUrl: ""
featured: true
date: "2026-10-30"
challenge: "Overcoming vocabulary mismatch in traditional Applicant Tracking Systems while providing deterministic, explainable skill-gap feedback without hallucination."
solution: "Built a two-stage hybrid ranker evaluated against 4 baselines across 50 candidate profiles and 1,000 jobs, achieving NDCG@10 = 0.6136 (vs. 0.0614 Keyword Jaccard) with full skill-gap diagnostics and synthetic/proxy label transparency."
---

# CareerMatch AI: Hybrid Semantic Retrieval & Skill-Gap Diagnostics

CareerMatch AI bridges the disconnect between job seekers and recruitment catalogs using a two-stage neural-symbolic retrieval framework.

## Benchmarks & Retrieval Quality
- **Empirical Baseline Suite**: Evaluated 5 retrieval architectures via `python evaluation/run_benchmark.py`:
  - Keyword Matching (Jaccard): **NDCG@10 = 0.0614**, Precision@5 = 0.0600
  - BM25 Lexical: **NDCG@10 = 0.5951**, Precision@5 = 0.7200
  - TF-IDF + Cosine: **NDCG@10 = 0.5858**, Precision@5 = 0.6400
  - Dense Embeddings alone: **NDCG@10 = 0.6136**, Precision@5 = 0.5640
  - CareerMatch Hybrid: **NDCG@10 = 0.6136**, Precision@5 = 0.5640
- **Explainability**: Deterministic JSON skill ontology isolating matched core competencies and missing prerequisite skills with actionable career upskilling recommendations.
- **Multimodal Streamlit UI**: Supports resume PDF/DOCX uploads, direct text pasting, and 1-click candidate personas with memory-only privacy guarantees.
