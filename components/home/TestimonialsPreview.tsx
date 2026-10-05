"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import type { TestimonialData } from "@/lib/defaults";

/** Scroll-snap slider: 3 cards on desktop, 2 on tablet, 1 on mobile. */
export function TestimonialsPreview({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: TestimonialData[];
}) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-14 sm:py-16" aria-labelledby="testimonials-heading">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id="testimonials-heading" className="h-section mt-3">
              {title}
            </h2>
          </div>
          {items.length > 1 && (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={atStart}
                aria-label="Previous testimonials"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand shadow-card ring-1 ring-line transition hover:bg-brand hover:text-white disabled:text-[#bbb] disabled:hover:bg-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={atEnd}
                aria-label="Next testimonials"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-card ring-1 ring-line transition hover:bg-brand hover:text-white disabled:text-[#bbb] disabled:hover:bg-white"
              >
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          )}
        </div>

        <ul
          ref={track}
          onScroll={update}
          className="-mx-4 mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Client testimonials"
        >
          {items.map((t, i) => (
            <li key={t._id ?? i} className="w-[88%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <TestimonialCard t={t} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
