'use client'
import { useState } from 'react'
import Image from 'next/image'

interface Props {
  type: string
  images: string[]
  onChange: (imgs: string[]) => void
}

export default function ImageUploader({ type, images, onChange }: Props) {
  const [uploading, setUploading] = useState(false)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    const urls: string[] = []
    for (const file of files) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('type', type)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) urls.push(data.url)
    }
    onChange([...images, ...urls])
    setUploading(false)
  }

  function remove(url: string) {
    onChange(images.filter(i => i !== url))
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {images.map(url => (
          <div key={url} className="relative w-24 h-24 rounded overflow-hidden border group">
            <Image src={url} alt="" fill className="object-cover" />
            <button type="button" onClick={() => remove(url)} className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs">Sil</button>
          </div>
        ))}
      </div>
      <label className="inline-flex items-center gap-2 border rounded px-3 py-2 text-sm cursor-pointer hover:bg-gray-50">
        {uploading ? 'Yükleniyor...' : 'Görsel Ekle'}
        <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFile} disabled={uploading} />
      </label>
    </div>
  )
}
