import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const DEFAULT_HREF = "#";
const COMPACT_LAYOUT_BREAKPOINT = 768;
const ANIMATION_DURATION_MS = 450;

export default function ArrowFillButton({
  btnText = "Hover Me",
  href = DEFAULT_HREF,
  className = "",

  bgColor = "#112D4E",
  textColor = "#ffffff",

  fillBgColor = "#ffffff",
  fillTextColor = "#112D4E",

  hoverFillBgColor = "#ffffff",
  hoverFillTextColor = "#112D4E",

  arrowColor,
  hoverArrowColor,

  ...props
}) {
  const [isReady, setIsReady] = useState(false);
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const releaseTimeoutRef = useRef(null);

  const usesUtilityBackground =
    className.includes("bg-") ||
    className.includes("from-") ||
    className.includes("via-") ||
    className.includes("to-");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${COMPACT_LAYOUT_BREAKPOINT - 1}px)`
    );

    const syncCompactLayout = (event) => {
      const matches = "matches" in event ? event.matches : event.currentTarget?.matches;
      setIsCompactLayout(matches);

      if (!matches) {
        setIsPressed(false);
      }
    };

    syncCompactLayout(mediaQuery);
    mediaQuery.addEventListener("change", syncCompactLayout);

    return () => {
      mediaQuery.removeEventListener("change", syncCompactLayout);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (releaseTimeoutRef.current) {
        window.clearTimeout(releaseTimeoutRef.current);
      }
    };
  }, []);

  const clearPressedState = () => {
    if (releaseTimeoutRef.current) {
      window.clearTimeout(releaseTimeoutRef.current);
    }

    releaseTimeoutRef.current = window.setTimeout(() => {
      setIsPressed(false);
      releaseTimeoutRef.current = null;
    }, ANIMATION_DURATION_MS);
  };

  const handlePointerDown = (event) => {
    props.onPointerDown?.(event);

    if (!isCompactLayout || event.pointerType === "mouse") {
      return;
    }

    if (releaseTimeoutRef.current) {
      window.clearTimeout(releaseTimeoutRef.current);
      releaseTimeoutRef.current = null;
    }

    setIsPressed(true);
  };

  const handlePointerUp = (event) => {
    props.onPointerUp?.(event);

    if (!isCompactLayout || event.pointerType === "mouse") {
      return;
    }

    clearPressedState();
  };

  const handlePointerCancel = (event) => {
    props.onPointerCancel?.(event);

    if (!isCompactLayout || event.pointerType === "mouse") {
      return;
    }

    clearPressedState();
  };

  return (
    <a
      href={href}
      {...props}
      data-pressed={isPressed ? "true" : "false"}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className={`group relative inline-flex h-[48px] w-fit min-w-fit max-w-none cursor-pointer items-center justify-center overflow-hidden rounded-full border border-[var(--btn-bg)] pl-6 pr-[calc(var(--icon-circle)+var(--icon-right)+16px)] whitespace-nowrap font-semibold text-sm leading-none [text-rendering:geometricPrecision] [--icon-circle:36px] [--icon-right:6px] [--circle-inset-y:calc((100%-var(--icon-circle))/2)] sm:h-[50px] sm:pl-7 sm:pr-[calc(var(--icon-circle)+var(--icon-right)+20px)] sm:text-[15px] sm:[--icon-circle:38px] max-md:w-full ${
        usesUtilityBackground ? "" : "bg-[var(--btn-bg)]"
      } text-[var(--btn-text)] shadow-lg shadow-slate-300/50 transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-400/40 ${className}`}
      style={{
        "--btn-bg": bgColor,
        "--btn-text": textColor,
        "--btn-fill-bg": fillBgColor,
        "--btn-fill-text": fillTextColor,
        "--btn-fill-bg-hover": hoverFillBgColor,
        "--btn-fill-text-hover": hoverFillTextColor,
        "--btn-arrow": arrowColor || fillTextColor,
        "--btn-arrow-hover": hoverArrowColor || hoverFillTextColor,
        visibility: isReady ? "visible" : "hidden",
      }}
    >
      {/* Default-state text */}
      <span className="relative z-[1] pb-px">{btnText}</span>

      {/* Expanding fill circle → full background on hover */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute z-[2] rounded-full bg-[var(--btn-fill-bg)] inset-[var(--circle-inset-y)_var(--icon-right)_var(--circle-inset-y)_calc(100%-var(--icon-right)-var(--icon-circle))] ${
          isReady
            ? "transition-all duration-[450ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:bg-[var(--btn-fill-bg-hover)] group-hover:inset-0 group-data-[pressed=true]:bg-[var(--btn-fill-bg-hover)] group-data-[pressed=true]:inset-0"
            : ""
        }`}
      />

      {/* Revealed text (clip-path matched to circle, expands on hover) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-[2] flex items-center pl-6 pr-[calc(var(--icon-circle)+var(--icon-right)+16px)] sm:pl-7 sm:pr-[calc(var(--icon-circle)+var(--icon-right)+20px)] text-[var(--btn-fill-text)] [clip-path:inset(var(--circle-inset-y)_var(--icon-right)_var(--circle-inset-y)_calc(100%-var(--icon-right)-var(--icon-circle)))] ${
          isReady
            ? "transition-all duration-[450ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:text-[var(--btn-fill-text-hover)] group-hover:[clip-path:inset(0_0_0_0)] group-data-[pressed=true]:text-[var(--btn-fill-text-hover)] group-data-[pressed=true]:[clip-path:inset(0_0_0_0)]"
            : ""
        }`}
      >
        <span className="relative z-[1] pb-px whitespace-nowrap">{btnText}</span>
      </div>

      {/* Arrow icon circle */}
      <span
        className={`pointer-events-none absolute right-[var(--icon-right)] top-1/2 z-[3] inline-flex h-[var(--icon-circle)] w-[var(--icon-circle)] shrink-0 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-[var(--btn-fill-bg)] text-[var(--btn-arrow)] ${
          isReady
            ? "transition-colors duration-[450ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:bg-[var(--btn-fill-bg-hover)] group-hover:text-[var(--btn-arrow-hover)] group-data-[pressed=true]:bg-[var(--btn-fill-bg-hover)] group-data-[pressed=true]:text-[var(--btn-arrow-hover)]"
            : ""
        }`}
        style={{
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
          maskImage: "radial-gradient(white, black)",
        }}
        aria-hidden="true"
      >
        {/* Arrow sliding IN from left */}
        <ArrowRight
          className={`absolute left-1/2 top-1/2 h-4 w-4 translate-x-[-170%] -translate-y-1/2 origin-center scale-0 text-current ${
            isReady
              ? "transition-transform duration-[450ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:scale-100 group-data-[pressed=true]:-translate-x-1/2 group-data-[pressed=true]:-translate-y-1/2 group-data-[pressed=true]:scale-100"
              : ""
          }`}
          strokeWidth={1.8}
        />

        {/* Arrow sliding OUT to right */}
        <ArrowRight
          className={`absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 origin-center text-current ${
            isReady
              ? "transition-transform duration-[450ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:translate-x-[70%] group-hover:-translate-y-1/2 group-hover:scale-0 group-data-[pressed=true]:translate-x-[70%] group-data-[pressed=true]:-translate-y-1/2 group-data-[pressed=true]:scale-0"
              : ""
          }`}
          strokeWidth={1.8}
        />
      </span>
    </a>
  );
}
