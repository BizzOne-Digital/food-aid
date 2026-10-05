import {
  CircleDot,
  ClipboardCheck,
  Footprints,
  Heart,
  House,
  Layers,
  MapPin,
  Scissors,
  ShieldCheck,
  Stethoscope,
  Users,
  HandHeart,
  Accessibility,
  type LucideProps,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

/** Nurse with cap: custom outline icon matching the Lucide stroke style. */
export function NurseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7.5 7.2V4.6L12 3l4.5 1.6v2.6" />
      <path d="M11 5.2h2M12 4.2v2" />
      <path d="M7.5 7.2h9v1.3a4.5 4.5 0 0 1-9 0z" />
      <path d="M4 21v-1.5A5.5 5.5 0 0 1 9.5 14h5a5.5 5.5 0 0 1 5.5 5.5V21" />
      <path d="m9.5 14 2.5 3 2.5-3" />
    </svg>
  );
}

/** Foot outline used for the "Free Foot Assessment" highlight. */
export function FootIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 7.5c2.6 0 4 1.7 4 4.3 0 2.1-1.4 3.2-1.4 5.1 0 1.4.9 2 .9 3.1 0 1.2-1 2-2.4 2-2.3 0-3.6-2.4-3.6-6.2 0-1.8.5-3 .5-4.6C7 9.3 7.5 7.5 9 7.5z" />
      <circle cx="9.4" cy="3.6" r="1.4" />
      <circle cx="12.6" cy="4.6" r="1.1" />
      <circle cx="14.8" cy="6.6" r=".9" />
      <circle cx="16.2" cy="9" r=".75" />
      <circle cx="16.8" cy="11.4" r=".65" />
    </svg>
  );
}

type IconCmp = ComponentType<LucideProps> | ComponentType<SVGProps<SVGSVGElement>>;

export const ICONS: Record<string, IconCmp> = {
  Home: House,
  House,
  Nurse: NurseIcon,
  Foot: FootIcon,
  Heart,
  MapPin,
  ClipboardCheck,
  Scissors,
  Layers,
  CircleDot,
  Footprints,
  ShieldCheck,
  Stethoscope,
  Users,
  HandHeart,
  Accessibility,
};

export const ICON_NAMES = Object.keys(ICONS);

export function Icon({ name, className, strokeWidth = 1.75 }: { name: string; className?: string; strokeWidth?: number }) {
  const Cmp = (ICONS[name] ?? Footprints) as ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden />;
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21z" />
    </svg>
  );
}
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
    </svg>
  );
}
export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.9 8.8H3.8V20h3.1zM5.3 3.8a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM20.2 13.6c0-3-1.6-4.9-4.2-4.9-1.4 0-2.4.8-2.8 1.5V8.8h-3V20h3.1v-5.6c0-1.5.6-2.6 2-2.6s1.8 1.1 1.8 2.6V20h3.1z" />
    </svg>
  );
}
