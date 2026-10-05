import { Star } from "lucide-react";

export function Stars({ rating = 5, className = "h-4 w-4" }: { rating?: number; className?: string }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={`${className} ${i < rating ? "fill-brand text-brand" : "fill-transparent text-[#d4d4d4]"}`}
        />
      ))}
    </div>
  );
}

export function Initials({ name, className = "h-11 w-11 text-sm" }: { name: string; className?: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  return (
    <span aria-hidden className={`inline-flex shrink-0 items-center justify-center rounded-full bg-brand-50 font-bold text-brand ring-1 ring-brand/15 ${className}`}>
      {initials}
    </span>
  );
}
