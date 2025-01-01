import { Metadata } from "next";
import { CommunityDashboard } from "@/components/dashboard/community";

export const metadata: Metadata = {
  title: "Community Dashboard | GDG Aou",
  description: "Connect with the GDG Aou community",
};

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CommunityDashboard />
    </div>
  );
}
