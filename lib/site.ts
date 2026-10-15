// Canonical site URL for metadata, sitemap and schema. Falls back to the Vercel production
// domain (e.g. www.myfootaid.com) so canonical links never point at localhost in production.
const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || (vercelDomain ? `https://${vercelDomain}` : "http://localhost:3000")
).replace(/\/$/, "");

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
