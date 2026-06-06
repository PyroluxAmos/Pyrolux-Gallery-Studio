import { useState } from 'react'
import { artworks, type ArtworkEntry } from '@/data/gallery'
import { CelestialFrame, FleurDivider } from '@/components/ui-custom/Ornaments'

type Category = 'All' | 'Finished Works' | 'Studies' | 'Experiments' | 'Personal Projects'

const CATEGORIES: Category[] = ['All', 'Finished Works', 'Studies', 'Experiments', 'Personal Projects']

// ─── Star fallback for placeholder gradients ──────────────────────────────────
function StarFallback() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-30"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[
        [40, 60], [80, 30], [120, 80], [160, 40], [60, 130],
        [100, 110], [150, 150], [30, 170], [170, 170], [100, 160],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={1.5} fill="#C8A84B" opacity={0.6 + (i % 3) * 0.15} />
      ))}
      <circle cx="100" cy="100" r="3" fill="#E6C878" opacity={0.9} />
    </svg>
  )
}

// ─── Artwork Card ─────────────────────────────────────────────────────────────
interface ArtworkCardProps {
  entry: ArtworkEntry
  onClick: () => void
}

function ArtworkCard({ entry, onClick }: ArtworkCardProps) {
  const hasRealImage = !!entry.image

  return (
    <div
      className="artwork-card relative cursor-pointer rounded overflow-hidden group"
      style={{ aspectRatio: '3/4' }}
      onClick={onClick}
    >
      {/* Image or gradient background */}
      {hasRealImage ? (
        <img
          src={entry.image}
          alt={entry.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
          style={{ background: entry.placeholder }}
        >
          <StarFallback />
        </div>
      )}

      {/* Celestial SVG frame overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <CelestialFrame />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
        <span
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm tracking-[0.2em] uppercase"
          style={{ fontFamily: 'Cinzel, serif', color: '#E6C878' }}
        >
          Quick View
        </span>
      </div>

      {/* Entry number badge */}
      <div
        className="absolute top-3 left-3 text-xs opacity-60"
        style={{ fontFamily: 'Cinzel, serif', color: '#C8A84B' }}
      >
        {entry.id}
      </div>
    </div>
  )
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
interface DetailModalProps {
  entry: ArtworkEntry
  onClose: () => void
}

function DetailModal({ entry, onClose }: DetailModalProps) {
  const hasRealImage = !!entry.image

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(5,8,22,0.92)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full rounded-lg overflow-hidden flex flex-col md:flex-row"
        style={{ background: '#081224', border: '1px solid rgba(200,168,75,0.3)', maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
          style={{ background: 'rgba(200,168,75,0.15)', color: '#C8A84B' }}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Artwork display — left panel */}
        <div
          className="relative flex-shrink-0 w-full md:w-1/2"
          style={{ aspectRatio: '3/4', minHeight: '280px' }}
        >
          {hasRealImage ? (
            <img
              src={entry.image}
              alt={entry.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 w-full h-full"
              style={{ background: entry.placeholder }}
            >
              <StarFallback />
            </div>
          )}
        </div>

        {/* Metadata — right panel */}
        <div className="flex flex-col justify-center p-8 overflow-y-auto" style={{ color: '#C8D8E8' }}>
          <p
            className="text-xs mb-2 tracking-[0.2em]"
            style={{ fontFamily: 'Cinzel, serif', color: '#C8A84B' }}
          >
            {entry.collection} — {entry.id}
          </p>

          <h2
            className="text-2xl mb-1"
            style={{ fontFamily: 'Cinzel Decorative, serif', color: '#F0F4FF', fontWeight: 900 }}
          >
            {entry.title}
          </h2>

          <p
            className="text-sm mb-6 italic"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C8A84B' }}
          >
            {entry.year}
          </p>

          <div className="space-y-3 text-sm mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem' }}>
            <div className="catalogue-entry pl-3">
              <span style={{ color: '#C8A84B' }}>Medium</span>
              <br />
              {entry.medium}
            </div>
            <div className="catalogue-entry pl-3">
              <span style={{ color: '#C8A84B' }}>Dimensions</span>
              <br />
              {entry.dimensions}
            </div>
            <div className="catalogue-entry pl-3">
              <span style={{ color: '#C8A84B' }}>Category</span>
              <br />
              {entry.category}
            </div>
          </div>

          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', lineHeight: 1.7, color: '#C8D8E8' }}>
            {entry.description}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Studies Section ──────────────────────────────────────────────────────────
export default function Studies() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [selectedEntry, setSelectedEntry] = useState<ArtworkEntry | null>(null)

  const filtered = activeCategory === 'All'
    ? artworks
    : artworks.filter(a => a.category === activeCategory)

  return (
    <section id="studies" className="py-24 px-6" style={{ background: 'var(--bg-mid, #081224)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-12">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: 'Cinzel, serif', color: '#C8A84B' }}
          >
            Catalogue
          </p>
          <h2
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: 'Cinzel Decorative, serif', fontWeight: 900, color: '#F0F4FF' }}
          >
            Art Studies
          </h2>
          <FleurDivider />
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200"
              style={{
                fontFamily: 'Cinzel, serif',
                border: `1px solid ${activeCategory === cat ? '#C8A84B' : 'rgba(200,168,75,0.25)'}`,
                color: activeCategory === cat ? '#C8A84B' : '#C8D8E8',
                background: activeCategory === cat ? 'rgba(200,168,75,0.1)' : 'transparent',
                borderRadius: '2px',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3-column artwork grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(entry => (
            <ArtworkCard key={entry.id} entry={entry} onClick={() => setSelectedEntry(entry)} />
          ))}
        </div>
      </div>

      {/* Detail modal */}
      {selectedEntry && (
        <DetailModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
      )}
    </section>
  )
        }
