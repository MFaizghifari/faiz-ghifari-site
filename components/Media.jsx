import styles from './Media.module.css'
import { media as mediaData } from '../data/media.js'
import { media } from '../data/content.js'

export default function Media() {
  return (
    <section id="media" className={styles.wrap} aria-labelledby="media-heading">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="eyebrow">{media.label}</span>
          <h2 id="media-heading" className={styles.heading}>
            {media.heading}
          </h2>
        </div>
        <ul className={styles.strip}>
          {mediaData.map((m, i) => {
            const inner = (
              <>
                <span className={styles.name}>{m.name}</span>
                {m.outlet && <span className={styles.outlet}>{m.outlet}</span>}
              </>
            )
            return (
              <li key={(m.href || m.name) + i} className={styles.item}>
                {m.href ? (
                  <a
                    className={styles.link}
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
