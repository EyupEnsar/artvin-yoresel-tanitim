import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '../../../i18n/navigation'

const ACCOMMODATIONS = [
  {
    slug: 'karahan-otel',
    title: 'Karahan Otel',
    type: 'otel',
    location: 'Artvin Merkez',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    summary: 'Şehir merkezinde konforlu odalar ve panoramik Artvin manzarası.',
  },
  {
    slug: 'macahel-konak',
    title: 'Macahel Dağ Konağı',
    type: 'pansiyon',
    location: 'Borçka, Macahel',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80',
    summary: "Doğanın tam ortasında, ahşap yapısıyla geleneksel Artvin mimarisini yansıtan pansiyon.",
  },
  {
    slug: 'karagol-kamp',
    title: 'Karagöl Kamp Alanı',
    type: 'kamp',
    location: 'Şavşat',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80',
    summary: "Karagöl'ün hemen kenarında, doğa severlere özel kamp ve karavan alanı.",
  },
]

const TYPE_COLORS: Record<string, string> = {
  otel: 'bg-blue-100 text-blue-700',
  pansiyon: 'bg-amber-100 text-amber-700',
  kamp: 'bg-green-100 text-green-700',
  bungalov: 'bg-purple-100 text-purple-700',
}

export default function AccommodationPage() {
  const t = useTranslations('accommodation')
  const tCommon = useTranslations('common')

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800">{t('title')}</h1>
      <p className="mt-2 text-gray-500">{t('subtitle')}</p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {ACCOMMODATIONS.map(item => (
          <Link key={item.slug} href={`/accommodation/${item.slug}`} className="group rounded-2xl overflow-hidden shadow hover:shadow-lg transition bg-white">
            <div className="relative h-52">
              <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${TYPE_COLORS[item.type] ?? 'bg-gray-100 text-gray-600'}`}>
                  {t(`types.${item.type}`)}
                </span>
                <span className="text-xs text-gray-400">{item.location}</span>
              </div>
              <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.summary}</p>
              <span className="mt-3 inline-block text-sm text-green-700 font-medium">{tCommon('read_more')} →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
