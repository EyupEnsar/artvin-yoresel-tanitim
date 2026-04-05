import { NextRequest } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File
  const type = (formData.get('type') as string) || 'misc'

  if (!file) return Response.json({ error: 'Dosya bulunamadı' }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const ext = file.name.split('.').pop()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const dir = path.join(process.cwd(), 'public', 'uploads', type)

  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, filename), buffer)

  return Response.json({ url: `/uploads/${type}/${filename}` })
}
