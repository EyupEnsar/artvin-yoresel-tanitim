import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleEn: String,
  slug: { type: String, required: true, unique: true },
  startDate: Date,
  endDate: Date,
  description: String,
  descriptionEn: String,
  images: [String],
  videos: [String],
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
}, { timestamps: true })

export default mongoose.models.Event || mongoose.model('Event', EventSchema)
