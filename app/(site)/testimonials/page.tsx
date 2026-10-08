import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { Reveal } from "@/components/ui/Reveal";
import { getPublishedTestimonials, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read what seniors and families in Calgary say about Foot Aid's mobile foot care service.",
  alternates: { canonical: "/testimonials" },
};

export default async function TestimonialsPage() {
  const [items, settings] = await Promise.all([getPublishedTestimonials(), getSettings()]);
  return (
    <>
      <PageHero
        eyebrow="What Our Clients Say"
        title={"Kind Words From\nOur Clients"}
        highlight="Our Clients"
        intro="Feedback from seniors and families across Calgary who receive mobile foot care at home."
      />
      <section className="py-14 sm:py-20">
        <div className="container-x">
          {items.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-2xl bg-soft p-8 text-center sm:p-10">
              <h2 className="text-xl font-bold text-ink">Client reviews coming soon</h2>
              <p className="mt-3 leading-relaxed text-muted">
                We only publish genuine reviews from our clients. Have you received care from us? We would love to hear about your experience.
              </p>
              <Link href="/contact?subject=Client%20feedback" className="btn-outline mt-6">
                Share Your Feedback
              </Link>
            </div>
          ) : (
            <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3">
              {items.map((t, i) => (
                <Reveal as="li" key={t._id ?? i} delay={(i % 3) * 60} className="mb-6 break-inside-avoid">
                  <TestimonialCard t={t} />
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>
      <CtaBand
        title="Experience Caring Foot Care at Home"
        text="Join our clients across Calgary. Get 20% off your first visit plus a free foot assessment."
        phone={settings.phone}
      />
    </>
  );
}
