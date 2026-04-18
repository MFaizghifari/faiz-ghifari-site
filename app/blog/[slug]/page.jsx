import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '../../../components/Nav.jsx'
import Footer from '../../../components/Footer.jsx'
import styles from './post.module.css'
import { getAllSlugs, getPost } from '../../../lib/posts.js'

const SITE_URL = 'https://faizghifari.com'
const AUTHOR_OG_IMAGE = `${SITE_URL}/faiz-optimized.jpg`

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  try {
    const post = await getPost(slug)
    const url = `${SITE_URL}/blog/${slug}`
    return {
      title: `${post.title} — Faiz Ghifari`,
      description: post.excerpt,
      alternates: { canonical: `/blog/${slug}` },
      openGraph: {
        type: 'article',
        url,
        title: post.title,
        description: post.excerpt,
        images: [{ url: AUTHOR_OG_IMAGE }],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@mfaizghifari',
        title: post.title,
        description: post.excerpt,
        images: [AUTHOR_OG_IMAGE],
      },
    }
  } catch {
    return {}
  }
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  let post
  try {
    post = await getPost(slug)
  } catch {
    notFound()
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: 'Faiz Ghifari' },
    url: `${SITE_URL}/blog/${slug}`,
    image: AUTHOR_OG_IMAGE,
    datePublished: post.date,
  }

  return (
    <>
      <Nav />
      <main>
        <article className={styles.article}>
          <div className={styles.header}>
            <Link href="/#writing" className={styles.back}>← Back</Link>
            <div className={styles.meta}>
              <span className={styles.tag}>{post.tag}</span>
              <span className={styles.date}>{post.date}</span>
            </div>
            <h1 className={styles.title}>{post.title}</h1>
          </div>
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  )
}
