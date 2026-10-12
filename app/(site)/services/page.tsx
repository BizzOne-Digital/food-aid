import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Accessibility, ArrowRight, House, HandHeart, Users } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon, FootIcon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { getActiveServices, getSettings } from "@/lib/content";
import { resolveImageUrl } from "@/lib/image";
import { IMAGES } from "@/lib/defaults";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Foot Care Services in Calgary: Senior, Diabetic & Nail Care",
  description:
    "Mobile foot care services in Calgary, at your home, care facility or hospital: senior foot care, diabetic foot care, nail trimming, thickened and ingrown nails, corns, calluses and Onyfix. Free assessment for new clients.",
  alternates: { canonical: "/services" },
};

const AUDIENCE = [
  { Icon: Users, title: "All Ages", text: "Professional foot and nail care for adults of every age." },
  { Icon: HandHeart, title: "Diabetes & Circulation", text: "Careful, regular care for higher-risk feet." },
  { Icon: Accessibility, title: "Seniors & Limited Mobility", text: "Gentle care for anyone who finds foot care hard." },
  { Icon: House, title: "Home, Facility or Hospital", text: "Mobile only. We come to wherever you are." },
];

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getActiveServices(), getSettings()]);
  return (
    <>
      <JsonLd
        data={services.map((s) => ({
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          description: s.shortDescription,
          serviceType: "Mobile foot care",
          url: `${SITE_URL}/services#${s.slug}`,
          areaServed: "Calgary, AB and surrounding areas",
          provider: { "@id": `${SITE_URL}/#business` },
        }))}
      />
      <PageHero
        eyebrow="Our Services"
        title={"Advanced Foot Care\nWherever You Are"}
        highlight="Advanced Foot Care"
        intro="Mobile-only foot care nursing in Calgary for people of all ages. We come to your home, care facility or hospital. New clients start with a free foot assessment."
        image={IMAGES.footHold}
        imageAlt="Nurse holding a client's foot during an assessment"
      />

      <section className="py-14 sm:py-20" aria-label="Service list">
        <div className="container-x space-y-8 sm:space-y-10">
          {services.map((s, i) => (
            <Reveal key={s.slug}>
              <article
                id={s.slug}
                className="card grid scroll-mt-28 overflow-hidden md:grid-cols-[0.9fr_1.1fr] lg:grid-cols-[0.8fr_1.2fr]"
              >
                <div className={`relative min-h-[240px] overflow-hidden ${i % 2 ? "md:order-2" : ""}`}>
                  <Image
                    src={resolveImageUrl(s.imageUrl)}
                    alt=""
                    fill
                    sizes="(min-width:768px) 45vw, 100vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                    <Icon name={s.iconName} className="h-6 w-6 text-brand" />
                  </span>
                  <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-ink sm:text-[28px]">{s.title}</h2>
                  <p className="mt-2 text-[15px] font-medium text-brand">{s.shortDescription}</p>
                  <p className="mt-4 whitespace-pre-line text-[15.5px] leading-relaxed text-ink/80">{s.fullDescription}</p>
                  {s.beforeImage && s.afterImage && (
                    <figure className="mt-6">
                      <div className="grid grid-cols-2 gap-3">
                        {([["Before", s.beforeImage], ["After", s.afterImage]] as const).map(([label, src]) => (
                          <div key={label} className="relative aspect-square overflow-hidden rounded-xl bg-soft">
                            <Image
                              src={resolveImageUrl(src)}
                              alt={`${s.title}: ${label.toLowerCase()} treatment`}
                              fill
                              sizes="(min-width:768px) 240px, 45vw"
                              className="object-cover"
                            />
                            <span className="absolute left-2 top-2 rounded-full bg-ink/80 px-2.5 py-0.5 text-xs font-bold text-white">{label}</span>
                          </div>
                        ))}
                      </div>
                      <figcaption className="mt-2 text-xs text-muted">Real client result, shared with permission. Individual results vary.</figcaption>
                    </figure>
                  )}
                  <div>
                    <Link href={`/booking?service=${encodeURIComponent(s.title)}`} className="btn-primary mt-7">
                      Book This Service <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-soft py-14 sm:py-20" aria-labelledby="for-whom">
        <div className="container-x">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Who We Serve</p>
              <h2 id="for-whom" className="h-section mt-3">
                Who Our Services Are For
              </h2>
            </div>
            <div className="flex items-center gap-3 border-l-2 border-ink pl-4">
              <FootIcon className="h-8 w-8 shrink-0 text-brand" aria-hidden />
              <p className="text-[13px] font-bold leading-snug text-ink">
                Free Foot Assessment
                <br />
                for New Clients
              </p>
            </div>
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCE.map(({ Icon: I, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 60}>
                <div className="h-full rounded-2xl bg-white p-7 shadow-card">
                  <I className="h-9 w-9 text-brand" strokeWidth={1.6} aria-hidden />
                  <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Book Your Mobile Foot Care Visit"
        text="New clients get 20% off their first visit, plus a free foot assessment."
        phone={settings.phone}
      />
    </>
  );
}
