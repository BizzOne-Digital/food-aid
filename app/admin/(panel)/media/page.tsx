import { AdminHeader } from "@/components/admin/AdminHeader";
import { MediaLibrary } from "@/components/admin/MediaLibrary";

export const metadata = { title: "Media" };

export default function MediaPage() {
  return (
    <>
      <AdminHeader title="Media Library" description="Images stored in MongoDB. They persist across deployments." />
      <MediaLibrary />
    </>
  );
}
