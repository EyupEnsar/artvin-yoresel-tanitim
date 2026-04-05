import connectDB from '@/lib/mongodb'
import SiteSettings from '@/lib/models/SiteSettings'
import MapView from '@/components/MapView'

export const metadata = { title: 'İletişim' }
export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  await connectDB()
  const s = await SiteSettings.findOne().lean()

  const name = s?.siteName || 'Artvin'
  const email = s?.email as string | undefined
  const phone = s?.phone as string | undefined
  const address = s?.address as string | undefined
  const instagram = s?.instagram as string | undefined
  const facebook = s?.facebook as string | undefined
  const youtube = s?.youtube as string | undefined
  const lat = s?.lat as number | undefined
  const lng = s?.lng as number | undefined

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">İletişim</h1>
      <p className="text-gray-600 mb-10">{name} hakkında bilgi almak için bizimle iletişime geçin.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Bilgi kartları */}
        <div className="space-y-6">
          {phone && (
            <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-700 text-lg">📞</div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">Telefon</p>
                <a href={`tel:${phone}`} className="text-gray-900 font-medium hover:text-green-700 transition">{phone}</a>
              </div>
            </div>
          )}
          {email && (
            <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-700 text-lg">✉️</div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">E-posta</p>
                <a href={`mailto:${email}`} className="text-gray-900 font-medium hover:text-blue-700 transition">{email}</a>
              </div>
            </div>
          )}
          {address && (
            <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 text-orange-700 text-lg">📍</div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">Adres</p>
                <p className="text-gray-900 font-medium">{address}</p>
              </div>
            </div>
          )}
          {(instagram || facebook || youtube) && (
            <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm font-semibold text-gray-500 mb-3">Sosyal Medya</p>
              <div className="flex flex-col gap-2">
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition text-sm font-medium">
                    <span className="text-lg">📸</span> Instagram
                  </a>
                )}
                {facebook && (
                  <a href={facebook} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition text-sm font-medium">
                    <span className="text-lg">👥</span> Facebook
                  </a>
                )}
                {youtube && (
                  <a href={youtube} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition text-sm font-medium">
                    <span className="text-lg">▶️</span> YouTube
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Harita */}
        {lat != null && lng != null ? (
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-3">Konum</p>
            <MapView lat={lat} lng={lng} title={address || name} />
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 text-sm" style={{ minHeight: 350 }}>
            Harita konumu henüz tanımlanmamış.<br />
            Site ayarlarından konum belirleyebilirsiniz.
          </div>
        )}
      </div>
    </div>
  )
}
