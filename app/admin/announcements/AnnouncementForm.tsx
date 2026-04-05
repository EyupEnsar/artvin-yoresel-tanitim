'use client'
import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'

interface Props { paramsPromise?: Promise<{ id: string }> }

export default function AnnouncementForm({ paramsPromise }: Props) {
  const params = paramsPromise ? use(paramsPromise) : null
  const id = params?.id
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '', titleEn: '', slug: '', content: '', contentEn: '', publishDate: '', status: 'published',
  })

  useEffect(() => {
    if (id) fetch(`/api/announcements/${id}`).then(r => r.json()).then(d => setForm({
      title: d.title||'', titleEn: d.titleEn||'', slug: d.slug||'',
      content: d.content||'', contentEn: d.contentEn||'',
      publishDate: d.publishDate ? new Date(d.publishDate).toISOString().split('T')[0] : '',
      status: d.status || 'published',
    }))
  }, [id])

  function slugify(v: string) {
    return v.toLowerCase().replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ı/g,'i').replace(/ö/g,'o').replace(/ç/g,'c').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    await fetch(id ? `/api/announcements/${id}` : '/api/announcements', {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    router.push('/admin/announcements')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{id ? 'Duyuru Düzenle' : 'Yeni Duyuru'}</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium mb-1">Başlık (TR) *</label>
            <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
          <div><label className="block text-sm font-medium mb-1">Başlık (EN)</label>
            <input value={form.titleEn} onChange={e => setForm(f => ({ ...f, titleEn: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
        </div>
        <div><label className="block text-sm font-medium mb-1">Slug</label>
          <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
        <div><label className="block text-sm font-medium mb-1">Yayın Tarihi</label>
          <input type="date" value={form.publishDate} onChange={e => setForm(f => ({ ...f, publishDate: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
        <div><label className="block text-sm font-medium mb-1">İçerik (TR)</label>
          <textarea rows={6} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
        <div><label className="block text-sm font-medium mb-1">İçerik (EN)</label>
          <textarea rows={6} value={form.contentEn} onChange={e => setForm(f => ({ ...f, contentEn: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
        <div><label className="block text-sm font-medium mb-1">Durum</label>
          <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="border rounded px-3 py-2 text-sm text-gray-900 bg-white">
            <option value="published">Yayında</option>
            <option value="draft">Taslak</option>
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="bg-gray-900 text-white px-5 py-2 rounded text-sm hover:bg-gray-700 disabled:opacity-50">{loading ? 'Kaydediliyor...' : 'Kaydet'}</button>
          <button type="button" onClick={() => router.back()} className="border px-5 py-2 rounded text-sm hover:bg-gray-50">İptal</button>
        </div>
      </form>
    </div>
  )
}
