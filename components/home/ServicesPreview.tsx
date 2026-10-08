import { FootIcon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "./ServiceCard";
import type { HomeContent, ServiceData } from "@/lib/defaults";

export function ServicesPreview({ c, services }: { c: HomeContent; services: ServiceData[] }) {
  return (
    <section className="bg-soft py-14 sm:py-16" aria-labelledby="services-heading">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{c.servicesEyebrow}</p>
            <h2 id="services-heading" className="h-section mt-3">
              {c.servicesTitle}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{c.servicesDescription}</p>
          </div>
          <div className="flex items-center gap-3 border-l-2 border-ink pl-4 md:mb-6">
            <FootIcon className="h-8 w-8 shrink-0 text-brand" aria-hidden />
            <p className="text-[12.5px] font-bold leading-snug text-ink">
              {c.servicesHighlightLine1}
              <br />
              {c.servicesHighlightLine2}
            </p>
          </div>
        </Reveal>

        <ul className="mt-9 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 60}>
              <ServiceCard s={s} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
