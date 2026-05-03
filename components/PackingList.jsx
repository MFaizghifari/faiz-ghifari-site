'use client'

/**
 * Packing list — configurable trip checklist.
 *
 * The user mixes 4 day types in a single trip (training, diving, leisure,
 * drone shoot). Setting the day count for each type filters which base
 * items appear, and quantities of certain items (underwear, t-shirts,
 * rashguards, etc.) auto-scale with the day count.
 *
 * State persists to localStorage so the user can return to the page mid-
 * packing without losing checks. Trip name + day counts + checked items
 * + custom items are all saved under a single key.
 *
 * Visual language matches faizghifari.com: monochrome, 1px borders,
 * Inter font, eyebrow uppercase labels. The original spec was a vivid
 * beige/gold/colored design — that's been adapted to the site's tone
 * here.
 */

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import styles from './PackingList.module.css'

// Each day type carries a single-letter code (kept distinct: N/D/L/F) and
// an emoji used as a playful icon on configurator cards and timeline chips.
// Emojis are tonally neutral here — they're typographic glyphs, no extra
// colors to manage on the otherwise monochrome page.
const DAY_TYPES = [
  { id: 'teaching', label: 'Ngajar / Training', code: 'N', emoji: '📋' },
  { id: 'diving',   label: 'Diving',            code: 'D', emoji: '🤿' },
  { id: 'leisure',  label: 'Leisure / Extend',  code: 'L', emoji: '🌴' },
  { id: 'drone',    label: 'Drone Shoot',       code: 'F', emoji: '🚁' },
]

// Icon per item category — restored from the original spec. Categories
// not listed here render without an icon (graceful fallback).
const CATEGORY_ICONS = {
  'Pakaian Formal':     '👔',
  'Pakaian Santai':     '👕',
  'Gear Ngajar':        '🖥️',
  'Dive Gear':          '🤿',
  'Dive Dokumen':       '📄',
  'Dive Pakaian':       '🩱',
  'Dive Aksesori':      '🎒',
  'Dive Kesehatan':     '💊',
  'Dive Kamera':        '📸',
  'Drone Kit':          '🚁',
  'Drone Dokumen':      '📋',
  'Tech':               '⚡',
  'Toiletries':         '🧴',
  'Muslim Essentials':  '🕌',
  'Dokumen':            '🪪',
}

