import styles from './Footer.module.css'
import { footer } from '../data/content.js'

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer} aria-labelledby="contact-heading">
      <div className={styles.inner}>
        <h2 id="contact-heading" className={styles.cta}>{footer.heading}</h2>

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
