import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Thin red announcement bar above the header. Controlled by Admin > Settings > Offer. */
export function OfferBar({ text }: { text: string }) {
  return (
    <div className="bg-brand text-white">
      <div className="container-x flex items-center justify-center gap-3 py-2 text-center text-[12.5px] font-semibold sm:text-sm">
        <span>{text}</span>
        <Link href="/booking" className="hidden shrink-0 items-center gap-1 underline underline-offset-4 hover:no-underline sm:inline-flex">
          Book now <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
