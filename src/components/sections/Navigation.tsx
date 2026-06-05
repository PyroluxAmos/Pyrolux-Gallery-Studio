import { useState, useEffect } from "react";
import { PyroluxLogo } from "@/components/ui-custom/Ornaments";

interface NavProps {
  lightMode: boolean;
  toggleTheme: () => void;
  activeSection: string;
}

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "commissions", label: "Commissions" },
  { id: "studies", label: "Studies" },
  { id: "library", label: "Library" },
  { id: "about", label: "About" },
];

export default function Navigation({ lightMode, toggleTheme, activeSection }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const gold = lightMode ? "#A07820" : "#C8A84B";
  const text = lightMode ? "#1a1a2e" : "#F0F4FF";

  return (
    <>
      <nav
        className={`glass-nav fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-3 group"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <PyroluxLogo size={38} light={lightMode} />
            <div className="text-left">
              <div
                className="font-['Cinzel_Decorative'] text-sm font-bold tracking-widest"
                style={{ color: gold }}
              >
                PYROLUX
              </div>
              <div
                className="font-['Cinzel'] text-[9px] tracking-[0.4em] opacity-60"
                style={{ color: text }}
              >
                GALLERY
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-['Cinzel'] text-[11px] tracking-[0.2em] uppercase transition-all duration-300"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: activeSection === link.id ? gold : text,
                  opacity: activeSection === link.id ? 1 : 0.6,
                  borderBottom: activeSection === link.id ? `1px solid ${gold}` : "1px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Theme toggle + mobile menu */}
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="theme-toggle" style={{ color: gold, borderColor: `${gold}66` }}>
              <span>{lightMode ? "☽" : "☀"}</span>
              <span>{lightMode ? "DARK" : "LIGHT"}</span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 20,
                    height: 1,
                    background: gold,
                    transition: "all 0.3s",
                    transform: mobileOpen
                      ? i === 0 ? "rotate(45deg) translate(1px, 4px)"
                        : i === 2 ? "rotate(-45deg) translate(1px, -4px)"
                        : "scaleX(0)"
                      : "none",
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-out */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(5,8,22,0.97)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-['Cinzel_Decorative'] text-xl tracking-widest uppercase"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: gold,
                  animation: `fadeInUp 0.4s ease ${i * 0.08}s both`,
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Section indicator — desktop */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            title={link.label}
            className={`nav-dot ${activeSection === link.id ? "active" : ""}`}
            style={{ border: "none", cursor: "pointer" }}
          />
        ))}
      </div>
    </>
  );
}
