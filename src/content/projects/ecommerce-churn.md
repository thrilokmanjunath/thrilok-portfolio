---
id: "proj-ecommerce-churn"
title: "E-Commerce Churn Prediction & Risk Analytics"
description: "Leak-free machine learning pipeline and TreeSHAP interpretability for predicting customer churn and evaluating complaint risk factors."
coverImage: ""
tags: ["Scikit-learn", "XGBoost", "SHAP", "Streamlit", "Pandas", "Pipelines"]
category: "ai-ml"
repoUrl: "https://github.com/thrilokmanjunath/ecommerce-churn-analysis"
liveUrl: "https://thrilokmanjunath.github.io/ecommerce-churn-analysis/"
featured: true
date: "2026-10-30"
challenge: "Eliminating data leakage in exploratory churn modeling and rigorously validating high accuracy claims against class imbalance baselines."
solution: "Built a leak-free scikit-learn Pipeline and ColumnTransformer strictly fitted post-split, achieving 98.05% test accuracy and 90.53% recall (XGBoost), while validating a 2.90x empirical relative risk of complaints."
---

# E-Commerce Churn Prediction & Risk Analytics

An end-to-end customer churn prediction engine and interpretability dashboard built on 5,630 customer observations.

## Core Capabilities & Performance
- **Leak-Free Engineering**: Preprocessing (median numerical imputation, most frequent categorical imputation, standard scaling, and one-hot encoding) is fitted strictly on training data post-split.
- **Empirical Benchmarks**:
  - Majority-class baseline: **83.16%**
  - XGBoost: **98.05% Accuracy**, **97.73% Precision**, **90.53% Recall**, **93.99% F1**, **0.9979 ROC-AUC**
  - Random Forest: **97.25% Accuracy**, **84.74% Recall**, **0.9973 ROC-AUC**
- **Behavioral Analytics**: Empirically proved that customer complaints exhibit a **2.90× relative risk** of churn (31.67% churn rate with complaints vs. 10.93% without).
- **Interpretability**: TreeSHAP feature importance plots and interactive Streamlit what-if simulation dashboard.
