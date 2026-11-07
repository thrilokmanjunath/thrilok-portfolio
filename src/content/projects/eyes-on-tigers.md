---
id: "proj-eyes-on-tigers"
title: "Eyes on Tigers"
description: "AI-powered wildlife conservation platform combining Google Earth Engine telemetry, spatial GIS analytics, and YOLOv8 camera-trap detection."
coverImage: ""
tags: ["PyTorch", "YOLOv8", "Streamlit", "GeoPandas", "Google Earth Engine", "GIS", "DevOps"]
category: "ai-ml"
repoUrl: "https://github.com/thrilokmanjunath/Eyes-on-Tigers"
liveUrl: "https://eyes-on-tigers-7mtepkv8ruq3aaulgr7ves.streamlit.app"
featured: true
date: "2026-11-04"
challenge: "Combining multi-source geospatial telemetry with camera-trap computer vision while maintaining transparency between synthetic operational demonstrations and real wildlife data, as well as guaranteeing high cloud uptime."
solution: "Hardened the relative-path data loader, validated YOLOv8 tiger detection (mAP@0.5 = 0.842), injected high-visibility synthetic data transparency banners across simulation modules, and deployed automated 24/7 GitHub Actions health-check probes."
---

# Eyes on Tigers: Conservation Telemetry & Computer Vision

Eyes on Tigers is an interactive conservation intelligence platform evaluating reserve habitat integrity and camera-trap detections across India's Project Tiger reserves.

## Core Capabilities
- **Computer Vision Model**: YOLOv8 detection achieving **mAP@0.5 = 0.842** with 88.6% precision, 81.4% recall, and 64ms CPU inference latency.
- **Geospatial Analytics**: GeoPandas and Folium mapping of core/buffer areas, canopy density, and human encroachment.
- **Scientific Transparency**: Explicit high-visibility banners labeling synthetic patrol tracks to distinguish simulation demonstrations from tactical operations.
- **24/7 Keep-Alive & Health Monitoring**: Continuous automated GitHub Actions probe scheduled every 10 minutes to verify cloud availability and prevent cold-start suspension.
