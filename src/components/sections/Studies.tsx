import React, { useState, useRef, useCallback, useEffect } from "react";
import { artworks } from "@/data/gallery";
import { CelestialFrame, FleurDivider, CornerOrnament } from "@/components/ui-custom/Ornaments";

// ── Edit this list to add / remove / rename category filter tabs ──────────────
const categories = ["All", "Finished Works", "Studies", "Commissions", "Work in Progress"];

// ── Helper: is this string a real image url(...) or a gradient? ───────────────
const isImageUrl = (s: string) => s.startsWith("url(");
const getSrc = (s: string) => s.slice(5, -2).replace(/'/g, "");

type Artwork = typeof artworks[0];

// ── Zoom/pan image viewer ─────────────────────────────────────────────────────
function ZoomableImage({
  src,
  alt,
  gold,
}: {
  src: string;
  alt: string;
  gold: string;
}) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [src]);

  const clampPan = useCallback(
    (x: number, y: number, z: number) => {
      if (!containerRef.current) return { x, y };
      const maxX = ((z - 1) / 2) * containerRef.current.clientWidth;
      const maxY = ((z - 1) / 2) * containerRef.current.clientHeight;
      return {
        x: Math.max(-maxX, Math.min(maxX, x)),
        y: Math.max(-maxY, Math.min(maxY, y)),
      };
    },
    []
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();      const delta = -e.deltaY * 0.0012;
      setZoom((z) => {
        const next = Math.min(4, Math.max(1, z + delta * z));
        if (next <= 1) setPan({ x: 0, y: 0 });
        return next;
      });
    },
    []
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoom <= 1) return;
      e.preventDefault();
      setIsDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    },
    [zoom, pan]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !dragStart.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      const clamped = clampPan(dragStart.current.panX + dx, dragStart.current.panY + dy, zoom);
      setPan(clamped);
    },
    [isDragging, zoom, clampPan]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragStart.current = null;
  }, []);

  const lastTouch = useRef<{ dist: number } | null>(null);
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastTouch.current = { dist: Math.hypot(dx, dy) };
      } else if (e.touches.length === 1 && zoom > 1) {
        dragStart.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          panX: pan.x,
          panY: pan.y,
        };      }
    },
    [zoom, pan]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 2 && lastTouch.current) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const scale = dist / lastTouch.current.dist;
        setZoom((z) => {
          const next = Math.min(4, Math.max(1, z * scale));
          if (next <= 1) setPan({ x: 0, y: 0 });
          return next;
        });
        lastTouch.current.dist = dist;
      } else if (e.touches.length === 1 && dragStart.current && zoom > 1) {
        const dx = e.touches[0].clientX - dragStart.current.x;
        const dy = e.touches[0].clientY - dragStart.current.y;
        const clamped = clampPan(dragStart.current.panX + dx, dragStart.current.panY + dy, zoom);
        setPan(clamped);
      }
    },
    [zoom, clampPan]
  );

  const handleTouchEnd = useCallback(() => {
    lastTouch.current = null;
    dragStart.current = null;
  }, []);

  const zoomStep = 0.5;
  const canZoomIn = zoom < 4;
  const canZoomOut = zoom > 1;

  const btnStyle = (active: boolean): React.CSSProperties => ({
    width: 34,
    height: 34,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    background: active ? `${gold}22` : "rgba(5,8,22,0.72)",
    border: `1px solid ${active ? gold : `${gold}44`}`,
    color: active ? gold : `${gold}88`,
    cursor: active ? "pointer" : "not-allowed",
    fontFamily: "Cinzel, serif",    fontSize: "0.95rem",
    lineHeight: 1,
    transition: "all 0.2s ease",
    backdropFilter: "blur(6px)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
  });

  return (
    <div className="relative flex flex-col w-full h-full">
      {/* Viewer */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-full overflow-hidden flex items-center justify-center"
        style={{
          cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
          background: "#050816",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "none",
        }}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="w-full h-full"
          style={{
            display: "block",
            objectFit: "contain",
            objectPosition: "center",
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.12s ease",
            pointerEvents: "none",
          }}
        />
        
        {/* Top-right controls */}
        <div
          className="absolute top-3 right-3 z-20 flex items-center gap-2"
          style={{ pointerEvents: "auto" }}
        >          <button
            type="button"
            style={btnStyle(canZoomOut)}
            disabled={!canZoomOut}
            onClick={() => {
              setZoom((z) => {
                const next = Math.max(1, z - zoomStep);
                if (next <= 1) setPan({ x: 0, y: 0 });
                return next;
              });
            }}
            aria-label="Zoom out"
            title="Zoom out"
          >
            −
          </button>
          <button
            type="button"
            style={btnStyle(zoom !== 1)}
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
            aria-label="Reset zoom"
            title="Reset"
          >
            ⟳
          </button>
          <button
            type="button"
            style={btnStyle(canZoomIn)}
            disabled={!canZoomIn}
            onClick={() => setZoom((z) => Math.min(4, z + zoomStep))}
            aria-label="Zoom in"
            title="Zoom in"
          >
            +
          </button>
        </div>

        {/* Zoom level badge */}
        {zoom !== 1 && (
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: 12,
              background: "rgba(5,8,22,0.75)",
              border: `1px solid ${gold}44`,
              color: gold,              fontFamily: "Cinzel, serif",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              padding: "3px 8px",
              backdropFilter: "blur(6px)",
              zIndex: 20,
            }}
          >
            {Math.round(zoom * 100)}%
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Studies({ lightMode }: { lightMode: boolean }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalArt, setModalArt] = useState<Artwork | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const gold = lightMode ? "#A07820" : "#C8A84B";
  const text = lightMode ? "#0D1F3C" : "#F0F4FF";
  const muted = lightMode ? "#2A5FA8" : "#8a9ab0";
  const bg = lightMode ? "rgba(238,232,220,0.7)" : "rgba(8,18,36,0.8)";
  const sectionBg = lightMode
    ? "linear-gradient(180deg, #DCE8F5 0%, #EEF3FA 100%)"
    : "linear-gradient(180deg, #081224 0%, #0E1D3A 100%)";

  const filtered =
    activeCategory === "All" ? artworks : artworks.filter((a) => a.categories.includes(activeCategory));

  function openModal(art: Artwork) {
    setModalArt(art);
    setModalImageIndex(0);
  }

  return (
    <section id="studies" className="relative py-24 px-6" style={{ background: sectionBg }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="font-['Cinzel'] text-[10px] tracking-[0.5em] uppercase mb-4 opacity-50"
            style={{ color: gold }}
          >
            Catalogue Raisonné
          </div>
          <h2 className="font-['Cinzel_Decorative'] text-4xl md:text-5xl mb-6" style={{ color: text }}>            Art <span className="text-shimmer">Studies</span>
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
                    style={{
                      background: `${gold}22`,
                      border: `1px solid ${gold}66`,
                      color: gold,
                    }}
                  >
                    {art.images.length} PARTS
                  </div>
                )}

                {/* Cover image */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: "3/4",
                    background: "#050816",
                  }}
                >
                  {hasImage ? (
                    <img
                      src={getSrc(cover)}
                      alt={art.title}
                      className="absolute inset-0 w-full h-full"
                      style={{ objectFit: "contain", objectPosition: "center" }}
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0" style={{ background: cover }} />
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-30"
                        style={{ fontSize: 60, color: art.accent }}
                      >
                        ✦
                      </div>
                    </>
                  )}
                  <CelestialFrame width={240} height={320} color={gold} />

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-end p-4 opacity-0 transition-opacity duration-300"
                    style={{ background: "rgba(5,8,22,0.85)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                  >                    <div>
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

      {/* Detail modal */}      {modalArt && (
        <div className="modal-overlay" onClick={() => setModalArt(null)}>
          <div
            className="relative w-full mx-4 overflow-y-auto md:overflow-hidden rounded-lg"
            style={{
              maxWidth: 980,
              background: lightMode ? "#EEF3FA" : "#081224",
              border: `1px solid ${gold}44`,
              maxHeight: "92vh",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* FIX: md:items-start prevents the left panel from stretching to match the right panel's height */}
            <div className="flex flex-col md:flex-row md:items-start w-full">
              
              {/* Left: zoomable image viewer */}
              {/* FIX: md:h-fit ensures it only takes the space it needs, eliminating the huge bottom gap */}
              <div className="relative w-full md:w-1/2 flex-shrink-0 flex flex-col md:sticky md:top-4 md:h-fit overflow-hidden">
                
                {/* Main Image Area: bounded by max-h to prevent excessive stretching */}
                <div className="relative w-full flex items-center justify-center min-h-[300px] max-h-[60vh] md:max-h-[75vh]">
                  {isImageUrl(modalArt.images[modalImageIndex]) ? (
                    <ZoomableImage
                      src={getSrc(modalArt.images[modalImageIndex])}
                      alt={`${modalArt.title} — Part ${modalImageIndex + 1}`}
                      gold={gold}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: modalArt.images[modalImageIndex] }}
                    >
                      <div className="opacity-20 text-8xl" style={{ color: modalArt.accent }}>
                        ✦
                      </div>
                    </div>
                  )}

                  {/* Corner ornament */}
                  <div className="absolute top-0 left-0 pointer-events-none">
                    <CornerOrnament size={40} color={gold} />
                  </div6>
                </div>

                {/* Bottom Controls: Normal flow (NO absolute positioning to prevent overlap) */}
                {modalArt.images.length > 1 && (
                  <div className="flex flex-col flex-shrink-0" style={{ borderTop: `1px solid ${gold}33` }}>
                    {/* Part label safely sits above thumbnails */}                    <div
                      className="text-center font-['Cinzel'] text-[9px] tracking-widest py-2"
                      style={{ color: gold, opacity: 0.7 }}
                    >
                      PART {modalImageIndex + 1} OF {modalArt.images.length}
                    </div>

                    {/* Thumbnail strip */}
                    <div
                      className="flex gap-3 p-4 overflow-x-auto snap-x snap-mandatory"
                      style={{
                        background: lightMode ? "rgba(200,168,75,0.08)" : "rgba(5,8,22,0.9)",
                        minHeight: 100,
                      }}
                    >
                      {modalArt.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setModalImageIndex(idx)}
                          className="flex-shrink-0 relative overflow-hidden transition-all duration-200 snap-center rounded-sm hover:scale-105 hover:brightness-110"
                          style={{
                            width: 64,
                            height: 80,
                            background: isImageUrl(img) ? "#050816" : img,
                            border: `2px solid ${idx === modalImageIndex ? gold : `${gold}33`}`,
                            cursor: "pointer",
                            padding: 0,
                            boxShadow: idx === modalImageIndex ? `0 0 12px ${gold}44` : "none",
                          }}
                        >
                          {isImageUrl(img) && (
                            <img
                              src={getSrc(img)}
                              alt={`Part ${idx + 1}`}
                              className="absolute inset-0 w-full h-full"
                              style={{ objectFit: "contain", objectPosition: "center" }}
                            />
                          )}
                          {!isImageUrl(img) && (
                            <div
                              className="absolute inset-0 flex items-center justify-center font-['Cinzel'] text-[10px]"
                              style={{ color: gold, opacity: 0.7 }}
                            >
                              {idx + 1}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>                )}
              </div>

              {/* Right: info panel */}
              <div className="w-full p-6 md:p-8 flex flex-col md:overflow-y-auto md:flex-1" style={{ flex: 1 }}>
                <div>
                  <div
                    className="font-['Cinzel'] text-[10px] tracking-[0.5em] mb-3 opacity-50"
                    style={{ color: gold }}
                  >
                    CATALOGUE No. {modalArt.number}
                  </div>
                  <h2
                    className="font-['Cinzel_Decorative'] text-2xl mb-2"
                    style={{ color: lightMode ? "#0D1F3C" : "#F0F4FF" }}
                  >
                    {modalArt.title}
                  </h2>
                  <div className="font-['Cormorant_Garamond'] text-base italic mb-6" style={{ color: muted }}>
                    {modalArt.year} · {modalArt.medium}
                  </div>
                  <FleurDivider width={200} color={gold} />

                  <div className="mt-6 space-y-4">
                    <div className="catalogue-entry">
                      <div
                        className="font-['Cinzel'] text-[9px] tracking-widest opacity-50 mb-1"
                        style={{ color: gold }}
                      >
                        DIMENSIONS
                      </div>
                      <div
                        className="font-['Cormorant_Garamond'] text-base"
                        style={{ color: lightMode ? "#0D1F3C" : "#C8D8E8" }}
                      >
                        {modalArt.dimensions}
                      </div>
                    </div>

                    <div className="catalogue-entry">
                      <div
                        className="font-['Cinzel'] text-[9px] tracking-widest opacity-50 mb-2"
                        style={{ color: gold }}
                      >
                        {modalArt.categories.length > 1 ? "CATEGORIES" : "CATEGORY"}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {modalArt.categories.map((cat) => (
                          <span
                            key={cat}                            className="font-['Cinzel'] text-[9px] tracking-widest uppercase px-2 py-1"
                            style={{ border: `1px solid ${gold}44`, color: gold }}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="catalogue-entry">
                      <div
                        className="font-['Cinzel'] text-[9px] tracking-widest opacity-50 mb-2"
                        style={{ color: gold }}
                      >
                        {modalArt.collections.length > 1 ? "COLLECTIONS" : "COLLECTION"}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {modalArt.collections.map((col, i) => (
                          <span
                            key={col}
                            className="font-['Cormorant_Garamond'] text-base italic"
                            style={{ color: lightMode ? "#0D1F3C" : "#C8D8E8" }}
                          >
                            {col}
                            {i < modalArt.collections.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="catalogue-entry">
                      <div
                        className="font-['Cinzel'] text-[9px] tracking-widest opacity-50 mb-2"
                        style={{ color: gold }}
                      >
                        DESCRIPTION
                      </div>
                      <p
                        className="font-['Cormorant_Garamond'] text-base italic leading-relaxed"
                        style={{ color: lightMode ? "#1A3A6A" : "#8a9ab0" }}
                      >
                        {modalArt.description}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  className="btn-celestial mt-8 w-full md:w-auto"
                  style={{ borderColor: gold, color: gold }}                  onClick={() => setModalArt(null)}
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
