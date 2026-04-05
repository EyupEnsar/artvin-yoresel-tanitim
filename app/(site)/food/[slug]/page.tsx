import { notFound } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import Food from '@/lib/models/Food'
import Link from 'next/link'
import MediaCarousel from '@/components/MediaCarousel'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB()
  const { slug } = await params
  const val = await Food.findOne({ slug }).lean()
  if (!val) return { title: 'Bulunamadı' }
  return { title: val.title }
}

export default async function FoodDetail({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB()
  const { slug } = await params
  const food = await Food.findOne({ slug }).lean()
  if (!food) return notFound()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link href="/food" className="text-orange-600 hover:underline mb-6 inline-block">&larr; Geri Dön</Link>
      <MediaCarousel images={food.images as string[]} title={food.title} />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{food.title}</h1>
      {food.restaurant && (
        <p className="text-sm text-orange-700 font-medium mb-6">Nerede Bulunur: {food.restaurant as string}</p>
      )}
      {food.description && (
        <div className="prose prose-lg text-gray-700 max-w-none bg-orange-50 p-6 md:p-10 rounded-2xl mb-8">
          {(food.description as string).split('\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>
      )}
      {food.ingredients && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Malzemeler</h2>
          <ul className="bg-amber-50 rounded-2xl p-6 space-y-2">
            {(food.ingredients as string).split('\n').filter(Boolean).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-800">
                <span className="text-amber-600 font-bold mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {food.recipe && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tarif</h2>
          <div className="bg-green-50 rounded-2xl p-6 prose prose-lg text-gray-700 max-w-none">
            {(food.recipe as string).split('\n').map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      )}
    </div>
  )
}
