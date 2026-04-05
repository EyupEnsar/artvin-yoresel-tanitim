import Image from 'next/image'
import Link from 'next/link'

interface FeaturedPlacesProps {
  places: any[]
}

export default function FeaturedPlaces({ places }: FeaturedPlacesProps) {
  if (!places || places.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Öne Çıkan Yerler</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {places.map((place: any) => (
          <Link key={place.slug} href={`/places/${place.slug}`} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
            {place.images?.[0] && (
              <div className="relative h-56">
                <Image src={place.images[0]} alt={place.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
            )}
            <div className="p-4 bg-white">
              {place.category && <span className="text-xs text-green-700 uppercase font-semibold">{place.category}</span>}
              <h3 className="mt-1 text-lg font-bold text-gray-800">{place.title}</h3>
              <span className="text-sm text-green-700 font-medium">Devamını Oku →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
