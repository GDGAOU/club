import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const blogSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  summary: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  course: z.string().optional().nullable(),
  faculty: z.string().optional().nullable(),
  semester: z.string().optional().nullable(),
  category: z.enum(["ACADEMIC", "RESEARCH", "CAMPUS_LIFE", "GENERAL"]),
  tags: z.string().optional().transform(val => 
    val ? val.split(",").map(tag => tag.trim()).filter(Boolean) : []
  ),
  status: z.enum(["draft", "pending", "published"]).default("draft"),
  publishDate: z.string().optional().nullable().transform(val => 
    val ? new Date(val) : null
  ),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const json = await req.json()
    const body = blogSchema.parse(json)

    // Set status to pending if user is trying to publish
    const status = body.status === "published" ? "pending" : body.status

    try {
      const blog = await db.blog.create({
        data: {
          title: body.title,
          content: body.content,
          summary: body.summary || null,
          image: body.image || null,
          course: body.course || null,
          faculty: body.faculty || null,
          semester: body.semester || null,
          category: body.category,
          tags: body.tags,
          status: status,
          publishedAt: body.publishDate,
          userId: session.user.id,
        },
      })
      return NextResponse.json(blog)
    } catch (err) {
      console.error('Error creating blog:', err)
      return new NextResponse('Failed to create blog', { status: 500 })
    }
  } catch (error) {
    console.error("Blog creation error:", error)
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 422 })
    }

    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    
    try {
      const blogs = await db.blog.findMany({
        where: {
          userId: session.user.id,
          ...(status && { status }),
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      return NextResponse.json(blogs)
    } catch (err) {
      console.error('Error fetching blogs:', err)
      return new NextResponse('Failed to fetch blogs', { status: 500 })
    }
  } catch (error) {
    console.error("Blog fetch error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const json = await req.json()
    const { id, ...updateData } = json

    if (!id) {
      return new NextResponse("Blog ID is required", { status: 400 })
    }

    // Verify blog ownership
    try {
      const blog = await db.blog.findUnique({
        where: { id, userId: session.user.id },
      })

      if (!blog) {
        return new NextResponse("Blog not found", { status: 404 })
      }

      const body = blogSchema.parse(updateData)

      // Set status to pending if user is trying to publish
      const status = body.status === "published" ? "pending" : body.status

      try {
        const updatedBlog = await db.blog.update({
          where: { id },
          data: {
            title: body.title,
            content: body.content,
            summary: body.summary || null,
            image: body.image || null,
            course: body.course || null,
            faculty: body.faculty || null,
            semester: body.semester || null,
            category: body.category,
            tags: body.tags,
            status: status,
            publishedAt: body.publishDate,
          },
        })
        return NextResponse.json(updatedBlog)
      } catch (err) {
        console.error('Error updating blog:', err)
        return new NextResponse('Failed to update blog', { status: 500 })
      }
    } catch (err) {
      console.error('Error verifying blog ownership:', err)
      return new NextResponse('Failed to verify blog ownership', { status: 500 })
    }
  } catch (error) {
    console.error("Blog update error:", error)
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 422 })
    }

    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return new NextResponse("Blog ID is required", { status: 400 })
    }

    // Verify blog ownership
    try {
      const blog = await db.blog.findUnique({
        where: { id, userId: session.user.id },
      })

      if (!blog) {
        return new NextResponse("Blog not found", { status: 404 })
      }

      try {
        await db.blog.delete({
          where: { id },
        })
        return new NextResponse(null, { status: 204 })
      } catch (err) {
        console.error('Error deleting blog:', err)
        return new NextResponse('Failed to delete blog', { status: 500 })
      }
    } catch (err) {
      console.error('Error verifying blog ownership:', err)
      return new NextResponse('Failed to verify blog ownership', { status: 500 })
    }
  } catch (error) {
    console.error("Blog deletion error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
