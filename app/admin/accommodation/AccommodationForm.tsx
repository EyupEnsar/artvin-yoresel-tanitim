'use client'
import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import ImageUploader from '@/app/admin/components/ImageUploader'
import GalleryPicker from '@/app/admin/components/GalleryPicker'
import MapPicker from '@/app/admin/components/MapPicker'

interface Props { paramsPromise?: Promise<{ id: string }> }

export default function AccommodationForm({ paramsPromise }: Props) {
  const params = paramsPromise ? use(paramsPromise) : null
  const id = params?.id
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '', titleEn: '', slug: '', type: '', description: '', descriptionEn: '',
    images: [] as string[], contact: '', address: '', status: 'published',
    lat: null as number | null, lng: null as number | null,
  })

  useEffect(() => {
    if (id) fetch(`/api/accommodation/${id}`).then(r => r.json()).then(d => setForm({
      title: d.title||'', titleEn: d.titleEn||'', slug: d.slug||'', type: d.type||'',
      description: d.description||'', descriptionEn: d.descriptionEn||'',
      images: d.images||[], contact: d.contact||'', address: d.address||'', status: d.status || 'published',
      lat: d.lat ?? null, lng: d.lng ?? null,
    }))
  }, [id])

  function slugify(v: string) {
    return v.toLowerCase().replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ı/g,'i').replace(/ö/g,'o').replace(/ç/g,'c').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    await fetch(id ? `/api/accommodation/${id}` : '/api/accommodation', {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    router.push('/admin/accommodation')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{id ? 'Konaklama Düzenle' : 'Yeni Konaklama'}</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium mb-1">Ad (TR) *</label>
            <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
          <div><label className="block text-sm font-medium mb-1">Ad (EN)</label>
            <input value={form.titleEn} onChange={e => setForm(f => ({ ...f, titleEn: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
        </div>
        <div><label className="block text-sm font-medium mb-1">Slug</label>
          <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
        <div><label className="block text-sm font-medium mb-1">Tür</label>
          <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white">
            <option value="">Seç</option>
            {['otel','pansiyon','kamp','bungalov','diğer'].map(t => <option key={t} value={t}>{t}</option>)}
          </select></div>
        <div><label className="block text-sm font-medium mb-1">İletişim</label>
          <input value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
        <div><label className="block text-sm font-medium mb-1">Adres</label>
          <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
        <div><label className="block text-sm font-medium mb-1">Açıklama (TR)</label>
          <textarea rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
        <div><label className="block text-sm font-medium mb-1">Açıklama (EN)</label>
          <textarea rows={4} value={form.descriptionEn} onChange={e => setForm(f => ({ ...f, descriptionEn: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
        <div>
          <label className="block text-sm font-medium mb-2">Görseller (Yükle)</label>
          <ImageUploader type="accommodation" images={form.images} onChange={imgs => setForm(f => ({ ...f, images: imgs }))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Görseller (Galeriden Seç)</label>
          <GalleryPicker accept="image" selected={form.images} onChange={imgs => setForm(f => ({ ...f, images: imgs }))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Harita Konumu</label>
          <MapPicker lat={form.lat} lng={form.lng} onChange={(lat, lng) => setForm(f => ({ ...f, lat, lng }))} />
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
