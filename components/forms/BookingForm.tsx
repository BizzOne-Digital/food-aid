"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { toast } from "sonner";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { bookingSchema, SERVICE_OPTIONS } from "@/lib/validations";
import { Field, fieldA11y, applyServerErrors } from "./Field";

type In = z.input<typeof bookingSchema>;
type Out = z.output<typeof bookingSchema>;

function today() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

const TIMES = ["Morning (9am - 12pm)", "Afternoon (12pm - 3pm)", "Late Afternoon (3pm - 6pm)", "Flexible"];

export function BookingForm({ defaultService }: { defaultService?: string }) {
  const [done, setDone] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const initialService = (SERVICE_OPTIONS as readonly string[]).includes(defaultService ?? "")
    ? (defaultService as In["service"])
    : undefined;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<In, unknown, Out>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: { service: initialService, city: "Calgary" },
  });

  const onSubmit = async (values: Out) => {
    setServerError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        applyServerErrors(data.fieldErrors, setError as never);
        throw new Error(data.error || "We could not submit your request. Please try again.");
      }
      setDone(values.name.split(" ")[0]);
      reset();
      toast.success("Appointment request sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      const msg = (e as Error).message;
      setServerError(msg);
      toast.error(msg);
    }
  };

  if (done) {
    return (
      <div className="card p-8 text-center sm:p-12" role="status">
        <CircleCheck className="mx-auto h-14 w-14 text-brand" aria-hidden />
        <h2 className="mt-5 text-2xl font-extrabold text-ink">Thank you, {done}!</h2>
        <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-muted">
          Your appointment request has been received. We will contact you shortly to confirm your visit date and time.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" className="btn-outline" onClick={() => setDone(null)}>
            Book Another Appointment
          </button>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card p-6 sm:p-9" aria-describedby="booking-required">
      <p id="booking-required" className="mb-6 text-sm text-muted">
        Fields marked <span className="text-brand">*</span> are required.
      </p>

      <fieldset disabled={isSubmitting} className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Your details</legend>
        <Field id="name" label="Full Name" required error={errors.name?.message} className="sm:col-span-2">
          <input {...register("name")} {...fieldA11y("name", errors.name?.message)} autoComplete="name" className="field" />
        </Field>
        <Field id="email" label="Email" required error={errors.email?.message}>
          <input {...register("email")} {...fieldA11y("email", errors.email?.message)} type="email" autoComplete="email" className="field" />
        </Field>
        <Field id="phone" label="Phone" required error={errors.phone?.message}>
          <input {...register("phone")} {...fieldA11y("phone", errors.phone?.message)} type="tel" autoComplete="tel" className="field" />
        </Field>
        <Field id="preferredDate" label="Preferred Date" required error={errors.preferredDate?.message}>
          <input {...register("preferredDate")} {...fieldA11y("preferredDate", errors.preferredDate?.message)} type="date" min={today()} className="field" />
        </Field>
        <Field id="preferredTime" label="Preferred Time" required error={errors.preferredTime?.message}>
          <select {...register("preferredTime")} {...fieldA11y("preferredTime", errors.preferredTime?.message)} className="field" defaultValue="">
            <option value="" disabled>
              Select a time
            </option>
            {TIMES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field id="service" label="Service" required error={errors.service?.message} className="sm:col-span-2">
          <select {...register("service")} {...fieldA11y("service", errors.service?.message)} className="field" defaultValue={initialService ?? ""}>
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field id="address" label="Address" required error={errors.address?.message} className="sm:col-span-2">
          <input {...register("address")} {...fieldA11y("address", errors.address?.message)} autoComplete="street-address" className="field" />
        </Field>
        <Field id="city" label="City" required error={errors.city?.message}>
          <input {...register("city")} {...fieldA11y("city", errors.city?.message)} autoComplete="address-level2" className="field" />
        </Field>
        <Field id="postalCode" label="Postal Code" required error={errors.postalCode?.message}>
          <input {...register("postalCode")} {...fieldA11y("postalCode", errors.postalCode?.message)} autoComplete="postal-code" placeholder="T2P 1J9" className="field uppercase" />
        </Field>
        <Field id="mobilityNotes" label="Mobility Notes" hint="E.g. wheelchair user, needs help with stairs, uses a walker." className="sm:col-span-2" error={errors.mobilityNotes?.message}>
          <textarea {...register("mobilityNotes")} {...fieldA11y("mobilityNotes", errors.mobilityNotes?.message)} rows={3} className="field resize-y" />
        </Field>
        <Field id="notes" label="Additional Notes" className="sm:col-span-2" error={errors.notes?.message}>
          <textarea {...register("notes")} {...fieldA11y("notes", errors.notes?.message)} rows={3} className="field resize-y" />
        </Field>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-[15px] text-ink/85">
            <input
              type="checkbox"
              {...register("consent")}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-brand"
            />
            I agree to be contacted regarding this appointment.
          </label>
          {errors.consent && (
            <p id="consent-error" role="alert" className="field-error">
              {errors.consent.message}
            </p>
          )}
        </div>
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
            Request Appointment <Send className="h-4 w-4" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
