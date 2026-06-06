import { useState } from "react";
import { artworks } from "@/data/gallery";
import { CelestialFrame, FleurDivider, CornerOrnament } from "@/components/ui-custom/Ornaments";

// ── Edit this list to add / remove / rename category filter tabs ──────────────
const categories = ["All", "Finished Works", "Studies", "Comissions", "Work in Progress"];

// ── Helper: is this string a real image url(...) or a gradient? ───────────────
const isImageUrl = (s: string) => s.startsWith("url(");
const getSrc = (s: string) => s.slice(5, -2).replace(/'/g, "");

type Artwork = typeof artworks[0];

export default function Studies({ lightMode }: { lightMode: boolean }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalArt, setModalArt] = useState<Artwork | null>(null);
  // which image part is shown in the modal (index into art.images)
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const gold  = lightMode ? "#A07820" : "#C8A84B";
  const text  = lightMode ? "#0D1F3C" : "#F0F4FF";
  const muted = lightMode ? "#2A5FA8" : "#8a9ab0";
  const bg    = lightMode ? "rgba(238,232,220,0.7)" : "rgba(8,18,36,0.8)";
  const sectionBg = lightMode
    ? "linear-gradient(180deg, #DCE8F5 0%, #EEF3FA 100%)"
    : "linear-gradient(180deg, #081224 0%, #0E1D3A 100%)";

  // artwork matches if ANY of its categories includes the active filter
  const filtered = activeCategory === "All"
    ? artworks
    : artworks.filter((a) => a.categories.includes(activeCategory));

  function openModal(art: Artwork) {
    setModalArt(art);
    setModalImageIndex(0);
  }

  return (
    <section id="studies" className="relative py-24 px-6" style={{ background: sectionBg }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="font-['Cinzel'] text-[10px] tracking-[0.5em] uppercase mb-4 opacity-50" style={{ color: gold }}>
            Catalogue Raisonné
          </div>
          <h2 className="font-['Cinzel_Decorative'] text-4xl md:text-5xl mb-6" style={{ color: text }}>
            Art <span className="text-shimmer">Studies</span>
          </h2>
          <div className="flex justify-center mb-6">
            <FleurDivider width={240} color={gold} />
          </div>
          <p className="font-['Cormorant_Garamond'] text-lg italic max-w-lg mx-auto" style={{ color: muted }}>
            A documented record of works — experiments, studies, and completed illustrations.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="font-['Cinzel'] text-[10px] tracking-widest uppercase px-4 py-2 transition-all duration-300"
              style={{
                background: activeCategory === cat ? `${gold}22` : "transparent",
                border: `1px solid ${activeCategory === cat ? gold : `${gold}44`}`,
                color: activeCategory === cat ? gold : muted,
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Catalogue grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((art, i) => {
            const cover = art.images[0];
            const hasImage = isImageUrl(cover);
            const hasMultiple = art.images.length > 1;

            return (
              <div
                key={art.id}
                className="artwork-card relative"
                style={{ animation: `fadeInUp 0.6s ease ${i * 0.1}s both` }}
                onClick={() => openModal(art)}
              >
                {/* Catalogue number */}
                <div
                  className="absolute top-3 left-3 z-10 font-['Cinzel'] text-xs"
                  style={{ color: gold, opacity: 0.7 }}
                >
                  No. {art.number}
                </div>

                {/* Multi-part badge */}
                {hasMultiple && (
                  <div
                    className="absolute top-3 right-3 z-10 font-['Cinzel'] text-[9px] px-2 py-0.5"
                    style={{ background: `${gold}22`, border: `1px solid ${gold}66`, color: gold }}
                  >
                    {art.images.length} PARTS
                  </div>
                )}

                {/* Cover image */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: "3/4",
                    background: hasImage ? "#050816" : cover,
                  }}
                >
                  {hasImage && (
                    <img
                      src={getSrc(cover)}
                      alt={art.title}
                      className="absolute inset-0 w-full h-full"
                      style={{ objectFit: "cover", objectPosition: "top center" }}
                    />
                  )}

                  <CelestialFrame width={240} height={320} color={gold} />

                  {!hasImage && (
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-30"
                      style={{ fontSize: 60, color: art.accent }}
                    >
                      ✦
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-end p-4 opacity-0 transition-opacity duration-300"
                    style={{ background: "rgba(5,8,22,0.85)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                  >
                    <div>
                      <div className="font-['Cinzel'] text-xs tracking-widest mb-1" style={{ color: gold }}>
                        QUICK VIEW
                      </div>
                      <div className="font-['Cormorant_Garamond'] text-sm italic" style={{ color: "#C8D8E8" }}>
                        {art.medium}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="p-4" style={{ background: bg, borderTop: `1px solid ${gold}33` }}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-['Cinzel'] text-sm tracking-wide" style={{ color: text }}>
                      {art.title}
                    </h3>
                    <span className="font-['Cormorant_Garamond'] text-sm italic" style={{ color: muted }}>
                      {art.year}
                    </span>
                  </div>
                  <div className="font-['Cormorant_Garamond'] text-sm italic mb-2" style={{ color: muted }}>
                    {art.medium}
                  </div>
                  {/* All category tags */}
                  <div className="flex flex-wrap gap-1">
                    {art.categories.map((cat) => (
                      <div
                        key={cat}
                        className="inline-block font-['Cinzel'] text-[9px] tracking-widest uppercase px-2 py-1"
                        style={{ border: `1px solid ${gold}44`, color: gold, opacity: 0.7 }}
                      >
                        {cat}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Placeholder note */}
        <div className="text-center mt-10">
          <p className="font-['Cormorant_Garamond'] text-sm italic" style={{ color: muted }}>
            Artworks shown with placeholder compositions. Actual works to be uploaded.
          </p>
        </div>
      </div>

      {/* ── Detail modal ─────────────────────────────────────────────────────── */}
      {modalArt && (
        <div className="modal-overlay" onClick={() => setModalArt(null)}>
          <div
            className="relative max-w-3xl w-full mx-4 overflow-hidden"
            style={{
              background: lightMode ? "#EEF3FA" : "#081224",
              border: `1px solid ${gold}44`,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">

              {/* ── Left: image viewer ──────────────────────────────────────── */}
              <div className="relative md:w-1/2 flex-shrink-0 flex flex-col">

                {/* Main image display */}
                <div
                  className="relative flex-1"
                  style={{
                    aspectRatio: "3/4",
                    minHeight: 300,
                    background: isImageUrl(modalArt.images[modalImageIndex])
                      ? "#050816"
                      : modalArt.images[modalImageIndex],
                  }}
                >
                  {isImageUrl(modalArt.images[modalImageIndex]) && (
                    <img
                      src={getSrc(modalArt.images[modalImageIndex])}
                      alt={`${modalArt.title} — Part ${modalImageIndex + 1}`}
                      className="absolute inset-0 w-full h-full"
                      style={{ objectFit: "cover", objectPosition: "top center" }}
                    />
                  )}
                  {!isImageUrl(modalArt.images[modalImageIndex]) && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-20" style={{ fontSize: 80, color: modalArt.accent }}>✦</div>
                  )}
                  <div style={{ position: "absolute", top: 0, left: 0 }}>
                    <CornerOrnament size={40} color={gold} />
                  </div>

                  {/* Part label when multi-image */}
                  {modalArt.images.length > 1 && (
                    <div
                      className="absolute bottom-3 left-0 right-0 text-center font-['Cinzel'] text-[9px] tracking-widest"
                      style={{ color: gold, opacity: 0.7 }}
                    >
                      PART {modalImageIndex + 1} OF {modalArt.images.length}
                    </div>
                  )}
                </div>

                {/* Part thumbnail strip — only shown for multi-image artworks */}
                {modalArt.images.length > 1 && (
                  <div
                    className="flex gap-2 p-3 overflow-x-auto"
                    style={{ background: lightMode ? "rgba(200,168,75,0.08)" : "rgba(5,8,22,0.8)", borderTop: `1px solid ${gold}33` }}
                  >
                    {modalArt.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setModalImageIndex(idx)}
                        className="flex-shrink-0 relative overflow-hidden transition-all duration-200"
                        style={{
                          width: 52,
                          height: 68,
                          background: isImageUrl(img) ? "#050816" : img,
                          border: `2px solid ${idx === modalImageIndex ? gold : `${gold}33`}`,
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        {isImageUrl(img) && (
                          <img
                            src={getSrc(img)}
                            alt={`Part ${idx + 1}`}
                            className="absolute inset-0 w-full h-full"
                            style={{ objectFit: "cover" }}
                          />
                        )}
                        {!isImageUrl(img) && (
                          <div className="absolute inset-0 flex items-center justify-center font-['Cinzel'] text-[8px]" style={{ color: gold, opacity: 0.5 }}>
                            {idx + 1}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Right: info panel ───────────────────────────────────────── */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="font-['Cinzel'] text-[10px] tracking-[0.5em] mb-3 opacity-50" style={{ color: gold }}>
                    CATALOGUE No. {modalArt.number}
                  </div>
                  <h2 className="font-['Cinzel_Decorative'] text-2xl mb-2" style={{ color: lightMode ? "#0D1F3C" : "#F0F4FF" }}>
                    {modalArt.title}
                  </h2>
                  <div className="font-['Cormorant_Garamond'] text-base italic mb-6" style={{ color: muted }}>
                    {modalArt.year} · {modalArt.medium}
                  </div>

                  <FleurDivider width={200} color={gold} />

                  <div className="mt-6 space-y-4">
                    <div className="catalogue-entry">
                      <div className="font-['Cinzel'] text-[9px] tracking-widest opacity-50 mb-1" style={{ color: gold }}>DIMENSIONS</div>
                      <div className="font-['Cormorant_Garamond'] text-base" style={{ color: lightMode ? "#0D1F3C" : "#C8D8E8" }}>{modalArt.dimensions}</div>
                    </div>

                    {/* Multiple categories displayed as tags */}
                    <div className="catalogue-entry">
                      <div className="font-['Cinzel'] text-[9px] tracking-widest opacity-50 mb-2" style={{ color: gold }}>
                        {modalArt.categories.length > 1 ? "CATEGORIES" : "CATEGORY"}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {modalArt.categories.map((cat) => (
                          <span
                            key={cat}
                            className="font-['Cinzel'] text-[9px] tracking-widest uppercase px-2 py-1"
                            style={{ border: `1px solid ${gold}44`, color: gold }}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Multiple collections displayed as tags */}
                    <div className="catalogue-entry">
                      <div className="font-['Cinzel'] text-[9px] tracking-widest opacity-50 mb-2" style={{ color: gold }}>
                        {modalArt.collections.length > 1 ? "COLLECTIONS" : "COLLECTION"}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {modalArt.collections.map((col) => (
                          <span
                            key={col}
                            className="font-['Cormorant_Garamond'] text-base italic"
                            style={{ color: lightMode ? "#0D1F3C" : "#C8D8E8" }}
                          >
                            {col}{modalArt.collections.indexOf(col) < modalArt.collections.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="catalogue-entry">
                      <div className="font-['Cinzel'] text-[9px] tracking-widest opacity-50 mb-2" style={{ color: gold }}>DESCRIPTION</div>
                      <p className="font-['Cormorant_Garamond'] text-base italic leading-relaxed" style={{ color: lightMode ? "#1A3A6A" : "#8a9ab0" }}>
                        {modalArt.description}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  className="btn-celestial mt-8"
                  style={{ borderColor: gold, color: gold }}
                  onClick={() => setModalArt(null)}
                >
                  ← Return to Gallery
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
          }
                  
