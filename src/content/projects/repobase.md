---
id: "proj-1"
title: "RepoBase"
description: "A repository and metadata management platform demonstrating full-stack engineering, secure authentication, index queries, and microservice containers."
coverImage: ""
tags: ["Django", "MySQL", "MongoDB", "Docker", "REST APIs"]
category: "fullstack"
repoUrl: "https://github.com/thrilokmanjunath/RepoBase"
liveUrl: ""
featured: true
date: "2025-11-20"
challenge: "Designing a unified search query pipeline capable of fetching and merging structured MySQL metadata alongside unstructured MongoDB repository logs efficiently."
solution: "Built a containerized API router using Django REST Framework that abstracts the underlying storage engines, utilizing connection pools and indexed fields to ensure sub-100ms response times."
---

# RepoBase: Metadata & Repository Management

RepoBase is a production-grade repository management platform designed to demonstrate scalable backend architecture, secure token-based authentication, database normalization, and containerization.

## Core Capabilities

- **Hybrid Data Storage**: Maps relational schemas (such as users, roles, and repository headers) to a MySQL cluster, while storing dynamic metadata, commit logs, and documentation structures in MongoDB.
- **RESTful API Services**: Fully-documented Django endpoints allowing users to programmatically register repositories, modify metadata values, and pull activity updates.
- **Containerized Architecture**: Completely packaged via Docker-Compose, separating the Django API server, MySQL nodes, MongoDB instances, and Redis caching blocks into isolated services.
- **Robust Security Policies**: Features user authentication controls, path validation checks, and secure credential handling.
