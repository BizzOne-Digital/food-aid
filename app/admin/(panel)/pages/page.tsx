import { AdminHeader } from "@/components/admin/AdminHeader";
import { PagesEditor } from "@/components/admin/PagesEditor";

export const metadata = { title: "Pages" };

export default function PagesAdminPage() {
  return (
    <>
      <AdminHeader title="Page Content" description="Edit text and images on the Home and About pages. Changes go live when you save." />
      <PagesEditor />
    </>
  );
}
