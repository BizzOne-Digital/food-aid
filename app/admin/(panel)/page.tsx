import Link from "next/link";
import { AlertCircle, ArrowRight, CalendarCheck, FileText, Footprints, ImageIcon, MessageSquare, Plus, Quote, Sparkles, Upload } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatusBadge } from "@/components/admin/fields";
import { formatDate } from "@/lib/format";
import { Booking } from "@/models/Booking";
import { ContactMessage } from "@/models/ContactMessage";
import { Testimonial } from "@/models/Testimonial";
import { StoredUpload } from "@/models/StoredUpload";

export const metadata = { title: "Dashboard" };

async function load() {
  await connectDB();
  const [total, fresh, testimonials, messages, unread, uploads, recentBookings, recentMessages] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ status: "New" }),
    Testimonial.countDocuments(),
    ContactMessage.countDocuments(),
    ContactMessage.countDocuments({ isRead: false }),
    StoredUpload.countDocuments(),
    Booking.find().sort({ createdAt: -1 }).limit(6).select("name service preferredDate status createdAt").lean(),
    ContactMessage.find().sort({ createdAt: -1 }).limit(6).select("name subject isRead createdAt").lean(),
  ]);
  return { total, fresh, testimonials, messages, unread, uploads, recentBookings, recentMessages };
}

export default async function DashboardPage() {
  let d: Awaited<ReturnType<typeof load>>;
  try {
    d = await load();
  } catch (e) {
    return (
      <div className="rounded-2xl border border-brand/30 bg-brand-50 p-6 text-brand-dark">
        <p className="flex items-center gap-2 font-bold">
          <AlertCircle className="h-5 w-5" aria-hidden /> Database unavailable
        </p>
        <p className="mt-2 text-sm">{(e as Error).message}. Check MONGODB_URI and Atlas network access.</p>
      </div>
    );
  }

  const stats = [
    { label: "Total Bookings", value: d.total, Icon: CalendarCheck, href: "/admin/bookings" },
    { label: "New Bookings", value: d.fresh, Icon: Sparkles, href: "/admin/bookings?status=New", alert: d.fresh > 0 },
    { label: "Testimonials", value: d.testimonials, Icon: Quote, href: "/admin/testimonials" },
    { label: "Contact Messages", value: d.messages, Icon: MessageSquare, href: "/admin/messages", note: d.unread ? `${d.unread} unread` : undefined },
    { label: "Uploaded Images", value: d.uploads, Icon: ImageIcon, href: "/admin/media" },
  ];
  const actions = [
    { label: "Add Testimonial", href: "/admin/testimonials?new=1", Icon: Plus },
    { label: "Edit Services", href: "/admin/services", Icon: Footprints },
    { label: "Upload Image", href: "/admin/media", Icon: Upload },
    { label: "Update Homepage", href: "/admin/pages", Icon: FileText },
  ];

  return (
    <>
      <AdminHeader title="Dashboard" description="Overview of bookings, messages and website content." />

      {d.fresh > 0 && (
        <Link href="/admin/bookings?status=New" className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-brand/25 bg-brand-50 px-5 py-4 text-sm text-brand-dark hover:bg-brand-50/70">
          <span className="flex items-center gap-2 font-semibold">
            <AlertCircle className="h-5 w-5" aria-hidden /> {d.fresh} new booking request{d.fresh > 1 ? "s" : ""} waiting for a response.
          </span>
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )}

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map(({ label, value, Icon, href, alert, note }) => (
          <li key={label}>
            <Link href={href} className={`block rounded-2xl border bg-white p-5 shadow-card transition hover:-translate-y-0.5 ${alert ? "border-brand/40" : "border-line"}`}>
              <span className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted">{label}</span>
                <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${alert ? "bg-brand text-white" : "bg-brand-50 text-brand"}`}>
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                </span>
              </span>
              <span className="mt-3 block text-3xl font-extrabold text-ink">{value}</span>
              {note && <span className="text-xs font-semibold text-brand">{note}</span>}
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted">Quick Actions</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map(({ label, href, Icon }) => (
            <li key={label}>
              <Link href={href} className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3.5 text-sm font-semibold text-ink shadow-card transition hover:border-brand hover:text-brand">
                <Icon className="h-5 w-5 text-brand" aria-hidden /> {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-line bg-white shadow-card">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-bold text-ink">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-sm font-semibold text-brand hover:underline">
              View all
            </Link>
          </div>
          {d.recentBookings.length === 0 ? (
            <p className="p-5 text-sm text-muted">No bookings yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Client</th>
                    <th className="px-5 py-3 font-semibold">Service</th>
                    <th className="px-5 py-3 font-semibold">Preferred</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {d.recentBookings.map((b) => (
                    <tr key={String(b._id)} className="border-t border-line">
                      <td className="px-5 py-3 font-semibold text-ink">{b.name}</td>
                      <td className="px-5 py-3 text-ink/80">{b.service}</td>
                      <td className="px-5 py-3 text-ink/80">{b.preferredDate}</td>
                      <td className="px-5 py-3">
                        <StatusBadge status={b.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-line bg-white shadow-card">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-bold text-ink">Recent Contact Messages</h2>
            <Link href="/admin/messages" className="text-sm font-semibold text-brand hover:underline">
              View all
            </Link>
          </div>
          {d.recentMessages.length === 0 ? (
            <p className="p-5 text-sm text-muted">No messages yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th className="px-5 py-3 font-semibold">From</th>
                    <th className="px-5 py-3 font-semibold">Subject</th>
                    <th className="px-5 py-3 font-semibold">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {d.recentMessages.map((m) => (
                    <tr key={String(m._id)} className="border-t border-line">
                      <td className="px-5 py-3 font-semibold text-ink">
                        {!m.isRead && <span className="mr-2 inline-block h-2 w-2 rounded-full bg-brand" aria-label="Unread" />}
                        {m.name}
                      </td>
                      <td className="px-5 py-3 text-ink/80">{m.subject}</td>
                      <td className="px-5 py-3 text-ink/80">{formatDate(m.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
