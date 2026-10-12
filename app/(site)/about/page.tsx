import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { getAboutContent, getSettings } from "@/lib/content";
import { resolveImageUrl } from "@/lib/image";
import type { AboutSection } from "@/lib/defaults";

export const metadata: Metadata = {
  title: "About Our Mobile Foot Care Nurse in Calgary",
  description:
    "Foot Aid is a mobile-only foot care nurse in Calgary. We provide professional foot care for all ages at your home, care facility or hospital.",
  alternates: { canonical: "/about" },
};

function Split({ s, reverse, eyebrow }: { s: AboutSection; reverse?: boolean; eyebrow: string }) {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className={`relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card ${reverse ? "lg:order-2" : ""}`}>
          <Image src={resolveImageUrl(s.image)} alt="" fill sizes="(min-width:1024px) 560px, 100vw" className="object-cover transition duration-700 hover:scale-105" />
        </Reveal>
        <Reveal delay={100}>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h-section mt-3">{s.title}</h2>
          <div className="mt-5 h-1 w-14 rounded-full bg-brand" aria-hidden />
          <p className="mt-5 whitespace-pre-line text-[16px] leading-relaxed text-ink/80">{s.body}</p>
        </Reveal>
      </div>
    </section>
  );
}

export default async function AboutPage() {
  const [c, settings] = await Promise.all([getAboutContent(), getSettings()]);
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} highlight="Foot Care" intro={c.intro} image={c.heroImage} imageAlt="Nurse smiling with a senior client" />

      <Split s={c.story} eyebrow="Who We Are" />
      <div className="bg-soft">
        <Split s={c.whyMobile} reverse eyebrow="Why It Matters" />
      </div>
      <Split s={c.approach} eyebrow="How We Care" />

      <section className="bg-soft py-14 sm:py-20" aria-labelledby="who-we-help">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:order-2">
            <p className="eyebrow">Our Clients</p>
            <h2 id="who-we-help" className="h-section mt-3">
              {c.whoWeHelpTitle}
            </h2>
            <ul className="mt-7 space-y-4">
              {c.whoWeHelp.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[16px] text-ink/85">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
            <Image src={resolveImageUrl(c.whoWeHelpImage)} alt="" fill sizes="(min-width:1024px) 560px, 100vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="why-choose">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Our Promise</p>
            <h2 id="why-choose" className="h-section mt-3">
              {c.whyChooseTitle}
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.whyChoose.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 60}>
                <div className="card h-full p-7 transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                    <Icon name={v.icon} className="h-6 w-6 text-brand" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">{v.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-soft py-14 sm:py-20" aria-labelledby="areas">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Where We Visit</p>
            <h2 id="areas" className="h-section mt-3">
              {c.serviceAreasTitle}
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink/80">{c.serviceAreasText}</p>
          </Reveal>
          <Reveal as="ul" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {c.serviceAreas.map((a) => (
              <li key={a} className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-4 text-[15px] font-semibold text-ink shadow-card">
                <MapPin className="h-5 w-5 shrink-0 text-brand" aria-hidden />
                {a}
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand title={c.ctaTitle} text={c.ctaText} label={c.ctaLabel} phone={settings.phone} />
    </>
  );
}
