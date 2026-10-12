"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted, looping background-style video that only downloads when scrolled into view.
 * Users who prefer reduced motion keep the poster image instead.
 */
export function LazyVideo({ src, poster, label, className = "" }: { src: string; poster?: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Some browsers ignore autoplay when the src is set later, so start playback explicitly.
  useEffect(() => {
    if (active) ref.current?.play().catch(() => {});
  }, [active]);

  return (
    <video
      ref={ref}
      className={className}
      src={active ? src : undefined}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  );
}
