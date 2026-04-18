'use client'

import { useEffect, useState } from 'react'
import styles from './Nav.module.css'
import { nav } from '../data/content.js'

export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className={styles.nav}>
        <a href="#top" className={styles.mark} aria-label={nav.logoLabel}>{nav.logoMark}</a>
        <nav className={styles.links} aria-label="Primary">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <button
          className={`${styles.hamburger} ${open ? styles.open : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </header>
      <div className={`${styles.overlay} ${open ? styles.open : ''}`} aria-hidden={!open}>
        {nav.links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
      </div>
    </>
  )
}
