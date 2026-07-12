# CLAUDE.md: Project Command Guide

This document maintains command summaries, layout practices, and standard protocols for this repository.

## Commands

* **Run Dev Server**: `npm run dev`
* **Production Build**: `npm run build`
* **Type-Safety Verification**: `npx tsc --noEmit`
* **Static Linting**: `npm run lint`

## Project Guidelines

* **Component Design**:
  * Default to **React Server Components (RSC)**.
  * Use `"use client"` strictly for interactive views (forms, directories, toggles).
  * Wrap client modules cleanly (e.g. Server Page fetching data, Client Directory filtering data).
* **Styling & Icons**:
  * Style utilizing **Tailwind CSS v4**. Configure themes, scrollbars, and glows inside `globals.css`.
  * Import icons from `lucide-react`. Ensure correct spelling matching version `v0.458.0` (e.g. `Github`, `Linkedin`).
* **shadcn/ui triggers**:
  * Since UI components utilize `@base-ui/react` primitives, triggers like `DialogTrigger` and `SheetTrigger` **must** utilize the `render` prop instead of `asChild` (e.g. `<DialogTrigger render={<Button ... />} />`).
* **Type System**:
  * Enforce types using definitions inside `src/types/portfolio.ts`.
* **Content Management**:
  * Stored in `/src/content/` (JSON for structured data, Markdown for rich blog posts and projects).
  * Read server-side using `/src/lib/content.ts` utilities.
