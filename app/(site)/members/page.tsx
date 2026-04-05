import connectDB from '@/lib/mongodb'
import Member from '@/lib/models/Member'
import Image from 'next/image'

export const metadata = { title: 'Dernek Kadrosu' }
export const dynamic = 'force-dynamic'

export default async function MembersPage() {
  await connectDB()
  const members = await Member.find({ status: 'published' }).sort({ order: 1, createdAt: 1 }).lean()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Dernek Kadrosu</h1>
      <p className="text-gray-600 mb-10">Dernek yönetim kadromuz</p>

      {members.length === 0 && (
        <p className="text-center text-gray-500 py-20">Henüz sorumlu eklenmemiş.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {members.map(member => (
          <div key={String(member._id)} className="flex flex-col items-center text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-4">
              {member.photo
                ? <Image src={member.photo as string} alt={member.name} fill className="object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">👤</div>}
            </div>
            <p className="font-bold text-gray-900 text-sm leading-tight">{member.name}</p>
            <p className="text-xs text-green-700 font-medium mt-1">{member.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
