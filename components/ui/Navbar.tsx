'use client'

import Link from 'next/link'
import { useState } from 'react'

interface NavItem {
  label: string
  href: string
  order: number
}

interface Props {
  menuItems: NavItem[]
}

export default function Navbar({ menuItems }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = menuItems
    .filter(i => i.label && i.href)
    .sort((a, b) => a.order - b.order)

  return (
    <header className="bg-green-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Artvin
        </Link>

        <nav className="hidden md:flex gap-6 text-sm">
          {links.map(link => (
            <Link key={link.href} href={link.href} className="hover:text-green-200 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
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
