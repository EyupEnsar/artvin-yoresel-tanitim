'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function MembersPage() {
  const [items, setItems] = useState<any[]>([])

  async function load() {
    const res = await fetch('/api/members')
    setItems(await res.json())
  }

  useEffect(() => { load() }, [])

  async function del(id: string) {
    if (!confirm('Silmek istediğine emin misin?')) return
    await fetch(`/api/members/${id}`, { method: 'DELETE' })
    load()
  }

  async function toggleStatus(item: any) {
    const next = item.status === 'published' ? 'draft' : 'published'
    await fetch(`/api/members/${item._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    })
    load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dernek Kadrosu</h1>
        <Link href="/admin/members/new" className="bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">
          + Yeni Sorumlu
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {items.length === 0 && (
          <p className="text-center text-gray-500 py-12">Henüz sorumlu eklenmemiş.</p>
        )}
        {items.map(item => (
          <div key={item._id} className="flex items-center gap-4 px-5 py-4 border-b last:border-0 hover:bg-gray-50">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              {item.photo
                ? <Image src={item.photo} alt={item.name} fill className="object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl">👤</div>}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{item.name}</p>
              <p className="text-sm text-gray-500 truncate">{item.title}</p>
            </div>
            <button
              onClick={() => toggleStatus(item)}
              className={`text-xs px-2 py-1 rounded-full font-semibold flex-shrink-0 ${item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
            >
              {item.status === 'published' ? 'Yayında' : 'Taslak'}
            </button>
            <div className="flex gap-2 flex-shrink-0">
              <Link href={`/admin/members/${item._id}`} className="text-sm border px-3 py-1 rounded hover:bg-gray-50">Düzenle</Link>
              <button onClick={() => del(item._id)} className="text-sm border border-red-200 text-red-500 px-3 py-1 rounded hover:bg-red-50">Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
