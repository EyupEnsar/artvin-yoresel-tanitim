import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '../../i18n/navigation'

// Artvin / Karadeniz - Unsplash (telif gerektirmez, Unsplash License)
const HERO_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80'

const FEATURED_PLACES = [
  {
    slug: 'macahel',
    title: 'Macahel Vadisi',
    titleEn: 'Macahel Valley',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    category: 'doğa',
  },
  {
    slug: 'sahara-golu',
    title: 'Şavşat Karagöl',
    titleEn: 'Şavşat Karagöl Lake',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    category: 'doğa',
  },
  {
    slug: 'artvin-kalesi',
    title: 'Artvin Kalesi',
    titleEn: 'Artvin Castle',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    category: 'tarih',
  },
]

export default function HomePage() {
  const t = useTranslations('home')
  const tCommon = useTranslations('common')

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Artvin manzarası"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg">{t('hero_title')}</h1>
          <p className="mt-4 text-xl md:text-2xl drop-shadow">{t('hero_subtitle')}</p>
          <Link
            href="/places"
            className="mt-8 inline-block bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            {t('explore_more')}
          </Link>
        </div>
      </section>

      {/* Öne çıkan yerler */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">{t('featured_places')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_PLACES.map(place => (
            <Link key={place.slug} href={`/places/${place.slug}`} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-56">
                <Image src={place.image} alt={place.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4 bg-white">
                <span className="text-xs text-green-600 uppercase font-semibold">{place.category}</span>
                <h3 className="mt-1 text-lg font-bold text-gray-800">{place.title}</h3>
                <span className="text-sm text-green-700 font-medium">{tCommon('read_more')} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Hızlı linkler */}
      <section className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href: '/food', emoji: '🍲', label: 'Yerel Lezzetler' },
            { href: '/events', emoji: '📅', label: 'Etkinlikler' },
            { href: '/accommodation', emoji: '🏡', label: 'Konaklama' },
            { href: '/gallery', emoji: '📸', label: 'Galeri' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow hover:shadow-md transition text-center gap-2"
            >
              <span className="text-3xl">{item.emoji}</span>
              <span className="font-semibold text-gray-700">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
