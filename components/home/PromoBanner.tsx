import Image from "next/image";
import Link from "next/link";
import { resolveImageUrl } from "@/lib/image";
import type { HomeContent } from "@/lib/defaults";

export function PromoBanner({ c }: { c: HomeContent }) {
  const [before, after] = c.offerTitle.split("{percent}");
  return (
    <section className="relative overflow-hidden bg-ink" aria-label="Special offer">
      <Image
        src={resolveImageUrl(c.promoImage)}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-right opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />

      <div className="container-x relative py-6 sm:py-7">
        <Link
          href="/booking"
          className="group flex max-w-[620px] flex-col gap-6 rounded-2xl bg-gradient-to-br from-brand via-brand to-[#b8070f] p-6 text-white shadow-[0_20px_50px_-15px_rgb(229_9_20/0.6)] ring-1 ring-white/20 transition hover:-translate-y-0.5 sm:flex-row sm:items-center sm:gap-6 sm:p-7"
        >
          <div className="flex items-center gap-5">
            <span className="flex h-[66px] w-[66px] shrink-0 items-center justify-center rounded-full bg-white text-brand">
              <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
                <circle cx="11" cy="11" r="5" fill="none" stroke="currentColor" strokeWidth="4" />
                <circle cx="29" cy="29" r="5" fill="none" stroke="currentColor" strokeWidth="4" />
                <path d="M30 7 10 33" stroke="currentColor" strokeWidth="4.4" strokeLinecap="round" />
              </svg>
            </span>
            <div>
              <p className="text-lg font-medium">{c.offerKicker}</p>
              <p className="whitespace-nowrap text-[28px] font-extrabold leading-tight sm:text-[32px]">
                {before}
                {c.offerPercentage}
                {after}
              </p>
              <p className="text-lg">{c.offerDescription}</p>
            </div>
          </div>
          <span className="rounded-xl bg-white px-5 py-3.5 text-[15px] font-bold leading-snug text-brand shadow-md sm:ml-auto">
            {c.offerPillLine1}
            <br />
            {c.offerPillLine2}
          </span>
        </Link>
      </div>
    </section>
  );
}
