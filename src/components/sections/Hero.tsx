import { useEffect, useRef } from "react";
import { PyroluxLogo, FleurDivider } from "@/components/ui-custom/Ornaments";

interface HeroProps { lightMode: boolean; }

export default function Hero({ lightMode }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (lightMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Stars
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.005,
    }));

    // Constellation lines
    const constellations = [
      [[100, 200], [150, 180], [200, 220], [170, 260], [220, 250]],
      [[500, 100], [540, 130], [580, 110], [560, 150], [600, 170]],
      [[800, 300], [850, 280], [900, 310], [880, 350]],
    ];

    let frame = 0;
    let animId: number;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Draw constellation lines
      constellations.forEach((pts) => {
        const progress = Math.min(1, (frame - 60) / 200);
        if (progress <= 0) return;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(200, 168, 75, ${0.15 * progress})`;
        ctx.lineWidth = 0.5;
        const drawPts = Math.floor(pts.length * progress);
        for (let i = 0; i < drawPts - 1; i++) {
          ctx.moveTo(pts[i][0], pts[i][1]);
          ctx.lineTo(pts[i + 1][0], pts[i + 1][1]);
        }
        ctx.stroke();
        // Constellation dots
        pts.slice(0, drawPts).forEach(([x, y]) => {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 168, 75, ${0.5 * progress})`;
          ctx.fill();
        });
      });

      // Draw stars
      stars.forEach((s) => {
        s.twinkle += s.speed;
        const alpha = 0.4 + 0.6 * Math.abs(Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 244, 255, ${alpha})`;
        ctx.fill();
      });

      // Occasional shooting star
      if (frame % 300 < 3) {
        const sx = Math.random() * canvas.width * 0.7;
        const sy = Math.random() * canvas.height * 0.3;
        const grad = ctx.createLinearGradient(sx, sy, sx + 80, sy + 30);
        grad.addColorStop(0, "rgba(255,255,255,0.8)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + 80, sy + 30);
        ctx.stroke();
      }
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [lightMode]);

  const gold = lightMode ? "#A07820" : "#C8A84B";
  const silver = lightMode ? "#1A4E9C" : "#C8D8E8";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        background: lightMode
          ? "radial-gradient(ellipse at 50% 30%, #c8ddf5 0%, #dce8f5 50%, #EEF3FA 100%)"
          : "radial-gradient(ellipse at 50% 30%, #0e1d3a 0%, #081224 50%, #050816 100%)",
      }}
    >
      {/* Star canvas */}
      {!lightMode && (
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      )}

      {/* Light mode vine decoration */}
      {lightMode && (
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.15 }}
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <g stroke="#A07820" strokeWidth="1" fill="none">
            <path d="M0 600 Q100 500 80 400 Q60 300 150 250 Q240 200 200 100" style={{ animation: "vine-grow 3s ease forwards", strokeDasharray: 600, strokeDashoffset: 600 }} />
            <path d="M800 600 Q700 500 720 400 Q740 300 650 250 Q560 200 600 100" style={{ animation: "vine-grow 3s ease 0.5s forwards", strokeDasharray: 600, strokeDashoffset: 600 }} />
          </g>
        </svg>
      )}

      {/* Content */}
      <div className="relative z-10 px-6 max-w-4xl mx-auto">
        {/* Sub-brand */}
        <div
          className="font-['Cinzel'] text-[11px] tracking-[0.5em] uppercase mb-8 opacity-60"
          style={{ color: gold, animation: "fadeInUp 0.8s ease 0.2s both" }}
        >
          — Pyrolux Digital Studio —
        </div>

        {/* Logo */}
        <div className="float-anim mb-8 inline-block" style={{ animation: "float 6s ease-in-out infinite, fadeInUp 0.8s ease 0.3s both" }}>
          <PyroluxLogo size={120} light={lightMode} />
        </div>

        {/* Main headline */}
        <h1
          className="font-['Cinzel_Decorative'] mb-4"
          style={{
            fontSize: "clamp(2.2rem, 7vw, 5rem)",
            lineHeight: 1.15,
            fontWeight: 900,
            animation: "fadeInUp 0.8s ease 0.5s both",
          }}
        >
          <span style={{ color: lightMode ? "#0D1F3C" : "#F0F4FF", display: "block" }}>
            Where Fire Meets
          </span>
          <span className="text-shimmer" style={{ display: "block" }}>
            The Stars
          </span>
        </h1>

        {/* Divider */}
        <div className="flex justify-center my-6" style={{ animation: "fadeInUp 0.8s ease 0.7s both" }}>
          <FleurDivider width={280} color={gold} />
        </div>

        {/* Subheading */}
        <p
          className="font-['Cormorant_Garamond'] text-lg italic leading-relaxed max-w-xl mx-auto mb-10"
          style={{
            color: lightMode ? "#1A3A6A" : "#C8D8E8",
            animation: "fadeInUp 0.8s ease 0.9s both",
          }}
        >
          A curated collection of celestial illustrations, fine line art,{" "}
          <br className="hidden sm:block" />
          studies, and commissioned works.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animation: "fadeInUp 0.8s ease 1.1s both" }}
        >
          <button
            className="btn-celestial"
            style={{ borderColor: gold, color: gold }}
            onClick={() => document.getElementById("studies")?.scrollIntoView({ behavior: "smooth" })}
          >
            ◈ Enter the Gallery
          </button>
          <button
            className="btn-celestial"
            style={{ borderColor: `${silver}88`, color: silver, fontSize: "10px" }}
            onClick={() => document.getElementById("commissions")?.scrollIntoView({ behavior: "smooth" })}
          >
            ✦ Commission Work
          </button>
        </div>

        {/* Scroll hint */}
        <div
          className="mt-16 flex flex-col items-center gap-2 opacity-40"
          style={{ animation: "fadeInUp 0.8s ease 1.3s both" }}
        >
          <div className="font-['Cinzel'] text-[9px] tracking-[0.4em]" style={{ color: gold }}>
            SCROLL
          </div>
          <div
            style={{
              width: 1,
              height: 40,
              background: `linear-gradient(to bottom, ${gold}, transparent)`,
              animation: "float 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
