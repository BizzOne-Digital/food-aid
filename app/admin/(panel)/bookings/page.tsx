import { AdminHeader } from "@/components/admin/AdminHeader";
import { BookingsManager } from "@/components/admin/BookingsManager";

export const metadata = { title: "Bookings" };

export default async function BookingsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  return (
    <>
      <AdminHeader title="Bookings" description="Review appointment requests and update their status." />
      <BookingsManager initialStatus={status ?? ""} />
    </>
  );
}
