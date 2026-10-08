import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/Icon";
import { FOOTER_EXTRA_LINKS, NAV_LINKS, telHref } from "@/lib/site";
import type { HomeContent, SiteSettingsData } from "@/lib/defaults";

export function Footer({ settings, home }: { settings: SiteSettingsData; home: HomeContent }) {
  const socials = [
    { href: settings.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: settings.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: settings.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-line bg-soft">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.8fr_1fr_1.15fr] lg:gap-8">
        <div>
          <Logo logoUrl={settings.logoUrl} name={settings.businessName} />
          <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-muted">{settings.footerDescription}</p>
          {socials.length > 0 && (
            <ul className="mt-5 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink shadow-card transition hover:bg-brand hover:text-white"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer">
          <h2 className="text-[15px] font-bold text-ink">Quick Links</h2>
          <ul className="mt-4 space-y-2">
            {[...NAV_LINKS, ...FOOTER_EXTRA_LINKS].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[13.5px] text-ink/80 transition hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[15px] font-bold text-ink">Contact Us</h2>
          <ul className="mt-4 space-y-3.5 text-[13.5px] text-ink/80">
            <li>
              <a href={`mailto:${settings.email}`} className="flex items-start gap-3 transition hover:text-brand">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <span className="break-all">{settings.email}</span>
              </a>
            </li>
            <li>
              <a href={telHref(settings.phone)} className="flex items-start gap-3 transition hover:text-brand">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                {settings.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <span>
                {settings.address}
                <br />
                {settings.serviceArea}
              </span>
            </li>
          </ul>
        </div>

        <div className="lg:border-l lg:border-[#dedede] lg:pl-8">
          <h2 className="text-[15px] font-bold text-ink">{home.footerCtaTitle}</h2>
          <p className="mt-4 text-[13.5px] leading-relaxed text-muted">{home.footerCtaText}</p>
          <Link href="/booking" className="btn-primary mt-5 px-7">
            {home.footerCtaLabel} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
      <div className="border-t border-[#e6e6e6]">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-center text-xs text-muted sm:flex-row sm:text-left">
          <p>
            Copyright &copy; {new Date().getFullYear()} {settings.businessName}. All rights reserved.
          </p>
          <p>Mobile foot care nursing in {settings.address}</p>
        </div>
      </div>
    </footer>
  );
}
