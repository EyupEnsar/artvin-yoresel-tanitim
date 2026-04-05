import connectDB from '@/lib/mongodb'
import Member from '@/lib/models/Member'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const item = await Member.findById(id)
    if (!item) return Response.json({ error: 'Bulunamadı' }, { status: 404 })
    return Response.json(item)
  } catch {
    return Response.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const data = await request.json()
    const item = await Member.findByIdAndUpdate(id, { $set: data }, { new: true })
    return Response.json(item)
  } catch {
    return Response.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    await Member.findByIdAndDelete(id)
    return Response.json({ ok: true })
  } catch {
    return Response.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
