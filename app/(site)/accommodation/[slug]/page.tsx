import { notFound } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import Accommodation from '@/lib/models/Accommodation'
import Link from 'next/link'
import MapView from '@/components/MapView'
import MediaCarousel from '@/components/MediaCarousel'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB()
  const { slug } = await params
  const val = await Accommodation.findOne({ slug }).lean()
  if (!val) return { title: 'Bulunamadı' }
  return { title: val.title }
}

export default async function AccDetail({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB()
  const { slug } = await params
  const acc = await Accommodation.findOne({ slug }).lean()
  if (!acc) return notFound()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link href="/accommodation" className="text-emerald-600 hover:underline mb-6 inline-block">&larr; Konaklamaya Dön</Link>
      <MediaCarousel images={acc.images as string[]} title={acc.title} />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{acc.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="md:col-span-2 prose prose-lg text-gray-700 max-w-none">
          {acc.description && (acc.description as string).split('\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <h3 className="text-xl font-bold text-emerald-900 mb-4">Detaylar</h3>
          {acc.type && (
            <div className="mb-4">
              <span className="block text-sm text-emerald-700 font-semibold mb-1">Tesis Tipi</span>
              <span className="capitalize text-gray-800">{acc.type as string}</span>
            </div>
          )}
          {acc.address && (
            <div className="mb-4">
              <span className="block text-sm text-emerald-700 font-semibold mb-1">Adres</span>
              <span className="text-gray-800">{acc.address as string}</span>
            </div>
          )}
          {acc.contact && (
            <div>
              <span className="block text-sm text-emerald-700 font-semibold mb-1">İletişim</span>
              <span className="text-gray-800">{acc.contact as string}</span>
            </div>
          )}
        </div>
      </div>
      {acc.lat != null && acc.lng != null && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Konum</h2>
          <MapView lat={acc.lat as number} lng={acc.lng as number} title={acc.title} />
        </div>
      )}
    </div>
  )
}
