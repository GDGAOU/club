"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Eye, 
  Filter, 
  Search, 
  Trash2, 
  Calendar, 
  GraduationCap, 
  User, 
  Share2, 
  Lock, 
  Globe, 
  FileText 
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { modules } from "@/lib/modules";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { pathways } from "@/lib/modules";

// Form schema
const formSchema = z.object({
  file: z.any(),
  moduleCode: z.string().min(1, "Module code is required"),
  pathway: z.string().min(1, "Pathway is required"),
  year: z.string().min(1, "Year is required"),
  semester: z.string().min(1, "Semester is required"),
  examType: z.string().min(1, "Exam type is required"),
});

interface Paper {
  id: string;
  title: string;
  moduleCode: string;
  pathway: string;
  year: number;
  semester: number;
  examType: string;
  fileId: string;
  fileSize: number;
  isPublic: boolean;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  downloads: number;
  viewLink: string;
  downloadLink: string;
}

function getModuleNameByCode(moduleCode: string, pathway: string): string {
  const pathwayModules = modules[pathway] || [];
  const module = pathwayModules.find(m => m.code === moduleCode);
  return module?.name || moduleCode;
}

function getSemesterString(semester: number): string {
  switch (semester) {
    case 1:
      return "Fall";
    case 2:
      return "Spring";
    case 3:
      return "Summer";
    default:
      return "Unknown";
  }
}

