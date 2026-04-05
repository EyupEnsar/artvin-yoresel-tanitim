import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '../../../i18n/navigation'

const EVENTS = [
  {
    slug: 'kafkasör-festivali',
    title: 'Kafkasör Yaylası Kültür ve Sanat Festivali',
    date: '2025-06-15',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    summary: "Artvin'in en köklü festivali. Güreş, müzik ve yöresel etkinliklerle dolu 3 gün.",
    isActive: true,
  },
  {
    slug: 'bahar-senligi',
    title: 'Artvin Bahar Şenliği',
    date: '2025-04-20',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
    summary: 'Baharın gelişini kutlayan, yerel sanatçıların sahne aldığı renkli etkinlik.',
    isActive: true,
  },
  {
    slug: 'macahel-doga-yuruyusu',
    title: 'Macahel Doğa Yürüyüşü',
    date: '2025-05-10',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    summary: "Macahel Vadisi'nde rehber eşliğinde düzenlenecek doğa yürüyüşü etkinliği.",
    isActive: true,
  },
]

export default function EventsPage() {
  const t = useTranslations('events')
  const tCommon = useTranslations('common')

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800">{t('title')}</h1>
      <p className="mt-2 text-gray-500">{t('subtitle')}</p>

      <div className="mt-10 space-y-6">
        {EVENTS.map(event => (
          <Link key={event.slug} href={`/events/${event.slug}`} className="group flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
            <div className="relative w-full md:w-64 h-48 flex-shrink-0">
              <Image src={event.image} alt={event.title} fill className="object-cover" />
            </div>
            <div className="p-4 md:p-6 flex flex-col justify-center">
              <span className="text-xs text-green-600 font-semibold">
                {new Date(event.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <h2 className="mt-1 text-xl font-bold text-gray-800">{event.title}</h2>
              <p className="mt-2 text-sm text-gray-500">{event.summary}</p>
              <span className="mt-4 inline-block text-sm text-green-700 font-medium">{tCommon('read_more')} →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
