import Image from "next/image";
import { resolveImageUrl } from "@/lib/image";

/** Minimal internal-page hero: light gray band, eyebrow, bold heading, optional image on the right. */
export function PageHero({
  eyebrow,
  title,
  highlight,
  intro,
  image,
  imageAlt = "",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  intro?: string;
  image?: string;
  imageAlt?: string;
}) {
  const lines = title.split("\n");
  return (
    <section className="relative overflow-hidden bg-soft">
      <div className={`container-x grid items-center gap-10 py-14 sm:py-16 ${image ? "lg:grid-cols-[1.1fr_1fr] lg:py-20" : "lg:py-20"}`}>
        <div className="animate-fade-up">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-[34px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[54px]">
            {lines.map((line, i) => (
              <span key={i} className="block">
                {highlight && line.includes(highlight) ? (
                  <>
                    {line.split(highlight)[0]}
                    <span className="text-brand">{highlight}</span>
                    {line.split(highlight)[1]}
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>
          {intro && <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{intro}</p>}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card lg:aspect-[5/4]">
            <Image src={resolveImageUrl(image)} alt={imageAlt} fill priority sizes="(min-width:1024px) 520px, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
