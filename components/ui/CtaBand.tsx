import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function CtaBand({
  title,
  text,
  label = "Book an Appointment",
  phone,
}: {
  title: string;
  text: string;
  label?: string;
  phone?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink via-[#2a0306] to-brand px-6 py-12 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-3 text-lg text-white/85">{text}</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <Link href="/booking" className="btn bg-white text-brand hover:bg-brand-50">
              {label} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            {phone && (
              <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="btn border border-white/40 text-white hover:bg-white/10">
                <Phone className="h-4 w-4" aria-hidden /> {phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
