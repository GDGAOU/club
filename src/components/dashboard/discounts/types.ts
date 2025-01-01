export interface Discount {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  category: string;
  expiryDate: string;
  link: string;
  imageUrl: string;
  isActive?: boolean;
  terms?: string[];
  howToRedeem?: string;
  lastUpdated?: string;
  provider?: string;
  restrictions?: string[];
}

export type DiscountCategory = 
  | "All"
  | "Development"
  | "Cloud"
  | "Design"
  | "Productivity"
  | "Education"
  | "Entertainment";

export interface FilterCriteria {
  category?: DiscountCategory;
  searchQuery?: string;
  isActive?: boolean;
  sortBy?: "newest" | "popularity" | "expiringSoon";
}
