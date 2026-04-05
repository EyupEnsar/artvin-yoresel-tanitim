import mongoose from 'mongoose'

const FoodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleEn: String,
  slug: { type: String, required: true, unique: true },
  description: String,
  descriptionEn: String,
  images: [String],
  restaurant: String,
  ingredients: String,
  recipe: String,
  isFeatured: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
}, { timestamps: true })

export default mongoose.models.Food || mongoose.model('Food', FoodSchema)
