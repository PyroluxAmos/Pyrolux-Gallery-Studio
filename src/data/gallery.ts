import redLily from '@/assets/red_lily_of_the_pond.png'
import magicalFlare from '@/assets/MagicalFlashFlare.png'

export interface ArtworkEntry {
  id: string
  title: string
  year: string
  medium: string
  dimensions: string
  category: 'Finished Works' | 'Studies' | 'Experiments' | 'Personal Projects'
  collection: string
  description: string
  image?: string
  placeholder?: string
}

export interface Collection {
  id: string
  name: string
  description: string
  artworkIds: string[]
}

export interface ServicePanel {
  id: string
  icon: string
  title: string
  subtitle: string
  description: string
  turnaround: string
  steps: string[]
}

// ─── Artworks ────────────────────────────────────────────────────────────────

export const artworks: ArtworkEntry[] = [
  {
    id: '001',
    title: 'Red Lily of the Pond',
    year: '2024',
    medium: 'Digital Painting',
    dimensions: '3000 × 4000 px',
    category: 'Finished Works',
    collection: 'Astral Portraits',
    description:
      'A luminous study of a red lily suspended above still water, rendered with delicate botanical precision and celestial undertones.',
    image: redLily,
  },
  {
    id: '002',
    title: 'Magical Flash Flare',
    year: '2024',
    medium: 'Digital Illustration',
    dimensions: '3000 × 3000 px',
    category: 'Finished Works',
    collection: 'Mythic Studies',
    description:
      'An explosion of arcane light captured at the moment of casting — layered glows, prismatic halos, and molten sparks suspended in deep space.',
    image: magicalFlare,
  },
  {
    id: '003',
    title: 'Celestial Drift No. I',
    year: '2024',
    medium: 'Digital Illustration',
    dimensions: '4000 × 4000 px',
    category: 'Studies',
    collection: 'Celestial Archive',
    description: 'Placeholder — artwork pending upload.',
    placeholder: 'linear-gradient(135deg, #0a0f2e 0%, #1a2a4a 50%, #0e1d3a 100%)',
  },
  {
    id: '004',
    title: 'Sacred Spiral',
    year: '2024',
    medium: 'Line Art',
    dimensions: '3000 × 3000 px',
    category: 'Studies',
    collection: 'Sacred Geometry',
    description: 'Placeholder — artwork pending upload.',
    placeholder: 'linear-gradient(135deg, #0e1d3a 0%, #1e3a5f 50%, #0a0f2e 100%)',
  },
  {
    id: '005',
    title: 'Moonbloom',
    year: '2024',
    medium: 'Digital Painting',
    dimensions: '2400 × 3200 px',
    category: 'Personal Projects',
    collection: 'Botanical Linework',
    description: 'Placeholder — artwork pending upload.',
    placeholder: 'linear-gradient(135deg, #050816 0%, #0e1d3a 50%, #1e3a5f 100%)',
  },
  {
    id: '006',
    title: 'Astral Portrait — Study IV',
    year: '2024',
    medium: 'Digital Painting',
    dimensions: '3000 × 4000 px',
    category: 'Experiments',
    collection: 'Astral Portraits',
    description: 'Placeholder — artwork pending upload.',
    placeholder: 'linear-gradient(135deg, #081224 0%, #0a0f2e 50%, #1a2a4a 100%)',
  },
]

// ─── Collections ─────────────────────────────────────────────────────────────

export const collections: Collection[] = [
  {
    id: 'celestial-archive',
    name: 'Celestial Archive',
    description: 'Star maps, nebulae, and astronomical studies rendered in ink and light.',
    artworkIds: ['003'],
  },
  {
    id: 'sacred-geometry',
    name: 'Sacred Geometry',
    description: 'Mandalas, spirals, and geometric constructions rooted in ancient symbolism.',
    artworkIds: ['004'],
  },
  {
    id: 'botanical-linework',
    name: 'Botanical Linework',
    description: 'Fine-line studies of flora — precise, living, and otherworldly.',
    artworkIds: ['005'],
  },
  {
    id: 'astral-portraits',
    name: 'Astral Portraits',
    description: 'Figures caught between worlds, draped in starlight and celestial flora.',
    artworkIds: ['001', '006'],
  },
  {
    id: 'mythic-studies',
    name: 'Mythic Studies',
    description: 'Creatures, relics, and moments drawn from myth and imagination.',
    artworkIds: ['002'],
  },
]

// ─── Commission Services ──────────────────────────────────────────────────────

export const services: ServicePanel[] = [
  {
    id: 'sketch-studies',
    icon: '✦',
    title: 'Sketch Studies',
    subtitle: 'Pencil & Ink Foundations',
    description:
      'Gestural sketches and refined ink studies — ideal for character concepts, botanical references, and quick exploratory work.',
    turnaround: '3–5 business days',
    steps: ['Submit reference & brief', 'Rough sketch approval', 'Final line delivery'],
  },
  {
    id: 'fine-line-art',
    icon: '◈',
    title: 'Fine Line Art',
    subtitle: 'Precision Linework',
    description:
      'Intricate, single-weight line illustrations with Art Nouveau detailing. Perfect for prints, tattoo references, and decorative use.',
    turnaround: '7–10 business days',
    steps: ['Consultation & mood board', 'Sketch draft', 'Line refinement', 'Final delivery'],
  },
  {
    id: 'full-illustration',
    icon: '❋',
    title: 'Full Illustration',
    subtitle: 'Painted Digital Works',
    description:
      'Fully rendered digital paintings with lighting, texture, and colour — from editorial pieces to personal commemorative works.',
    turnaround: '14–21 business days',
    steps: ['Brief & reference gathering', 'Rough composition', 'Colour blocking', 'Full render', 'Final revisions'],
  },
  {
    id: 'commercial-projects',
    icon: '⟡',
    title: 'Commercial Projects',
    subtitle: 'Licensed Artwork',
    description:
      'Book covers, album art, merchandise, and brand illustration. Licensing terms discussed per project.',
    turnaround: 'Scope-dependent',
    steps: ['Project scoping call', 'Contract & licensing', 'Milestone deliveries', 'Final handoff'],
  },
  {
    id: 'branding-direction',
    icon: '✧',
    title: 'Branding & Direction',
    subtitle: 'Visual Identity Systems',
    description:
      'Full brand identity packages — wordmarks, icon suites, palettes, and usage guidelines built around your vision.',
    turnaround: '4–6 weeks',
    steps: ['Discovery session', 'Concept development', 'Identity system build', 'Brand guide delivery'],
  },
]
