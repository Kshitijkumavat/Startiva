import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useRef, useState } from "react";
export default function MeshGradientHero({
  className = "",
  colors = ["#F9F7F7", "#DBE2EF", "#A9C0DE", "#3F72AF"],
  distortion = 0.35,
  swirl = 0.25,
  speed = 0.15,
  offsetX = 0.05,
  veilClassName = "bg-[#F9F7F7]/70",
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) setDimensions({ width, height });
    });
    ro.observe(el);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);

    return () => {
      ro.disconnect();
      mq.removeEventListener("change", onChange);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <MeshGradient
        width={dimensions.width}
        height={dimensions.height}
        colors={colors}
        distortion={distortion}
        swirl={swirl}
        grainMixer={0}
        grainOverlay={0}
        speed={reducedMotion ? 0 : speed}
        offsetX={offsetX}
      />
      {/* Soft veil keeps headline/body text at full contrast over the shader */}
      <div className={`absolute inset-0 ${veilClassName}`} />
    </div>
  );
}