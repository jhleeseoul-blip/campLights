'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const router = useRouter()
  const [showHotspots, setShowHotspots] = useState(true)

  useEffect(() => {
    const v = localStorage.getItem('showHotspots')
    if (v !== null) setShowHotspots(v === 'true')
  }, [])

  const toggle = (val: boolean) => {
    setShowHotspots(val)
    localStorage.setItem('showHotspots', String(val))
  }

  return (
    <div className="page" style={{ background: 'var(--bg)' }}>
      <div className="inner">
        <div className="back-link" onClick={() => router.push('/')}>← Back to map</div>
        <h2>Settings</h2>

        <div className="card">
          <div className="toggle-row">
            <span>Show hotspot markers (blue)</span>
            <input
              type="checkbox"
              checked={showHotspots}
              onChange={e => toggle(e.target.checked)}
            />
          </div>
        </div>

        <div className="card" style={{ marginTop: 24 }}>
          <h3 style={{ marginBottom: 12, fontSize: '1rem' }}>Privacy</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>
            CampLights does <strong style={{ color: 'var(--text)' }}>not</strong> use automatic location tracking.
            All check-ins are entered manually by selecting a city.<br /><br />
            Check-ins are anonymous (no account required) and are automatically deleted after <strong style={{ color: 'var(--text)' }}>24 hours</strong>.<br /><br />
            No personal data is stored.
          </p>
        </div>

        <div className="card" style={{ marginTop: 12 }}>
          <h3 style={{ marginBottom: 8, fontSize: '1rem' }}>About</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>
            CampLights shows real-time camping activity around the world.
            Red lights = active check-ins in the last 24h.
            Blue lights = known camping hotspots.
          </p>
        </div>
      </div>
    </div>
  )
}
