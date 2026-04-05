import Image from 'next/image'
import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import Accommodation from '@/lib/models/Accommodation'

export const dynamic = 'force-dynamic'

export default async function AccommodationPage() {
  await connectDB()
  const items = await Accommodation.find({ status: 'published' }).sort({ createdAt: -1 }).lean()

  return <AccommodationContent items={items} />
}

const TYPE_COLORS: Record<string, string> = {
  otel: 'bg-blue-100 text-blue-800',
  pansiyon: 'bg-amber-100 text-amber-800',
  kamp: 'bg-green-100 text-green-800',
  bungalov: 'bg-purple-100 text-purple-800',
}

function AccommodationContent({ items }: { items: any[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800">Konaklama</h1>
      <p className="mt-2 text-gray-600">Doğa ile iç içe konaklama seçenekleri</p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item: any) => (
          <Link key={item.slug} href={`/accommodation/${item.slug}`} className="group rounded-2xl overflow-hidden shadow hover:shadow-lg transition bg-white">
            {item.images?.[0] && (
              <div className="relative h-52">
                <Image src={item.images[0]} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                {item.type && (
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${TYPE_COLORS[item.type] ?? 'bg-gray-100 text-gray-700'}`}>
                    <span className="capitalize">{item.type}</span>
                  </span>
                )}
                {item.address && <span className="text-xs text-gray-700">{item.address}</span>}
              </div>
              <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
              {item.description && <p className="mt-1 text-sm text-gray-700 line-clamp-2">{item.description}</p>}
              {item.contact && <p className="mt-2 text-sm text-gray-700">{item.contact}</p>}
              <span className="mt-3 inline-block text-sm text-green-700 font-medium">Devamını Oku →</span>
            </div>
          </Link>
        ))}
        {items.length === 0 && <p className="col-span-3 text-center text-gray-600 py-12">İçerik bulunamadı.</p>}
      </div>
    </div>
  )
}
