import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-green-900 text-white/70 text-sm py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} Artvin Yöresel Tanıtım. {t('rights')}</p>
      </div>
    </footer>
  )
}
