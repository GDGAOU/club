"use client"

import { Blog } from "@prisma/client"
import { format } from "date-fns"
import { Edit2, Trash, Clock, BookOpen, GraduationCap } from "lucide-react"
import { useRouter } from "next/navigation"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface BlogCardProps {
  blog: Blog
}

const categoryColors = {
  ACADEMIC: "bg-blue-100 text-blue-800",
  RESEARCH: "bg-purple-100 text-purple-800",
  CAMPUS_LIFE: "bg-green-100 text-green-800",
  GENERAL: "bg-gray-100 text-gray-800",
} as const

export function BlogCard({ blog }: BlogCardProps) {
  const router = useRouter()

  return (
    <Card className="flex flex-col justify-between">
      <div>
        <CardHeader>
          {blog.image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.image}
                alt={blog.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  // Hide the image container if the image fails to load
                  (e.target as HTMLElement).parentElement!.style.display = 'none'
                }}
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={categoryColors[blog.category]}>
              {blog.category.replace("_", " ")}
            </Badge>
            {!blog.isApproved && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Pending Approval
              </Badge>
            )}
          </div>
          <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
          <CardDescription className="flex flex-col space-y-1">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {format(new Date(blog.createdAt), "PPP")}
            </span>
            {blog.course && (
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {blog.course}
              </span>
            )}
            {blog.faculty && (
              <span className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                {blog.faculty}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {blog.summary || blog.content}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          {blog.semester && (
            <p className="mt-2 text-sm text-muted-foreground">
              Semester: {blog.semester}
            </p>
          )}
        </CardContent>
      </div>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/dashboard/blogs/${blog.id}/edit`)}
        >
          <Edit2 className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            // TODO: Add delete functionality
          }}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
