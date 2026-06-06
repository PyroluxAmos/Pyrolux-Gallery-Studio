import { useState, useEffect } from "react";

import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import Commissions from "@/components/sections/Commissions";
import Studies from "@/components/sections/Studies";
import Library from "@/components/sections/Library";
import About from "@/components/sections/About";

const sections = ["hero", "commissions", "studies", "library", "about"];

export default function App() {
  const [lightMode, setLightMode] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const toggleTheme = () => {
    setLightMode((prev) => !prev);
  };

  useEffect(() => {
    document.body.classList.toggle("light-mode", lightMode);
  }, [lightMode]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Navigation
        lightMode={lightMode}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
      />
      <main>
        <Hero lightMode={lightMode} />
        <Commissions lightMode={lightMode} />
        <Studies lightMode={lightMode} />
        <Library lightMode={lightMode} />
        <About lightMode={lightMode} />
      </main>
    </div>
  );
}
