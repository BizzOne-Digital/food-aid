import type { Metadata } from "next";
import { LogoMark } from "@/components/ui/Logo";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Admin Login", robots: { index: false, follow: false } };

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const safeNext = next && next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";
  return (
    <main className="grid min-h-screen bg-soft lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-[linear-gradient(135deg,#111_0%,#1a0204_50%,#e50914_130%)] lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex items-center gap-3 text-white">
          <LogoMark className="h-11 w-11" />
          <span className="text-2xl font-extrabold">Foot Aid</span>
        </div>
        <div className="text-white">
          <p className="text-4xl font-extrabold leading-tight">
            Manage bookings,
            <br />
            content and clients..
          </p>
          <p className="mt-4 max-w-sm text-white/75">Secure admin area. Authorized staff only.</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <LogoMark />
            <span className="text-xl font-extrabold">Foot Aid</span>
          </div>
          <h1 className="text-3xl font-extrabold text-ink">Admin Login</h1>
          <p className="mt-2 text-muted">Sign in to manage your website.</p>
          <LoginForm next={safeNext} />
        </div>
      </div>
    </main>
  );
}
