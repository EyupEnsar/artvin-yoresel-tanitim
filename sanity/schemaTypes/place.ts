import { defineField, defineType } from 'sanity'

export const place = defineType({
  name: 'place',
  title: 'Gezilecek Yer',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Başlık (TR)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'titleEn', title: 'Başlık (EN)', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'category', title: 'Kategori', type: 'string', options: { list: ['doğa', 'tarih', 'şelale', 'yayla', 'köy', 'diğer'] } }),
    defineField({ name: 'description', title: 'Açıklama (TR)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'descriptionEn', title: 'Açıklama (EN)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'images', title: 'Görseller', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'location', title: 'Konum', type: 'string' }),
    defineField({ name: 'isFeatured', title: 'Öne Çıkar', type: 'boolean', initialValue: false }),
  ],
})
