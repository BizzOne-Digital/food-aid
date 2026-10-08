import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OfferBar } from "@/components/layout/OfferBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAboutContent, getActiveServices, getHomeContent, getSettings } from "@/lib/content";
import { SITE_URL, telHref } from "@/lib/site";

export const revalidate = 300;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, home, about, services] = await Promise.all([getSettings(), getHomeContent(), getAboutContent(), getActiveServices()]);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": ["MedicalBusiness", "LocalBusiness"],
          "@id": `${SITE_URL}/#business`,
          name: settings.businessName,
          description: settings.seoDescription,
          slogan: "Mobile foot care nurse in Calgary",
          url: SITE_URL,
          email: settings.email,
          telephone: telHref(settings.phone).replace("tel:", ""),
          address: { "@type": "PostalAddress", addressLocality: "Calgary", addressRegion: "AB", addressCountry: "CA" },
          areaServed: about.serviceAreas.map((name) => ({ "@type": "City", name: `${name}, AB` })),
          knowsAbout: ["Mobile foot care", "Senior foot care", "Diabetic foot care", "Nail trimming", "Corn and callus care"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Foot care services",
            itemListElement: services.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s.title, url: `${SITE_URL}/services#${s.slug}` },
            })),
          },
          priceRange: "$$",
        }}
      />
      {settings.offerEnabled && settings.offerText && <OfferBar text={settings.offerText} />}
      <Header logoUrl={settings.logoUrl} businessName={settings.businessName} phone={settings.phone} />
      <main id="main">{children}</main>
      <Footer settings={settings} home={home} />
    </>
  );
}
