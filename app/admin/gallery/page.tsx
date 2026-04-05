'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function GalleryPage() {
  const [items, setItems] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [editItem, setEditItem] = useState<any>(null)

  async function load() { const r = await fetch('/api/gallery'); setItems(await r.json()) }
  useEffect(() => { load() }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    for (const file of files) {
      const isVideo = file.type.startsWith('video/')
      const fd = new FormData()
      fd.append('file', file)
      fd.append('type', 'gallery')
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const { url } = await res.json()
      await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: isVideo ? 'video' : 'image', url, title: file.name.split('.')[0] }),
      })
    }
    setUploading(false)
    load()
  }

  async function del(id: string) {
    if (!confirm('Silmek istediğine emin misin?')) return
    await fetch(`/api/gallery/${id}`, { method: 'DELETE' }); load()
  }

  async function toggleStatus(item: any) {
    const next = item.status === 'published' ? 'draft' : 'published'
    await fetch(`/api/gallery/${item._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    })
    load()
  }

  async function saveEdit() {
    await fetch(`/api/gallery/${editItem._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editItem.title, titleEn: editItem.titleEn, description: editItem.description, order: editItem.order }),
    })
    setEditItem(null); load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Galeri</h1>
        <label className="bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 cursor-pointer">
          {uploading ? 'Yükleniyor...' : '+ Medya Ekle'}
          <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden group">
            <div className="relative aspect-video bg-gray-100">
              {item.type === 'video'
                ? <video src={item.url} className="w-full h-full object-cover" />
                : <Image src={item.url} alt={item.title || ''} fill className="object-cover" />}
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 flex gap-1">
                <button onClick={() => setEditItem({ ...item })} className="bg-white text-gray-700 text-xs px-2 py-1 rounded shadow">Düzenle</button>
                <button onClick={() => del(item._id)} className="bg-white text-red-500 text-xs px-2 py-1 rounded shadow">Sil</button>
              </div>
              <div className="absolute bottom-1 left-1">
                <button
                  onClick={() => toggleStatus(item)}
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold ${item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}
                >
                  {item.status === 'published' ? 'Yayında' : 'Taslak'}
                </button>
              </div>
            </div>
            <div className="p-2 text-xs text-gray-800 truncate">{item.title || '—'}</div>
          </div>
        ))}
        {items.length === 0 && <p className="col-span-4 text-center text-gray-700 py-12">Medya yok</p>}
      </div>

      {editItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl space-y-3">
            <h2 className="font-bold">Medya Düzenle</h2>
            <div><label className="block text-sm font-medium mb-1">Başlık (TR)</label>
              <input value={editItem.title||''} onChange={e => setEditItem((i: any) => ({ ...i, title: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
            <div><label className="block text-sm font-medium mb-1">Başlık (EN)</label>
              <input value={editItem.titleEn||''} onChange={e => setEditItem((i: any) => ({ ...i, titleEn: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
            <div><label className="block text-sm font-medium mb-1">Açıklama</label>
              <textarea rows={3} value={editItem.description||''} onChange={e => setEditItem((i: any) => ({ ...i, description: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
            <div><label className="block text-sm font-medium mb-1">Sıra</label>
              <input type="number" value={editItem.order||0} onChange={e => setEditItem((i: any) => ({ ...i, order: +e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
            <div className="flex gap-2 pt-1">
              <button onClick={saveEdit} className="bg-gray-900 text-white px-4 py-2 rounded text-sm">Kaydet</button>
              <button onClick={() => setEditItem(null)} className="border px-4 py-2 rounded text-sm">İptal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
