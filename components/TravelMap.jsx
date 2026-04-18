import section from './Section.module.css'
import styles from './TravelMap.module.css'
import { regions, flatPins, stats } from '../data/pins.js'
import { travel } from '../data/content.js'

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

export default function TravelMap() {
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
        <div className={styles.mapBox} aria-hidden="true">
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
              return (
                <span
                  key={`${p.region}-${p.name}`}
                  className={p.dive ? styles.pinDive : styles.pinCity}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  title={p.name}
                />
              )
            })}
          </div>
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
