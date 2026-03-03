'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { City } from '@/types'

export default function CheckinPage() {
  const router = useRouter()
  const params = useSearchParams()
  const presetCityId = params.get('cityId')

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<City[]>([])
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Load preset city
  useEffect(() => {
    if (!presetCityId) return
    supabase
      .from('cities')
      .select('*')
      .eq('id', presetCityId)
      .single()
      .then(({ data }) => { if (data) setSelectedCity(data) })
  }, [presetCityId])

  // Search cities
  useEffect(() => {
    if (!query.trim() || selectedCity) { setResults([]); return }
    const timer = setTimeout(async () => {
      const { data } = await supabase
        .from('cities')
        .select('*')
        .or(`name_en.ilike.%${query}%,name_local.ilike.%${query}%`)
        .limit(8)
      setResults(data ?? [])
    }, 300)
    return () => clearTimeout(timer)
  }, [query, selectedCity])

  const handleSubmit = async () => {
    if (!selectedCity) { setError('Please select a city.'); return }
    if (message.length > 20) { setError('Message max 20 chars.'); return }
    setLoading(true)
    setError('')

    const res = await fetch('/api/checkin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city_id: selectedCity.id, message, lang: 'en' }),
    })

    if (res.ok) {
      router.push(`/city/${selectedCity.id}`)
    } else {
      const json = await res.json().catch(() => ({}))
      setError(json.error ?? 'Failed. Try again.')
      setLoading(false)
    }
  }

  return (
    <div className="page" style={{ background: 'var(--bg)' }}>
      <div className="inner">
        <div className="back-link" onClick={() => router.push('/')}>← Back to map</div>
        <h2>Check-in</h2>

        {/* City selection */}
        {selectedCity ? (
          <div className="selected-city">
            <span>📍 {selectedCity.name_en}{selectedCity.name_local !== selectedCity.name_en ? ` · ${selectedCity.name_local}` : ''} ({selectedCity.country_code})</span>
            <button onClick={() => { setSelectedCity(null); setQuery('') }}>✕</button>
          </div>
        ) : (
          <>
            <label>Search city</label>
            <div className="search-wrap">
              <input
                type="text"
                placeholder="Tokyo, Paris, 서울…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoFocus
              />
            </div>
            {results.length > 0 && (
              <div className="search-results">
                {results.map(c => (
                  <div key={c.id} className="search-result-item" onClick={() => { setSelectedCity(c); setResults([]) }}>
                    {c.name_en}
                    <div className="sub">{c.name_local} · {c.country_code} · {c.region}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Message */}
        <label>Message (optional, max 20 chars)</label>
        <div className="msg-wrap">
          <input
            type="text"
            placeholder="Hello from here!"
            value={message}
            maxLength={20}
            onChange={e => setMessage(e.target.value)}
          />
          <span className="msg-counter">{message.length}/20</span>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <button
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
          onClick={handleSubmit}
          disabled={loading || !selectedCity}
        >
          {loading ? 'Checking in…' : '🏕 Check-in'}
        </button>

        <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: 16, lineHeight: 1.6 }}>
          No location tracking. Your check-in is anonymous and auto-deleted after 24 hours.
        </p>
      </div>
    </div>
  )
}
