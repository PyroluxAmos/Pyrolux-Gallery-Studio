import { PyroluxLogo, CornerOrnament, FleurDivider } from "@/components/ui-custom/Ornaments";

export default function About({ lightMode }: { lightMode: boolean }) {
  const gold = lightMode ? "#A07820" : "#C8A84B";
  const text = lightMode ? "#0D1F3C" : "#F0F4FF";
  const muted = lightMode ? "#2A5FA8" : "#8a9ab0";
  const silver = lightMode ? "#1E4E8C" : "#C8D8E8";
  const sectionBg = lightMode
    ? "linear-gradient(180deg, #DCE8F5 0%, #EEF3FA 100%)"
    : "linear-gradient(180deg, #050816 0%, #081224 50%, #050816 100%)";

  const philosophyPoints = [
    {
      icon: "✦",
      title: "Where Imagination Meets Astronomy",
      body: "Every piece begins with the cosmos — not as backdrop, but as language. Stars, nebulae, and celestial mechanics inform the composition from the first mark.",
    },
    {
      icon: "◈",
      title: "Symbolism as Structure",
      body: "Sacred geometry, alchemical sigils, and mythological motifs are not decoration — they are the architecture. Meaning is built into every curve and line.",
    },
    {
      icon: "❧",
      title: "Line Art as Meditation",
      body: "The act of drawing fine lines is contemplative. Each stroke is deliberate, irreversible, and present. The work is both artifact and practice.",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: sectionBg }}
    >
      {/* Background decorative SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <circle cx="400" cy="300" r="280" stroke={gold} strokeWidth="0.5" fill="none" />
          <circle cx="400" cy="300" r="220" stroke={gold} strokeWidth="0.5" fill="none" />
          <circle cx="400" cy="300" r="160" stroke={gold} strokeWidth="0.5" fill="none" />
          {/* Radial lines */}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={400 + 160 * Math.cos(angle)}
                y1={300 + 160 * Math.sin(angle)}
                x2={400 + 280 * Math.cos(angle)}
                y2={300 + 280 * Math.sin(angle)}
                stroke={gold}
                strokeWidth="0.5"
              />
            );
          })}
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="font-['Cinzel'] text-[10px] tracking-[0.5em] uppercase mb-4 opacity-50" style={{ color: gold }}>
            The Artist
          </div>
          <h2 className="font-['Cinzel_Decorative'] text-4xl md:text-5xl mb-6" style={{ color: text }}>
            About <span className="text-shimmer">Pyrolux</span>
          </h2>
          <div className="flex justify-center mb-6">
            <FleurDivider width={240} color={gold} />
          </div>
        </div>

        {/* Central logo feature */}
        <div className="flex justify-center mb-12">
          <div
            className="relative p-12 float-anim"
            style={{ border: `1px solid ${gold}33` }}
          >
            {/* Frame corners */}
            <div style={{ position: "absolute", top: 0, left: 0 }}>
              <CornerOrnament size={40} color={gold} />
            </div>
            <div style={{ position: "absolute", top: 0, right: 0, transform: "scaleX(-1)" }}>
              <CornerOrnament size={40} color={gold} />
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, transform: "scaleY(-1)" }}>
              <CornerOrnament size={40} color={gold} />
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, transform: "scale(-1)" }}>
              <CornerOrnament size={40} color={gold} />
            </div>
            <PyroluxLogo size={140} light={lightMode} />
          </div>
        </div>

        {/* Artist statement */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <blockquote
            className="font-['Cormorant_Garamond'] text-2xl italic leading-relaxed mb-6"
            style={{ color: silver }}
          >
            "Where imagination, astronomy, symbolism, and line art converge — that is where Pyrolux exists."
          </blockquote>
          <FleurDivider width={160} color={gold} />
          <p
            className="font-['Cormorant_Garamond'] text-base leading-relaxed mt-6"
            style={{ color: muted }}
          >
            Pyrolux is a digital artist working at the intersection of fine line illustration, celestial imagery,
            and Art Nouveau ornamental traditions. Based in the Philippines, the work draws equally from
            classical European printmaking and contemporary digital techniques — each piece a bridge between worlds.
          </p>
        </div>

        {/* Philosophy cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {philosophyPoints.map((point, i) => (
            <div
              key={i}
              className="p-6 text-center"
              style={{
                border: `1px solid ${gold}22`,
                background: lightMode ? "rgba(255,255,255,0.4)" : "rgba(14,29,58,0.3)",
                animation: `fadeInUp 0.6s ease ${i * 0.15}s both`,
              }}
            >
              <div className="font-['Cinzel'] text-2xl mb-4" style={{ color: gold }}>
                {point.icon}
              </div>
              <h3 className="font-['Cinzel'] text-xs tracking-wide leading-relaxed mb-3" style={{ color: gold }}>
                {point.title}
              </h3>
              <p className="font-['Cormorant_Garamond'] text-sm italic leading-relaxed" style={{ color: muted }}>
                {point.body}
              </p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="w-full px-2">
          <div
            className="w-full max-w-lg mx-auto px-6 py-8 sm:px-12"
            style={{ border: `1px solid ${gold}33` }}
          >
            <div className="font-['Cinzel'] text-[10px] tracking-[0.5em] uppercase mb-4 text-center" style={{ color: gold, opacity: 0.7 }}>
              Get in Touch
            </div>
            <p className="font-['Cormorant_Garamond'] text-base italic mb-6 text-center" style={{ color: muted }}>
              For commissions, collaborations, and inquiries
            </p>
            <a
              href="mailto: phyrostyx@gmail.com"
              className="btn-celestial block text-center w-full"
              style={{
                borderColor: gold,
                color: gold,
                textDecoration: "none",
                wordBreak: "break-word",
                whiteSpace: "normal",
                lineHeight: 1.5,
              }}
            >
              ✦ phyrostyx@gmail.com
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8" style={{ borderTop: `1px solid ${gold}22` }}>
          <div className="font-['Cinzel_Decorative'] text-sm tracking-widest text-shimmer mb-2">
            PYROLUX GALLERY
          </div>
          <div className="font-['Cinzel'] text-[9px] tracking-[0.4em] opacity-40" style={{ color: gold }}>
            © {new Date().getFullYear()} · ALL RIGHTS RESERVED · DIGITAL STUDIO · PHILIPPINES
          </div>
        </div>
      </div>
    </section>
  );
}
