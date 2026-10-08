import Image from "next/image";
import Link from "next/link";
import { resolveImageUrl } from "@/lib/image";

/** Footprint mark: five toe dots over an open red foot outline. Replaceable from Admin > Settings. */
export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <g fill="#e50914">
        <circle cx="10" cy="10" r="5.2" />
        <circle cx="20.5" cy="6.2" r="3.9" />
        <circle cx="29" cy="6.4" r="3.1" />
        <circle cx="35.6" cy="9.4" r="2.5" />
        <circle cx="40.2" cy="14" r="2" />
      </g>
      <path
        d="M17 19c3.6-1.2 8.6 0 9.4 4.4.9 4.8-3.6 6.7-3.6 11 0 3.4 2.6 6.6 6.6 6.6 6 0 9.6-6 9.6-15.5 0-3.8-.4-7-.9-9.2"
        fill="none"
        stroke="#e50914"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ logoUrl, name = "Foot Aid", light = false }: { logoUrl?: string; name?: string; light?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label={`${name} home`}>
      {logoUrl ? (
        <Image
          src={resolveImageUrl(logoUrl)}
          alt={name}
          width={453}
          height={400}
          priority
          className={`w-auto object-contain ${light ? "h-16" : "h-14 sm:h-[60px]"}`}
        />
      ) : (
        <>
          <LogoMark />
          <span className="flex flex-col leading-none">
            <span className="text-[26px] font-extrabold tracking-tight">
              <span className={light ? "text-white" : "text-[#2b1a1a]"}>Foot</span> <span className="text-brand">Aid</span>
            </span>
            <span className={`mt-1 pl-0.5 text-[9px] font-semibold tracking-[0.3em] ${light ? "text-white/80" : "text-muted"}`}>
              MOBILE FOOT CARE
            </span>
          </span>
        </>
      )}
    </Link>
  );
}
