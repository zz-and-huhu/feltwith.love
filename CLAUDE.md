# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Iron Rules

- **Never push to remote before the user has reviewed the changes.** No `git push`, no force-push, no PR creation — always wait for explicit approval.

## Project Overview

A Next.js 15 personal website with an integrated Notion-powered blog. Blog content is authored in a Notion database, cached locally (JSON + images), and statically generated at build time.

## Commands

```bash
pnpm dev              # Local dev server
pnpm build            # Refresh Notion cache → copy images → build Next.js → format
pnpm refresh-cache    # Sync blog content from Notion (pnpm exec tsx scripts/refresh-cache.ts)
pnpm lint             # ESLint
pnpm format           # Prettier
pnpm start            # Production server
```

## Architecture

### Stack

- **Next.js 15** with App Router, React 18, TypeScript (strict: false)
- **Tailwind CSS** with custom theme (primary brown #674D28, yellow #D7A567)
- **Notion API** (`@notionhq/client`) as blog CMS
- **Cusdis** for comments, **Stripe** for payments
- Path alias: `@/*` → project root

### Notion Blog Data Flow

```
Notion Database → NotionClient (API) → NotionCache (10-min lazy refresh)
  → cache/blog-index.json (metadata index)
  → cache/pages/*.json (block content per post)
  → cache/images/[postId]/ (downloaded images with dimensions in filename)
  → Static generation via generateStaticParams()
```

Key files: `app/lib/notion/NotionClient.ts`, `app/lib/notion/NotionCache.ts`, `app/lib/notion/downloadImage.ts`

### Cache Index Structure (blog-index.json)

- `ordered_ids`: post IDs sorted by created_time desc
- `id_by_slug`: slug → Notion page ID
- `prop_by_id`: post metadata (title, slug, tags, publish status, featured image, dates)
- `last_updated_time`: used for incremental sync

### Image Caching

Images are downloaded from Notion (which has expiring URLs) and cached locally. Served via `/api/images/[postId]/[filename]` with immutable cache headers. Magic-byte detection for format, dimensions encoded in filename.

### Key Routing

- `/` — Home (Hero, Products, Testimonials, Features, About)
- `/blog` — Listing (ISR revalidate=10s)
- `/blog/[slug]` — Post detail with Cusdis comments
- `/api/images/[postId]/[filename]` — Cached image serving

### Content Rendering

`components/Common/PostContent` renders an array of Notion blocks. Individual block types handled by `components/Common/Block`. Rich text by `components/Common/Text`. KaTeX for math.

### Environment Behavior

- Draft posts (publish=false) only visible when `NODE_ENV=development`
- Cache refresh skips API calls if <10 minutes since last update
- Incremental sync: only fetches pages modified since `last_updated_time`

## CI/CD

GitHub Actions (`.github/workflows/update.yml`): triggers on push, daily at midnight UTC, or manual dispatch. Builds project, commits cache changes, and pushes.
