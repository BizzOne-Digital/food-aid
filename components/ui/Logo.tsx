import Image from "next/image";
import Link from "next/link";
import { resolveImageUrl } from "@/lib/image";

/** Footprint mark: five toe dots over an open red foot outline (used for favicon-size spots). */
export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <g fill="#e04040">
        <circle cx="10" cy="10" r="5.2" />
        <circle cx="20.5" cy="6.2" r="3.9" />
        <circle cx="29" cy="6.4" r="3.1" />
        <circle cx="35.6" cy="9.4" r="2.5" />
        <circle cx="40.2" cy="14" r="2" />
      </g>
      <path
        d="M17 19c3.6-1.2 8.6 0 9.4 4.4.9 4.8-3.6 6.7-3.6 11 0 3.4 2.6 6.6 6.6 6.6 6 0 9.6-6 9.6-15.5 0-3.8-.4-7-.9-9.2"
        fill="none"
        stroke="#e04040"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Stacked "Foot / Aid" wordmark with the foot outline on the right, matching the client's logo.
 * Drawn as SVG so it stays sharp at any size. An uploaded logo (Admin > Settings) overrides it.
 */
export function FootAidWordmark({ className = "h-14 w-auto", light = false }: { className?: string; light?: boolean }) {
  return (
    <svg viewBox="0 0 168 110" className={className} role="img" aria-label="Foot Aid">
      <g fill="#e04040">
        <circle cx="106" cy="16" r="10.5" />
        <circle cx="124" cy="8.5" r="8" />
        <circle cx="139" cy="8" r="6.4" />
        <circle cx="151" cy="13.5" r="5" />
        <circle cx="159" cy="21.5" r="4" />
      </g>
      <path
        d="M110 31c8-2 15 3 15 12 0 11-8 15-8 28 0 10 5 30 18 30 13 0 22-24 22-50 0-9-1-18-2-24"
        fill="none"
        stroke="#e04040"
        strokeWidth="4.4"
        strokeLinecap="round"
      />
      <text x="0" y="60" fontFamily="var(--font-jakarta), Arial, sans-serif" fontWeight="800" fontSize="46" fill={light ? "#fff" : "#2b1416"} letterSpacing="-1">
        Foot
      </text>
      <text x="0" y="104" fontFamily="var(--font-jakarta), Arial, sans-serif" fontWeight="800" fontSize="46" fill="#e04040" letterSpacing="-1">
        Aid
      </text>
    </svg>
  );
}

export function Logo({ logoUrl, name = "Foot Aid", light = false }: { logoUrl?: string; name?: string; light?: boolean }) {
  const size = light ? "h-16" : "h-[52px] sm:h-[58px]";
  return (
    <Link href="/" className="inline-flex items-center" aria-label={`${name} home`}>
      {logoUrl ? (
        <Image src={resolveImageUrl(logoUrl)} alt={name} width={453} height={400} priority className={`w-auto object-contain ${size}`} />
      ) : (
        <FootAidWordmark className={`w-auto ${size}`} light={light} />
      )}
    </Link>
  );
}
