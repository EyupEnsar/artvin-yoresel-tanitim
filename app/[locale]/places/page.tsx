import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '../../../i18n/navigation'

// Örnek veri — Sanity bağlandığında client.fetch() ile değişecek
const PLACES = [
  {
    slug: 'macahel',
    title: 'Macahel Vadisi',
    category: 'doğa',
    location: 'Borçka',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    summary: "UNESCO tarafından 'Biyosfer Rezervi' ilan edilen, el değmemiş doğasıyla büyüleyen bir vadi.",
  },
  {
    slug: 'karagol',
    title: 'Şavşat Karagöl',
    category: 'doğa',
    location: 'Şavşat',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    summary: "Yüksek dağların arasında saklı, kristal berraklığındaki göl. Doğa yürüyüşçülerinin gözdesi.",
  },
  {
    slug: 'artvin-kalesi',
    title: 'Artvin Kalesi',
    category: 'tarih',
    location: 'Merkez',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    summary: "Şehrin tam ortasındaki kayalıklar üzerinde yükselen, Orta Çağ'dan kalma tarihi kale.",
  },
  {
    slug: 'cehennem-deresi',
    title: 'Cehennem Deresi Kanyonu',
    category: 'doğa',
    location: 'Borçka',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    summary: 'Derin kanyon ve şelale manzarasıyla nefes kesen bir doğa harikası.',
  },
  {
    slug: 'hatila-vadisi',
    title: 'Hatila Vadisi Milli Parkı',
    category: 'doğa',
    location: 'Merkez',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    summary: "Artvin merkezine 10 km uzaklıkta, doğa yürüyüşü için mükemmel bir milli park.",
  },
  {
    slug: 'berta-selale',
    title: 'Berta Şelalesi',
    category: 'şelale',
    location: 'Arhavi',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80',
    summary: "Yemyeşil ormanların ortasında akan, Artvin'in en güzel şelalelerinden biri.",
  },
]

export default function PlacesPage() {
  const t = useTranslations('places')
  const tCommon = useTranslations('common')

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800">{t('title')}</h1>
      <p className="mt-2 text-gray-500">{t('subtitle')}</p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLACES.map(place => (
          <Link key={place.slug} href={`/places/${place.slug}`} className="group rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow bg-white">
            <div className="relative h-52">
              <Image src={place.image} alt={place.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-3 left-3 bg-green-700 text-white text-xs px-2 py-1 rounded-full">
                {place.category}
              </span>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-1">{place.location}</p>
              <h2 className="text-lg font-bold text-gray-800">{place.title}</h2>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{place.summary}</p>
              <span className="mt-3 inline-block text-sm text-green-700 font-medium">{tCommon('read_more')} →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
