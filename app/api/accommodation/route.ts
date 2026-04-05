import connectDB from '@/lib/mongodb'
import Accommodation from '@/lib/models/Accommodation'

export async function GET() {
  try {
    await connectDB()
    const items = await Accommodation.find().sort({ createdAt: -1 })
    return Response.json(items)
  } catch {
    return Response.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const data = await request.json()
    const item = await Accommodation.create(data)
    return Response.json(item, { status: 201 })
  } catch {
    return Response.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
