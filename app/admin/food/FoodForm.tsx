'use client'
import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import ImageUploader from '@/app/admin/components/ImageUploader'
import GalleryPicker from '@/app/admin/components/GalleryPicker'

interface Props { paramsPromise?: Promise<{ id: string }> }

export default function FoodForm({ paramsPromise }: Props) {
  const params = paramsPromise ? use(paramsPromise) : null
  const id = params?.id
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '', titleEn: '', slug: '', description: '', descriptionEn: '',
    ingredients: '', recipe: '',
    images: [] as string[], restaurant: '', isFeatured: false, status: 'published',
  })

  useEffect(() => {
    if (id) {
      fetch(`/api/food/${id}`).then(r => r.json()).then(data => setForm({
        title: data.title || '', titleEn: data.titleEn || '', slug: data.slug || '',
        description: data.description || '', descriptionEn: data.descriptionEn || '',
        ingredients: data.ingredients || '', recipe: data.recipe || '',
        images: data.images || [], restaurant: data.restaurant || '', isFeatured: !!data.isFeatured, status: data.status || 'published',
      }))
    }
  }, [id])

  function slugify(val: string) {
    return val.toLowerCase().replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ı/g,'i').replace(/ö/g,'o').replace(/ç/g,'c').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const method = id ? 'PUT' : 'POST'
    const url = id ? `/api/food/${id}` : '/api/food'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    router.push('/admin/food')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{id ? 'Yemek Düzenle' : 'Yeni Yemek'}</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Ad (TR) *</label>
            <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ad (EN)</label>
            <input value={form.titleEn} onChange={e => setForm(f => ({ ...f, titleEn: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Açıklama (TR)</label>
          <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Açıklama (EN)</label>
          <textarea rows={3} value={form.descriptionEn} onChange={e => setForm(f => ({ ...f, descriptionEn: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Malzemeler</label>
          <textarea rows={5} placeholder="Her malzemeyi ayrı satıra yazın..." value={form.ingredients} onChange={e => setForm(f => ({ ...f, ingredients: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tarif</label>
          <textarea rows={8} placeholder="Hazırlanış adımlarını yazın..." value={form.recipe} onChange={e => setForm(f => ({ ...f, recipe: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nerede Bulunur</label>
          <input value={form.restaurant} onChange={e => setForm(f => ({ ...f, restaurant: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Görseller (Yükle)</label>
          <ImageUploader type="food" images={form.images} onChange={imgs => setForm(f => ({ ...f, images: imgs }))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Görseller (Galeriden Seç)</label>
          <GalleryPicker accept="image" selected={form.images} onChange={imgs => setForm(f => ({ ...f, images: imgs }))} />
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isFeatured} onChange={e => setForm(f => ({ ...f, isFeatured: e.target.checked }))} />
            Öne Çıkar
          </label>
          <div><label className="block text-sm font-medium mb-1">Durum</label>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="border rounded px-3 py-2 text-sm text-gray-900 bg-white">
              <option value="published">Yayında</option>
              <option value="draft">Taslak</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="bg-gray-900 text-white px-5 py-2 rounded text-sm hover:bg-gray-700 disabled:opacity-50">
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
          <button type="button" onClick={() => router.back()} className="border px-5 py-2 rounded text-sm hover:bg-gray-50">İptal</button>
        </div>
      </form>
    </div>
  )
}
