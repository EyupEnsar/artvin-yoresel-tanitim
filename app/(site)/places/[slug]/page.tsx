import { notFound } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import Place from '@/lib/models/Place'
import Link from 'next/link'
import MapView from '@/components/MapView'
import MediaCarousel from '@/components/MediaCarousel'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB()
  const { slug } = await params
  const place = await Place.findOne({ slug }).lean()
  if (!place) return { title: 'Bulunamadı' }
  return { title: place.title }
}

export default async function PlaceDetail({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB()
  const { slug } = await params
  const place = await Place.findOne({ slug }).lean()
  if (!place) return notFound()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link href="/places" className="text-green-600 hover:underline mb-6 inline-block">&larr; Geri Dön</Link>
      <MediaCarousel images={place.images as string[]} title={place.title} />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{place.title}</h1>
      <div className="flex flex-wrap gap-3 mb-8">
        {place.category && (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold capitalize">
            {place.category as string}
          </span>
        )}
        {place.location && (
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
            📍 {place.location as string}
          </span>
        )}
      </div>
      {place.description && (
        <div className="prose prose-lg text-gray-700 max-w-none mb-10">
          {(place.description as string).split('\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>
      )}
      {place.lat != null && place.lng != null && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Konum</h2>
          <MapView lat={place.lat as number} lng={place.lng as number} title={place.title} />
        </div>
      )}
    </div>
  )
}
