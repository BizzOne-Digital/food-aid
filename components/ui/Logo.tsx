import Image from "next/image";
import Link from "next/link";
import { resolveImageUrl } from "@/lib/image";

/** Heart + footprint mark: placeholder until a final logo is uploaded in Admin > Settings. */
export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <g fill="#e50914">
        <circle cx="13" cy="7.5" r="2.6" />
        <circle cx="18.6" cy="5.2" r="2.2" />
        <circle cx="23.6" cy="5.6" r="1.8" />
        <circle cx="27.6" cy="7.6" r="1.5" />
      </g>
      <path
        d="M24 44S6 33.5 6 21.5C6 15.7 10.3 12 15 12c3.9 0 6.9 2.1 9 5.4C26.1 14.1 29.1 12 33 12c4.7 0 9 3.7 9 9.5C42 33.5 24 44 24 44z"
        fill="none"
        stroke="#e50914"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 19.5c2.4 0 3.6 1.6 3.6 3.9 0 1.9-1.3 2.9-1.3 4.6 0 1.3.8 1.8.8 2.8 0 1.1-.9 1.8-2.1 1.8-2.1 0-3.2-2.2-3.2-5.6 0-1.6.4-2.7.4-4.1 0-2 .7-3.4 1.8-3.4z"
        fill="#111"
      />
    </svg>
  );
}

export function Logo({ logoUrl, name = "Foot Aid Leyman", light = false }: { logoUrl?: string; name?: string; light?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label={`${name} home`}>
      {logoUrl ? (
        <Image src={resolveImageUrl(logoUrl)} alt={name} width={180} height={52} className="h-12 w-auto object-contain" />
      ) : (
        <>
          <LogoMark />
          <span className="flex flex-col leading-none">
            <span className={`text-[26px] font-extrabold tracking-tight ${light ? "text-white" : "text-ink"}`}>Foot Aid</span>
            <span className={`mt-1 pl-0.5 text-[10px] font-semibold tracking-[0.42em] ${light ? "text-white/80" : "text-ink"}`}>LEYMAN</span>
          </span>
        </>
      )}
    </Link>
  );
}
