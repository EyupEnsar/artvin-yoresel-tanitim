import { defineField, defineType } from 'sanity'

export const accommodation = defineType({
  name: 'accommodation',
  title: 'Konaklama',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Ad (TR)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'titleEn', title: 'Ad (EN)', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'type', title: 'Tür', type: 'string', options: { list: ['otel', 'pansiyon', 'kamp', 'bungalov', 'diğer'] } }),
    defineField({ name: 'description', title: 'Açıklama (TR)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'descriptionEn', title: 'Açıklama (EN)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'images', title: 'Görseller', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'contact', title: 'İletişim', type: 'string' }),
    defineField({ name: 'address', title: 'Adres', type: 'string' }),
  ],
})
