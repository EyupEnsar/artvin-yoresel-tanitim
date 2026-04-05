'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Panel' },
  { href: '/admin/food', label: 'Yemekler' },
  { href: '/admin/places', label: 'Gezilecek Yerler' },
  { href: '/admin/events', label: 'Etkinlikler' },
  { href: '/admin/accommodation', label: 'Konaklama' },
  { href: '/admin/gallery', label: 'Galeri' },
  { href: '/admin/announcements', label: 'Duyurular' },
  { href: '/admin/members', label: 'Dernek Kadrosu' },
  { href: '/admin/menu', label: 'Menüler' },
  { href: '/admin/settings', label: 'Site Ayarları' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === '/admin/login') return <>{children}</>

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <aside className="w-56 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-lg font-bold border-b border-gray-700">Artvin CMS</div>
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 text-sm hover:bg-gray-700 ${pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href)) ? 'bg-gray-700 font-medium' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button onClick={handleLogout} className="p-4 text-sm text-gray-300 hover:text-white text-left border-t border-gray-700">
          Çıkış Yap
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
