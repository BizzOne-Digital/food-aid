import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-soft px-4">
      <div className="text-center">
        <LogoMark className="mx-auto h-16 w-16" />
        <p className="eyebrow mt-6">Error 404</p>
        <h1 className="mt-3 text-4xl font-extrabold text-ink">Page not found</h1>
        <p className="mt-3 text-muted">The page you are looking for does not exist or has moved.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-outline">
            Back to Home
          </Link>
          <Link href="/booking" className="btn-primary">
            Book an Appointment <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </main>
  );
}
