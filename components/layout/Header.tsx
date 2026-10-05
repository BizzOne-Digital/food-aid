"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS, telHref } from "@/lib/site";

export function Header({ logoUrl, businessName, phone }: { logoUrl?: string; businessName: string; phone: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_20px_-8px_rgb(0_0_0/0.15)]" : ""
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <div className="container-x flex h-[72px] items-center justify-between gap-6 lg:h-[66px]">
        <Logo logoUrl={logoUrl} name={businessName} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`relative py-2 text-[13.5px] font-medium transition-colors hover:text-brand ${
                    isActive(l.href)
                      ? "text-brand after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-brand"
                      : "text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/booking" className="btn-primary hidden px-5 py-2.5 text-[13px] lg:inline-flex">
          Book an Appointment
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink hover:bg-soft lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-line bg-white transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[calc(100dvh-72px)] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-x py-4">
          <ul className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  tabIndex={open ? 0 : -1}
                  className={`flex items-center justify-between border-b border-line py-3.5 text-[17px] font-semibold ${
                    isActive(l.href) ? "text-brand" : "text-ink"
                  }`}
                >
                  {l.label}
                  <ArrowRight className="h-4 w-4 opacity-40" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid gap-3 pb-2">
            <Link href="/booking" tabIndex={open ? 0 : -1} className="btn-primary w-full py-3.5 text-base">
              Book an Appointment <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a href={telHref(phone)} tabIndex={open ? 0 : -1} className="btn-outline w-full py-3.5 text-base">
              <Phone className="h-4 w-4" aria-hidden /> Call {phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
