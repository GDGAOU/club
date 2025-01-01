export type PaperType = "midterm" | "final" | "assignment" | "quiz" | "other";

export const PAPER_TYPES: PaperType[] = ["midterm", "final", "assignment", "quiz", "other"];

export type Semester = "Fall" | "Spring" | "Summer";

export const SEMESTERS: Semester[] = ["Fall", "Spring", "Summer"];

export const YEARS = Array.from({ length: 10 }, (_, i) => 
  (new Date().getFullYear() - i).toString()
);

export type ShareableLink = {
  id: string;
  url: string;
  expiresAt: Date;
  isActive: boolean;
  createdAt: Date;
  accessCount: number;
};

export type ExtendedPaper = {
  _id: string;  // MongoDB ID
  id?: string;  // Backward compatibility
  fileName: string;  // Add fileName field
  moduleCode: string;
  moduleTitle: string;
  year: string;
  semester: Semester;
  type: PaperType;
  pathway: string;
  fileUrl: string;
  fileType?: string;  // Add fileType field
  fileSize: number;
  tags: string[];
  rating: number;
  comments: Array<{
    id: string;
    text: string;
    author: string;
    createdAt: Date;
  }>;
  downloads: number;
  uploadedBy: string;
  uploadedAt: Date;
  lastModifiedAt?: Date;
  lastModifiedBy?: string;
  shareableLinks: ShareableLink[];
  visibility: "public" | "private" | "shared";
  status: "active" | "archived" | "flagged";
  version: number;
};

export type SavedFilter = {
  id: string;
  name: string;
  criteria: FilterCriteria;
};

export type FilterCriteria = {
  dateRange: "all" | "last7" | "last30" | "last90" | "custom";
  customDateStart?: Date;
  customDateEnd?: Date;
  fileSize: "all" | "small" | "medium" | "large";
  rating: number | null;
  tags: string[];
};

export const DEFAULT_FILTER_CRITERIA: FilterCriteria = {
  dateRange: "all",
  fileSize: "all",
  rating: null,
  tags: []
};
