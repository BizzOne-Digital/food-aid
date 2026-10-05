import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { resolveImageUrl } from "@/lib/image";
import type { HomeContent } from "@/lib/defaults";

function DecorText({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <div className="pointer-events-none select-none text-ink" aria-hidden>
      <p className="-rotate-[8deg] font-script text-[30px] font-bold leading-[0.95] sm:text-[36px] lg:text-[40px]">
        <span className="block">{line1}</span>
        <span className="block pl-7">{line2}</span>
      </p>
      {/* swoosh + heart */}
      <svg viewBox="0 0 200 50" className="-mt-2 ml-2 h-10 w-44 -rotate-[8deg] sm:w-52" fill="none">
        <path d="M4 40C55 30 110 22 160 18" stroke="#e50914" strokeWidth="2.6" strokeLinecap="round" />
        <path
          d="M171 33s-12-7-12-15c0-3.6 2.6-6 5.6-6 2.6 0 4.4 1.4 5.4 3.4 1-2 2.8-3.4 5.4-3.4 3 0 5.6 2.4 5.6 6 0 8-10 15-10 15z"
          stroke="#e50914"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function Hero({ c }: { c: HomeContent }) {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Desktop: full-bleed image on the right, faded into white behind the copy */}
      <div className="absolute inset-y-0 right-0 hidden w-full lg:block">
        <Image
          src={resolveImageUrl(c.heroImage)}
          alt="Foot care nurse gently examining a senior client's foot at home"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 via-30% to-transparent to-50%" />
        <div className="absolute right-[5%] top-[9%]">
          <DecorText line1={c.heroDecorLine1} line2={c.heroDecorLine2} />
        </div>
      </div>

      <div className="container-x relative">
        <div className="max-w-[560px] py-12 sm:py-16 lg:flex lg:min-h-[clamp(540px,calc(100vh-66px),620px)] lg:flex-col lg:justify-center lg:py-14">
          <p className="eyebrow animate-fade-up">{c.heroEyebrow}</p>
          <h1 className="mt-4 animate-fade-up text-[40px] font-extrabold leading-[1.05] tracking-tight text-ink [animation-delay:80ms] sm:text-[52px] lg:text-[56px]">
            <span className="block">{c.heroTitleLine1}</span>
            <span className="block">
              <span className="text-brand">{c.heroHighlight}</span> {c.heroTitleAfter}
            </span>
          </h1>
          <p className="mt-5 max-w-[460px] animate-fade-up text-[17px] leading-relaxed text-ink/85 [animation-delay:160ms] sm:text-lg">
            {c.heroDescription}
          </p>

          <ul className="mt-8 grid animate-fade-up grid-cols-1 gap-4 [animation-delay:240ms] min-[440px]:grid-cols-3 min-[440px]:gap-0">
            {c.heroFeatures.map((f, i) => (
              <li
                key={i}
                className={`flex items-center gap-3 min-[440px]:pr-3 ${i > 0 ? "min-[440px]:border-l min-[440px]:border-line min-[440px]:pl-4" : ""}`}
              >
                <Icon name={f.icon} className="h-8 w-8 shrink-0 text-brand" strokeWidth={1.6} />
                <span className="leading-tight">
                  <span className="block text-[13px] font-bold text-ink">{f.title}</span>
                  <span className="block text-[11.5px] text-muted">{f.subtitle}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:320ms] min-[440px]:flex-row min-[440px]:gap-4">
            <Link href={c.heroPrimaryHref} className="btn-primary px-7 py-3.5">
              {c.heroPrimaryLabel} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href={c.heroSecondaryHref} className="btn-outline px-10 py-3.5">
              {c.heroSecondaryLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: image stacked below the copy */}
      <div className="relative mx-4 mb-10 aspect-[4/3] overflow-hidden rounded-3xl sm:mx-6 sm:aspect-[16/10] lg:hidden">
        <Image
          src={resolveImageUrl(c.heroImage)}
          alt="Foot care nurse gently examining a senior client's foot at home"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/80 to-transparent" />
        <div className="absolute right-3 top-3 scale-[0.8] origin-top-right sm:scale-100">
          <DecorText line1={c.heroDecorLine1} line2={c.heroDecorLine2} />
        </div>
      </div>
    </section>
  );
}
