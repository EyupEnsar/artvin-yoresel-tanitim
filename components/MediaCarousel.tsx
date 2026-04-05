'use client'
import { useState } from 'react'
import Image from 'next/image'

interface Props {
  images?: string[]
  videos?: string[]
  title: string
}

export default function MediaCarousel({ images = [], videos = [], title }: Props) {
  const items = [
    ...images.map(url => ({ type: 'image' as const, url })),
    ...videos.map(url => ({ type: 'video' as const, url })),
  ]

  const [index, setIndex] = useState(0)

  if (items.length === 0) return null

  const current = items[index]
  const prev = () => setIndex(i => (i - 1 + items.length) % items.length)
  const next = () => setIndex(i => (i + 1) % items.length)

  return (
    <div className="mb-8">
      {/* Ana medya */}
      <div className="relative w-full h-64 md:h-[500px] rounded-2xl overflow-hidden shadow-lg bg-black">
        {current.type === 'image' ? (
          <Image src={current.url} alt={`${title} ${index + 1}`} fill className="object-cover" />
        ) : (
          <video src={current.url} controls className="w-full h-full object-contain" />
        )}

        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl transition"
            >‹</button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl transition"
            >›</button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
              {index + 1} / {items.length}
            </div>
          </>
        )}
      </div>

      {/* Küçük resim şeridi */}
      {items.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition ${
                i === index ? 'border-green-600' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              {item.type === 'image' ? (
                <Image src={item.url} alt={`${title} ${i + 1}`} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white text-xl">▶</div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
