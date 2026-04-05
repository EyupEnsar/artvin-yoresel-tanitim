import Image from 'next/image'
import Link from 'next/link'

interface HeroSectionProps {
  settings: any
}

export default function HeroSection({ settings }: HeroSectionProps) {
  const heroImage = settings?.heroImages?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80'

  return (
    <section className="relative h-[70vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {settings?.heroVideo ? (
        <video src={settings.heroVideo} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <Image src={heroImage} alt="Artvin manzarası" fill className="object-cover" priority />
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg">Artvin'i Keşfet</h1>
        <p className="mt-4 text-xl md:text-2xl drop-shadow">Doğa, Kültür ve Yöresel Lezzetler</p>
        <Link href="/places" className="mt-8 inline-block bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full font-semibold transition-colors">
          Keşfetmeye Başla
        </Link>
      </div>
    </section>
  )
}
