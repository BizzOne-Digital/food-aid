import Image from "next/image";
import { MoveRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { resolveImageUrl } from "@/lib/image";
import type { HomeContent } from "@/lib/defaults";

/** "Benefits of foot care": organic-shaped real photo with benefit callouts. */
export function BenefitsSection({ c }: { c: HomeContent }) {
  return (
    <section className="bg-[#f6f1ea] py-14 sm:py-20" aria-labelledby="benefits-heading">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-[560px]">
          <div
            className="relative aspect-square overflow-hidden shadow-card-hover"
            style={{ borderRadius: "58% 42% 46% 54% / 44% 56% 44% 56%" }}
          >
            <Image
              src={resolveImageUrl(c.benefitsImage)}
              alt="Foot care nurse wearing gloves gently holding a client's foot"
              fill
              sizes="(min-width:1024px) 560px, 100vw"
              className="object-cover"
            />
            {/* Video plays over the photo once loaded; the photo stays as the fallback. */}
            {c.benefitsVideo && (
              <LazyVideo
                src={c.benefitsVideo}
                label="Foot care nurse treating a client's foot"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>
          <span className="absolute -right-2 top-6 h-16 w-16 rounded-full bg-brand/90 sm:h-20 sm:w-20" aria-hidden />
          <span className="absolute bottom-8 -left-2 h-10 w-10 rounded-full bg-ink" aria-hidden />
        </Reveal>

        <Reveal delay={100}>
          <p className="eyebrow">{c.benefitsEyebrow}</p>
          <h2 id="benefits-heading" className="h-section mt-3">
            {c.benefitsTitle}
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink/80">{c.benefitsText}</p>
          <ul className="mt-8 space-y-4">
            {c.benefits.map((b, i) => (
              <li key={i} className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-card">
                <MoveRight className="h-6 w-6 shrink-0 text-brand" aria-hidden />
                <span className="text-[16.5px] font-bold text-ink">{b}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
