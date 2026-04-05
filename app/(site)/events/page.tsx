import Image from 'next/image'
import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import Event from '@/lib/models/Event'
import Announcement from '@/lib/models/Announcement'

export const dynamic = 'force-dynamic'

export default async function EventsPage() {
  await connectDB()
  const [events, announcements] = await Promise.all([
    Event.find({ status: 'published' }).sort({ startDate: -1 }).lean(),
    Announcement.find({ status: 'published' }).sort({ publishDate: -1 }).lean()
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800">Etkinlikler</h1>
      <p className="mt-2 text-gray-600">Yöresel festivaller, yarışmalar ve şenlikler</p>

      <div className="mt-10 mb-16 space-y-6">
        {(events as any[]).map(event => (
          <Link href={`/events/${event.slug}`} key={event._id.toString()} className="flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
            {event.images?.[0] && (
              <div className="relative w-full md:w-64 h-48 flex-shrink-0">
                <Image src={event.images[0]} alt={event.title} fill className="object-cover" />
              </div>
            )}
            <div className="p-4 md:p-6 flex flex-col justify-center">
              {event.startDate && (
                <span className="text-xs text-green-700 font-semibold mb-1 block">
                  {new Date(event.startDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  {event.endDate && ` — ${new Date(event.endDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}`}
                </span>
              )}
              <h2 className="mt-1 text-xl font-bold text-gray-800 hover:text-green-700 transition">{event.title}</h2>
              {event.description && <p className="mt-2 text-sm text-gray-700 line-clamp-2">{event.description}</p>}
            </div>
          </Link>
        ))}
        {events.length === 0 && <p className="text-center text-gray-600 py-12">Etkinlik bulunamadı.</p>}
      </div>

      <div className="border-t border-gray-200 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Duyurular</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(announcements as any[]).map(ann => (
            <Link key={ann._id.toString()} href={`/announcements/${ann.slug || ann._id.toString()}`} className="bg-blue-50 border border-blue-100 rounded-2xl shadow-sm p-6 hover:shadow-md transition block">
              {ann.publishDate && (
                <span className="text-xs text-blue-700 font-semibold block mb-2">
                  {new Date(ann.publishDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              )}
              <h3 className="text-lg font-bold text-blue-900">{ann.title}</h3>
              {ann.content && <p className="mt-2 text-sm text-gray-700 line-clamp-3">{ann.content}</p>}
            </Link>
          ))}
          {announcements.length === 0 && <p className="text-gray-500">Kayıtlı duyuru bulunamadı.</p>}
        </div>
      </div>
    </div>
  )
}
