"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Eye, EyeOff, LoaderCircle, Lock } from "lucide-react";
import { loginSchema } from "@/lib/validations";
import { Field, fieldA11y } from "@/components/forms/Field";

type V = z.infer<typeof loginSchema>;

export function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<V>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (v: V) => {
    setError(null);
    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(v),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    if (!res?.ok) return setError(data.error || "Login failed. Please try again.");
    router.replace(next);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-5">
      <Field id="email" label="Email" error={errors.email?.message}>
        <input {...register("email")} {...fieldA11y("email", errors.email?.message)} type="email" autoComplete="username" className="field" />
      </Field>
      <Field id="password" label="Password" error={errors.password?.message}>
        <div className="relative">
          <input
            {...register("password")}
            {...fieldA11y("password", errors.password?.message)}
            type={show ? "text" : "password"}
            autoComplete="current-password"
            className="field pr-12"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-muted hover:text-ink"
          >
            {show ? <EyeOff className="h-5 w-5" aria-hidden /> : <Eye className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </Field>
      {error && (
        <p role="alert" className="rounded-lg border border-brand/30 bg-brand-50 px-4 py-3 text-sm text-brand-dark">
          {error}
        </p>
      )}
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3.5 text-base">
        {isSubmitting ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden /> : <Lock className="h-4 w-4" aria-hidden />}
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
