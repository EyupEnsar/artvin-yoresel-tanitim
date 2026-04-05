import { defineField, defineType } from 'sanity'

export const food = defineType({
  name: 'food',
  title: 'Yerel Yemek',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Ad (TR)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'titleEn', title: 'Ad (EN)', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'description', title: 'Açıklama (TR)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'descriptionEn', title: 'Açıklama (EN)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'images', title: 'Görseller', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'restaurant', title: 'Nerede Bulunur', type: 'string' }),
    defineField({ name: 'isFeatured', title: 'Öne Çıkar', type: 'boolean', initialValue: false }),
  ],
})
