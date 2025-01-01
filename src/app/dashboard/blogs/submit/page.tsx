import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { SubmitBlogForm } from "@/components/dashboard/blogs/submit-blog"

export const metadata: Metadata = {
  title: "Submit Blog | Dashboard",
  description: "Create a new blog post",
}

export default async function SubmitBlogPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth")
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create Blog</h2>
        <p className="text-muted-foreground">
          Share your thoughts and experiences with the community
        </p>
      </div>
      <div className="grid gap-4">
        <SubmitBlogForm />
      </div>
    </div>
  )
}
