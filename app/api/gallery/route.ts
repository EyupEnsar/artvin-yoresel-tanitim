import connectDB from '@/lib/mongodb'
import GalleryItem from '@/lib/models/GalleryItem'

export async function GET() {
  try {
    await connectDB()
    const items = await GalleryItem.find().sort({ order: 1, createdAt: -1 })
    return Response.json(items)
  } catch {
    return Response.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const data = await request.json()
    const item = await GalleryItem.create(data)
    return Response.json(item, { status: 201 })
  } catch {
    return Response.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
