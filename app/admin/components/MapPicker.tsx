'use client'
import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'

interface Props {
  lat: number | null
  lng: number | null
  onChange: (lat: number, lng: number) => void
}

export default function MapPicker({ lat, lng, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  const [pos, setPos] = useState<{ lat: number; lng: number } | null>(
    lat != null && lng != null ? { lat, lng } : null
  )

  // Notify parent when internal position changes
  useEffect(() => {
    if (pos) onChange(pos.lat, pos.lng)
  }, [pos]) // eslint-disable-line react-hooks/exhaustive-deps

  // Sync external lat/lng into map when props arrive (async form load)
  useEffect(() => {
    if (lat == null || lng == null || !mapRef.current) return
    import('leaflet').then(mod => {
      const L = (mod.default ?? mod) as typeof import('leaflet')
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng])
      } else {
        markerRef.current = L.marker([lat, lng]).addTo(mapRef.current)
      }
      mapRef.current.setView([lat, lng], 13)
    })
  }, [lat, lng])

  useEffect(() => {
    if (!containerRef.current) return

    import('leaflet').then(mod => {
      if (!containerRef.current) return
      if ((containerRef.current as any)._leaflet_id) return
      const L = (mod.default ?? mod) as typeof import('leaflet')

      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const initialLat = lat ?? 41.18
      const initialLng = lng ?? 41.82
      const map = L.map(containerRef.current).setView([initialLat, initialLng], lat != null ? 13 : 10)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map)

      if (lat != null && lng != null) {
        markerRef.current = L.marker([lat, lng]).addTo(map)
      }

      map.on('click', (e: any) => {
        const { lat: clickLat, lng: clickLng } = e.latlng
        if (markerRef.current) {
          markerRef.current.setLatLng([clickLat, clickLng])
        } else {
          markerRef.current = L.marker([clickLat, clickLng]).addTo(map)
        }
        setPos({ lat: clickLat, lng: clickLng })
      })

      mapRef.current = map
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markerRef.current = null
      }
    }
  }, [])

  return (
    <div>
      <div ref={containerRef} style={{ height: 300 }} className="rounded border" />
      <p className="text-xs text-gray-500 mt-1">Haritaya tıklayarak konum belirleyin</p>
      {pos && (
        <p className="text-xs text-gray-600 mt-1">Seçili: {pos.lat.toFixed(5)}, {pos.lng.toFixed(5)}</p>
      )}
    </div>
  )
}
