import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '../../../i18n/navigation'

const FOODS = [
  {
    slug: 'muhlama',
    title: 'Mıhlama',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    summary: "Karadeniz'in vazgeçilmezi. Mısır unu, tereyağı ve peynirden yapılan nefis bir kahvaltılık.",
  },
  {
    slug: 'hamsikoli',
    title: 'Hamsikoli',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    summary: 'Hamsiyle yapılan geleneksel Karadeniz pilavı. Artvin mutfağının simgesi.',
  },
  {
    slug: 'kaymak',
    title: 'Artvin Kaymağı',
    image: 'https://images.unsplash.com/photo-1565299543923-37dd37887442?w=800&q=80',
    summary: "Yöreye özgü hazırlanma yöntemiyle yapılan, Artvin'in meşhur kaymağı.",
  },
  {
    slug: 'laz-boregi',
    title: 'Laz Böreği',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    summary: 'Muhallebili, ince yufkalı geleneksel tatlı börek. Her lokmada Artvin tadı.',
  },
]

export default function FoodPage() {
  const t = useTranslations('food')
  const tCommon = useTranslations('common')

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800">{t('title')}</h1>
      <p className="mt-2 text-gray-500">{t('subtitle')}</p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {FOODS.map(food => (
          <Link key={food.slug} href={`/food/${food.slug}`} className="group flex gap-4 bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
            <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
              <Image src={food.image} alt={food.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-bold text-gray-800">{food.title}</h2>
              <p className="mt-1 text-sm text-gray-500 line-clamp-3">{food.summary}</p>
              <span className="mt-2 text-sm text-green-700 font-medium">{tCommon('read_more')} →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
