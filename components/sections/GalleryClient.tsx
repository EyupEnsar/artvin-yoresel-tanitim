'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function GalleryClient({ items }: { items: any[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const images = items.filter((i: any) => i.type === 'image')
  const videos = items.filter((i: any) => i.type === 'video')

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Fotoğraf Galerisi</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">Artvin'in essiz dogasindan kareler</p>

      {images.length > 0 && (
        <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((item: any) => (
            <div 
              key={item._id.toString()} 
              className="relative overflow-hidden rounded-2xl shadow hover:shadow-lg transition break-inside-avoid cursor-pointer group"
              onClick={() => setSelectedImage(item.url)}
            >
              <Image src={item.url} alt={item.title || ''} width={800} height={600} className="w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              {item.title && <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs p-2">{item.title}</div>}
              {/* Overlay Icon for expand */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                <svg className="w-10 h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
              </div>
            </div>
          ))}
        </div>
      )}

      {videos.length > 0 && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((item: any) => (
            <div key={item._id.toString()} className="rounded-2xl overflow-hidden shadow">
              <video src={item.url} controls className="w-full" />
              {item.title && <p className="p-3 text-sm font-medium text-gray-800 bg-white">{item.title}</p>}
            </div>
          ))}
        </div>
      )}

      {items.length === 0 && <p className="text-center text-gray-600 py-12">İçerik bulunamadı.</p>}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-gray-300 z-50 p-2"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="relative w-full max-w-5xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={selectedImage} 
              alt="Büyük resim" 
              fill 
              className="object-contain" 
            />
          </div>
        </div>
      )}
    </div>
  )
}
