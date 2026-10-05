import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleAlert, CircleCheck, Plus, ShieldCheck } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { resolveImageUrl } from "@/lib/image";
import type { HomeContent } from "@/lib/defaults";

/** Thin trust bar directly under the hero. */
export function TrustStrip({ c }: { c: HomeContent }) {
  return (
    <section aria-label="Why clients trust us" className="border-y border-line bg-white">
      <ul className="container-x grid grid-cols-2 lg:grid-cols-4">
        {c.trustItems.map((t, i) => (
          <li
            key={i}
            className={`flex items-center gap-3 py-5 sm:py-6 ${i % 2 ? "pl-4 sm:pl-6" : ""} ${i > 0 ? "lg:border-l lg:border-line lg:pl-6" : ""} ${
              i < 2 ? "border-b border-line lg:border-b-0" : ""
            }`}
          >
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50">
              <Icon name={t.icon} className="h-5 w-5 text-brand" />
            </span>
            <span className="leading-tight">
              <span className="block text-[13.5px] font-bold text-ink sm:text-sm">{t.title}</span>
              <span className="block text-[11.5px] text-muted sm:text-xs">{t.subtitle}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HowItWorks({ c }: { c: HomeContent }) {
  return (
    <section className="bg-white py-14 sm:py-20" aria-labelledby="steps-heading">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{c.stepsEyebrow}</p>
          <h2 id="steps-heading" className="h-section mt-3">
            {c.stepsTitle}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{c.stepsDescription}</p>
        </Reveal>
        <ol className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* connector line on desktop */}
          <span aria-hidden className="absolute left-[12%] right-[12%] top-7 hidden border-t-2 border-dashed border-brand/25 lg:block" />
          {c.steps.map((s, i) => (
            <Reveal as="li" key={i} delay={i * 80} className="relative text-center">
              <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-lg font-extrabold text-white shadow-[0_8px_20px_-6px_rgb(229_9_20/0.6)] ring-8 ring-white">
                {i + 1}
              </span>
              <h3 className="mt-5 text-[17px] font-bold text-ink">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[250px] text-[14px] leading-relaxed text-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <Link href="/booking" className="btn-primary px-8 py-3.5">
            Request a Home Visit <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SignsSection({ c }: { c: HomeContent }) {
  return (
    <section className="bg-soft py-14 sm:py-20" aria-labelledby="signs-heading">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="eyebrow">{c.signsEyebrow}</p>
          <h2 id="signs-heading" className="h-section mt-3">
            {c.signsTitle}
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink/80">{c.signsDescription}</p>
          {c.signsNote && (
            <p className="mt-6 flex gap-3 rounded-xl border border-brand/20 bg-white p-4 text-sm leading-relaxed text-ink/80">
              <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
              {c.signsNote}
            </p>
          )}
        </Reveal>
        <ul className="grid gap-3 sm:grid-cols-2">
          {c.signs.map((s, i) => (
            <Reveal as="li" key={i} delay={i * 50}>
              <div className="flex h-full items-start gap-3 rounded-xl bg-white p-5 shadow-card ring-1 ring-black/[0.03] transition duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
                <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                <span className="text-[15px] font-semibold leading-snug text-ink">{s}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SafetySection({ c }: { c: HomeContent }) {
  return (
    <section className="bg-white py-14 sm:py-20" aria-labelledby="safety-heading">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
            <Image src={resolveImageUrl(c.safetyImage)} alt="Nurse caring for a senior client" fill sizes="(min-width:1024px) 560px, 100vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 right-4 flex items-center gap-3 rounded-2xl bg-ink px-5 py-4 text-white shadow-card-hover sm:right-8">
            <ShieldCheck className="h-8 w-8 text-brand" strokeWidth={1.6} aria-hidden />
            <span className="leading-tight">
              <span className="block text-sm font-bold">Sterilized Tools</span>
              <span className="block text-xs text-white/70">Every single visit</span>
            </span>
          </div>
        </Reveal>
        <Reveal delay={100} className="pt-4 lg:pt-0">
          <p className="eyebrow">{c.safetyEyebrow}</p>
          <h2 id="safety-heading" className="h-section mt-3">
            {c.safetyTitle}
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink/80">{c.safetyText}</p>
          <ul className="mt-6 space-y-3">
            {c.safetyPoints.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] text-ink/85">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand">
                  <CircleCheck className="h-3.5 w-3.5 text-white" aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** Native <details> accordion: keyboard and screen-reader friendly with no JS. */
export function FaqSection({ c }: { c: HomeContent }) {
  return (
    <section className="bg-soft py-14 sm:py-20" aria-labelledby="faq-heading">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">{c.faqEyebrow}</p>
          <h2 id="faq-heading" className="h-section mt-3">
            {c.faqTitle}
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink/80">Have another question? We are happy to help.</p>
          <Link href="/contact" className="btn-outline mt-6">
            Contact Us
          </Link>
        </Reveal>
        <div className="space-y-3">
          {c.faqs.map((f, i) => (
            <Reveal key={i} delay={i * 40}>
              <details className="group rounded-xl bg-white shadow-card ring-1 ring-black/[0.03] open:ring-brand/20">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15.5px] font-bold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <Plus className="h-5 w-5 shrink-0 text-brand transition duration-300 group-open:rotate-45" aria-hidden />
                </summary>
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted">{f.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
