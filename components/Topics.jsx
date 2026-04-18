import section from './Section.module.css'
import styles from './Topics.module.css'
import { topics as topicsData } from '../data/topics.js'
import { topics } from '../data/content.js'

export default function Topics() {
  return (
    <section id="topics" className={section.section} aria-labelledby="topics-heading">
      <div className={section.header}>
        <span className="eyebrow">{topics.label}</span>
        <h2 id="topics-heading" className={section.headerHeading}>
          {topics.heading}
        </h2>
      </div>
      <ul className={styles.grid}>
        {topicsData.map((t, i) => (
          <li key={t.title} className={styles.card}>
            <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.title}>{t.title}</span>
            <p className={styles.blurb}>{t.blurb}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
