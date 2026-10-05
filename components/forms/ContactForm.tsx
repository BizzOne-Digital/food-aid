"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { toast } from "sonner";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { contactSchema } from "@/lib/validations";
import { Field, fieldA11y, applyServerErrors } from "./Field";

type In = z.input<typeof contactSchema>;
type Out = z.output<typeof contactSchema>;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<In, unknown, Out>({ resolver: zodResolver(contactSchema), mode: "onTouched" });

  const onSubmit = async (values: Out) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        applyServerErrors(data.fieldErrors, setError as never);
        throw new Error(data.error || "We could not send your message. Please try again.");
      }
      reset();
      setSent(true);
      toast.success("Message sent. We will be in touch soon.");
    } catch (e) {
      const msg = (e as Error).message;
      setServerError(msg);
      toast.error(msg);
    }
  };

  if (sent) {
    return (
      <div className="card p-8 text-center sm:p-12" role="status">
        <CircleCheck className="mx-auto h-14 w-14 text-brand" aria-hidden />
        <h2 className="mt-5 text-2xl font-extrabold text-ink">Message received</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">Thank you for reaching out. We usually reply within one business day.</p>
        <button type="button" onClick={() => setSent(false)} className="btn-outline mt-7">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card p-6 sm:p-9">
      <fieldset disabled={isSubmitting} className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Contact form</legend>
        <Field id="c-name" label="Name" required error={errors.name?.message}>
          <input {...register("name")} {...fieldA11y("c-name", errors.name?.message)} autoComplete="name" className="field" />
        </Field>
        <Field id="c-email" label="Email" required error={errors.email?.message}>
          <input {...register("email")} {...fieldA11y("c-email", errors.email?.message)} type="email" autoComplete="email" className="field" />
        </Field>
        <Field id="c-phone" label="Phone" error={errors.phone?.message}>
          <input {...register("phone")} {...fieldA11y("c-phone", errors.phone?.message)} type="tel" autoComplete="tel" className="field" />
        </Field>
        <Field id="c-subject" label="Subject" required error={errors.subject?.message}>
          <input {...register("subject")} {...fieldA11y("c-subject", errors.subject?.message)} className="field" />
        </Field>
        <Field id="c-message" label="Message" required error={errors.message?.message} className="sm:col-span-2">
          <textarea {...register("message")} {...fieldA11y("c-message", errors.message?.message)} rows={6} className="field resize-y" />
        </Field>
      </fieldset>
      {serverError && (
        <p role="alert" className="mt-6 rounded-lg border border-brand/30 bg-brand-50 px-4 py-3 text-sm text-brand-dark">
          {serverError}
        </p>
      )}
      <button type="submit" disabled={isSubmitting} className="btn-primary mt-7 w-full py-4 text-base sm:w-auto sm:px-10">
        {isSubmitting ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden /> Sending...
          </>
        ) : (
          <>
            Send Message <Send className="h-4 w-4" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
