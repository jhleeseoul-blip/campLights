'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from '@googlemaps/js-api-loader'
import type { CityStatus } from '@/types'

const DARK_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#0a0e1a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0a0e1a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#374151' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#1f2937' }] },
  { featureType: 'administrative.land_parcel', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#060c18' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#1e3a5f' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#0d1520' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#1f2937' }, { weight: 0.8 }] },
]

export default function WorldMapPage() {
  const mapRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState({ red: 0, blue: 0 })

  useEffect(() => {
    let map: google.maps.Map
    const markers: google.maps.OverlayView[] = []

    async function init() {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: 'weekly',
      })
      await loader.load()

      map = new google.maps.Map(mapRef.current!, {
        center: { lat: 20, lng: 10 },
        zoom: 2.5,
        minZoom: 2,
        mapTypeId: 'roadmap',
        styles: DARK_STYLE,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_CENTER },
        backgroundColor: '#0a0e1a',
      })

      const res = await fetch('/api/city-status')
      if (!res.ok) { setLoading(false); return }
      const cities: CityStatus[] = await res.json()

      let red = 0, blue = 0

      // Custom OverlayView for CSS-animated markers
      class DotMarker extends google.maps.OverlayView {
        private pos: google.maps.LatLng
        private cls: string
        private cityId: string
        private div: HTMLDivElement | null = null

        constructor(lat: number, lng: number, cls: string, cityId: string) {
          super()
          this.pos = new google.maps.LatLng(lat, lng)
          this.cls = cls
          this.cityId = cityId
        }

        onAdd() {
          this.div = document.createElement('div')
          this.div.className = this.cls
          this.div.title = ''
          this.div.addEventListener('click', () => {
            router.push(`/city/${this.cityId}`)
          })
          const panes = this.getPanes()!
          panes.overlayMouseTarget.appendChild(this.div)
        }

        draw() {
          if (!this.div) return
          const proj = this.getProjection()
          const pt = proj.fromLatLngToDivPixel(this.pos)!
          this.div.style.left = `${pt.x - 6}px`
          this.div.style.top = `${pt.y - 6}px`
          this.div.style.position = 'absolute'
        }

        onRemove() {
          this.div?.parentNode?.removeChild(this.div)
          this.div = null
        }
      }

      for (const c of cities) {
        if (c.count_24h > 0) {
          const m = new DotMarker(c.lat, c.lng, 'marker-red', c.city_id)
          m.setMap(map)
          markers.push(m)
          red++
        } else if (c.is_hotspot) {
          const m = new DotMarker(c.lat, c.lng, 'marker-blue', c.city_id)
          m.setMap(map)
          markers.push(m)
          blue++
        }
      }

      setCount({ red, blue })
      setLoading(false)
    }

    init().catch(() => setLoading(false))

    return () => {
      markers.forEach(m => m.setMap(null))
    }
  }, [router])

  return (
    <div className="map-container">
      <div ref={mapRef} id="map" />

      {/* Top bar */}
      <div className="topbar">
        <h1>🏕 CampLights</h1>
        <button className="btn btn-primary" onClick={() => router.push('/checkin')}>
          ＋ Check-in
        </button>
        <button className="btn btn-secondary" onClick={() => router.push('/settings')}>
          ⚙
        </button>
      </div>

      {/* Legend */}
      <div className="legend">
        <div className="legend-item">
          <div className="dot" style={{ background: '#ef4444', boxShadow: '0 0 6px #ef4444' }} />
          <span>Active now ({count.red})</span>
        </div>
        <div className="legend-item">
          <div className="dot" style={{ background: '#3b82f6', boxShadow: '0 0 6px #3b82f6' }} />
          <span>Hotspot ({count.blue})</span>
        </div>
      </div>

      {loading && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          background: 'rgba(10,14,26,0.7)', color: '#e5e7eb', fontSize: '1rem'
        }}>
          Loading map…
        </div>
      )}
    </div>
  )
}
