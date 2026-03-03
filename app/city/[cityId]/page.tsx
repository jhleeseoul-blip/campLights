'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import type { City, Checkin } from '@/types'

interface CityData {
  city: City
  checkins: Checkin[]
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function CityPage({ params }: { params: Promise<{ cityId: string }> }) {
  const { cityId } = use(params)
  const router = useRouter()
  const [data, setData] = useState<CityData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/city/${cityId}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [cityId])

  if (loading) return (
    <div className="page" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: 'var(--muted)' }}>Loading…</span>
    </div>
  )

  if (!data?.city) return (
    <div className="page">
      <div className="inner">
        <div className="back-link" onClick={() => router.push('/')}>← Back</div>
        <p style={{ color: 'var(--muted)' }}>City not found.</p>
      </div>
    </div>
  )

  const { city, checkins } = data

  return (
    <div className="page" style={{ background: 'var(--bg)' }}>
      <div className="inner">
        <div className="back-link" onClick={() => router.push('/')}>← Back to map</div>
        <div className="city-header">
          <h2>{city.name_en}{city.name_local !== city.name_en ? ` / ${city.name_local}` : ''}</h2>
          <div className="country">{city.country_code} · {city.region}</div>
          {city.is_hotspot && (
            <div style={{ marginTop: 8, fontSize: '0.8rem', color: '#3b82f6' }}>⭐ Camping Hotspot</div>
          )}
        </div>

        <button
          className="btn btn-primary"
          style={{ marginBottom: 28, width: '100%', justifyContent: 'center', padding: '12px' }}
          onClick={() => router.push(`/checkin?cityId=${city.id}`)}
        >
          🏕 Check-in here
        </button>

        <h3 style={{ fontSize: '1rem', marginBottom: 12, color: 'var(--muted)' }}>
          Recent check-ins ({checkins.length})
        </h3>

        {checkins.length === 0 ? (
          <div className="card" style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
            No check-ins yet. Be the first!
          </div>
        ) : (
          <div className="card" style={{ padding: 0 }}>
            {checkins.map(c => (
              <div key={c.id} className="checkin-item" style={{ padding: '12px 16px' }}>
                <div className="msg">{c.message || <em style={{ color: 'var(--muted)' }}>no message</em>}</div>
                <div className="ts">{timeAgo(c.created_at)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}