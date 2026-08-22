import styles from './Footer.module.css'
import { footer } from '../data/content.js'

// The CTA is set in the display serif, which has no italic cut for emoji —
// browsers synthesize an oblique and the glyph ends up slanted. Split the
// emoji out so it can opt back to upright.
//
// Two regexes on purpose: the /g one drives String.split (which needs the
// capture group to keep delimiters), while the anchored one tests each part.
// Reusing a /g regex for .test() would be stateful via lastIndex and give
// alternating false negatives.
const EMOJI_SPLIT =
  /(\p{Extended_Pictographic}(?:[️︎]|‍\p{Extended_Pictographic})*)/gu
const IS_EMOJI = /^\p{Extended_Pictographic}/u

function renderHeading(text) {
  return text.split(EMOJI_SPLIT).map((part, i) =>
    IS_EMOJI.test(part) ? (
      <span key={i} className={styles.ctaEmoji}>
        {part}
      </span>
    ) : (
      part
    )
  )
}

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer} aria-labelledby="contact-heading">
      <div className={styles.inner}>
        <h2 id="contact-heading" className={styles.cta}>
          {renderHeading(footer.heading)}
        </h2>

        <div className={styles.contacts}>
          {footer.contact.map((entry) => (
            <div key={entry.label} className={styles.contactBlock}>
              <span className={styles.contactLabel}>{entry.label}</span>
              {entry.href ? (
                <a
                  className={styles.contactValue}
                  href={entry.href}
                  {...(entry.external && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {entry.value}
                </a>
              ) : (
                <span className={styles.contactValue}>{entry.value}</span>
              )}
            </div>
          ))}
        </div>

        <div className={styles.legal}>
          <span>{footer.copyright}</span>
          <span>{footer.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
