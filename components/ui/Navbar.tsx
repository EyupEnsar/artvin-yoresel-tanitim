'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '../../i18n/navigation'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '/', label: t('home') },
    { href: '/places', label: t('places') },
    { href: '/food', label: t('food') },
    { href: '/events', label: t('events') },
    { href: '/accommodation', label: t('accommodation') },
    { href: '/gallery', label: t('gallery') },
  ]

  function switchLocale() {
    const next = locale === 'tr' ? 'en' : 'tr'
    router.push(`/${next}${pathname}`)
  }

  return (
    <header className="bg-green-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Artvin
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm">
          {links.map(link => (
            <Link key={link.href} href={link.href} className="hover:text-green-200 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={switchLocale}
            className="text-sm border border-white/40 px-2 py-1 rounded hover:bg-white/10 transition"
          >
            {locale === 'tr' ? 'EN' : 'TR'}
          </button>

          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={() => setMenuOpen(v => !v)}>
            <span className="sr-only">Menü</span>
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-white" />
              <span className="block w-6 h-0.5 bg-white" />
              <span className="block w-6 h-0.5 bg-white" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-green-900 px-4 pb-4 flex flex-col gap-3 text-sm">
          {links.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="hover:text-green-200">
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
