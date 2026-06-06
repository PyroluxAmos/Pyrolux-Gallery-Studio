import { useState } from "react";
import { collections, artworks } from "@/data/gallery";
import { FleurDivider } from "@/components/ui-custom/Ornaments";

const isImageUrl = (s: string) => s.startsWith("url(");
const getSrc = (s: string) => s.slice(5, -2).replace(/'/g, "");

export default function Library({ lightMode }: { lightMode: boolean }) {
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  const gold = lightMode ? "#A07820" : "#C8A84B";
  const text = lightMode ? "#0D1F3C" : "#F0F4FF";
  const muted = lightMode ? "#2A5FA8" : "#8a9ab0";
  const sectionBg = lightMode
    ? "linear-gradient(180deg, #EEF3FA 0%, #DCE8F5 100%)"
    : "linear-gradient(180deg, #0E1D3A 0%, #050816 100%)";

  return (
    <section id="library" className="relative py-24 px-6" style={{ background: sectionBg }}>
      {!lightMode && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(30,109,181,0.06) 0%, transparent 70%)" }}
        />
      )}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="font-['Cinzel'] text-[10px] tracking-[0.5em] uppercase mb-4 opacity-50" style={{ color: gold }}>
            Permanent Collection
          </div>
          <h2 className="font-['Cinzel_Decorative'] text-4xl md:text-5xl mb-6" style={{ color: text }}>
            The <span className="text-shimmer">Archive</span>
          </h2>
          <div className="flex justify-center mb-6">
            <FleurDivider width={240} color={gold} />
          </div>
          <p className="font-['Cormorant_Garamond'] text-lg italic max-w-lg mx-auto" style={{ color: muted }}>
            Works organized into permanent series — each collection a distinct visual universe.
          </p>
        </div>

        {/* Archive drawers */}
        <div className="space-y-4">
          {collections.map((col, i) => {
            // artwork belongs here if ANY of its collections includes this collection's name
            const colArtworks = artworks.filter((a) => a.collections.includes(col.name));

            return (
              <div
                key={col.id}
                className="archive-shelf"
                style={{ borderColor: `${gold}44`, animation: `fadeInUp 0.6s ease ${i * 0.1}s both` }}
              >
                {/* Drawer header */}
                <button
                  className="w-full flex items-center justify-between py-4 px-2"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                  onClick={() => setActiveCollection(activeCollection === col.id ? null : col.id)}
                >
                  <div className="flex items-center gap-6">
                    <div
                      className="w-10 h-10 flex items-center justify-center font-['Cinzel'] text-lg flex-shrink-0"
                      style={{ border: `1px solid ${col.color}55`, color: col.color, background: `${col.color}11` }}
                    >
                      {col.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-['Cinzel'] text-sm tracking-widest" style={{ color: text }}>
                        {col.name}
                      </div>
                      <div className="font-['Cormorant_Garamond'] text-sm italic" style={{ color: muted }}>
                        {colArtworks.length} {colArtworks.length === 1 ? "work" : "works"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden sm:block font-['Cormorant_Garamond'] text-sm italic max-w-xs text-right" style={{ color: muted }}>
                      {col.description}
                    </div>
                    <div
                      className="font-['Cinzel'] text-lg transition-transform duration-300"
                      style={{ color: gold, transform: activeCollection === col.id ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      +
                    </div>
                  </div>
                </button>

                {/* Expanded drawer */}
                {activeCollection === col.id && (
                  <div className="px-2 pb-6" style={{ animation: "fadeInUp 0.3s ease" }}>
                    <div className="sm:hidden font-['Cormorant_Garamond'] text-sm italic mb-6" style={{ color: muted }}>
                      {col.description}
                    </div>

                    {colArtworks.length === 0 ? (
                      <div
                        className="py-8 text-center font-['Cormorant_Garamond'] text-base italic"
                        style={{ color: muted, border: `1px dashed ${col.color}33` }}
                      >
                        No works in this collection yet.
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {colArtworks.map((art) => {
                          const cover = art.images[0];
                          const hasImage = isImageUrl(cover);
                          const hasMultiple = art.images.length > 1;

                          return (
                            <div
                              key={art.id}
                              className="relative overflow-hidden cursor-pointer artwork-card group"
                              style={{
                                aspectRatio: "1",
                                background: hasImage ? "#050816" : cover,
                                border: `1px solid ${col.color}33`,
                              }}
                            >
                              {/* Cover image */}
                              {hasImage && (
                                <img
                                  src={getSrc(cover)}
                                  alt={art.title}
                                  className="absolute inset-0 w-full h-full object-cover"
                                />
                              )}

                              {/* Gradient fallback */}
                              {!hasImage && (
                                <div
                                  className="absolute inset-0 flex items-center justify-center text-xs opacity-30 font-['Cinzel']"
                                  style={{ color: col.color }}
                                >
                                  {art.number}
                                </div>
                              )}

                              {/* Multi-part indicator */}
                              {hasMultiple && (
                                <div
                                  className="absolute top-1 right-1 font-['Cinzel'] text-[7px] px-1"
                                  style={{ background: "rgba(5,8,22,0.85)", color: gold, border: `1px solid ${gold}55` }}
                                >
                                  {art.images.length}p
                                </div>
                              )}

                              {/* Title on hover */}
                              <div
                                className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                style={{ background: "rgba(5,8,22,0.85)" }}
                              >
                                <div className="p-1 w-full">
                                  <div
                                    className="font-['Cinzel'] leading-tight"
                                    style={{ color: gold, fontSize: "7px", letterSpacing: "0.05em" }}
                                  >
                                    {art.title}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="mt-4 flex items-center gap-3">
                      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${gold}44, transparent)` }} />
                      <button
                        className="font-['Cinzel'] text-[10px] tracking-widest uppercase px-4 py-2"
                        style={{ border: `1px solid ${gold}44`, color: gold, background: "transparent", cursor: "pointer" }}
                      >
                        View Full Collection
                      </button>
                      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${gold}44)` }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Archive note */}
        <div className="text-center mt-12">
          <div className="inline-block px-8 py-4" style={{ border: `1px solid ${gold}33` }}>
            <p className="font-['Cormorant_Garamond'] text-base italic" style={{ color: muted }}>
              "Every work is a chapter. Every collection, a world."
            </p>
            <div className="font-['Cinzel'] text-[9px] tracking-[0.4em] mt-2 opacity-40" style={{ color: gold }}>
              — PYROLUX
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
