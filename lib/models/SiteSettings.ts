import mongoose from 'mongoose'

const SiteSettingsSchema = new mongoose.Schema({
  siteName: String,
  siteNameEn: String,
  description: String,
  descriptionEn: String,
  logoUrl: String,
  heroImages: [String],
  heroVideo: String,
  instagram: String,
  facebook: String,
  youtube: String,
  email: String,
  phone: String,
  address: String,
  lat: Number,
  lng: Number,
}, { timestamps: true })

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema)