// qty: null = no badge; "days" = totalDays; "days_plus1" = totalDays + 1;
// "half_days" = ceil(total/2); a DAY_TYPES.id = that type's day count.
const BASE_ITEMS = [
  // Pakaian Formal
  { id: 't1',  label: 'Kemeja / batik',                      category: 'Pakaian Formal',    types: ['teaching'],                                qty: 'teaching' },
  { id: 't2',  label: 'Celana chino / formal',               category: 'Pakaian Formal',    types: ['teaching'],                                qty: 'teaching' },
  { id: 't3',  label: 'Sepatu kasual formal × 1',            category: 'Pakaian Formal',    types: ['teaching'],                                qty: null },

  // Pakaian Santai
  { id: 's1',  label: 'Kaos santai / baju tidur',            category: 'Pakaian Santai',    types: ['teaching','diving','leisure','drone'],     qty: 'days' },
  { id: 's2',  label: 'Celana dalam',                        category: 'Pakaian Santai',    types: ['teaching','diving','leisure','drone'],     qty: 'days_plus1' },
  { id: 's3',  label: 'Celana santai / jogger',              category: 'Pakaian Santai',    types: ['teaching','diving','leisure','drone'],     qty: 'half_days' },

  // Gear Ngajar
  { id: 't5',  label: 'Laptop + charger',                    category: 'Gear Ngajar',       types: ['teaching'],                                qty: null },
  { id: 't6',  label: 'USB-C / HDMI dongle',                 category: 'Gear Ngajar',       types: ['teaching'],                                qty: null },
  { id: 't7',  label: 'Presenter clicker',                   category: 'Gear Ngajar',       types: ['teaching'],                                qty: null },
  { id: 't8',  label: 'Sticky notes + spidol boardmarker',   category: 'Gear Ngajar',       types: ['teaching'],                                qty: null },
  { id: 't9',  label: 'Business card',                       category: 'Gear Ngajar',       types: ['teaching'],                                qty: null },
  { id: 't10', label: 'Notebook + pulpen',                   category: 'Gear Ngajar',       types: ['teaching'],                                qty: null },

  // Dive Gear
  { id: 'd1',  label: 'Wetsuit (BARE S-Flex M)',             category: 'Dive Gear',         types: ['diving'],                                  qty: null },
  { id: 'd2',  label: 'SMB + reel',                          category: 'Dive Gear',         types: ['diving'],                                  qty: null },
  { id: 'd3',  label: 'Pointer / stick',                     category: 'Dive Gear',         types: ['diving'],                                  qty: null },
  { id: 'd4',  label: 'Personal mask',                       category: 'Dive Gear',         types: ['diving'],                                  qty: null },
  { id: 'd5',  label: 'Fins (opsional — cek rental)',        category: 'Dive Gear',         types: ['diving'],                                  qty: null },

  // Dive Dokumen
  { id: 'd6',  label: 'Nitrox cert card',                    category: 'Dive Dokumen',      types: ['diving'],                                  qty: null },
  { id: 'd7',  label: 'AOWD / OWD cert card',                category: 'Dive Dokumen',      types: ['diving'],                                  qty: null },
  { id: 'd8',  label: 'Dive logbook',                        category: 'Dive Dokumen',      types: ['diving'],                                  qty: null },

  // Dive Pakaian
  { id: 'd9',  label: 'Rashguard (quick-dry)',               category: 'Dive Pakaian',      types: ['diving','leisure'],                        qty: 'diving' },
  { id: 'd10', label: 'Board shorts / swimwear',             category: 'Dive Pakaian',      types: ['diving','leisure'],                        qty: 'diving' },

  // Dive Aksesori
  { id: 'd11', label: 'Reef-safe sunscreen SPF 50+',         category: 'Dive Aksesori',     types: ['diving','leisure'],                        qty: null },
  { id: 'd12', label: 'Quick-dry microfiber towel',          category: 'Dive Aksesori',     types: ['diving','leisure'],                        qty: null },
  { id: 'd13', label: 'Dry bag 10–20L',                      category: 'Dive Aksesori',     types: ['diving'],                                  qty: null },

  // Dive Kesehatan
  { id: 'd14', label: 'Ear drops post-dive',                 category: 'Dive Kesehatan',    types: ['diving'],                                  qty: null },
  { id: 'd15', label: 'Antimo / Dramamine',                  category: 'Dive Kesehatan',    types: ['diving'],                                  qty: null },
  { id: 'd16', label: 'NaCl saline (botol)',                 category: 'Dive Kesehatan',    types: ['diving'],                                  qty: null },
  { id: 'd17', label: 'Suntikan NaCl',                       category: 'Dive Kesehatan',    types: ['diving'],                                  qty: 'diving' },
  { id: 'd18', label: 'Modexa spray',                        category: 'Dive Kesehatan',    types: ['diving'],                                  qty: null },

  // Dive Kamera
  { id: 'dk1', label: 'DJI Osmo Action 5 Pro',               category: 'Dive Kamera',       types: ['diving'],                                  qty: null },

  // Drone Kit
  { id: 'dr1', label: 'DJI Mini + remote controller',        category: 'Drone Kit',         types: ['drone'],                                   qty: null },
  { id: 'dr2', label: 'Baterai ekstra',                      category: 'Drone Kit',         types: ['drone'],                                   qty: null },
  { id: 'dr3', label: 'ND filter set',                       category: 'Drone Kit',         types: ['drone'],                                   qty: null },
  { id: 'dr4', label: 'Charging hub',                        category: 'Drone Kit',         types: ['drone'],                                   qty: null },
  { id: 'dr5', label: 'Landing pad portable',                category: 'Drone Kit',         types: ['drone'],                                   qty: null },
  { id: 'dr6', label: 'Cek izin terbang (TN / regulasi)',    category: 'Drone Dokumen',     types: ['drone'],                                   qty: null },

  // Tech (always packed)
  { id: 'g1',  label: 'Power bank 10.000+ mAh',              category: 'Tech',              types: ['teaching','diving','leisure','drone'],     qty: null },
  { id: 'g2',  label: 'Travel adapter / colokan strip',      category: 'Tech',              types: ['teaching','diving','leisure','drone'],     qty: null },
  { id: 'g3',  label: 'Earphone / AirPods',                  category: 'Tech',              types: ['teaching','diving','leisure','drone'],     qty: null },

  // Toiletries
  { id: 'g4',  label: 'Sabun + shampoo (travel size)',       category: 'Toiletries',        types: ['teaching','diving','leisure','drone'],     qty: null },
  { id: 'g5',  label: 'Deodorant',                           category: 'Toiletries',        types: ['teaching','diving','leisure','drone'],     qty: null },
  { id: 'g6',  label: 'Parfum',                              category: 'Toiletries',        types: ['teaching','diving','leisure','drone'],     qty: null },
  { id: 'g7',  label: 'Sunscreen wajah daily',               category: 'Toiletries',        types: ['teaching','diving','leisure','drone'],     qty: null },
  { id: 'g8',  label: 'Obat-obatan pribadi',                 category: 'Toiletries',        types: ['teaching','diving','leisure','drone'],     qty: null },

  // Muslim Essentials
  { id: 'm1',  label: 'Sajadah travel',                      category: 'Muslim Essentials', types: ['teaching','diving','leisure','drone'],     qty: null },
  { id: 'm2',  label: 'Baju Sholat Jumat (jika ada)',        category: 'Muslim Essentials', types: ['teaching','diving','leisure','drone'],     qty: null },

  // Dokumen
  { id: 'doc1', label: 'KTP / Paspor',                       category: 'Dokumen',           types: ['teaching','diving','leisure','drone'],     qty: null },
  { id: 'doc2', label: 'BPJS / Asuransi card',               category: 'Dokumen',           types: ['teaching','diving','leisure','drone'],     qty: null },
  { id: 'doc3', label: 'Tiket & hotel (screenshot/print)',   category: 'Dokumen',           types: ['teaching','diving','leisure','drone'],     qty: null },
]

