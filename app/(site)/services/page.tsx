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
    "In-home foot care services in Calgary from a mobile foot care nurse: senior foot care, diabetic foot care, nail trimming, thickened and ingrown nails, corns, calluses and Onyfix. Free assessment for new clients.",
  alternates: { canonical: "/services" },
};

const AUDIENCE = [
  { Icon: Users, title: "Seniors", text: "Gentle, patient care for older adults at home." },
  { Icon: Accessibility, title: "Limited Mobility", text: "For anyone who finds travel or clinic visits difficult." },
  { Icon: House, title: "Homebound Clients", text: "Professional treatment without leaving home." },
  { Icon: HandHeart, title: "In-Home Convenience", text: "For families who want reliable care for a loved one." },
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
        title={"Advanced Foot Care\nin the Comfort of Your Home"}
        highlight="Advanced Foot Care"
        intro="Mobile foot care nursing in Calgary for seniors, people living with diabetes and anyone who finds it hard to care for their own feet. New clients start with a free foot assessment."
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
        title="Book Your In-Home Foot Care Visit"
        text="New clients get 20% off their first visit, plus a free foot assessment."
        phone={settings.phone}
      />
    </>
  );
}
