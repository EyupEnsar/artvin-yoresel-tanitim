import Link from 'next/link'

export default function QuickLinks() {
  const links = [
    { href: '/food', emoji: '🍲', label: 'Yerel Lezzetler' },
    { href: '/events', emoji: '📅', label: 'Etkinlikler' },
    { href: '/accommodation', emoji: '🏡', label: 'Konaklama' },
    { href: '/gallery', emoji: '📸', label: 'Galeri' },
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {links.map((item) => (
          <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow hover:shadow-md transition text-center gap-2">
            <span className="text-3xl">{item.emoji}</span>
            <span className="font-semibold text-gray-800">{item.label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
