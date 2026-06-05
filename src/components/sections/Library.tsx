import { useState } from "react";
import { collections } from "@/data/gallery";
import { FleurDivider } from "@/components/ui-custom/Ornaments";

export default function Library({ lightMode }: { lightMode: boolean }) {
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  const gold = lightMode ? "#A07820" : "#C8A84B";
  const text = lightMode ? "#0D1F3C" : "#F0F4FF";
  const muted = lightMode ? "#2A5FA8" : "#8a9ab0";
  const bg = lightMode ? "rgba(255,255,255,0.5)" : "rgba(5,8,22,0.6)";
  const sectionBg = lightMode
    ? "linear-gradient(180deg, #EEF3FA 0%, #DCE8F5 100%)"
    : "linear-gradient(180deg, #0E1D3A 0%, #050816 100%)";

  return (
    <section id="library" className="relative py-24 px-6" style={{ background: sectionBg }}>
      {/* Background nebula effect */}
      {!lightMode && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 70% 50%, rgba(30,109,181,0.06) 0%, transparent 70%)",
          }}
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
          {collections.map((col, i) => (
            <div
              key={col.id}
              className="archive-shelf"
              style={{
                borderColor: `${gold}44`,
                animation: `fadeInUp 0.6s ease ${i * 0.1}s both`,
              }}
            >
              {/* Drawer header */}
              <button
                className="w-full flex items-center justify-between py-4 px-2 group"
                style={{ background: "none", border: "none", cursor: "pointer" }}
                onClick={() => setActiveCollection(activeCollection === col.id ? null : col.id)}
              >
                <div className="flex items-center gap-6">
                  {/* Collection icon */}
                  <div
                    className="w-10 h-10 flex items-center justify-center font-['Cinzel'] text-lg flex-shrink-0"
                    style={{
                      border: `1px solid ${col.color}55`,
                      color: col.color,
                      background: `${col.color}11`,
                    }}
                  >
                    {col.icon}
                  </div>

                  <div className="text-left">
                    <div className="font-['Cinzel'] text-sm tracking-widest" style={{ color: text }}>
                      {col.name}
                    </div>
                    <div className="font-['Cormorant_Garamond'] text-sm italic" style={{ color: muted }}>
                      {col.count} works
                    </div>
                  </div>
                </div>

                {/* Count + toggle */}
                <div className="flex items-center gap-4">
                  <div
                    className="hidden sm:block font-['Cormorant_Garamond'] text-sm italic max-w-xs text-right"
                    style={{ color: muted }}
                  >
                    {col.description}
                  </div>
                  <div
                    className="font-['Cinzel'] text-lg transition-transform duration-300"
                    style={{
                      color: gold,
                      transform: activeCollection === col.id ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </div>
                </div>
              </button>

              {/* Expanded drawer content */}
              {activeCollection === col.id && (
                <div
                  className="px-2 pb-6"
                  style={{ animation: "fadeInUp 0.3s ease" }}
                >
                  <div
                    className="sm:hidden font-['Cormorant_Garamond'] text-sm italic mb-6"
                    style={{ color: muted }}
                  >
                    {col.description}
                  </div>

                  {/* Placeholder works grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {Array.from({ length: col.count }, (_, idx) => (
                      <div
                        key={idx}
                        className="relative overflow-hidden cursor-pointer artwork-card"
                        style={{
                          aspectRatio: "1",
                          background: `linear-gradient(135deg, ${col.color}11, ${col.color}22)`,
                          border: `1px solid ${col.color}33`,
                        }}
                      >
                        <div
                          className="absolute inset-0 flex items-center justify-center text-xs opacity-30 font-['Cinzel']"
                          style={{ color: col.color }}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${gold}44, transparent)` }} />
                    <button
                      className="font-['Cinzel'] text-[10px] tracking-widest uppercase px-4 py-2"
                      style={{
                        border: `1px solid ${gold}44`,
                        color: gold,
                        background: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      View Full Collection
                    </button>
                    <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${gold}44)` }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Archive note */}
        <div className="text-center mt-12">
          <div
            className="inline-block px-8 py-4"
            style={{ border: `1px solid ${gold}33` }}
          >
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
