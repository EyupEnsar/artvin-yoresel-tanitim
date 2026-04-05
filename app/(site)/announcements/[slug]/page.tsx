import { notFound } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import Announcement from '@/lib/models/Announcement'
import Link from 'next/link'
import mongoose from 'mongoose'

async function findAnnouncement(slugOrId: string) {
  const bySlug = await Announcement.findOne({ slug: slugOrId }).lean()
  if (bySlug) return bySlug
  if (mongoose.isValidObjectId(slugOrId)) {
    return Announcement.findById(slugOrId).lean()
  }
  return null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB()
  const { slug } = await params
  const val = await findAnnouncement(slug)
  if (!val) return { title: 'Bulunamadı' }
  return { title: val.title }
}

export default async function AnnouncementDetail({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB()
  const { slug } = await params
  const ann = await findAnnouncement(slug)
  if (!ann) return notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/events" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Geri Dön</Link>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {ann.publishDate && (
          <span className="text-xs text-blue-700 font-semibold block mb-3">
            {new Date(ann.publishDate as Date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{ann.title}</h1>
        {ann.content && (
          <div className="prose prose-lg text-gray-700 max-w-none">
            {(ann.content as string).split('\n').map((p, i) => <p key={i}>{p}</p>)}
          </div>
        )}
      </div>
    </div>
  )
}
