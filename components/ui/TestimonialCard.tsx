import Image from "next/image";
import { Initials, Stars } from "./Stars";
import { resolveImageUrl } from "@/lib/image";
import type { TestimonialData } from "@/lib/defaults";

export function TestimonialCard({ t }: { t: TestimonialData }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl bg-softer px-7 py-6 ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-card">
      <Stars rating={t.rating} />
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/80">&ldquo;{t.review}&rdquo;</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        {t.image ? (
          <Image
            src={resolveImageUrl(t.image)}
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <Initials name={t.clientName} />
        )}
        <span className="leading-tight">
          <span className="block text-sm font-bold text-ink">{t.clientName}</span>
          <span className="block text-xs text-muted">{t.location}</span>
        </span>
      </figcaption>
    </figure>
  );
}
