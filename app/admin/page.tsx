'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const sections = [
  { label: 'Yemekler', href: '/admin/food', api: '/api/food' },
  { label: 'Gezilecek Yerler', href: '/admin/places', api: '/api/places' },
  { label: 'Etkinlikler', href: '/admin/events', api: '/api/events' },
  { label: 'Konaklama', href: '/admin/accommodation', api: '/api/accommodation' },
  { label: 'Galeri', href: '/admin/gallery', api: '/api/gallery' },
  { label: 'Duyurular', href: '/admin/announcements', api: '/api/announcements' },
  { label: 'Menü Öğeleri', href: '/admin/menu', api: '/api/menu' },
]

export default function DashboardPage() {
  const [counts, setCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    let mounted = true
    Promise.all(
      sections.map(s => fetch(s.api).then(r => r.json()).catch(() => []))
    ).then(results => {
      if (!mounted) return
      const newCounts: Record<string, number> = {}
      sections.forEach((s, i) => {
        newCounts[s.api] = Array.isArray(results[i]) ? results[i].length : 0
      })
      setCounts(newCounts)
    })
    return () => { mounted = false }
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Genel Bakış</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sections.map((s) => (
          <Link key={s.href} href={s.href} className="bg-white rounded-lg p-5 shadow hover:shadow-md transition">
            <div className="text-3xl font-bold text-gray-900">{counts[s.api] ?? '—'}</div>
            <div className="text-sm text-gray-700 mt-1">{s.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
