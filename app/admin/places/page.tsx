'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function PlacesListPage() {
  const [items, setItems] = useState<any[]>([])
  async function load() { const r = await fetch('/api/places'); setItems(await r.json()) }
  useEffect(() => { load() }, [])

  async function del(id: string) {
    if (!confirm('Silmek istediğine emin misin?')) return
    await fetch(`/api/places/${id}`, { method: 'DELETE' }); load()
  }

  async function toggleStatus(item: any) {
    const next = item.status === 'published' ? 'draft' : 'published'
    await fetch(`/api/places/${item._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    })
    load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gezilecek Yerler</h1>
        <Link href="/admin/places/new" className="bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">+ Yeni Ekle</Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3">Başlık</th>
              <th className="text-left px-4 py-3">Kategori</th>
              <th className="text-left px-4 py-3">Durum</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{item.title}</td>
                <td className="px-4 py-3 text-gray-700">{item.category}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleStatus(item)}
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {item.status === 'published' ? 'Yayında' : 'Taslak'}
                  </button>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <Link href={`/admin/places/${item._id}`} className="text-blue-600 hover:underline">Düzenle</Link>
                  <button onClick={() => del(item._id)} className="text-red-500 hover:underline">Sil</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-700">Kayıt yok</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
