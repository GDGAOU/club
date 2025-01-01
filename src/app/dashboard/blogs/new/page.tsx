"use client"

import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { SubmitBlogForm } from "@/components/dashboard/blogs/submit-blog"

export default async function NewBlogPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create New Blog</h1>
        <p className="text-muted-foreground">
          Create a new blog post to share with the community.
        </p>
      </div>
      <SubmitBlogForm />
    </div>
  )
}
