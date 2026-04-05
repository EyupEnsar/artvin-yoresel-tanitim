import { useTranslations } from 'next-intl'
import Image from 'next/image'

// Artvin / Karadeniz doğasına ait Unsplash görselleri (Unsplash License — ücretsiz)
const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', alt: 'Artvin ormanları' },
  { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80', alt: 'Dağ gölü' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80', alt: 'Dağ manzarası' },
  { src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80', alt: 'Orman yolu' },
  { src: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80', alt: 'Şelale' },
  { src: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80', alt: 'Yeşil vadi' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'Dağ zirvesi' },
  { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', alt: 'Doğa manzarası' },
  { src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80', alt: 'Doğa yürüyüşü' },
]

export default function GalleryPage() {
  const t = useTranslations('gallery')

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800">{t('title')}</h1>
      <p className="mt-2 text-gray-500">{t('subtitle')}</p>

      {/* Masonry grid */}
      <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {GALLERY_IMAGES.map((img, i) => (
          <div key={i} className="relative overflow-hidden rounded-2xl shadow hover:shadow-lg transition break-inside-avoid">
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={600}
              className="w-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
