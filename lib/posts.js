import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

function readPostFile(slug) {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`)
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)
  return { slug, frontmatter: data, content }
}

export function getAllSlugs() {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export function getAllPosts() {
  return getAllSlugs()
    .map((slug) => {
      const { frontmatter } = readPostFile(slug)
      return {
        slug,
        tag: frontmatter.tag,
        date: frontmatter.date,
        order: frontmatter.order ?? 0,
        title: frontmatter.title,
        excerpt: frontmatter.excerpt,
      }
    })
    .sort((a, b) => b.order - a.order)
}

export async function getPost(slug) {
  const { frontmatter, content } = readPostFile(slug)
  const processed = await remark().use(html).process(content)
  return {
    slug,
    tag: frontmatter.tag,
    date: frontmatter.date,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    html: processed.toString(),
  }
}
