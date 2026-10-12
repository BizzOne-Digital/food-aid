import type { Metadata } from "next";
import { Building2, CalendarClock, ClipboardList, Users } from "lucide-react";
import { FacilitiesSection } from "@/components/home/HomeSections";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { getHomeContent, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Foot Care for Hospitals & Care Facilities in Calgary",
  description:
    "On-site foot care nursing for hospitals, retirement homes, assisted living and long-term care facilities in Calgary. Bedside care for patients and scheduled visits for residents.",
  alternates: { canonical: "/care-facilities" },
};

const BENEFITS = [
  { Icon: CalendarClock, title: "Regular Schedule", text: "Recurring visits planned around your facility's routine." },
  { Icon: Users, title: "Patients & Residents", text: "Bedside care in hospital or several residents per visit." },
  { Icon: ClipboardList, title: "Clear Records", text: "Care notes for staff and families after each visit." },
  { Icon: Building2, title: "Calgary & Area", text: "Serving facilities across Calgary and nearby communities." },
];

export default async function CareFacilitiesPage() {
  const [c, settings] = await Promise.all([getHomeContent(), getSettings()]);
  return (
    <>
      <FacilitiesSection c={c} asPage />
      <section className="py-14 sm:py-20" aria-labelledby="benefits-heading">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Why Facilities Work With Us</p>
            <h2 id="benefits-heading" className="h-section mt-3">
              Simple, Reliable Foot Care for Your Residents
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map(({ Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 60}>
                <div className="card h-full p-7">
                  <Icon className="h-9 w-9 text-brand" strokeWidth={1.6} aria-hidden />
                  <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand
        title="Let's Talk About Foot Care for Your Patients or Residents"
        text="Tell us about your facility and we will suggest a visit schedule that works for you."
        label="Contact Us"
        href="/contact?subject=Care%20facility%20partnership"
        phone={settings.phone}
      />
    </>
  );
}
