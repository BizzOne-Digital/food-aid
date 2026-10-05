"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CalendarCheck,
  ExternalLink,
  FileText,
  Footprints,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Quote,
  Settings,
  X,
} from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";

const LINKS = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", Icon: CalendarCheck },
  { href: "/admin/messages", label: "Messages", Icon: MessageSquare },
  { href: "/admin/pages", label: "Pages", Icon: FileText },
  { href: "/admin/services", label: "Services", Icon: Footprints },
  { href: "/admin/testimonials", label: "Testimonials", Icon: Quote },
  { href: "/admin/media", label: "Media", Icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", Icon: Settings },
];

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  const logout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  const active = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  const nav = (
    <nav aria-label="Admin" className="flex flex-1 flex-col">
      <ul className="space-y-1">
        {LINKS.map(({ href, label, Icon }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={active(href) ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active(href) ? "bg-brand text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden /> {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto space-y-1 border-t border-white/10 pt-4">
        <Link href="/" target="_blank" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/75 hover:bg-white/10 hover:text-white">
          <ExternalLink className="h-[18px] w-[18px]" aria-hidden /> View Website
        </Link>
        <button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/75 hover:bg-white/10 hover:text-white">
          <LogOut className="h-[18px] w-[18px]" aria-hidden /> Log Out
        </button>
        <p className="truncate px-3 pt-2 text-xs text-white/45" title={email}>
          {email}
        </p>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between bg-ink px-4 text-white lg:hidden">
        <Link href="/admin" className="flex items-center gap-2 font-extrabold">
          <LogoMark className="h-8 w-8" /> Admin
        </Link>
        <button type="button" onClick={() => setOpen(true)} aria-label="Open admin menu" aria-expanded={open} className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10">
          <Menu className="h-6 w-6" aria-hidden />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div className={`absolute inset-0 bg-black/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(false)} />
        <aside className={`absolute inset-y-0 left-0 flex w-72 flex-col bg-ink p-5 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="mb-6 flex items-center justify-between">
            <span className="flex items-center gap-2 font-extrabold text-white">
              <LogoMark className="h-8 w-8" /> Foot Aid Admin
            </span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close admin menu" className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white hover:bg-white/10">
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          {nav}
        </aside>
      </div>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-ink p-5 lg:flex">
        <Link href="/admin" className="mb-8 flex items-center gap-2.5 px-1">
          <LogoMark className="h-9 w-9" />
          <span className="leading-none">
            <span className="block text-lg font-extrabold text-white">Foot Aid</span>
            <span className="block text-[10px] font-semibold tracking-[0.35em] text-white/60">ADMIN</span>
          </span>
        </Link>
        {nav}
      </aside>
    </>
  );
}
