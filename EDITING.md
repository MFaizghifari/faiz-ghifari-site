# Editing faizghifari.com

## Option 1 — Friendly UI (Keystatic CMS)

```bash
cd "/Users/faizghifari/Claude Code/faiz-ghifari-site"
npm run dev
```

Then open **http://localhost:3000/keystatic** in your browser.

You'll see a sidebar with:

- **Site content** — nav, hero, about, section headings, footer
- **Portfolio** — speaking & training client cards
- **Media features** — press outlets
- **Topics** — expertise cards
- **Travel pins** — regions, places, dive sites
- **Blog posts** — write/edit posts with a rich text editor

Fill in forms, click **Save**. Changes write directly to the repo's content files.
Review with `git status`, then deploy:

```bash
npm run build && vercel --prod
```

### Caveats
- **Local only.** The `/keystatic` admin on the live site is read-only (it would need GitHub OAuth to write). Edit locally, push, deploy.
- **One editor at a time.** Two people editing simultaneously will conflict at the file level.

---

## Option 2 — Edit files directly

| Where | What it controls |
|---|---|
| [data/content/site/index.json](data/content/site/index.json) | All text: nav, hero, about, section headings, footer |
| [data/content/portfolio/index.json](data/content/portfolio/index.json) | Speaking & training clients |
| [data/content/media/index.json](data/content/media/index.json) | Press & media outlets |
| [data/content/topics/index.json](data/content/topics/index.json) | Topics & expertise cards |
| [data/content/pins/index.json](data/content/pins/index.json) | Travel map — regions, places, dive sites, dive count |
| [content/posts/*.md](content/posts) | Blog posts — one Markdown file per post |

The `data/*.js` files are thin wrappers — don't edit them; edit the JSON under `data/content/` instead.

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

---

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
