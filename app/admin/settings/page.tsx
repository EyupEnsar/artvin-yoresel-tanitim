'use client'
import { useEffect, useState } from 'react'
import ImageUploader from '@/app/admin/components/ImageUploader'
import GalleryPicker from '@/app/admin/components/GalleryPicker'
import MapPicker from '@/app/admin/components/MapPicker'

export default function SettingsPage() {
  const [form, setForm] = useState({
    siteName: '', siteNameEn: '', description: '', descriptionEn: '',
    logoUrl: '', heroImages: [] as string[], heroVideo: '',
    instagram: '', facebook: '', youtube: '',
    email: '', phone: '', address: '',
    lat: null as number | null, lng: null as number | null,
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(d => {
      if (d) setForm({
        siteName: d.siteName||'', siteNameEn: d.siteNameEn||'',
        description: d.description||'', descriptionEn: d.descriptionEn||'',
        logoUrl: d.logoUrl||'', heroImages: d.heroImages||[], heroVideo: d.heroVideo||'',
        instagram: d.instagram||'', facebook: d.facebook||'', youtube: d.youtube||'',
        email: d.email||'', phone: d.phone||'', address: d.address||'',
        lat: d.lat ?? null, lng: d.lng ?? null,
      })
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Site Ayarları</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6 max-w-2xl">
        <section>
          <h2 className="font-semibold mb-3 pb-2 border-b">Genel</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium mb-1">Site Adı (TR)</label>
                <input value={form.siteName} onChange={e => setForm(f => ({ ...f, siteName: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
              <div><label className="block text-sm font-medium mb-1">Site Adı (EN)</label>
                <input value={form.siteNameEn} onChange={e => setForm(f => ({ ...f, siteNameEn: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
            </div>
            <div><label className="block text-sm font-medium mb-1">Açıklama (TR)</label>
              <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
            <div><label className="block text-sm font-medium mb-1">Açıklama (EN)</label>
              <textarea rows={3} value={form.descriptionEn} onChange={e => setForm(f => ({ ...f, descriptionEn: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
          </div>
        </section>

        <section>
          <h2 className="font-semibold mb-3 pb-2 border-b">Logo ve Görsel</h2>
          <div className="space-y-3">
            <div><label className="block text-sm font-medium mb-1">Logo</label>
              <ImageUploader type="logo" images={form.logoUrl ? [form.logoUrl] : []} onChange={imgs => setForm(f => ({ ...f, logoUrl: imgs[0] || '' }))} /></div>
            <div>
              <label className="block text-sm font-medium mb-1">Ana Sayfa Görselleri (Yükle)</label>
              <ImageUploader type="hero" images={form.heroImages} onChange={imgs => setForm(f => ({ ...f, heroImages: imgs }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Ana Sayfa Görseli (Galeriden Seç)</label>
              <GalleryPicker accept="image" selected={form.heroImages} onChange={imgs => setForm(f => ({ ...f, heroImages: imgs }))} label="Galeriden Seç" />
            </div>
            <div><label className="block text-sm font-medium mb-1">Ana Sayfa Video URL</label>
              <input value={form.heroVideo} onChange={e => setForm(f => ({ ...f, heroVideo: e.target.value }))} placeholder="/uploads/hero/video.mp4" className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
          </div>
        </section>

        <section>
          <h2 className="font-semibold mb-3 pb-2 border-b">İletişim</h2>
          <div className="space-y-3">
            <div><label className="block text-sm font-medium mb-1">E-posta</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
            <div><label className="block text-sm font-medium mb-1">Telefon</label>
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
            <div><label className="block text-sm font-medium mb-1">Adres</label>
              <textarea rows={2} value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
            <div>
              <label className="block text-sm font-medium mb-2">Harita Konumu</label>
              <MapPicker lat={form.lat} lng={form.lng} onChange={(lat, lng) => setForm(f => ({ ...f, lat, lng }))} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-semibold mb-3 pb-2 border-b">Sosyal Medya</h2>
          <div className="space-y-3">
            <div><label className="block text-sm font-medium mb-1">Instagram</label>
              <input value={form.instagram} onChange={e => setForm(f => ({ ...f, instagram: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
            <div><label className="block text-sm font-medium mb-1">Facebook</label>
              <input value={form.facebook} onChange={e => setForm(f => ({ ...f, facebook: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
            <div><label className="block text-sm font-medium mb-1">YouTube</label>
              <input value={form.youtube} onChange={e => setForm(f => ({ ...f, youtube: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
          </div>
        </section>

        <button type="submit" className="bg-gray-900 text-white px-6 py-2 rounded text-sm hover:bg-gray-700">
          {saved ? 'Kaydedildi!' : 'Kaydet'}
        </button>
      </form>
    </div>
  )
}