const STORAGE_KEY = 'fg.packinglist.v1'

const initialDays = { teaching: 0, diving: 0, leisure: 0, drone: 0 }

function calcQty(qtyKey, days) {
  const total = Object.values(days).reduce((a, b) => a + b, 0)
  if (qtyKey === 'days')       return total
  if (qtyKey === 'days_plus1') return total + 1
  if (qtyKey === 'half_days')  return Math.ceil(total / 2)
  if (DAY_TYPES.find((t) => t.id === qtyKey)) return days[qtyKey] || 0
  return null
}

function CheckMark() {
  return (
    <svg
      className={styles.checkboxIcon}
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 4l2.5 2.5L9 1"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Stepper({ value, onChange, ariaLabel }) {
  return (
    <div className={styles.stepper} aria-label={ariaLabel}>
      <button
        type="button"
        className={styles.stepBtn}
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value === 0}
        aria-label="Decrease"
      >
        −
      </button>
      <span className={styles.stepCount} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={styles.stepBtn}
        onClick={() => onChange(value + 1)}
        aria-label="Increase"
      >
        +
      </button>
    </div>
  )
}

export default function PackingList() {
  const [tripName, setTripName]       = useState('')
  const [days, setDays]               = useState(initialDays)
  const [checked, setChecked]         = useState({})
  const [customItems, setCustomItems] = useState([])
  const [newItemText, setNewItemText] = useState('')
  const [newItemCat, setNewItemCat]   = useState('General')
  const [hydrated, setHydrated]       = useState(false)

  // Restore state from localStorage on mount. Done in useEffect so SSR
  // and first-paint render the empty defaults — avoids hydration mismatch.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const data = JSON.parse(raw)
        if (typeof data.tripName === 'string') setTripName(data.tripName)
        if (data.days && typeof data.days === 'object') {
          setDays({ ...initialDays, ...data.days })
        }
        if (data.checked && typeof data.checked === 'object') setChecked(data.checked)
        if (Array.isArray(data.customItems)) setCustomItems(data.customItems)
      }
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true)
  }, [])

  // Persist on any change after the first hydration tick.
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ tripName, days, checked, customItems })
      )
    } catch {
      // ignore quota / private-mode errors
    }
  }, [tripName, days, checked, customItems, hydrated])

  const totalDays = useMemo(
    () => Object.values(days).reduce((a, b) => a + b, 0),
    [days]
  )
  const activeTypes = useMemo(
    () => DAY_TYPES.map((t) => t.id).filter((k) => days[k] > 0),
    [days]
  )

  const filteredItems = useMemo(() => {
    if (activeTypes.length === 0) return []
    return [
      ...BASE_ITEMS.filter((item) => item.types.some((t) => activeTypes.includes(t))),
      ...customItems.filter((item) => item.types.some((t) => activeTypes.includes(t))),
    ]
  }, [activeTypes, customItems])

  const grouped = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = []
      acc[item.category].push(item)
      return acc
    }, {})
  }, [filteredItems])

  const total = filteredItems.length
  const done = filteredItems.filter((i) => checked[i.id]).length
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)

  const daySlots = useMemo(() => {
    const slots = []
    DAY_TYPES.forEach((t) => {
      for (let i = 0; i < days[t.id]; i++) {
        slots.push({ ...t, n: slots.length + 1 })
      }
    })
    return slots
  }, [days])

  const addCustomItem = () => {
    if (!newItemText.trim()) return
    setCustomItems((prev) => [
      ...prev,
      {
        id: 'c_' + Date.now(),
        label: newItemText.trim(),
        category: newItemCat.trim() || 'General',
        // Default custom items to all currently-active types so they always
        // appear in the current trip context.
        types: activeTypes.length ? activeTypes : ['leisure'],
        qty: null,
      },
    ])
    setNewItemText('')
  }

  const handleReset = () => {
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm(
        'Reset semua centang? (Konfigurasi hari & item custom dipertahankan.)'
      )
      if (!confirmed) return
    }
    setChecked({})
  }

  const totalDaysSummary = totalDays > 0
    ? `${totalDays} hari · ` +
      DAY_TYPES.filter((t) => days[t.id] > 0)
        .map((t) => `${days[t.id]}h ${t.label.split(' / ')[0]}`)
        .join(' · ')
    : 'Set jumlah hari per tipe untuk mulai'

  return (
    <div className={styles.wrap}>
      <Link href="/" className={styles.back}>
        Back
      </Link>

      <header className={styles.header}>
        <span className={styles.eyebrow}>Tools / Travel</span>
        <h1 className={styles.heading}>Packing list.</h1>
        <p className={styles.intro}>
          Configurable checklist for trips that mix training, diving, leisure,
          and drone shoots. Set the day count per type — the list filters
          itself and quantities scale with the trip length. State persists
          locally in your browser.
        </p>
      </header>

      <div className={styles.section}>
        <span className={styles.eyebrow}>Trip</span>
        <input
          type="text"
          className={styles.tripName}
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          placeholder="e.g. Komodo July 2026"
          aria-label="Trip name"
        />
        <span className={styles.eyebrow} aria-live="polite">
          {totalDaysSummary}
        </span>
      </div>

      <section className={styles.section} aria-labelledby="config-heading">
        <span id="config-heading" className={styles.eyebrow}>
          Konfigurasi trip
        </span>
        <div className={styles.typeGrid}>
          {DAY_TYPES.map((type) => {
            const active = days[type.id] > 0
            return (
              <div
                key={type.id}
                className={`${styles.typeCard} ${active ? styles.typeCardActive : ''}`}
              >
                <span className={styles.typeIcon} aria-hidden="true">
                  {type.emoji}
                </span>
                <div className={styles.typeMeta}>
                  <span className={styles.typeLabel}>{type.label}</span>
                  <span className={styles.typeDays}>
                    {active ? `${days[type.id]} hari` : 'Belum diset'}
                  </span>
                </div>
                <Stepper
                  value={days[type.id]}
                  onChange={(v) => setDays((p) => ({ ...p, [type.id]: v }))}
                  ariaLabel={`${type.label} day count`}
                />
              </div>
            )
          })}
        </div>

        {totalDays > 0 && (
          <div className={styles.qtyLegend} aria-label="Quantity estimates">
            <span className={styles.qtyLegendLabel}>Qty estimasi</span>
            <span className={styles.qtyLegendItem}>
              Celana dalam: <strong>×{totalDays + 1}</strong>
            </span>
            <span className={styles.qtyLegendItem}>
              Kaos santai: <strong>×{totalDays}</strong>
            </span>
            <span className={styles.qtyLegendItem}>
              Celana santai: <strong>×{Math.ceil(totalDays / 2)}</strong>
            </span>
            {days.teaching > 0 && (
              <span className={styles.qtyLegendItem}>
                Kemeja: <strong>×{days.teaching}</strong>
              </span>
            )}
            {days.diving > 0 && (
              <span className={styles.qtyLegendItem}>
                Rashguard: <strong>×{days.diving}</strong>
              </span>
            )}
          </div>
        )}

        {daySlots.length > 0 && (
          <>
            <span className={styles.eyebrow}>Timeline</span>
            <div className={styles.timeline}>
              {daySlots.map((slot) => (
                <span key={slot.id + '-' + slot.n} className={styles.chip}>
                  <span className={styles.chipNum}>H{slot.n}</span>
                  <span className={styles.chipIcon} aria-hidden="true">
                    {slot.emoji}
                  </span>
                  <span>{slot.label.split(' / ')[0]}</span>
                </span>
              ))}
            </div>
          </>
        )}
      </section>

      {activeTypes.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyLabel}>
            Set jumlah hari di atas untuk mulai
          </span>
        </div>
      ) : (
        <>
          <section className={styles.section} aria-label="Packing checklist">
            <div className={styles.progressRow}>
              <span className={styles.eyebrow}>
                Packing list — {total} item
              </span>
              <div className={styles.progressTrack} aria-hidden="true">
                <div
                  className={styles.progressFill}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className={styles.progressLabel}>
                {done}/{total} · {pct}%
              </span>
            </div>

            <div className={styles.groups}>
              {Object.entries(grouped).map(([cat, items]) => {
                const groupDone = items.filter((i) => checked[i.id]).length
                return (
                  <div key={cat} className={styles.group}>
                    <div className={styles.groupHead}>
                      <span className={styles.groupTitle}>
                        {CATEGORY_ICONS[cat] && (
                          <span className={styles.groupIcon} aria-hidden="true">
                            {CATEGORY_ICONS[cat]}
                          </span>
                        )}
                        {cat}
                      </span>
                      <span className={styles.groupCount}>
                        {groupDone}/{items.length}
                      </span>
                    </div>
                    {items.map((item) => {
                      const qtyNum = item.qty ? calcQty(item.qty, days) : null
                      const isChecked = !!checked[item.id]
                      return (
                        <label
                          key={item.id}
                          className={`${styles.item} ${isChecked ? styles.itemChecked : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() =>
                              setChecked((p) => ({ ...p, [item.id]: !p[item.id] }))
                            }
                            className={styles.srOnlyCheckbox}
                          />
                          <span
                            className={`${styles.checkbox} ${isChecked ? styles.checkboxChecked : ''}`}
                            aria-hidden="true"
                          >
                            {isChecked && <CheckMark />}
                          </span>
                          <span className={styles.itemLabel}>{item.label}</span>
                          {qtyNum !== null && qtyNum > 0 && (
                            <span className={styles.qtyBadge}>×{qtyNum}</span>
                          )}
                        </label>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </section>

          <section className={styles.customCard} aria-label="Add custom item">
            <span className={styles.eyebrow}>+ Item custom</span>
            <div className={styles.customForm}>
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCustomItem()}
                placeholder="Nama item…"
                className={styles.customField}
                aria-label="Custom item name"
              />
              <input
                type="text"
                value={newItemCat}
                onChange={(e) => setNewItemCat(e.target.value)}
                placeholder="Kategori"
                className={`${styles.customField} ${styles.customCat}`}
                aria-label="Custom item category"
              />
              <button
                type="button"
                className={styles.customAdd}
                onClick={addCustomItem}
              >
                Add
              </button>
            </div>
          </section>

          <div className={styles.footer}>
            <span
              className={`${styles.status} ${pct === 100 ? styles.statusDone : ''}`}
            >
              {pct === 100
                ? 'Siap berangkat — semua sudah dipack.'
                : pct > 0
                ? `${total - done} item belum dipack.`
                : 'Mulai centang ketika sudah masuk koper.'}
            </span>
            <button
              type="button"
              className={styles.reset}
              onClick={handleReset}
            >
              Reset checks
            </button>
          </div>
        </>
      )}
    </div>
  )
}
