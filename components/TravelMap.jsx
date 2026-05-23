'use client'

import { useEffect, useRef, useState } from 'react'
import section from './Section.module.css'
import styles from './TravelMap.module.css'
import { regions, flatPins, stats } from '../data/pins.js'
import { travel } from '../data/content.js'

// Equirectangular projection — the same arithmetic the original
// server-rendered version used. Bounding box covers the whole
// Indonesian archipelago plus the PNG border.
const LNG_MIN = 95
const LNG_MAX = 141
const LAT_MAX = 6
const LAT_MIN = -11
const X_MIN_PCT = 4
const X_MAX_PCT = 96.5
const Y_MIN_PCT = 12
const Y_MAX_PCT = 83

function project([lng, lat]) {
  const x = X_MIN_PCT + ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * (X_MAX_PCT - X_MIN_PCT)
  const y = Y_MIN_PCT + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (Y_MAX_PCT - Y_MIN_PCT)
  return { x, y }
}

// Pick a horizontal anchor for the popover so it doesn't overflow the
// map edges. Pins near the left/right edge anchor from that edge; pins
// in the middle anchor centered on the pin.
function horizontalAnchor(xPct) {
  if (xPct < 20) return 'left'
  if (xPct > 80) return 'right'
  return 'center'
}

// Pick a vertical anchor — popover goes below the pin if there's no
// room above (pin near the top of the map).
function verticalAnchor(yPct) {
  return yPct < 30 ? 'bottom' : 'top'
}

export default function TravelMap() {
  // `selected` = { pin, x, y, hAnchor, vAnchor } | null. Storing the
  // projected x/y here means the popover doesn't have to re-project
  // on every render.
  const [selected, setSelected] = useState(null)
  const mapBoxRef = useRef(null)

  // Close on Escape or outside-click. Re-binds whenever a pin is
  // selected (cheap — single document listener) and unbinds on close.
  useEffect(() => {
    if (!selected) return
    const onKey = (e) => {
      if (e.key === 'Escape') setSelected(null)
    }
    const onDocPointer = (e) => {
      if (!mapBoxRef.current?.contains(e.target)) setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDocPointer)
    document.addEventListener('touchstart', onDocPointer, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDocPointer)
      document.removeEventListener('touchstart', onDocPointer)
    }
  }, [selected])

  function handlePinClick(e, pin) {
    e.stopPropagation()
    const { x, y } = project(pin.coords)
    // Toggle off if the same pin is clicked again — gives the user a
    // quick way to dismiss without hunting for the × button.
    if (selected?.pin === pin) {
      setSelected(null)
      return
    }
    setSelected({
      pin,
      x,
      y,
      hAnchor: horizontalAnchor(x),
      vAnchor: verticalAnchor(y),
    })
  }

  return (
    <section id="travel" className={section.section} aria-labelledby="travel-heading">
      <div className={section.header}>
        <h2 id="travel-heading" className={section.headerHeading}>
          {travel.heading}
        </h2>
        <p className={section.headerSubtitle}>
          {travel.subtitle}
        </p>
      </div>

      <div className={styles.layout}>
        <div ref={mapBoxRef} className={styles.mapBox}>
          <img
            src={travel.map.src}
            alt=""
            className={styles.mapImg}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.pinLayer}>
            {flatPins.map((p) => {
              const { x, y } = project(p.coords)
              const isSelected = selected?.pin === p
              return (
                <button
                  key={`${p.region}-${p.name}`}
                  type="button"
                  className={`${p.dive ? styles.pinDive : styles.pinCity} ${
                    isSelected ? styles.pinSelected : ''
                  }`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={(e) => handlePinClick(e, p)}
                  aria-label={`${p.name}, ${p.region}${
                    p.dive ? ' — dive site' : ''
                  }`}
                  title={p.name}
                />
              )
            })}
          </div>

          {selected && (
            <div
              className={styles.popover}
              style={{ left: `${selected.x}%`, top: `${selected.y}%` }}
              data-h-anchor={selected.hAnchor}
              data-v-anchor={selected.vAnchor}
              role="dialog"
              aria-label={`${selected.pin.name} details`}
              // Stop clicks inside the popover from bubbling to the
              // document outside-click handler.
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={styles.popoverClose}
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                ×
              </button>
              <div className={styles.popoverHeader}>
                <span className={styles.popoverName}>{selected.pin.name}</span>
                {selected.pin.dive && (
                  <span className={styles.popoverDive}>Dive</span>
                )}
              </div>
              <div className={styles.popoverRegion}>{selected.pin.region}</div>
              {selected.pin.highlights && (
                <div className={styles.popoverList}>
                  {selected.pin.highlights.join(' · ')}
                </div>
              )}
              {selected.pin.diveSpots && (
                <div className={styles.popoverDiveSpots}>
                  <span className={styles.popoverLabel}>Dive · </span>
                  {selected.pin.diveSpots.join(' · ')}
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.metaRow}>
          <div className={styles.legend}>
            <span className={styles.legendRow}>
              <span className={styles.legendDotFilled} aria-hidden />
              <span>{travel.legend.dive}</span>
            </span>
            <span className={styles.legendRow}>
              <span className={styles.legendDotHollow} aria-hidden />
              <span>{travel.legend.visited}</span>
            </span>
          </div>
          <span className={styles.tally}>
            {stats.places} places · {stats.regions} regions · {stats.dives} dives
          </span>
        </div>

        <div className={styles.regionsGrid}>
          {regions.map((region) => (
            <details key={region.name} className={styles.regionCard}>
              <summary className={styles.regionSummary}>
                <span>{region.name}</span>
                <span className={styles.regionCount}>
                  <span>{region.places.length}</span>
                  <span className={styles.chevron} aria-hidden />
                </span>
              </summary>
              <div className={styles.placeList}>
                {region.places.map((place) => (
                  <div key={place.name} className={styles.place}>
                    <span
                      className={place.dive ? styles.legendDotFilled : styles.legendDotHollow}
                      aria-hidden
                    />
                    <div>
                      <div className={styles.placeHeader}>
                        <span className={styles.placeName}>{place.name}</span>
                        {place.dive && <span className={styles.diveTag}>Dive</span>}
                      </div>
                      {place.highlights && (
                        <div className={styles.highlights}>
                          {place.highlights.join(' · ')}
                        </div>
                      )}
                      {place.diveSpots && (
                        <div className={styles.diveLine}>
                          {place.diveSpots.join(' · ')}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