export default function Papers() {
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: null,
      moduleCode: "",
      pathway: "",
      year: new Date().getFullYear().toString(),
      semester: "",
      examType: "",
    },
  });

  // Function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Function to handle visibility toggle
  const handleVisibilityToggle = async (paperId: string, isPublic: boolean) => {
    try {
      const response = await fetch(`/api/papers/${paperId}/visibility`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPublic }),
      });

      if (response.ok) {
        setPapers(papers.map(p => 
          p.id === paperId ? { ...p, isPublic } : p
        ));
        toast({
          title: "Success",
          description: `Paper is now ${isPublic ? 'public' : 'private'}`,
        });
      } else {
        throw new Error('Failed to update visibility');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update paper visibility",
        variant: "destructive",
      });
    }
  };

  // Function to handle share
  const handleShare = async (paper: Paper) => {
    try {
      await navigator.clipboard.writeText(paper.viewLink);
      toast({
        title: "Success",
        description: "Link copied to clipboard!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  // Load papers on mount
  const fetchPapers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/papers");
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch papers');
      }
      
      const data = await response.json();
      setPapers(data);
    } catch (error) {
      console.error("Error fetching papers:", error);
      setError(error instanceof Error ? error.message : 'Failed to fetch papers');
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to fetch papers',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  // Handle file upload
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", values.file);
      formData.append("pathway", values.pathway);
      formData.append("moduleCode", values.moduleCode);
      formData.append("year", values.year);
      formData.append("semester", values.semester);
      formData.append("examType", values.examType);

      const response = await fetch("/api/papers/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        
        // Show success toast with loading spinner
        toast({
          title: (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              <span>Uploading Complete!</span>
            </div>
          ),
          description: "Your paper has been successfully uploaded.",
          duration: 3000,
        });

        // Close dialog and reset form
        setOpen(false);
        setSelectedFile(null);
        form.reset();

        // Refresh papers list
        await fetchPapers();

      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload paper",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("file", file);
    }
  };

  // Get modules for selected pathway
  const getModulesForPathway = (pathway: string) => {
    return modules[pathway] || [];
  };

  // Convert semester number to string
  const getSemesterString = (semester: number) => {
    switch (semester) {
      case 1:
        return "Fall";
      case 2:
        return "Spring";
      case 3:
        return "Summer";
      default:
        return "Unknown";
    }
  };

  // Filter papers based on search query
  const filteredPapers = papers?.filter((paper) => {
    if (!paper) return false;
    
    const matchesSearch = 
      paper.moduleCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.pathway?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.examType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.title?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  }) || [];

  return (
    <TooltipProvider>
      <div className="h-full flex-1 flex flex-col gap-4 p-4 md:p-8 overflow-y-auto">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search papers..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterType("")}>
                    All
                  </DropdownMenuItem>
                  {["Pathway", "Module", "Year", "Semester", "Type"].map((type) => (
                    <DropdownMenuItem
                      key={type}
                      onClick={() => setFilterType(type)}
                    >
                      {type}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog 
                open={open} 
                onOpenChange={(isOpen) => {
                  setOpen(isOpen);
                  if (!isOpen) {
                    setSelectedFile(null);
                    form.reset();
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button>Upload Paper</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      Upload Past Paper
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground/70">
                      Share your knowledge with fellow students. Upload a past paper to help others succeed.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                      <FormField
                        control={form.control}
                        name="file"
                        render={() => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Paper File</FormLabel>
                            <FormControl>
                              <div className="flex flex-col items-center justify-center w-full">
                                <label 
                                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gradient-to-br from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300"
                                >
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {selectedFile ? (
                                      <>
                                        <FileText className="w-8 h-8 mb-3 text-primary" />
                                        <p className="mb-1 text-sm text-foreground/90 font-medium">
                                          {selectedFile.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground/70">
                                          {formatFileSize(selectedFile.size)}
                                        </p>
                                        <p className="mt-2 text-xs text-primary/70 hover:text-primary cursor-pointer">
                                          Click to change file
                                        </p>
                                      </>
                                    ) : (
                                      <>
                                        <FileText className="w-8 h-8 mb-3 text-primary/70" />
                                        <p className="mb-2 text-sm text-foreground/90">
                                          <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-muted-foreground/70">PDF files only</p>
                                      </>
                                    )}
                                  </div>
                                  <Input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="pathway"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Pathway</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-gradient-to-br from-background to-background/80 border border-border/50 hover:border-primary/20 transition-colors">
                                    <SelectValue placeholder="Select pathway" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {pathways.map((pathway) => (
                                    <SelectItem key={pathway} value={pathway}>
                                      {pathway}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="moduleCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Module</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-gradient-to-br from-background to-background/80 border border-border/50 hover:border-primary/20 transition-colors">
                                    <SelectValue placeholder="Select module" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {getModulesForPathway(form.watch("pathway")).map(
                                    (module) => (
                                      <SelectItem
                                        key={module.code}
                                        value={module.code}
                                      >
                                        {module.code} - {module.name}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="year"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Year</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-gradient-to-br from-background to-background/80 border border-border/50 hover:border-primary/20 transition-colors">
                                    <SelectValue placeholder="Year" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Array.from(
                                    { length: 5 },
                                    (_, i) => new Date().getFullYear() - i
                                  ).map((year) => (
                                    <SelectItem key={year} value={year.toString()}>
                                      {year}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="semester"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Semester</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-gradient-to-br from-background to-background/80 border border-border/50 hover:border-primary/20 transition-colors">
                                    <SelectValue placeholder="Term" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1">Fall</SelectItem>
                                  <SelectItem value="2">Spring</SelectItem>
                                  <SelectItem value="3">Summer</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="examType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-gradient-to-br from-background to-background/80 border border-border/50 hover:border-primary/20 transition-colors">
                                    <SelectValue placeholder="Type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Quiz">Quiz</SelectItem>
                                  <SelectItem value="MTA">MTA</SelectItem>
                                  <SelectItem value="TMA">TMA</SelectItem>
                                  <SelectItem value="Final">Final</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <DialogFooter>
                        <Button 
                          type="submit" 
                          disabled={uploading || !selectedFile}
                          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
                        >
                          {uploading ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                              <span>Uploading Paper...</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              <span>{selectedFile ? 'Upload Paper' : 'Select a file'}</span>
                            </div>
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
            </div>
          ) : papers.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No papers uploaded yet</h3>
              <p className="text-sm text-gray-500 mb-4">Get started by uploading your first paper</p>
              <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>Upload Paper</Button>
              </DialogTrigger>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPapers.map((paper) => (
                <Card 
                  key={paper.id} 
                  className="group relative flex flex-col transition-all duration-300 hover:shadow-xl border-border/50 hover:border-primary/20 bg-gradient-to-br from-background via-background/80 to-background/50 backdrop-blur-sm overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <CardHeader className="relative space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className="bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-primary/20 px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm"
                          >
                            {paper.examType}
                          </Badge>
                          <Badge 
                            variant="secondary" 
                            className="bg-gradient-to-r from-secondary/20 to-secondary/10 px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm"
                          >
                            {getSemesterString(paper.semester)} {paper.year}
                          </Badge>
                        </div>
                      </div>
                      {session?.user?.email === paper.uploadedBy && (
                        <div className="flex items-center gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-2 cursor-pointer">
                                  <Switch
                                    checked={paper.isPublic}
                                    onCheckedChange={(checked) => handleVisibilityToggle(paper.id, checked)}
                                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-primary/80"
                                  />
                                  {paper.isPublic ? (
                                    <Globe className="h-4 w-4 text-primary" />
                                  ) : (
                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                  )}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Make {paper.isPublic ? 'private' : 'public'}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                            onClick={() => {
                              setSelectedPaper(paper);
                              setShowDeleteAlert(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="inline-flex items-center">
                        <div className="flex items-center justify-center px-3 py-1.5 bg-gradient-to-r from-primary/20 to-primary/5 text-primary font-bold rounded-lg text-sm backdrop-blur-sm">
                          {paper.moduleCode}
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-foreground/90 line-clamp-1">
                          {getModuleNameByCode(paper.moduleCode, paper.pathway)}
                        </CardTitle>
                        <CardDescription className="mt-1.5 line-clamp-1 text-sm text-muted-foreground/80">
                          {paper.pathway}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ring-2 ring-primary/10 ring-offset-2 ring-offset-background">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                            {paper.uploadedBy.split('@')[0]}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground/60 bg-gradient-to-br from-primary/10 to-transparent px-2 py-1 rounded-md backdrop-blur-sm">
                        {new Date(paper.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex flex-col items-center p-2 rounded-lg bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm hover:from-primary/20 transition-all duration-300 cursor-pointer group transform hover:scale-105">
                            <Eye className="h-4 w-4 text-primary/70 group-hover:text-primary transition-colors" />
                            <div className="mt-1 text-center">
                              <div className="text-sm font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80">
                                {paper.views.toLocaleString()}
                              </div>
                              <div className="text-xs text-muted-foreground/70">views</div>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Number of times viewed</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex flex-col items-center p-2 rounded-lg bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm hover:from-primary/20 transition-all duration-300 cursor-pointer group transform hover:scale-105">
                            <Download className="h-4 w-4 text-primary/70 group-hover:text-primary transition-colors" />
                            <div className="mt-1 text-center">
                              <div className="text-sm font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80">
                                {paper.downloads.toLocaleString()}
                              </div>
                              <div className="text-xs text-muted-foreground/70">downloads</div>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Number of downloads</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex flex-col items-center p-2 rounded-lg bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm hover:from-primary/20 transition-all duration-300 cursor-pointer group transform hover:scale-105">
                            <FileText className="h-4 w-4 text-primary/70 group-hover:text-primary transition-colors" />
                            <div className="mt-1 text-center">
                              <div className="text-sm font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80">
                                {formatFileSize(paper.fileSize)}
                              </div>
                              <div className="text-xs text-muted-foreground/70">size</div>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>File size</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between gap-2 pt-4 border-t border-border/50">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent transition-all duration-300 z-10"
                      onClick={() => handleShare(paper)}
                    >
                      <Share2 className="h-3.5 w-3.5 mr-1.5" />
                      <span className="text-xs font-medium">Share</span>
                    </Button>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-3 hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent transition-all duration-300 z-10"
                        asChild
                      >
                        <a 
                          href={paper.viewLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span className="text-xs font-medium">View</span>
                        </a>
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        className="h-8 px-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 z-10"
                        onClick={async () => {
                          try {
                            // Increment download count locally
                            setPapers(papers.map(p => 
                              p.id === paper.id 
                                ? { ...p, downloads: p.downloads + 1 }
                                : p
                            ));
                            
                            // Open in new tab
                            window.open(paper.downloadLink, '_blank');
                          } catch (error) {
                            console.error('Error downloading:', error);
                            toast({
                              title: "Error",
                              description: "Failed to download paper",
                              variant: "destructive",
                            });
                          }
                        }}
                      >
                        <Download className="h-3.5 w-3.5 mr-1.5" />
                        <span className="text-xs font-medium">Download</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>

        <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this paper. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  if (!selectedPaper) return;
                  
                  try {
                    const response = await fetch(`/api/papers/${selectedPaper.id}`, {
                      method: 'DELETE',
                    });

                    const data = await response.json();

                    if (response.ok) {
                      setPapers(papers.filter(p => p.id !== selectedPaper.id));
                      setShowDeleteAlert(false);
                      setSelectedPaper(null);
                      toast({
                        title: "Success",
                        description: data.message || "Paper deleted successfully",
                      });
                    } else {
                      throw new Error(data.error || 'Failed to delete paper');
                    }
                  } catch (error) {
                    console.error('Error deleting paper:', error);
                    toast({
                      title: "Error",
                      description: error instanceof Error ? error.message : "Failed to delete paper",
                      variant: "destructive",
                    });
                  }
                }}
                className="bg-destructive hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
}
