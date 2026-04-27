'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './Pomodoro.module.css'

const MODES = {
  focus: { label: 'Focus', minutes: 25 },
  short: { label: 'Short Break', minutes: 5 },
  long: { label: 'Long Break', minutes: 15 },
}

const format = (seconds) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

const ding = () => {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.value = 880
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9)
    osc.start()
    osc.stop(ctx.currentTime + 0.95)
  } catch {}
}

export default function PomodoroTimer() {
  const [mode, setMode] = useState('focus')
  const [secondsLeft, setSecondsLeft] = useState(MODES.focus.minutes * 60)
  const [running, setRunning] = useState(false)
  const [completed, setCompleted] = useState(0)
  const intervalRef = useRef(null)

  const switchMode = useCallback((next) => {
    setRunning(false)
    setMode(next)
    setSecondsLeft(MODES[next].minutes * 60)
  }, [])

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current)
          ding()
          setRunning(false)
          if (mode === 'focus') {
            setCompleted((c) => c + 1)
          }
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running, mode])

  useEffect(() => {
    const total = MODES[mode].minutes * 60
    document.title = `${format(secondsLeft)} — ${MODES[mode].label}`
    return () => {
      document.title = 'Pomodoro — Faiz Ghifari'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, mode])

  const total = MODES[mode].minutes * 60
  const progress = 1 - secondsLeft / total

  return (
    <div className={styles.wrap}>
      <a href="/" className={styles.back}>Back</a>
      <header className={styles.header}>
        <span className="eyebrow">Tools</span>
        <h1 className={styles.heading}>Pomodoro</h1>
        <p className={styles.intro}>
          25 minutes of focus, 5 minutes of rest. Repeat.
        </p>
      </header>
      <div className={styles.tabs} role="tablist" aria-label="Timer mode">
        {Object.entries(MODES).map(([key, m]) => (
          <button
            key={key}
            role="tab"
            aria-selected={mode === key}
            className={`${styles.tab} ${mode === key ? styles.tabActive : ''}`}
            onClick={() => switchMode(key)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className={styles.card}>
        <div
          className={styles.progress}
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
        <span className={`eyebrow ${styles.eyebrow}`}>{MODES[mode].label}</span>
        <div className={styles.time} aria-live="polite">{format(secondsLeft)}</div>
        <div className={styles.controls}>
          <button
            className={styles.primary}
            onClick={() => setRunning((r) => !r)}
            disabled={secondsLeft === 0}
          >
            {running ? 'Pause' : secondsLeft === 0 ? 'Done' : 'Start'}
          </button>
          <button
            className={styles.secondary}
            onClick={() => {
              setRunning(false)
              setSecondsLeft(MODES[mode].minutes * 60)
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className={styles.meta}>
        <span className={`eyebrow`}>Sessions completed</span>
        <span className={styles.count}>{completed.toString().padStart(2, '0')}</span>
      </div>
    </div>
  )
}
