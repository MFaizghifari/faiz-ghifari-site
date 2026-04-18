import { getAllSlugs } from '../lib/posts.js'

const SITE_URL = 'https://faizghifari.com'

export default function sitemap() {
  const now = new Date()

  const staticEntries = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]

  const postEntries = getAllSlugs().map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticEntries, ...postEntries]
}
