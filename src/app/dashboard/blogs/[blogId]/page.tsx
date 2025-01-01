import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { SubmitBlogForm } from "@/components/dashboard/blogs/submit-blog"

interface EditBlogPageProps {
  params: {
    blogId: string
  }
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    notFound()
  }

  const blog = await db.blog.findFirst({
    where: {
      id: params.blogId,
      userId: session.user.id,
    },
  })

  if (!blog) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Blog</h1>
        <p className="text-muted-foreground">
          Make changes to your blog post here.
        </p>
      </div>
      <SubmitBlogForm
        initialData={{
          title: blog.title,
          content: blog.content,
          summary: blog.summary || "",
          image: blog.image || "",
          course: blog.course || "",
          faculty: blog.faculty || "",
          semester: blog.semester || "",
          category: blog.category,
          tags: blog.tags.join(", "),
          status: blog.status,
          publishDate: blog.publishedAt,
        }}
        isEditing={true}
      />
    </div>
  )
}
