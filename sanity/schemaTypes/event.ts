import { defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Etkinlik & Duyuru',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Başlık (TR)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'titleEn', title: 'Başlık (EN)', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'date', title: 'Tarih', type: 'datetime' }),
    defineField({ name: 'description', title: 'Açıklama (TR)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'descriptionEn', title: 'Açıklama (EN)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'images', title: 'Görseller', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'isActive', title: 'Aktif', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Tarih (Yeni)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
})
