import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { BlogsList } from "@/components/dashboard/blogs/blogs-list"

export const metadata: Metadata = {
  title: "Blogs | Dashboard",
  description: "Manage your blogs",
}

export default async function BlogsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth")
  }

  const blogs = await db.blog.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Blogs</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your blogs
          </p>
        </div>
      </div>
      <BlogsList blogs={blogs} />
    </div>
  )
}
