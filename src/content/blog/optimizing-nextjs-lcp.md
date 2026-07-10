---
title: "Optimizing LCP in Next.js App Router"
description: "A deep dive into strategies for achieving sub-second Largest Contentful Paint (LCP) speeds using modern React Server Components and fetch sequencing."
date: "2026-03-01"
tags: ["Next.js", "Web Performance", "React"]
category: "Engineering"
featured: true
---

Achieving excellent Core Web Vitals is no longer a luxury; it is a baseline expectation for modern web applications. Largest Contentful Paint (LCP), which measures when the primary content of a page becomes visible, is often the hardest metric to optimize.

In this article, we will walk through how we solved a critical LCP bottleneck in a next-gen dashboard by auditing script sequencing, using priority loading, and utilizing Next.js Server Components.

## Identifying the Bottleneck

During our initial audit, our LCP was hovering around **3.4 seconds** on mobile, putting us firmly in the "Needs Improvement" category. We ran a performance trace using Chrome DevTools and found three main culprits:

1. **Late-discovery of hero images**: The hero image source was only found after a heavy JavaScript bundle finished parsing and executed client-side API requests.
2. **CSS Blocking**: Large stylesheet components blocking paint triggers.
3. **Hydration delays**: Hydrating huge React subtrees on the client delayed visual stabilizations.

## Actionable Solutions

### 1. Leverage Fetch Priority for Critical Media

Next.js provides the standard `next/image` wrapper, but by default, it doesn't give assets immediate fetch priority. For our primary hero image, we marked the image with `priority` and used `fetchPriority="high"`:

```tsx
import Image from 'next/image';

export default function HeroSection() {
  return (
    <Image 
      src="/images/hero.webp" 
      alt="Hero visual illustration"
      width={1200}
      height={630}
      priority
      fetchPriority="high"
      className="object-cover"
    />
  );
}
```

This ensures the browser initiates the network request for the image as soon as the HTML document begins streaming, rather than waiting for script bundles.

### 2. Pre-render Layout Skeletons

Instead of showing blank screens while loading user data, we designed lightweight, CSS-only skeleton layouts. By putting these layout files directly into the Next.js App Router `loading.tsx` wrapper, Next.js streams the skeleton instantly at the edge while server-side data fetching finishes.

### 3. Move Heavy Math to Server Components

By shifting data transformation and formatting libraries from client components to Server Components, we reduced the JavaScript sent to the browser by **45 KB**, which significantly accelerated the first-paint and hydration times.

## Results

After implementing these adjustments, our LCP decreased from **3.4s to 1.1s** on mobile, and reached **420ms** on desktop, yielding a perfect **100/100** Lighthouse Performance score.
