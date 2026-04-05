import Image from 'next/image'
import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import Food from '@/lib/models/Food'

export const dynamic = 'force-dynamic'

export default async function FoodPage() {
  await connectDB()
  const foods = await Food.find({ status: 'published' }).sort({ isFeatured: -1, createdAt: -1 }).lean()

  return <FoodContent foods={foods} />
}

function FoodContent({ foods }: { foods: any[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800">Yöresel Lezzetler</h1>
      <p className="mt-2 text-gray-600">Artvin'in eşsiz mutfağı</p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {foods.map((food: any) => (
          <Link key={food.slug} href={`/food/${food.slug}`} className="group flex gap-4 bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
            {food.images?.[0] && (
              <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                <Image src={food.images[0]} alt={food.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
            )}
            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-bold text-gray-800">{food.title}</h2>
              {food.description && <p className="mt-1 text-sm text-gray-700 line-clamp-3">{food.description}</p>}
              <span className="mt-2 text-sm text-green-700 font-medium">Devamını Oku →</span>
            </div>
          </Link>
        ))}
        {foods.length === 0 && <p className="col-span-2 text-center text-gray-600 py-12">İçerik bulunamadı.</p>}
      </div>
    </div>
  )
}
