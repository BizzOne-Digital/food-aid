import { AdminHeader } from "@/components/admin/AdminHeader";
import { ServicesManager } from "@/components/admin/ServicesManager";

export const metadata = { title: "Services" };

export default function ServicesAdminPage() {
  return (
    <>
      <AdminHeader title="Services" description="Manage the services shown on the homepage and services page." />
      <ServicesManager />
    </>
  );
}
