import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import Admin from '@/lib/models/Admin'
import { signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const { username, password } = await request.json()
  await connectDB()
  const admin = await Admin.findOne({ username })
  if (!admin) return Response.json({ error: 'Geçersiz kullanıcı adı veya şifre' }, { status: 401 })
  const valid = await bcrypt.compare(password, admin.passwordHash)
  if (!valid) return Response.json({ error: 'Geçersiz kullanıcı adı veya şifre' }, { status: 401 })
  const token = await signToken({ username })
  const cookieStore = await cookies()
  cookieStore.set('admin_token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: '/' })
  return Response.json({ ok: true })
}
