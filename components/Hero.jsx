import styles from './Hero.module.css'
import { hero } from '../data/content.js'

export default function Hero() {
  return (
    <section id="top" className={styles.hero} aria-label="Introduction">
      <div className={styles.copy}>
        <span className={`eyebrow ${styles.eyebrow}`}>{hero.eyebrow}</span>
        <h1 className={styles.name}>{hero.name}</h1>
        <p className={styles.oneliner}>{hero.tagline}</p>
        <a href={hero.cta.href} className={styles.cta}>{hero.cta.label}</a>
      </div>
      <figure className={styles.portrait}>
        <img
          className={styles.portraitImg}
          src={hero.portrait.src}
          alt={hero.portrait.alt}
          loading="eager"
          decoding="async"
        />
      </figure>
    </section>
  )
}
