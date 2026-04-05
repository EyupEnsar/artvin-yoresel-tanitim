import mongoose from 'mongoose'

const GalleryItemSchema = new mongoose.Schema({
  type: { type: String, enum: ['image', 'video'], required: true },
  url: { type: String, required: true },
  title: String,
  description: String,
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
}, { timestamps: true })

export default mongoose.models.GalleryItem || mongoose.model('GalleryItem', GalleryItemSchema)
