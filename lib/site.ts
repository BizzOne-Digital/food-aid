// Canonical site URL for metadata, sitemap and schema. Falls back to the Vercel production
// domain (e.g. www.myfootaid.com) so canonical links never point at localhost in production.
// A localhost value (e.g. copied from a local .env into Vercel) is ignored on Vercel.
const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const configured = process.env.NEXT_PUBLIC_SITE_URL;
const usable = configured && !(vercelDomain && /localhost|127\.0\.0\.1/.test(configured)) ? configured : "";
export const SITE_URL = (usable || (vercelDomain ? `https://${vercelDomain}` : "http://localhost:3000")).replace(/\/$/, "");

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/booking", label: "Booking" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_EXTRA_LINKS = [{ href: "/care-facilities", label: "Hospitals & Facilities" }] as const;

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
