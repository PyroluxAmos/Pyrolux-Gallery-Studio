import { useState } from "react";
import { artworks } from "@/data/gallery";
import { CelestialFrame, FleurDivider, CornerOrnament } from "@/components/ui-custom/Ornaments";

const categories = ["All", "Finished Works", "Studies", "Commissions", "Work in Progress"];

export default function Studies({ lightMode }: { lightMode: boolean }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalArt, setModalArt] = useState<typeof artworks[0] | null>(null);

  const gold = lightMode ? "#A07820" : "#C8A84B";
  const text = lightMode ? "#0D1F3C" : "#F0F4FF";
  const muted = lightMode ? "#2A5FA8" : "#8a9ab0";
  const bg = lightMode ? "rgba(238,232,220,0.7)" : "rgba(8,18,36,0.8)";
  const sectionBg = lightMode
    ? "linear-gradient(180deg, #DCE8F5 0%, #EEF3FA 100%)"
    : "linear-gradient(180deg, #081224 0%, #0E1D3A 100%)";

  const filtered = activeCategory === "All"
    ? artworks
    : artworks.filter((a) => a.category === activeCategory);

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
          {filtered.map((art, i) => (
            <div
              key={art.id}
              className="artwork-card relative"
              style={{ animation: `fadeInUp 0.6s ease ${i * 0.1}s both` }}
              onClick={() => setModalArt(art)}
            >
              {/* Catalogue number */}
              <div
                className="absolute top-3 left-3 z-10 font-['Cinzel'] text-xs"
                style={{ color: gold, opacity: 0.7 }}
              >
                No. {art.number}
              </div>

              {/* Artwork image / placeholder */}
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  background: art.image ? "#050816" : (art.placeholder ?? "#050816"),
                }}
              >
                {/* Real image — imported asset */}
                {art.image && (
                  <img
                    src={art.image}
                    alt={art.title}
                    className="absolute inset-0 w-full h-full"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                )}

                {/* CelestialFrame — stretches to fill card via width/height 100% in SVG */}
                <CelestialFrame color={gold} />

                {/* Fallback star — gradient placeholders only */}
                {!art.image && (
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
              <div
                className="p-4"
                style={{ background: bg, borderTop: `1px solid ${gold}33` }}
              >
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
                <div
                  className="inline-block font-['Cinzel'] text-[9px] tracking-widest uppercase px-2 py-1"
                  style={{ border: `1px solid ${gold}44`, color: gold, opacity: 0.7 }}
                >
                  {art.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder note */}
        <div className="text-center mt-10">
          <p className="font-['Cormorant_Garamond'] text-sm italic" style={{ color: muted }}>
            Artworks shown with placeholder compositions. Actual works to be uploaded.
          </p>
        </div>
      </div>

      {/* Detail modal */}
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
              {/* Art panel */}
              <div
                className="relative md:w-1/2 flex-shrink-0"
                style={{
                  aspectRatio: "3/4",
                  background: modalArt.image ? "#050816" : (modalArt.placeholder ?? "#050816"),
                  minHeight: 300,
                }}
              >
                {modalArt.image && (
                  <img
                    src={modalArt.image}
                    alt={modalArt.title}
                    className="absolute inset-0 w-full h-full"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                )}
                {!modalArt.image && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20" style={{ fontSize: 80, color: modalArt.accent }}>✦</div>
                )}
                <div style={{ position: "absolute", top: 0, left: 0 }}>
                  <CornerOrnament size={40} color={gold} />
                </div>
              </div>

              {/* Info panel */}
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
                    {[
                      ["Dimensions", modalArt.dimensions],
                      ["Category", modalArt.category],
                      ["Collection", modalArt.collection],
                    ].map(([label, value]) => (
                      <div key={label} className="catalogue-entry">
                        <div className="font-['Cinzel'] text-[9px] tracking-widest opacity-50 mb-1" style={{ color: gold }}>
                          {label}
                        </div>
                        <div className="font-['Cormorant_Garamond'] text-base" style={{ color: lightMode ? "#0D1F3C" : "#C8D8E8" }}>
                          {value}
                        </div>
                      </div>
                    ))}

                    <div className="catalogue-entry">
                      <div className="font-['Cinzel'] text-[9px] tracking-widest opacity-50 mb-2" style={{ color: gold }}>
                        DESCRIPTION
                      </div>
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
