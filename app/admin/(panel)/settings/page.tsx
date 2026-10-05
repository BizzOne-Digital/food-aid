import { AdminHeader } from "@/components/admin/AdminHeader";
import { SettingsEditor } from "@/components/admin/SettingsEditor";

export const metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <>
      <AdminHeader title="Site Settings" description="Business details, branding, offer and SEO defaults." />
      <SettingsEditor />
    </>
  );
}
