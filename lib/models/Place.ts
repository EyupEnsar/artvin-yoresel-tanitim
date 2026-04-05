import mongoose from 'mongoose'

const PlaceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleEn: String,
  slug: { type: String, required: true, unique: true },
  category: { type: String, enum: ['doğa', 'tarih', 'şelale', 'yayla', 'köy', 'diğer'] },
  description: String,
  descriptionEn: String,
  images: [String],
  location: String,
  lat: Number,
  lng: Number,
  isFeatured: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
}, { timestamps: true })

export default mongoose.models.Place || mongoose.model('Place', PlaceSchema)
