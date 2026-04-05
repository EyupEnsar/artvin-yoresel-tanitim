import mongoose from 'mongoose'

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  photo: String,
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
}, { timestamps: true })

export default mongoose.models.Member || mongoose.model('Member', MemberSchema)
