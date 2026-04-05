import mongoose from 'mongoose'

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleEn: String,
  slug: { type: String, unique: true, sparse: true },
  content: String,
  contentEn: String,
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  publishDate: Date,
}, { timestamps: true })

export default mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema)
