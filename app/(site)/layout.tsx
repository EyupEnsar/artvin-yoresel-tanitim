import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import connectDB from '@/lib/mongodb'
import MenuItem from '@/lib/models/MenuItem'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  await connectDB()
  const rawItems = await MenuItem.find({ isVisible: true }).sort({ order: 1 }).lean()
  const menuItems = rawItems.map(item => ({
    label: item.label as string,
    href: item.href as string,
    order: item.order as number,
  }))

  return (
    <>
      <Navbar menuItems={menuItems} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
