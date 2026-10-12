import type { Metadata } from "next";
import { Clock, Mail, Phone, ShieldCheck } from "lucide-react";
import { BookingForm } from "@/components/forms/BookingForm";
import { FootIcon } from "@/components/ui/Icon";
import { getHomeContent, getSettings } from "@/lib/content";
import { telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book a mobile foot care nurse in Calgary. A nurse visits your home for senior, diabetic and routine foot care. New clients get 20% off their first treatment visit and a free foot assessment.",
  alternates: { canonical: "/booking" },
};

export default async function BookingPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const [{ service }, settings, home] = await Promise.all([searchParams, getSettings(), getHomeContent()]);
  return (
    <section className="bg-soft pb-16 pt-12 sm:pb-24 sm:pt-16">
      <div className="container-x">
        <div className="max-w-3xl animate-fade-up">
          <p className="eyebrow">Booking</p>
          <h1 className="mt-4 text-[34px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            Book Your <span className="text-brand">Mobile Foot Care</span> Appointment
          </h1>
          <p className="mt-4 text-lg text-muted">
            Send us your preferred date and time. We will call or email you to confirm your visit at your home, care facility or hospital.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <BookingForm defaultService={service} />

          <aside className="space-y-5 lg:sticky lg:top-24">
            {settings.offerEnabled && (
              <div className="rounded-2xl bg-gradient-to-br from-brand to-[#b8070f] p-7 text-white shadow-card">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/85">New Clients</p>
                <p className="mt-2 text-3xl font-extrabold">{settings.offerPercentage} OFF</p>
                <p className="text-lg">your first treatment visit</p>
                <div className="mt-5 flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-brand">
                  <FootIcon className="h-7 w-7 shrink-0" aria-hidden />
                  <span className="font-bold">Plus, a Free Foot Assessment!</span>
                </div>
                {home.offerTerms && <p className="mt-4 text-xs leading-relaxed text-white/80">{home.offerTerms}</p>}
              </div>
            )}
            <div className="card p-7">
              <h2 className="text-lg font-bold text-ink">What happens next?</h2>
              <ol className="mt-4 space-y-4 text-[15px] text-ink/80">
                {[
                  { Icon: Clock, t: "We review your request and contact you, usually within one business day." },
                  { Icon: ShieldCheck, t: "We confirm your visit time, address and any mobility needs." },
                  { Icon: FootIcon, t: "Your nurse arrives at your home with clean, professional equipment." },
                ].map(({ Icon: I, t }, i) => (
                  <li key={i} className="flex gap-3">
                    <I className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                    {t}
                  </li>
                ))}
              </ol>
            </div>
            <div className="card p-7">
              <h2 className="text-lg font-bold text-ink">Prefer to call?</h2>
              <a href={telHref(settings.phone)} className="mt-4 flex items-center gap-3 font-semibold text-ink hover:text-brand">
                <Phone className="h-5 w-5 text-brand" aria-hidden /> {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} className="mt-3 flex items-center gap-3 break-all font-semibold text-ink hover:text-brand">
                <Mail className="h-5 w-5 shrink-0 text-brand" aria-hidden /> {settings.email}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
