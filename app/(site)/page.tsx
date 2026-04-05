import connectDB from '@/lib/mongodb'
import Place from '@/lib/models/Place'
import Event from '@/lib/models/Event'
import Announcement from '@/lib/models/Announcement'
import SiteSettings from '@/lib/models/SiteSettings'
import HeroSection from '@/components/sections/HeroSection'
import FeaturedPlaces from '@/components/sections/FeaturedPlaces'
import LatestEvents from '@/components/sections/LatestEvents'
import QuickLinks from '@/components/sections/QuickLinks'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  await connectDB()
  const [featuredPlaces, latestEvents, announcements, settings] = await Promise.all([
    Place.find({ isFeatured: true, status: 'published' }).limit(3).lean(),
    Event.find({ status: 'published' }).sort({ startDate: -1 }).limit(3).lean(),
    Announcement.find({ status: 'published' }).sort({ publishDate: -1 }).limit(3).lean(),
    SiteSettings.findOne().lean(),
  ])

  return (
    <>
      <HeroSection settings={settings} />
      <FeaturedPlaces places={featuredPlaces} />
      <LatestEvents events={latestEvents} announcements={announcements} />
      <QuickLinks />
    </>
  )
}
