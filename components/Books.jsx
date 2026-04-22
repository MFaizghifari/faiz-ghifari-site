'use client'

/**
 * "Books I love" — interactive shelf of books Faiz has read.
 *
 * Content is edited via the Keystatic CMS (/keystatic → Books) or by editing
 * data/content/books/index.json directly. Covers live in /public/books/
 * (400×600 px, AVIF or WebP preferred).
 *
 * Zero new dependencies. Uses next/image + styled-jsx (both already in Next.js).
 */

import Image from 'next/image'
import { useCallback, useState } from 'react'

export default function Books({ items = [] }) {

  const [activeIndex, setActiveIndex] = useState(0)
  const active = items[activeIndex]

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

  if (!active) return null

  return (
    <section id="books" className="books-section" aria-labelledby="books-heading">
      <h2 id="books-heading" className="books-heading">Books I love</h2>

      <div
        className="books-shelf"
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
              className={`books-book${isActive ? ' books-book-active' : ''}`}
              style={{
                '--spine-bg': b.spineColor,
                '--spine-text': b.spineTextColor ?? '#fff',
              }}
              onClick={() => setActiveIndex(i)}
            >
              <span className="books-spine" aria-hidden={isActive}>
                <span className="books-spine-label">
                  {b.title}
                  <span className="books-spine-author"> — {b.author}</span>
                </span>
              </span>

              <span className="books-cover" aria-hidden={!isActive}>
                {b.cover ? (
                  <Image
                    src={b.cover}
                    alt={`${b.title} by ${b.author}`}
                    fill
                    sizes="(max-width: 640px) 40vw, 200px"
                    priority={i === 0}
                    className="books-cover-img"
                  />
                ) : (
                  <span className="books-cover-fallback" aria-hidden="true">
                    <span className="books-cover-fallback-title">{b.title}</span>
                    <span className="books-cover-fallback-author">{b.author}</span>
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
        className="books-meta"
        aria-live="polite"
      >
        <h3 className="books-book-title">{active.title}</h3>
        <p className="books-book-author">{active.author}</p>
        <p className="books-book-quote">&ldquo;{active.quote}&rdquo;</p>
      </div>

      <style jsx>{`
        .books-section {
          padding: 4.5rem 1.5rem;
          max-width: 960px;
          margin: 0 auto;
        }
        .books-heading {
          font-family: 'Times New Roman', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.6rem, 2.6vw, 2.2rem);
          margin: 0 0 2rem;
          letter-spacing: -0.01em;
        }
        .books-shelf {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 280px;
          padding: 0 0 0.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          perspective: 1200px;
        }
        .books-book {
          position: relative;
          flex: 0 0 32px;
          height: 100%;
          background: none;
          border: 0;
          padding: 0;
          margin: 0;
          cursor: pointer;
          outline: none;
          transition: flex-basis 500ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .books-book-active {
          flex-basis: 190px;
          cursor: default;
        }
        .books-book:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 3px;
        }
        .books-spine,
        .books-cover {
          position: absolute;
          inset: 0;
          border-radius: 2px 4px 4px 2px;
          overflow: hidden;
          transition:
            opacity 320ms ease,
            transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1);
          will-change: opacity, transform;
        }
        .books-spine {
          background: var(--spine-bg, #334155);
          color: var(--spine-text, #ffffff);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            inset -2px 0 0 rgba(0, 0, 0, 0.18),
            inset 2px 0 0 rgba(255, 255, 255, 0.06);
          opacity: 1;
        }
        .books-spine-label {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.02em;
          padding: 14px 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-height: 100%;
        }
        .books-spine-author {
          font-weight: 400;
          opacity: 0.78;
        }
        .books-cover {
          opacity: 0;
          transform: translateY(8px) scale(0.94) rotateY(-4deg);
          background: #111;
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.1) inset,
            0 10px 28px rgba(0, 0, 0, 0.22),
            0 2px 6px rgba(0, 0, 0, 0.12);
          transform-origin: left center;
        }
        .books-book-active .books-spine { opacity: 0; }
        .books-book-active .books-cover {
          opacity: 1;
          transform: translateY(0) scale(1) rotateY(-4deg);
        }
        .books-cover-img { object-fit: cover; }
        .books-cover-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1rem 0.75rem;
          color: rgba(255, 255, 255, 0.85);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0.15)),
            #1a1a1a;
          gap: 0.5rem;
        }
        .books-cover-fallback-title {
          font-family: 'Times New Roman', Georgia, serif;
          font-style: italic;
          font-size: 0.95rem;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        .books-cover-fallback-author {
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0.7;
        }
        .books-meta {
          margin-top: 1.75rem;
          max-width: 560px;
        }
        .books-book-title {
          font-family: 'Times New Roman', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.3rem, 2vw, 1.7rem);
          margin: 0;
          letter-spacing: -0.01em;
        }
        .books-book-author {
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin: 0.35rem 0 0.9rem;
          opacity: 0.65;
        }
        .books-book-quote {
          font-size: 0.98rem;
          line-height: 1.55;
          margin: 0;
          color: rgba(0, 0, 0, 0.72);
        }
        @media (max-width: 640px) {
          .books-section { padding: 3rem 1.25rem; }
          .books-shelf { height: 220px; }
          .books-book { flex-basis: 26px; }
          .books-book-active { flex-basis: 140px; }
          .books-spine-label { font-size: 10px; padding: 10px 3px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .books-book,
          .books-spine,
          .books-cover { transition-duration: 1ms !important; }
        }
        @media (prefers-color-scheme: dark) {
          .books-shelf { border-bottom-color: rgba(255, 255, 255, 0.12); }
          .books-book-quote { color: rgba(255, 255, 255, 0.78); }
        }
      `}</style>
    </section>
  )
}
