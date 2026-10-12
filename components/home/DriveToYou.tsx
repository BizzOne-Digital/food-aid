import Link from "next/link";
import { Phone } from "lucide-react";
import { telHref } from "@/lib/site";
import type { HomeContent } from "@/lib/defaults";

/** Red car with a heart on the door. Wheels are separate groups so they can spin. */
function Car() {
  return (
    // Drawn facing right; flipped because it drives left toward the house.
    <svg viewBox="0 0 120 56" className="h-full w-full -scale-x-100 overflow-visible" aria-hidden>
      <g className="drive-body">
        <path
          d="M8 38c0-5 2.5-8 7-9l14-3 13-12c2-1.8 4.5-2.8 7.2-2.8H74c3 0 5.8 1.3 7.8 3.6L92 26l14 2.4c5 .9 8 4.6 8 9.6v4c0 1.7-1.3 3-3 3H11c-1.7 0-3-1.3-3-3z"
          fill="#e50914"
        />
        <path d="M45 15.5c1.4-1.3 3.2-2 5.1-2H60v12.5H33z" fill="#fff" />
        <path d="M64 13.5h9.6c2 0 3.9.9 5.2 2.4L87 26H64z" fill="#fff" />
        <path d="M58 33.5s-5-3-5-6.4c0-1.6 1.2-2.7 2.6-2.7 1.1 0 2 .6 2.4 1.5.4-.9 1.3-1.5 2.4-1.5 1.4 0 2.6 1.1 2.6 2.7 0 3.4-5 6.4-5 6.4z" fill="#fff" />
        <rect x="108" y="31" width="5" height="3.4" rx="1.2" fill="#ffb703" />
        <rect x="8" y="32" width="4" height="3" rx="1" fill="#7a0207" />
      </g>
      {[28, 92].map((cx) => (
        <g key={cx} className="drive-wheel" style={{ transformOrigin: `${cx}px 45px` }}>
          <circle cx={cx} cy="45" r="9" fill="#111" />
          <circle cx={cx} cy="45" r="4" fill="#fff" />
          <path d={`M${cx - 7} 45h14M${cx} 38v14`} stroke="#111" strokeWidth="1.6" />
        </g>
      ))}
    </svg>
  );
}

function House() {
  return (
    <svg viewBox="0 0 64 60" className="h-full w-full" aria-hidden>
      <path d="M6 28 32 6l26 22" fill="none" stroke="#111" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 24v32h38V24" fill="none" stroke="#111" strokeWidth="5" strokeLinejoin="round" />
      <rect x="22" y="36" width="9" height="20" fill="#e50914" />
      <rect x="37" y="31" width="7" height="7" fill="#111" />
    </svg>
  );
}

/** Small footprint pair for the road trail. */
function Footprint({ i }: { i: number }) {
  return (
    <svg viewBox="0 0 22 12" className="drive-print h-3 w-6" style={{ animationDelay: `${i * 0.35}s` }} aria-hidden>
      <ellipse cx="6" cy="4" rx="5" ry="2.6" fill="#e50914" />
      <ellipse cx="16" cy="8.5" rx="5" ry="2.6" fill="#e50914" />
    </svg>
  );
}

export function DriveToYou({ c, phone }: { c: HomeContent; phone: string }) {
  return (
    <section className="overflow-hidden bg-white py-14 sm:py-20" aria-labelledby="drive-heading">
      <div className="container-x text-center">
        <p className="eyebrow">{c.driveEyebrow}</p>
        <h2 id="drive-heading" className="mx-auto mt-4 max-w-3xl text-[34px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">
          {c.driveTitle} <span className="text-brand">{c.driveHighlight}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg font-bold text-brand-dark sm:text-xl">{c.driveSubtitle}</p>
        <p className="mx-auto mt-3 max-w-2xl text-[15.5px] text-muted">{c.driveAreas}</p>
        <a href={telHref(phone)} className="mt-6 inline-flex items-center gap-3 text-lg font-bold text-ink hover:text-brand">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow-[0_8px_20px_-6px_rgb(229_9_20/0.6)]">
            <Phone className="h-5 w-5" aria-hidden />
          </span>
          Call or text <span className="text-brand">{phone}</span>
        </a>

        {/* Road scene: the car drives toward the house, leaving footprints behind it. */}
        <div className="relative mx-auto mt-10 h-28 max-w-4xl sm:h-32" role="img" aria-label="Animated car driving to a client's home">
          <div className="absolute bottom-6 left-0 h-14 w-14 sm:h-16 sm:w-16">
            <House />
          </div>
          <div className="absolute inset-x-0 bottom-5 border-t-2 border-dashed border-[#d6d6d6]" />
          <div className="absolute bottom-1 left-[14%] right-0 flex justify-between">
            {Array.from({ length: 9 }, (_, i) => (
              <Footprint key={i} i={8 - i} />
            ))}
          </div>
          <div className="drive-car absolute bottom-4 h-12 w-24 sm:h-14 sm:w-28">
            <Car />
          </div>
        </div>

        <Link
          href="/booking"
          className="group relative mx-auto mt-6 flex max-w-xl flex-col items-center rounded-3xl bg-gradient-to-b from-brand to-brand-dark px-6 pb-6 pt-8 text-white shadow-[0_18px_40px_-14px_rgb(229_9_20/0.7)] transition hover:-translate-y-1"
        >
          <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 gap-10" aria-hidden>
            {[0, 1, 2, 3].map((k) => (
              <span key={k} className="h-6 w-2.5 rounded-full bg-ink" />
            ))}
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/85">{c.driveCtaKicker}</span>
          <span className="mt-1 text-3xl font-extrabold sm:text-4xl">{c.driveCtaLabel}</span>
        </Link>
      </div>
    </section>
  );
}
