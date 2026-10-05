import Image from "next/image";
import { House } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { resolveImageUrl } from "@/lib/image";
import type { HomeContent } from "@/lib/defaults";

export function AboutPreview({ c }: { c: HomeContent }) {
  const titleLines = c.aboutTitle.split("\n");
  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="about-heading">
      <div className="grid lg:grid-cols-[46%_54%]">
        {/* Image + black/red slanted overlay panel */}
        <div className="relative min-h-[340px] sm:min-h-[400px] lg:min-h-[420px]">
          <Image
            src={resolveImageUrl(c.aboutImage)}
            alt="Relaxed senior resting their feet at home"
            fill
            sizes="(min-width:1024px) 46vw, 100vw"
            className="object-cover"
          />
          <div
            className="absolute bottom-0 right-0 top-[16%] flex w-[66%] max-w-[320px] flex-col justify-end rounded-tl-[48px] bg-[linear-gradient(115deg,#111_0%,#1a0204_45%,#8a040b_75%,#e50914_100%)] p-7 pb-9 pr-14 text-white sm:w-[50%] lg:w-[48%]"
            style={{ clipPath: "polygon(0 0, 80% 0, 100% 100%, 0 100%)" }}
          >
            <House className="h-9 w-9" strokeWidth={1.5} aria-hidden />
            <p className="mt-5 whitespace-pre-line text-[22px] font-bold leading-[1.22] sm:text-2xl">{c.aboutOverlay}</p>
          </div>
        </div>

        <div className="flex items-center px-4 py-12 sm:px-8 lg:px-12 lg:py-14 xl:pl-14 xl:pr-[max(2.5rem,calc((100vw-1600px)/2+2.5rem))]">
          <Reveal className="max-w-[560px]">
            <p className="eyebrow">{c.aboutEyebrow}</p>
            <h2 id="about-heading" className="mt-3 text-[26px] font-extrabold leading-[1.15] tracking-tight text-ink sm:text-[30px] lg:text-[28px] xl:text-[32px]">
              {titleLines.map((l, i) => (
                <span key={i} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/80">{c.aboutText}</p>
            <ul className="mt-7 grid gap-5 sm:grid-cols-3 sm:gap-3">
              {c.aboutFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Icon name={f.icon} className="h-8 w-8 shrink-0 text-brand" strokeWidth={1.6} />
                  <span className="leading-tight">
                    <span className="block text-[13px] font-bold text-ink">{f.title}</span>
                    <span className="block text-[12px] text-muted">{f.subtitle}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
