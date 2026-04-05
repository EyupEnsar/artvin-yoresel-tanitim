import Link from 'next/link'

interface LatestEventsProps {
  events: any[]
  announcements?: any[]
}

export default function LatestEvents({ events, announcements = [] }: LatestEventsProps) {
  if ((!events || events.length === 0) && (!announcements || announcements.length === 0)) return null

  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Events Section */}
        {events && events.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Güncel Etkinlikler</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((event: any) => (
                <div key={event._id.toString()} className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition">
                  {event.slug ? (
                    <Link href={`/events/${event.slug}`} className="block">
                      {event.startDate && (
                        <span className="text-xs text-green-700 font-semibold block mb-1">
                          {new Date(event.startDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      )}
                      <h3 className="text-base font-bold text-gray-800 hover:text-green-700 transition">{event.title}</h3>
                      {event.description && <p className="mt-2 text-sm text-gray-700 line-clamp-2">{event.description}</p>}
                    </Link>
                  ) : (
                    <div>
                      {event.startDate && (
                        <span className="text-xs text-green-700 font-semibold block mb-1">
                          {new Date(event.startDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      )}
                      <h3 className="text-base font-bold text-gray-800">{event.title}</h3>
                      {event.description && <p className="mt-2 text-sm text-gray-700 line-clamp-2">{event.description}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Announcements Section */}
        {announcements && announcements.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Duyurular</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {announcements.map((announcement: any) => (
                <Link key={announcement._id.toString()} href={`/announcements/${announcement.slug || announcement._id.toString()}`} className="bg-blue-50 border border-blue-100 rounded-2xl shadow-sm p-5 hover:shadow-md transition block">
                  {announcement.publishDate && (
                    <span className="text-xs text-blue-700 font-semibold block mb-1">
                      {new Date(announcement.publishDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  )}
                  <h3 className="text-base font-bold text-blue-900">{announcement.title}</h3>
                  {announcement.content && <p className="mt-2 text-sm text-gray-700 line-clamp-3">{announcement.content}</p>}
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
