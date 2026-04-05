'use client'
import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Props { paramsPromise?: Promise<{ id: string }> }

export default function MemberForm({ paramsPromise }: Props) {
  const params = paramsPromise ? use(paramsPromise) : null
  const id = params?.id
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({ name: '', title: '', photo: '', order: 0, status: 'published' })

  useEffect(() => {
    if (id) fetch(`/api/members/${id}`).then(r => r.json()).then(d => setForm({
      name: d.name || '', title: d.title || '', photo: d.photo || '', order: d.order ?? 0, status: d.status || 'published',
    }))
  }, [id])

  async function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('type', 'members')
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const { url } = await res.json()
    setForm(f => ({ ...f, photo: url }))
    setUploading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch(id ? `/api/members/${id}` : '/api/members', {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    router.push('/admin/members')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{id ? 'Kadro Düzenle' : 'Yeni Kadro'}</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium mb-1">Ad Soyad *</label>
          <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Unvan *</label>
          <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sıra</label>
          <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: +e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Fotoğraf</label>
          {form.photo && (
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-3 border">
              <Image src={form.photo} alt={form.name} fill className="object-cover" />
            </div>
          )}
          <label className="cursor-pointer inline-block border rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
            {uploading ? 'Yükleniyor...' : 'Fotoğraf Seç'}
            <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} disabled={uploading} />
          </label>
        </div>
        <div><label className="block text-sm font-medium mb-1">Durum</label>
          <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="border rounded px-3 py-2 text-sm text-gray-900 bg-white">
            <option value="published">Yayında</option>
            <option value="draft">Taslak</option>
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading || uploading} className="bg-gray-900 text-white px-5 py-2 rounded text-sm hover:bg-gray-700 disabled:opacity-50">
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
          <button type="button" onClick={() => router.back()} className="border px-5 py-2 rounded text-sm hover:bg-gray-50">İptal</button>
        </div>
      </form>
    </div>
  )
}
