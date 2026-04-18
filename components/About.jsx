import section from './Section.module.css'
import styles from './About.module.css'
import { about } from '../data/content.js'

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-label="X (Twitter)"
    role="img"
    style={{ width: '1em', height: '1em', verticalAlign: '-0.15em', fill: 'currentColor', display: 'inline-block' }}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

// Linkify occurrences of certain words in plain bio strings.
// Keeps content.js as plain text while allowing inline linked elements.
const BIO_LINKS = {
  Belajarlagi: 'https://belajarlagi.id',
}

function renderBioParagraph(paragraph, key) {
  const tokens = Object.keys(BIO_LINKS)
  if (!tokens.some((t) => paragraph.includes(t))) return paragraph
  // Split on any token, capturing the token so it ends up in the result array
  const pattern = new RegExp(`(${tokens.join('|')})`, 'g')
  const parts = paragraph.split(pattern)
  return parts.map((part, i) => {
    if (BIO_LINKS[part]) {
      return (
        <a
          key={`${key}-${i}`}
          className={styles.brandLink}
          href={BIO_LINKS[part]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      )
    }
    return part
  })
}

export default function About() {
  return (
    <section id="about" className={section.section} aria-labelledby="about-heading">
      <div className={section.header}>
        <div className={section.headerLabel}>
          <span className="eyebrow">{about.label}</span>
        </div>
        <h2 id="about-heading" className={section.headerHeading}>
          {about.heading}
        </h2>
      </div>

      <div className={styles.body}>
        <div aria-hidden />
        <div className={styles.prose}>
          {about.bio.map((paragraph, i) => (
            <p key={i}>{renderBioParagraph(paragraph, i)}</p>
          ))}

          <dl className={styles.stats}>
            {about.stats.map((stat) => (
              <div key={stat.label}>
                <dt className={styles.statLabel}>
                  {stat.label}{stat.xIcon && <>{' '}<XIcon /></>}
                </dt>
                <dd className={styles.statNumber}>{stat.value}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.movements}>
            <span className={`eyebrow ${styles.movementsLabel}`}>{about.movements.label}</span>
            <ul className={styles.movementsList}>
              {about.movements.items.map((m) => {
                const name = typeof m === 'string' ? m : m.name
                const href = typeof m === 'string' ? null : m.href
                return (
                  <li key={name} className={href ? styles.movementItemLink : undefined}>
                    {href ? (
                      <a
                        className={styles.movementLink}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {name}
                        <span className={styles.movementArrow} aria-hidden>↗</span>
                      </a>
                    ) : (
                      name
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
