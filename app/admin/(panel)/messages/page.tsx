import { AdminHeader } from "@/components/admin/AdminHeader";
import { MessagesManager } from "@/components/admin/MessagesManager";

export const metadata = { title: "Messages" };

export default function MessagesPage() {
  return (
    <>
      <AdminHeader title="Contact Messages" description="Messages sent from the website contact form." />
      <MessagesManager />
    </>
  );
}
