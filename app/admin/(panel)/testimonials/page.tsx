import { AdminHeader } from "@/components/admin/AdminHeader";
import { TestimonialsManager } from "@/components/admin/TestimonialsManager";

export const metadata = { title: "Testimonials" };

export default async function TestimonialsAdminPage({ searchParams }: { searchParams: Promise<{ new?: string }> }) {
  const { new: openNew } = await searchParams;
  return (
    <>
      <AdminHeader title="Testimonials" description="Add, edit, publish or hide client reviews." />
      <TestimonialsManager openNew={openNew === "1"} />
    </>
  );
}
