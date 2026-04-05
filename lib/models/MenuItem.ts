import mongoose from 'mongoose'

const MenuItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  href: { type: String, required: true },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema)
