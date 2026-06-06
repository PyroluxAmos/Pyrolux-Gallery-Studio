import { useState } from "react";
import { services } from "@/data/gallery";
import { CornerOrnament, FleurDivider } from "@/components/ui-custom/Ornaments";

export default function Commissions({ lightMode }: { lightMode: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [inquiry, setInquiry] = useState<number | null>(null);

  const gold = lightMode ? "#A07820" : "#C8A84B";
  const text = lightMode ? "#0D1F3C" : "#F0F4FF";
  const muted = lightMode ? "#2A5FA8" : "#8a9ab0";
  const bg = lightMode ? "rgba(255,255,255,0.6)" : "rgba(14,29,58,0.5)";
  const bgHover = lightMode ? "rgba(255,255,255,0.9)" : "rgba(20,40,80,0.7)";
  const border = lightMode ? "rgba(139,105,20,0.25)" : "rgba(200,168,75,0.2)";

  return (
    <section
      id="commissions"
      className="relative py-24 px-6"
      style={{
        background: lightMode
          ? "linear-gradient(180deg, #EEF3FA 0%, #DCE8F5 100%)"
          : "linear-gradient(180deg, #050816 0%, #081224 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="font-['Cinzel'] text-[10px] tracking-[0.5em] uppercase mb-4 opacity-50" style={{ color: gold }}>
            Services & Rates
          </div>
          <h2
            className="font-['Cinzel_Decorative'] text-4xl md:text-5xl mb-6"
            style={{ color: lightMode ? "#0D1F3C" : "#F0F4FF" }}
          >
            Commission <span className="text-shimmer">Work</span>
          </h2>
          <div className="flex justify-center mb-6">
            <FleurDivider width={240} color={gold} />
          </div>
          <p className="font-['Cormorant_Garamond'] text-lg italic max-w-lg mx-auto" style={{ color: muted }}>
            Each commission is a unique collaboration — from initial concept to final delivery.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.id}
              className="artwork-card relative p-6 cursor-pointer"
              style={{
                background: selected === service.id ? bgHover : bg,
                border: `1px solid ${selected === service.id ? gold : border}`,
                backdropFilter: "blur(10px)",
                animation: `fadeInUp 0.6s ease ${i * 0.1}s both`,
              }}
              onClick={() => setSelected(selected === service.id ? null : service.id)}
            >
              {/* Corner ornaments */}
              <div style={{ position: "absolute", top: 0, left: 0 }}>
                <CornerOrnament size={30} color={gold} />
              </div>
              <div style={{ position: "absolute", top: 0, right: 0, transform: "scaleX(-1)" }}>
                <CornerOrnament size={30} color={gold} />
              </div>

              {/* Icon */}
              <div
                className="text-3xl mb-4 font-['Cinzel_Decorative']"
                style={{ color: gold }}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3
                className="font-['Cinzel'] text-sm tracking-widest uppercase mb-1"
                style={{ color: gold }}
              >
                {service.title}
              </h3>
              <div
                className="font-['Cormorant_Garamond'] text-base italic mb-3"
                style={{ color: muted }}
              >
                {service.subtitle}
              </div>

              {/* Description */}
              <p
                className="font-['Cormorant_Garamond'] text-base leading-relaxed mb-4"
                style={{ color: text, opacity: 0.85 }}
              >
                {service.description}
              </p>

              {/* Turnaround */}
              <div
                className="font-['Cinzel'] text-[10px] tracking-widest"
                style={{ color: gold, opacity: 0.7 }}
              >
                TURNAROUND: {service.turnaround}
              </div>

              {/* Expanded process */}
              {selected === service.id && (
                <div className="mt-5 pt-5" style={{ borderTop: `1px solid ${gold}44` }}>
                  <div
                    className="font-['Cinzel'] text-[10px] tracking-widest mb-3"
                    style={{ color: gold }}
                  >
                    PROCESS
                  </div>
                  {service.process.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 mb-2 font-['Cormorant_Garamond'] text-sm"
                      style={{ color: text, opacity: 0.8 }}
                    >
                      <span style={{ color: gold, minWidth: 20 }}>{String(idx + 1).padStart(2, "0")}.</span>
                      {step}
                    </div>
                  ))}
                  <button
                    className="btn-celestial mt-4 w-full text-center"
                    style={{ borderColor: gold, color: gold, fontSize: "10px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setInquiry(service.id);
                    }}
                  >
                    ✦ Send Inquiry
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="text-center mt-12">
          <p className="font-['Cormorant_Garamond'] text-base italic" style={{ color: muted }}>
            All commissions begin with a consultation. Rates disclosed upon inquiry.
          </p>
        </div>
      </div>

      {/* Inquiry modal */}
      {inquiry !== null && (
        <div className="modal-overlay" onClick={() => setInquiry(null)}>
          <div
            className="relative max-w-md w-full mx-4 p-8"
            style={{
              background: lightMode ? "#EEF3FA" : "#081224",
              border: `1px solid ${gold}55`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-['Cinzel_Decorative'] text-xl mb-2 text-shimmer">
              Commission Inquiry
            </div>
            <div className="font-['Cinzel'] text-xs tracking-widest mb-6 opacity-60" style={{ color: gold }}>
              {services.find((s) => s.id === inquiry)?.title.toUpperCase()}
            </div>
            <p className="font-['Cormorant_Garamond'] text-base italic mb-6" style={{ color: muted }}>
              To submit a commission inquiry, reach out via the contact details below. Please include your concept, reference images, and preferred timeline.
            </p>
            <div className="font-['Cinzel'] text-xs tracking-widest mb-2" style={{ color: gold }}>
              CONTACT
            </div>
            <div className="font-['Cormorant_Garamond'] text-base" style={{ color: text }}>
              phyrostyx@gmail.com
            </div>
            <button
              className="btn-celestial mt-8 w-full"
              style={{ borderColor: gold, color: gold }}
              onClick={() => setInquiry(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
