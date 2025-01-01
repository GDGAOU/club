"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import {
  Calendar,
  Edit,
  MoreVertical,
  Trash,
  Eye,
  Clock,
  FileText,
  Send,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Blog {
  id: string
  title: string
  content: string
  summary?: string
  image?: string
  category: string
  tags: string[]
  status: "draft" | "published"
  publishedAt?: Date
  createdAt: Date
}

export function BlogsList() {
  const router = useRouter()
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const fetchBlogs = async (status?: string) => {
    try {
      const response = await fetch("/api/blogs" + (status ? `?status=${status}` : ""))
      if (!response.ok) throw new Error("Failed to fetch blogs")
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching blogs:", error)
      toast.error("Failed to fetch blogs")
    }
  }

  const handlePublish = async (id: string) => {
    try {
      const response = await fetch("/api/blogs", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status: "published",
        }),
      })

      if (!response.ok) throw new Error("Failed to publish blog")

      toast.success("Blog submitted for approval")

      fetchBlogs()
    } catch (error) {
      console.error("Error updating blog visibility:", error)
      toast.error("Failed to update blog visibility")
    }
  }

  const handleDelete = async () => {
    if (!selectedBlog) return

    try {
      const response = await fetch("/api/blogs?id=" + selectedBlog, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete blog")

      toast.success("Blog deleted successfully")

      setShowDeleteDialog(false)
      setSelectedBlog(null)
      fetchBlogs()
    } catch (error) {
      console.error("Error deleting blog:", error)
      toast.error("Failed to delete blog")
    }
  }

  const confirmDelete = (id: string) => {
    setSelectedBlog(id)
    setShowDeleteDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Your Blogs</h2>
        <Button onClick={() => router.push("/dashboard/blogs/new")}>
          Create New Blog
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" onClick={() => fetchBlogs()}>
            All Blogs
          </TabsTrigger>
          <TabsTrigger value="drafts" onClick={() => fetchBlogs("draft")}>
            Drafts
          </TabsTrigger>
          <TabsTrigger value="published" onClick={() => fetchBlogs("published")}>
            Published
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {fetchBlogs().then((blogs) => blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onPublish={handlePublish}
              onDelete={confirmDelete}
            />
          )))}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          {fetchBlogs("draft").then((blogs) => blogs.filter((blog) => blog.status === "draft").map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onPublish={handlePublish}
              onDelete={confirmDelete}
            />
          )))}
        </TabsContent>

        <TabsContent value="published" className="space-y-4">
          {fetchBlogs("published").then((blogs) => blogs.filter((blog) => blog.status === "published").map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onPublish={handlePublish}
              onDelete={confirmDelete}
            />
          )))}
        </TabsContent>
      </Tabs>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function BlogCard({
  blog,
  onPublish,
  onDelete,
}: {
  blog: Blog
  onPublish: (id: string) => void
  onDelete: (id: string) => void
}) {
  const router = useRouter()

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{blog.title}</CardTitle>
            <CardDescription>{blog.summary}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push("/dashboard/blogs/" + blog.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/blogs/" + blog.id)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              {blog.status === "draft" && (
                <DropdownMenuItem onClick={() => onPublish(blog.id)}>
                  <Send className="mr-2 h-4 w-4" />
                  Publish
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(blog.id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Badge variant={blog.status === "draft" ? "secondary" : "default"}>
            {blog.status === "draft" ? (
              <>
                <FileText className="mr-1 h-3 w-3" />
                Draft
              </>
            ) : (
              <>
                <Send className="mr-1 h-3 w-3" />
                Published
              </>
            )}
          </Badge>
          <Badge variant="outline">{blog.category}</Badge>
          {blog.publishedAt && (
            <Badge variant="outline">
              <Clock className="mr-1 h-3 w-3" />
              Scheduled
            </Badge>
          )}
        </div>
        {blog.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <div className="flex items-center">
          <Calendar className="mr-1 h-4 w-4" />
          Created {format(new Date(blog.createdAt), "PPP")}
          {blog.publishedAt && (
            <>
              <span className="mx-2">•</span>
              <Clock className="mr-1 h-4 w-4" />
              Scheduled for {format(new Date(blog.publishedAt), "PPP")}
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
