import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomeContent, getSettings } from "@/lib/content";
import { SITE_URL, telHref } from "@/lib/site";

export const revalidate = 300;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, home] = await Promise.all([getSettings(), getHomeContent()]);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": ["MedicalBusiness", "LocalBusiness"],
          "@id": `${SITE_URL}/#business`,
          name: settings.businessName,
          description: settings.seoDescription,
          url: SITE_URL,
          email: settings.email,
          telephone: telHref(settings.phone).replace("tel:", ""),
          address: { "@type": "PostalAddress", addressLocality: "Calgary", addressRegion: "AB", addressCountry: "CA" },
          areaServed: [{ "@type": "City", name: "Calgary" }, "Calgary and surrounding areas, Alberta"],
          medicalSpecialty: "Podiatric",
          priceRange: "$$",
        }}
      />
      <Header logoUrl={settings.logoUrl} businessName={settings.businessName} phone={settings.phone} />
      <main id="main">{children}</main>
      <Footer settings={settings} home={home} />
    </>
  );
}
