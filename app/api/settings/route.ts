import connectDB from '@/lib/mongodb'
import SiteSettings from '@/lib/models/SiteSettings'

export async function GET() {
  try {
    await connectDB()
    const settings = await SiteSettings.findOne()
    return Response.json(settings || {})
  } catch {
    return Response.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB()
    const data = await request.json()
    const settings = await SiteSettings.findOneAndUpdate({}, { $set: data }, { new: true, upsert: true })
    return Response.json(settings)
  } catch {
    return Response.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
