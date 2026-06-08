"use client";
import { useEffect, useRef } from "react";

export default function ScrollOverHero({ children, productPreview }) {
  const textGroupRef = useRef(null);
  const productRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;

      if (textGroupRef.current) {
        const p = Math.min(scrollY / 180, 1);
        textGroupRef.current.style.transform = `translateY(${-(p * 72)}px)`;
        textGroupRef.current.style.opacity = String(1 - p * 0.95);
      }

      if (productRef.current) {
        const raw = Math.min(Math.max((scrollY - 60) / 300, 0), 1);
        const ease = 1 - Math.pow(1 - raw, 3); 
        productRef.current.style.transform =
          `translateY(${44 - ease * 44}px) scale(${0.92 + ease * 0.08})`;
        productRef.current.style.opacity = String(0.65 + ease * 0.35);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); 
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ height: "280vh" }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">

        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 10%, #fff 40%, #475569 100%)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col items-center overflow-hidden px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">

            <div
              ref={textGroupRef}
              className="mx-auto max-w-4xl text-center will-change-transform"
            >
              {children}
            </div>

            <div
              ref={productRef}
              className="mt-12 will-change-transform"
              style={{
                transform: "translateY(44px) scale(0.92)",
                opacity: 0.65,
              }}
            >
              {productPreview}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}