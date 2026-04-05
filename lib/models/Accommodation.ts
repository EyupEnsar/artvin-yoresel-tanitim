import mongoose from 'mongoose'

const AccommodationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleEn: String,
  slug: { type: String, required: true, unique: true },
  type: { type: String, enum: ['otel', 'pansiyon', 'kamp', 'bungalov', 'diğer'] },
  description: String,
  descriptionEn: String,
  images: [String],
  contact: String,
  address: String,
  lat: Number,
  lng: Number,
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
}, { timestamps: true })

export default mongoose.models.Accommodation || mongoose.model('Accommodation', AccommodationSchema)
