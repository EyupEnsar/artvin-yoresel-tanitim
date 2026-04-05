'use client'
import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import ImageUploader from '@/app/admin/components/ImageUploader'
import GalleryPicker from '@/app/admin/components/GalleryPicker'

interface Props { paramsPromise?: Promise<{ id: string }> }

export default function EventForm({ paramsPromise }: Props) {
  const params = paramsPromise ? use(paramsPromise) : null
  const id = params?.id
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '', titleEn: '', slug: '', startDate: '', endDate: '',
    description: '', descriptionEn: '',
    images: [] as string[], videos: [] as string[], status: 'published',
  })

  useEffect(() => {
    if (id) fetch(`/api/events/${id}`).then(r => r.json()).then(d => setForm({
      title: d.title||'', titleEn: d.titleEn||'', slug: d.slug||'',
      startDate: d.startDate ? new Date(d.startDate).toISOString().slice(0, 16) : '',
      endDate: d.endDate ? new Date(d.endDate).toISOString().slice(0, 16) : '',
      description: d.description||'', descriptionEn: d.descriptionEn||'',
      images: d.images||[], videos: d.videos||[], status: d.status || 'published',
    }))
  }, [id])

  function slugify(v: string) {
    return v.toLowerCase().replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ı/g,'i').replace(/ö/g,'o').replace(/ç/g,'c').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    await fetch(id ? `/api/events/${id}` : '/api/events', {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    router.push('/admin/events')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{id ? 'Etkinlik Düzenle' : 'Yeni Etkinlik'}</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium mb-1">Başlık (TR) *</label>
            <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
          <div><label className="block text-sm font-medium mb-1">Başlık (EN)</label>
            <input value={form.titleEn} onChange={e => setForm(f => ({ ...f, titleEn: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
        </div>
        <div><label className="block text-sm font-medium mb-1">Slug</label>
          <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium mb-1">Başlangıç Tarihi ve Saati</label>
            <input type="datetime-local" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
          <div><label className="block text-sm font-medium mb-1">Bitiş Tarihi ve Saati</label>
            <input type="datetime-local" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
        </div>
        <div><label className="block text-sm font-medium mb-1">Açıklama (TR)</label>
          <textarea rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
        <div><label className="block text-sm font-medium mb-1">Açıklama (EN)</label>
          <textarea rows={4} value={form.descriptionEn} onChange={e => setForm(f => ({ ...f, descriptionEn: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
        <div>
          <label className="block text-sm font-medium mb-2">Görseller (Yükle)</label>
          <ImageUploader type="events" images={form.images} onChange={imgs => setForm(f => ({ ...f, images: imgs }))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Görseller (Galeriden Seç)</label>
          <GalleryPicker accept="image" selected={form.images} onChange={imgs => setForm(f => ({ ...f, images: imgs }))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Videolar (Galeriden Seç)</label>
          <GalleryPicker accept="video" selected={form.videos} onChange={vids => setForm(f => ({ ...f, videos: vids }))} label="Video Seç" />
        </div>
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
