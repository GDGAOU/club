import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="relative min-h-screen bg-black">
      <DashboardSidebar userRole={session.user.role} userName={session.user.name} />
      <main className="transition-all duration-300 ml-16 lg:ml-64">
        {children}
      </main>
    </div>
  );
}
