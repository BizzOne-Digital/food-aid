import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { resolveImageUrl } from "@/lib/image";
import type { ServiceData } from "@/lib/defaults";

export function ServiceCard({ s }: { s: ServiceData }) {
  return (
    <Link
      href={`/services#${s.slug}`}
      className="group flex h-full flex-col rounded-2xl bg-white p-1.5 shadow-card ring-1 ring-black/[0.03] transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        <Image
          src={resolveImageUrl(s.imageUrl)}
          alt=""
          fill
          sizes="(min-width:1200px) 190px, (min-width:768px) 33vw, (min-width:480px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col px-3 pb-4 pt-4">
        <Icon name={s.iconName} className="h-6 w-6 text-brand" strokeWidth={1.6} />
        <h3 className="mt-3 text-[15px] font-bold leading-snug text-ink">{s.title}</h3>
        <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{s.shortDescription}</p>
      </div>
    </Link>
  );
}
