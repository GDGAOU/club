import { notFound } from "next/navigation"
import { format } from "date-fns"
import { getServerSession } from "next-auth"
import {
  CalendarDays,
  BookOpen,
  School,
  GraduationCap,
  Clock,
  Share2,
  MessageSquare,
  ThumbsUp,
  Edit2,
} from "lucide-react"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface BlogPageProps {
  params: {
    blogId: string
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const session = await getServerSession(authOptions)
  const blog = await db.blog.findFirst({
    where: {
      id: params.blogId,
      OR: [
        { status: "published" },
        { userId: session?.user?.id },
      ],
    },
    include: {
      user: true,
    },
  })

  if (!blog) {
    notFound()
  }

  const isAuthor = session?.user?.id === blog.userId

  return (
    <div className="container max-w-4xl py-6">
      <Card className="border-none shadow-none">
        {blog.image && (
          <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={blog.image}
              alt={blog.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <CardHeader className="space-y-4 px-0">
          <div className="space-y-2">
            <CardTitle className="text-4xl font-bold leading-tight">
              {blog.title}
            </CardTitle>
            {blog.summary && (
              <CardDescription className="text-lg">
                {blog.summary}
              </CardDescription>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" className="p-0 space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={blog.user.image || ""} />
                    <AvatarFallback>
                      {blog.user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {blog.user.name}
                  </span>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={blog.user.image || ""} />
                    <AvatarFallback>
                      {blog.user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{blog.user.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {blog.user.email}
                    </p>
                    <div className="flex items-center pt-2">
                      <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                      <span className="text-xs text-muted-foreground">
                        Joined {format(new Date(blog.user.createdAt), "MMMM yyyy")}
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="mr-1 h-4 w-4" />
              {format(new Date(blog.createdAt), "MMMM d, yyyy")}
            </div>
            {blog.publishedAt && (
              <>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  Published {format(new Date(blog.publishedAt), "MMMM d, yyyy")}
                </div>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline" className="flex items-center">
              <BookOpen className="mr-1 h-4 w-4" />
              {blog.category}
            </Badge>
            {blog.course && (
              <Badge variant="outline" className="flex items-center">
                <School className="mr-1 h-4 w-4" />
                {blog.course}
              </Badge>
            )}
            {blog.faculty && (
              <Badge variant="outline" className="flex items-center">
                <GraduationCap className="mr-1 h-4 w-4" />
                {blog.faculty}
              </Badge>
            )}
            {blog.semester && (
              <Badge variant="outline" className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {blog.semester}
              </Badge>
            )}
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="px-0">
          <div className="prose prose-stone mx-auto dark:prose-invert">
            {blog.content.split("\\n").map((paragraph, index) => (
              <p key={index} className="leading-7 [&:not(:first-child)]:mt-6">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center px-0 pt-6">
          <div className="flex space-x-4">
            <Button variant="outline" size="sm" className="space-x-2">
              <ThumbsUp className="h-4 w-4" />
              <span>Like</span>
            </Button>
            <Button variant="outline" size="sm" className="space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Comment</span>
            </Button>
            <Button variant="outline" size="sm" className="space-x-2">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
          {isAuthor && (
            <Button
              variant="outline"
              size="sm"
              className="space-x-2"
              asChild
            >
              <Link href={`/dashboard/blogs/${blog.id}`}>
                <Edit2 className="h-4 w-4" />
                <span>Edit Blog</span>
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
