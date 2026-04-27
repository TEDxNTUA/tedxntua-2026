---
name: seo-expert
description: Analyzes and resolves SEO indexing problems (robots.txt, sitemap.xml, metadataBase) for Next.js static exports. Use this skill when the website is not showing up in search engines or when requested to fix SEO issues.
---

# SEO Expert

## Overview

This skill provides a procedural workflow to diagnose and fix Search Engine Optimization (SEO) and indexing issues in a Next.js application configured for static export (`output: export`).

## Workflow

### 1. Diagnose Metadata Configuration
- Check `app/layout.jsx` for the `metadataBase` field. It should point to the production domain (e.g., `new URL("https://2026.tedxntua.com")`).
- Ensure the `robots` object in metadata allows indexing: `{ index: true, follow: true }`.

### 2. Diagnose Sitemap
- Verify the presence of `app/sitemap.js` (or `.ts`).
- If missing, generate one that exports a default function returning an array of route objects with `url`, `lastModified`, `changeFrequency`, and `priority`.

### 3. Diagnose Robots.txt
- Verify the presence of `app/robots.js` (or `.ts`).
- If missing, generate one that exports a default function returning an object with `rules` (allowing `/`) and `sitemap` pointing to the full sitemap URL.

## Resources

- **scripts/generate-seo.js**: A Node script to automatically scaffold the base `robots.js` and `sitemap.js` files for a Next.js App Router project if they are missing.
