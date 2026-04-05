import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Ayarları',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Adı', type: 'string' }),
    defineField({ name: 'description', title: 'Site Açıklaması (TR)', type: 'text', rows: 3 }),
    defineField({ name: 'descriptionEn', title: 'Site Açıklaması (EN)', type: 'text', rows: 3 }),
    defineField({ name: 'heroImage', title: 'Ana Sayfa Hero Görseli', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
    defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
    defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
  ],
})
