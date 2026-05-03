'use client'

import { useState } from 'react'
import section from './Section.module.css'
import styles from './Portfolio.module.css'
import { portfolio as portfolioData } from '../data/portfolio.js'
import { portfolio } from '../data/content.js'

// Number of cards visible on mobile when the list is collapsed.
// Cards beyond this index are hidden via CSS until the user expands;
// on desktop, all cards are always visible (the toggle button itself is
// hidden via media query in Portfolio.module.css).
const MOBILE_COLLAPSED_COUNT = 6

export default function Portfolio() {
  const [expanded, setExpanded] = useState(false)
  const hasOverflow = portfolioData.length > MOBILE_COLLAPSED_COUNT

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
      <ul
        id="portfolio-grid"
        className={`${styles.grid} ${expanded ? styles.gridExpanded : ''}`}
      >
        {portfolioData.map((c, i) => (
          <li
            key={c.name}
            className={`${styles.card} ${
              i >= MOBILE_COLLAPSED_COUNT ? styles.cardOverflow : ''
            }`}
          >
            <div className={styles.top}>
              {c.logo && (
                <img
                  className={`${styles.logo}${
                    c.size === 'seal'
                      ? ` ${styles.logoSeal}`
                      : c.size === 'wide'
                      ? ` ${styles.logoWide}`
                      : ''
                  }${c.colorMode === 'inverted' ? ` ${styles.logoInverted}` : ''}`}
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

      {hasOverflow && (
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls="portfolio-grid"
        >
          {expanded
            ? 'Show less'
            : `Show all ${portfolioData.length} clients`}
          <span className={styles.toggleArrow} aria-hidden="true">
            {expanded ? '↑' : '↓'}
          </span>
        </button>
      )}
    </section>
  )
}
