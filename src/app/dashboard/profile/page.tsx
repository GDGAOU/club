"use client";

import { getServerSession } from "next-auth";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { authOptions } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container mx-auto py-10">
      <ProfileForm user={session?.user} />
    </div>
  );
}
