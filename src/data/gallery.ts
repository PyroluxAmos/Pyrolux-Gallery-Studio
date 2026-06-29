import magicalFlare from "../assets/MagicalFlashFlare.png";
import FrontFinal from "../assets/FrontFinal.png";
import BackFinal from "../assets/BackFinal.png";
import LayoutFinal from "../assets/LayoutFinal.jpg";
import DarkNun from "../assets/DarkNun.jpg";
import graphite from "../assets/graphite.jpg";
import SwimmingBluza from "../assets/Swimming_bluza.jpg";
import SwimmingCommission from "../assets/Swimming-commission.jpg";
import SwimmingCommission1 from "../assets/Swimming-commission1.jpg";

export const artworks = [
  {
    id: 1,
    title: "Red Lily of the Pond",
    year: "2026",
    medium: "Digital Painting",
    categories: ["Finished Works"],
    collections: ["Finished Artworks"],
    description: "A figure at rest among spider lilies — the higanbana blooming in crimson mist, symbols of parting and return rendered in deep, swirling reds.",
    dimensions: "600 × 750 px",
    images: [`url('https://res.cloudinary.com/dnucxqexu/image/upload/f_auto,q_auto/1000479655_bf5lxy')`],
    accent: "#C0392B",
    number: "001",
  },
  {
    id: 2,
    title: "Magical Flash Flare",
    year: "2026",
    medium: "Digital Illustration",
    categories: ["Finished Works"],
    collections: ["Finished Artworks"],
    description: "A figure crackling with arcane energy — chromatic aberration, exploding star bursts, and magenta sparks rendered in an anime-inspired action composition.",
    dimensions: "3024 × 4032 px",
    images: [`url('${magicalFlare}')`],
    accent: "#E040FB",
    number: "002",
  },
  {
    id: 3,
    title: "Sta. Elena High School S.Y 25-26 Year Book",
    year: "2026",
    medium: "Digital Illustration, Ibis Paint X",
    categories: ["Finished Works", "Commissions"],
    collections: ["Finished Artworks", "Finished Commissions", "Top Commissions"],
    description: "Cover of the Year Book of Sta. Elena High School School Year 2025-2026, aka my batch. ^^",
    dimensions: "2650 × 3950 px",
    images: [
      `url('${FrontFinal}')`, 
      `url('${BackFinal}')`, 
      `url('${LayoutFinal}')`
    ],
    accent: "#C8D8E8",
    number: "003",
  },
  {
    id: 4,
    title: "Fallen",
    year: "2026",
    medium: "Traditional Illustration, pen drawing",
    categories: ["Finished Works", "Studies"],
    collections: ["Finished Artworks", "Practice Studies"],
    description: "What does it feel like when the people you've thought holy was the one bringing your demise? Only God is faithful.",
    dimensions: "3917 × 5963 px",
    images: [`url('${DarkNun}')`],
    accent: "#E65C00",
    number: "004",
  },
  {
    id: 5,
    title: "Reference Study",
    year: "2026",
    medium: "Graphite Drawing",
    categories: ["Finished Works", "Studies"],
    collections: ["Finished Artworks", "Practice Studies"],
    description: "A portrait I saw from the pinterest. I wanted to study how to shade values properly even with a single shade.",
    dimensions: "2800 × 3600 px",
    images: [`url('${graphite}')`],
    accent: "#7B2FBE",
    number: "005",
  },
  {
    id: 6,
    title: "Aquatics Performance Task",
    year: "2026",
    medium: "Watercolor Paper, Traditional Illustration",
    categories: ["Finished Works", "Studies"],
    collections: ["Finished Artworks", "Artwork Studies"],
    description: "Part of my Performance Task for my aquatics subject on Grade 12.",
    dimensions: "A4 Paper",
    images: [`url('${SwimmingBluza}')`],
    accent: "#2B9BFF",
    number: "006",
  },
];

export const collections = [
  {
    id: "Finished Artworks",
    name: "Finished Artworks",
    description: "Collections of every Artworks I have finished so far.",
    icon: "✦",
    color: "#2B9BFF",
  },
  {
    id: "Commissions",
    name: "Finished Commissions",
    description: "All of the commissions I have done in my entire career.",
    icon: "◈",
    color: "#C8D8E8",
  },
  {
    id: "Top Commissions",
    name: "Top Commissions",
    description: "Commissioned Pieces that I liked the most.",
    icon: "❧",
    color: "#4CAF72",
  },
  {
    id: "Artwork Study",
    name: "Practice Studies",
    description: "Every studies, sketches, and practices I have done.",
    icon: "◉",
    color: "#C8A84B",
  },
  {
    id: "WIP",
    name: "Work in Progress",
    description: "What I've been working through currently.",
    icon: "⚜",
    color: "#E65C00",
  },
];

export const services = [
  {
    id: 1,
    title: "Sketch Studies",
    subtitle: "Foundations of Form",
    description: "Initial explorations — loose gesture drawings, compositional thumbnails, and character concept development.",
    turnaround: "3–5 days",
    process: ["Brief & reference gathering", "Rough sketch pass", "Refinement round", "Final delivery"],
    icon: "✏",
  },
  {
    id: 2,
    title: "Fine Line Art",
    subtitle: "Precision Rendered",
    description: "Intricate linework commissions — botanical illustrations, architectural detail studies, and ornamental designs.",
    turnaround: "7–14 days",
    process: ["Concept development", "Pencil underdrawing", "Ink rendering", "Digital refinement", "Final delivery"],
    icon: "⟨⟩",
  },
  {
    id: 3,
    title: "Full Illustration",
    subtitle: "Fully Realized Worlds",
    description: "Complete digital paintings with full color, atmosphere, and detailed environment or portraiture work.",
    turnaround: "14–21 days",
    process: ["Brief & moodboard", "Sketch approval", "Color rough", "Painting pass", "Final refinement"],
    icon: "◈",
  },
  {
    id: 4,
    title: "Commercial Projects",
    subtitle: "Brand & Editorial",
    description: "Editorial illustrations, cover art, book illustrations, and commercial campaigns requiring original artwork.",
    turnaround: "Custom timeline",
    process: ["Discovery call", "Contract & deposit", "Concept development", "Review rounds", "Final delivery & licensing"],
    icon: "⬡",
  },
  {
    id: 5,
    title: "Branding & Direction",
    subtitle: "Visual Identity",
    description: "Complete visual identity systems — logos, brand marks, color palettes, and creative direction packages.",
    turnaround: "21–30 days",
    process: ["Brand discovery", "Mood & direction", "Concept exploration", "Refinement", "Brand guide delivery"],
    icon: "✦",
  },
];
