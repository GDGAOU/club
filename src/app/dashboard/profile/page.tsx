import { auth } from "@clerk/nextjs";
import { ProfileForm } from "@/components/dashboard/profile/profile-form";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function ProfilePage() {
  const { userId } = auth();

  if (!userId) {
    return notFound();
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ProfileForm user={user} />
    </div>
  );
}
