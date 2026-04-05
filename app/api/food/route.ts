import connectDB from '@/lib/mongodb'
import Food from '@/lib/models/Food'

export async function GET() {
  try {
    await connectDB()
    const items = await Food.find().sort({ createdAt: -1 })
    return Response.json(items)
  } catch {
    return Response.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const data = await request.json()
    const item = await Food.create(data)
    return Response.json(item, { status: 201 })
  } catch {
    return Response.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
