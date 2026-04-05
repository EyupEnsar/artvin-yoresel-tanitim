import connectDB from '@/lib/mongodb'
import GalleryItem from '@/lib/models/GalleryItem'
import GalleryClient from '@/components/sections/GalleryClient'

export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  await connectDB()
  const raw = await GalleryItem.find({ status: 'published' }).sort({ order: 1, createdAt: -1 }).lean()
  const items = raw.map(item => ({
    _id: String(item._id),
    type: item.type as string,
    url: item.url as string,
    title: (item.title ?? '') as string,
  }))

  return <GalleryClient items={items} />
}
