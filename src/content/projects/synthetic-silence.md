---
id: "proj-synthetic-silence"
title: "Synthetic Silence 2.0"
description: "Empirical evaluation of claim-space density for evidence insufficiency under reference-manifold shift and hallucination detection."
coverImage: ""
tags: ["PyTorch", "Python", "Conformal Prediction", "AI Safety", "Bootstrap CIs", "LLMs"]
category: "research"
repoUrl: "https://github.com/thrilokmanjunath/SyntheticSilence2.0"
liveUrl: ""
featured: true
date: "2026-10-30"
challenge: "Determining whether representation-space density provides a robust, construction-invariant signal for hallucination detection across synthetic versus real-world claim manifolds."
solution: "Conducted frozen benchmark experiments across FEVER and AVeriTeC datasets, proving a severe signal inversion (AUROC 0.2754 on evidence-insufficient real claims vs 0.5463 on synthetic claims) with deterministic single-command reproduction."
---

# Synthetic Silence 2.0: Claim-Space Density & Manifold Shift

Synthetic Silence 2.0 is an empirical machine learning research project investigating hallucination detection and evidence insufficiency in Large Language Models.

## Core Findings & Scientific Validation
- **Frozen Benchmark Reproduction**: Single-command execution via `python scripts/reproduce_benchmark.py` validating claims against frozen manifests.
- **Synthetic Benchmark ($E_0$)**: kNN density estimation achieves **AUROC = 0.5463** (95% CI `[0.5366, 0.5564]`, prevalence baseline `0.2403`) on synthetic FEVER claims.
- **Signal Inversion Finding ($E_1$)**: On real-world AVeriTeC claims without evidence, density drops to **AUROC = 0.2754**, establishing that unverified real-world claims cluster closer to encyclopedic reference embeddings than verified facts.
- **Interactive Research Demo**: Streamlit interface with conformal prediction indicators (`NOT_CALIBRATED` disclosure) and clear distinction between model heuristics and verified truth.
