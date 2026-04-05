import { notFound } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import Event from '@/lib/models/Event'
import Link from 'next/link'
import MediaCarousel from '@/components/MediaCarousel'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB()
  const { slug } = await params
  const val = await Event.findOne({ slug }).lean()
  if (!val) return { title: 'Bulunamadı' }
  return { title: val.title }
}

function formatDateTime(date: Date) {
  return new Date(date).toLocaleString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export default async function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB()
  const { slug } = await params
  const event = await Event.findOne({ slug }).lean()
  if (!event) return notFound()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link href="/events" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Etkinliklere Dön</Link>
      <MediaCarousel
        images={event.images as string[]}
        videos={event.videos as string[]}
        title={event.title}
      />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{event.title}</h1>
      {(event.startDate || event.endDate) && (
        <div className="flex flex-wrap gap-4 mb-8 bg-gray-50 p-4 rounded-xl">
          {event.startDate && (
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Başlangıç</span>
              <span className="text-lg text-gray-900 font-medium">{formatDateTime(event.startDate as Date)}</span>
            </div>
          )}
          {event.endDate && (
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Bitiş</span>
              <span className="text-lg text-gray-900 font-medium">{formatDateTime(event.endDate as Date)}</span>
            </div>
          )}
        </div>
      )}
      {event.description && (
        <div className="prose prose-lg text-gray-700 max-w-none">
          {(event.description as string).split('\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>
      )}
    </div>
  )
}
