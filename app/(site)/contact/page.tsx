import type { Metadata } from "next";
import { Mail, MapPin, Phone, Navigation } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { getAboutContent, getSettings } from "@/lib/content";
import { telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Foot Aid Leyman for mobile foot care in Calgary and surrounding areas. Call, email or send us a message.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const [settings, about] = await Promise.all([getSettings(), getAboutContent()]);
  const items = [
    { Icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    { Icon: Phone, label: "Phone", value: settings.phone, href: telHref(settings.phone) },
    { Icon: MapPin, label: "Location", value: settings.address, href: undefined },
    { Icon: Navigation, label: "Service Area", value: "Serving surrounding areas", href: undefined },
  ];

  return (
    <>
      <section className="bg-soft pb-16 pt-12 sm:pb-24 sm:pt-16">
        <div className="container-x">
          <div className="max-w-3xl animate-fade-up">
            <p className="eyebrow">Contact Us</p>
            <h1 className="mt-4 text-[34px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              We Are Here to <span className="text-brand">Help</span>
            </h1>
            <p className="mt-4 text-lg text-muted">
              Have a question about our services or service area? Send a message or call us directly.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-start">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {items.map(({ Icon, label, value, href }) => (
                <li key={label} className="card flex items-center gap-4 p-5">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                    <Icon className="h-6 w-6 text-brand" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
                    {href ? (
                      <a href={href} className="block break-all font-bold text-ink hover:text-brand">
                        {value}
                      </a>
                    ) : (
                      <span className="block font-bold text-ink">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="map-heading">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <p className="eyebrow">Service Area</p>
            <h2 id="map-heading" className="h-section mt-3">
              Calgary &amp; Surrounding Areas
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink/80">{about.serviceAreasText}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {about.serviceAreas.map((a) => (
                <li key={a} className="rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand">
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-line">
            <iframe
              title="Map of Calgary, Alberta service area"
              src="https://www.google.com/maps?q=Calgary,+Alberta&z=10&output=embed"
              className="h-[340px] w-full sm:h-[400px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
