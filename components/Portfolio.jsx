import section from './Section.module.css'
import styles from './Portfolio.module.css'
import { portfolio as portfolioData } from '../data/portfolio.js'
import { portfolio } from '../data/content.js'

export default function Portfolio() {
  return (
    <section id="portfolio" className={section.section} aria-labelledby="portfolio-heading">
      <div className={section.header}>
        <div className={section.headerLabel}>
          <span className="eyebrow">{portfolio.label}</span>
        </div>
        <h2 id="portfolio-heading" className={section.headerHeading}>
          {portfolio.heading}
        </h2>
      </div>
      <ul className={styles.grid}>
        {portfolioData.map((c) => (
          <li key={c.name} className={styles.card}>
            <div className={styles.top}>
              {c.logo && (
                <img
                  className={styles.logo}
                  src={c.logo}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                />
              )}
              <span className={styles.name}>{c.name}</span>
            </div>
            {c.detail && <span className={styles.detail}>{c.detail}</span>}
          </li>
        ))}
      </ul>
    </section>
  )
}
