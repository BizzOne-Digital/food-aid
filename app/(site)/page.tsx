import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { AboutPreview } from "@/components/home/AboutPreview";
import { PromoBanner } from "@/components/home/PromoBanner";
import { TestimonialsPreview } from "@/components/home/TestimonialsPreview";
import { FaqSection, FacilitiesSection, HowItWorks, SafetySection, SignsSection, TrustStrip } from "@/components/home/HomeSections";
import { DriveToYou } from "@/components/home/DriveToYou";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { getActiveServices, getHomeContent, getPublishedTestimonials, getSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: { absolute: s.seoTitle },
    description: s.seoDescription,
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const [c, services, testimonials, settings] = await Promise.all([
    getHomeContent(),
    getActiveServices(),
    getPublishedTestimonials(),
    getSettings(),
  ]);
  return (
    <>
      {c.faqs.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }}
        />
      )}
      <Hero c={c} />
      {c.trustItems.length > 0 && <TrustStrip c={c} />}
      <DriveToYou c={c} phone={settings.phone} />
      <ServicesPreview c={c} services={services} />
      {c.benefits.length > 0 && <BenefitsSection c={c} />}
      {c.steps.length > 0 && <HowItWorks c={c} />}
      <AboutPreview c={c} />
      {c.signs.length > 0 && <SignsSection c={c} />}
      {settings.offerEnabled && <PromoBanner c={{ ...c, offerPercentage: settings.offerPercentage }} />}
      {c.safetyPoints.length > 0 && <SafetySection c={c} />}
      {c.facilitiesPoints.length > 0 && <FacilitiesSection c={c} />}
      {testimonials.length > 0 && (
        <TestimonialsPreview eyebrow={c.testimonialsEyebrow} title={c.testimonialsTitle} items={testimonials} />
      )}
      {c.faqs.length > 0 && <FaqSection c={c} />}
      <CtaBand title={c.finalCtaTitle} text={c.finalCtaText} phone={settings.phone} />
    </>
  );
}
