"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ImageIcon, Calendar } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

const blogCategories = [
  { value: "ACADEMIC", label: "Academic" },
  { value: "RESEARCH", label: "Research" },
  { value: "CAMPUS_LIFE", label: "Campus Life" },
  { value: "GENERAL", label: "General" },
] as const

const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  summary: z.string().optional(),
  image: z.string().optional(),
  course: z.string().optional(),
  faculty: z.string().optional(),
  semester: z.string().optional(),
  category: z.enum(["ACADEMIC", "RESEARCH", "CAMPUS_LIFE", "GENERAL"]),
  tags: z.string().optional(),
  status: z.enum(["draft", "published"]),
  publishDate: z.date().optional(),
})

type BlogFormValues = z.infer<typeof blogFormSchema>

interface BlogFormProps {
  initialData?: BlogFormValues & { id?: string }
  isEditing?: boolean
}

export function SubmitBlogForm({ initialData, isEditing = false }: BlogFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [date, setDate] = useState<Date | undefined>(initialData?.publishDate)

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      summary: initialData?.summary || "",
      image: initialData?.image || "",
      course: initialData?.course || "",
      faculty: initialData?.faculty || "",
      semester: initialData?.semester || "",
      category: initialData?.category || "GENERAL",
      tags: initialData?.tags || "",
      status: initialData?.status || "draft",
      publishDate: initialData?.publishDate,
    },
  })

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (!file.type.includes("image")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive",
        })
        return
      }

      try {
        // Here you would typically upload the image to your storage
        // For now, we'll just use a placeholder URL
        form.setValue("image", URL.createObjectURL(file))
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload image. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  async function onSubmit(data: BlogFormValues) {
    try {
      setIsLoading(true)
      
      // Format the data to match API expectations
      const formattedData = {
        ...data,
        publishDate: date ? date.toISOString() : null,
      }

      const response = await fetch(
        isEditing ? `/api/blogs/${initialData?.id}` : "/api/blogs", 
        {
          method: isEditing ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to submit blog")
      }

      toast({
        title: "Success",
        description: isEditing 
          ? "Blog updated successfully"
          : data.status === "draft" 
            ? "Blog saved as draft"
            : "Blog submitted for approval",
      })

      router.push("/dashboard/blogs")
      router.refresh()
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast.error("Failed to submit blog");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter blog title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief summary of your blog post"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A short description that will appear in blog previews
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your blog content here"
                  className="min-h-[300px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-4 hover:bg-accent/50 cursor-pointer transition-colors",
                    dragActive && "border-primary bg-accent",
                    field.value && "border-solid"
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("imageInput")?.click()}
                >
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        form.setValue("image", URL.createObjectURL(e.target.files[0]))
                      }
                    }}
                  />
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    {field.value ? (
                      <img
                        src={field.value}
                        alt="Cover"
                        className="max-h-[200px] object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <ImageIcon className="h-8 w-8" />
                        <p>Drag and drop or click to upload</p>
                      </>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Upload a cover image for your blog (optional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., CS101" {...field} />
                </FormControl>
                <FormDescription>
                  Related course code (if applicable)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="faculty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faculty/Department</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="semester"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Semester</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Fall 2023" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {blogCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the most relevant category for your blog
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter tags separated by commas"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Add tags to help categorize your blog (e.g., Study Tips, Research Paper, Student Life)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Save as</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="draft" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Draft - Save for later
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="published" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Submit for Review - Send for approval
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Schedule Publication</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Schedule publication date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>
            Optional: Choose when to publish your blog. If not selected, it will be published immediately after approval.
          </FormDescription>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading 
              ? "Saving..." 
              : isEditing 
                ? form.getValues("status") === "draft" ? "Update Draft" : "Update & Submit for Review" 
                : form.getValues("status") === "draft" ? "Save Draft" : "Submit for Review"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
