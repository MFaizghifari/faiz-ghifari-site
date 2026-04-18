import Link from 'next/link'
import section from './Section.module.css'
import styles from './Blog.module.css'
import { blog } from '../data/content.js'

export default function Blog({ posts }) {
  return (
    <section id="writing" className={section.section} aria-labelledby="writing-heading">
      <div className={section.header}>
        <span className="eyebrow">{blog.label}</span>
        <h2 id="writing-heading" className={section.headerHeading}>
          {blog.heading}
        </h2>
      </div>
      <div className={styles.grid}>
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
            <div className={styles.meta}>
              <span className={styles.tag}>{post.tag}</span>
              <span className={styles.date}>{post.date}</span>
            </div>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <span className={styles.readMore}>{blog.readLabel}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
