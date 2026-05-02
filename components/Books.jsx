'use client'

/**
 * "Books I love" — interactive shelf of books Faiz has read.
 *
 * Content is edited via the Keystatic CMS (/keystatic → Books) or by editing
 * data/content/books/index.json directly. Covers live in /public/books/
 * (400×600 px, AVIF or WebP preferred).
 *
 * Styles live in Books.module.css so Next.js extracts them into a <link>
 * stylesheet that loads in <head> before the body renders. (We previously
 * used styled-jsx, which injects styles inline at render time and caused
 * a brief flash of an unbounded <Image fill> — the "huge book cover" flash
 * — during the gap between HTML arrival and styled-jsx hydration.)
 */

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './Books.module.css'

// How long a mouse must rest on a spine before the book flips open.
// Short enough to feel responsive; long enough that sweeping the mouse
// across the shelf doesn't cascade-flip every book.
const HOVER_DELAY_MS = 120

export default function Books({ items = [] }) {

  const [activeIndex, setActiveIndex] = useState(0)
  const active = items[activeIndex]

  // Single shared timer — only one pending flip at a time. Sweeping to a new
  // book cancels the previous book's pending flip via onPointerLeave.
  const hoverTimerRef = useRef(null)
  const clearHoverTimer = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
  }, [])

  // Ensure no stale timer fires after unmount (e.g. route change mid-hover).
  useEffect(() => clearHoverTimer, [clearHoverTimer])

  // The shelf scrolls horizontally on small screens (24+ books > viewport).
  // When the active book changes via click or arrow keys, slide it into view
  // so users can see what they just selected. We compute scrollLeft directly
  // rather than calling scrollIntoView — the latter races with the flex-basis
  // transition (500ms) on the active book and gets cancelled. We also skip the
  // very first effect tick so the page doesn't auto-scroll on initial load.
  const shelfRef = useRef(null)
  const didMountRef = useRef(false)
  useEffect(() => {
    console.log('[BookScroll] effect run', { activeIndex, didMount: didMountRef.current })
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }
    const shelf = shelfRef.current
    console.log('[BookScroll] shelf', !!shelf, 'el', !!shelf?.children[activeIndex])
    if (!shelf) return
    const el = shelf.children[activeIndex]
    if (!el) return
    // Smooth scroll gets cancelled when the active book's flex-basis transition
    // (500ms) reflows the shelf mid-animation. We must use behavior:'instant'
    // explicitly — assigning scrollLeft directly triggers smooth scrolling
    // because html has `scroll-behavior: smooth`, and 'auto' inherits the same.
    // Wrap in rAF so we measure offsetWidth *after* React commits the new
    // active class — otherwise the active book is still narrow and centring is
    // off by ~80px.
    requestAnimationFrame(() => {
      const target = el.offsetLeft + el.offsetWidth / 2 - shelf.clientWidth / 2
      const max = shelf.scrollWidth - shelf.clientWidth
      const clamped = Math.max(0, Math.min(max, target))
      console.log('[BookScroll] rAF scrollTo', { target, clamped, max, before: shelf.scrollLeft })
      shelf.scrollTo({ left: clamped, behavior: 'instant' })
      console.log('[BookScroll] after scrollTo', { after: shelf.scrollLeft })
    })
  }, [activeIndex])

  const go = useCallback(
    (delta) => {
      setActiveIndex((i) => (i + delta + items.length) % items.length)
    },
    [items.length]
  )

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
      else if (e.key === 'Home') { e.preventDefault(); setActiveIndex(0) }
      else if (e.key === 'End') { e.preventDefault(); setActiveIndex(items.length - 1) }
    },
    [go, items.length]
  )

  const handlePointerEnter = useCallback(
    (i, e) => {
      // Only mouse/pen get the hover-to-flip; touch uses click instead to
      // avoid the "tap = hover + click" double-fire pattern on iOS/Android.
      if (e.pointerType === 'touch') return
      clearHoverTimer()
      hoverTimerRef.current = setTimeout(() => {
        setActiveIndex(i)
        hoverTimerRef.current = null
      }, HOVER_DELAY_MS)
    },
    [clearHoverTimer]
  )

  const handleClick = useCallback(
    (i) => {
      // Click wins immediately — skip the hover delay.
      clearHoverTimer()
      setActiveIndex(i)
    },
    [clearHoverTimer]
  )

  if (!active) return null

  return (
    <section id="books" className={styles.section} aria-labelledby="books-heading">
      <h2 id="books-heading" className={styles.heading}>Books I love</h2>

      <div
        ref={shelfRef}
        className={styles.shelf}
        role="tablist"
        aria-label="Book shelf — use left and right arrow keys to browse"
        onKeyDown={onKeyDown}
      >
        {items.map((b, i) => {
          const isActive = i === activeIndex
          return (
            <button
              key={b.slug}
              id={`book-tab-${b.slug}`}
              role="tab"
              aria-selected={isActive}
              aria-controls="books-panel"
              tabIndex={isActive ? 0 : -1}
              className={`${styles.book} ${isActive ? styles.bookActive : ''}`}
              style={{
                '--spine-bg': b.spineColor,
                '--spine-text': b.spineTextColor ?? '#fff',
              }}
              onClick={() => handleClick(i)}
              onPointerEnter={(e) => handlePointerEnter(i, e)}
              onPointerLeave={clearHoverTimer}
              onPointerCancel={clearHoverTimer}
            >
              <span className={styles.spine} aria-hidden={isActive}>
                <span className={styles.spineLabel}>
                  {b.title}
                  <span className={styles.spineAuthor}> — {b.author}</span>
                </span>
              </span>

              <span className={styles.cover} aria-hidden={!isActive}>
                {b.cover ? (
                  <Image
                    src={b.cover}
                    alt={`${b.title} by ${b.author}`}
                    fill
                    sizes="(max-width: 640px) 40vw, 200px"
                    priority={i === 0}
                    className={styles.coverImg}
                  />
                ) : (
                  <span className={styles.coverFallback} aria-hidden="true">
                    <span className={styles.coverFallbackTitle}>{b.title}</span>
                    <span className={styles.coverFallbackAuthor}>{b.author}</span>
                  </span>
                )}
              </span>
            </button>
          )
        })}
      </div>

      <div
        id="books-panel"
        role="tabpanel"
        aria-labelledby={`book-tab-${active.slug}`}
        className={styles.meta}
        aria-live="polite"
      >
        <h3 className={styles.bookTitle}>{active.title}</h3>
        <p className={styles.bookAuthor}>{active.author}</p>
        {active.quote ? (
          <>
            <p className={styles.takeawayLabel}>My takeaway</p>
            <p className={styles.bookQuote}>&ldquo;{active.quote}&rdquo;</p>
          </>
        ) : (
          <p className={styles.takeawayPending}>Takeaway coming soon.</p>
        )}
      </div>
    </section>
  )
}
