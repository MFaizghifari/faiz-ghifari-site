# Editing faizghifari.com

## Content files (edit these to update the site)

| File | What it controls |
|---|---|
| [data/content.js](data/content.js) | All text: name, tagline, bio, headings, contact links, social movements |
| [data/portfolio.js](data/portfolio.js) | Speaking & training clients (logo paths + detail) |
| [data/media.js](data/media.js) | Press & media outlets |
| [data/pins.js](data/pins.js) | Travel map — places, regions, dive sites, dive count |
| [data/topics.js](data/topics.js) | Topics & expertise cards |
| [content/posts/*.md](content/posts) | Blog posts — one Markdown file per post, filename becomes the URL slug |

### Blog post format

Each Markdown file under `content/posts/` has frontmatter:

```yaml
---
title: Your post title.
tag: EDUCATION         # short uppercase category shown on the card
date: March 2026       # display date shown on the card
order: 3               # sort order — higher numbers appear first
excerpt: Short one-line description shown on the homepage card.
---

Post body in Markdown. Supports headings, lists, links, blockquotes,
code fences, horizontal rules.
```

The filename (e.g. `teaching-indonesia-how-to-learn-again.md`) becomes the URL
slug at `/blog/teaching-indonesia-how-to-learn-again`.

## Local preview

```bash
cd "/Users/faizghifari/Claude Code/faiz-ghifari-site"
npm run dev       # http://localhost:3000
```

## Deploy after editing

```bash
cd "/Users/faizghifari/Claude Code/faiz-ghifari-site"
npm run build
vercel --prod
```
