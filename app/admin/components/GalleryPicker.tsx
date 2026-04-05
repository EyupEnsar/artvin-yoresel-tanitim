'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface GalleryItem {
  _id: string
  type: 'image' | 'video'
  url: string
  title?: string
}

interface Props {
  selected: string[]
  onChange: (urls: string[]) => void
  accept?: 'all' | 'image' | 'video'
  multiple?: boolean
  label?: string
}

export default function GalleryPicker({ selected, onChange, accept = 'all', multiple = true, label = 'Galeriden Seç' }: Props) {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<GalleryItem[]>([])

  useEffect(() => {
    if (open && items.length === 0) {
      fetch('/api/gallery').then(r => r.json()).then(setItems)
    }
  }, [open, items.length])

  const filtered = items.filter(i => accept === 'all' || i.type === accept)

  function toggle(url: string) {
    if (multiple) {
      onChange(selected.includes(url) ? selected.filter(u => u !== url) : [...selected, url])
    } else {
      onChange(selected.includes(url) ? [] : [url])
    }
  }

  function remove(url: string) {
    onChange(selected.filter(u => u !== url))
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {selected.map(url => (
          <div key={url} className="relative w-20 h-20 rounded overflow-hidden border group">
            {url.match(/\.(mp4|webm|mov)$/i)
              ? <video src={url} className="w-full h-full object-cover" />
              : <Image src={url} alt="" fill className="object-cover" />}
            <button
              type="button"
              onClick={() => remove(url)}
              className="absolute inset-0 bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 flex items-center justify-center"
            >Kaldır</button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-20 h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-500 hover:border-gray-400"
        >{label}</button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] flex flex-col shadow-xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-bold">Galeri</h2>
              <button type="button" onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-800 text-xl">&times;</button>
            </div>
            <div className="overflow-y-auto p-4 grid grid-cols-4 gap-3">
              {filtered.map(item => {
                const isSelected = selected.includes(item.url)
                return (
                  <div
                    key={item._id}
                    onClick={() => toggle(item.url)}
                    className={`relative aspect-video rounded overflow-hidden cursor-pointer border-2 ${isSelected ? 'border-green-600' : 'border-transparent'}`}
                  >
                    {item.type === 'video'
                      ? <video src={item.url} className="w-full h-full object-cover" />
                      : <Image src={item.url} alt={item.title || ''} fill className="object-cover" />}
                    {isSelected && (
                      <div className="absolute inset-0 bg-green-600/20 flex items-center justify-center">
                        <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">✓</span>
                      </div>
                    )}
                    {item.title && <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">{item.title}</div>}
                  </div>
                )
              })}
              {filtered.length === 0 && <p className="col-span-4 text-center text-gray-500 py-8">Galeri boş</p>}
            </div>
            <div className="p-4 border-t flex justify-end">
              <button type="button" onClick={() => setOpen(false)} className="bg-gray-900 text-white px-5 py-2 rounded text-sm">Tamam</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
