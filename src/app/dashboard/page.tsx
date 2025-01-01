import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardMain from "@/components/dashboard/dashboard-content";
import { redirect } from "next/navigation";

async function getData() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/login");
  }

  // Mock data for analytics (replace with real data later)
  const analytics = {
    totalViews: 1234,
    totalLikes: 567,
    totalPosts: 12,
    activeUsers: 89,
    upcomingEvents: 3,
    achievements: 5,
    comments: 234,
    shares: 89,
    engagement: 76,
    trending: 4,
    deviceStats: {
      desktop: 65,
      mobile: 35,
    },
    browserStats: {
      chrome: 55,
      firefox: 25,
      safari: 20,
    },
    weeklyGrowth: "+12%",
    monthlyGrowth: "+48%",
  };

  return {
    user,
    analytics,
  };
}

export default async function DashboardPage() {
  const data = await getData();

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <DashboardMain {...data} />
    </Suspense>
  );
}