"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  FunnelIcon, 
  MagnifyingGlassIcon, 
  PlusIcon 
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DiscountCard, type Discount } from "./discount-card";

// Initial empty discounts array
const INITIAL_DISCOUNTS: Discount[] = [];

const CATEGORIES = [
  "All",
  "Food & Drink",
  "Shopping",
  "Entertainment",
  "Travel",
  "Education",
  "Technology",
  "Health & Beauty",
  "Other",
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "expiring", label: "Expiring Soon" },
  { value: "popular", label: "Most Popular" },
];

interface StudentDiscountsProps {
  onAddDiscount?: () => void;
  newDiscount?: Discount;
}

export function StudentDiscounts({ onAddDiscount, newDiscount }: StudentDiscountsProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [discounts, setDiscounts] = useState<Discount[]>(INITIAL_DISCOUNTS);
  const [selectedTab, setSelectedTab] = useState("all");

  // Add new discount when it's received
  useEffect(() => {
    if (newDiscount) {
      console.log('Adding new discount:', newDiscount);
      setDiscounts(prev => [newDiscount, ...prev]);
    }
  }, [newDiscount]);

  const handleDeleteDiscount = (discountId: string) => {
    console.log('Deleting discount:', discountId);
    setDiscounts(prev => prev.filter(d => d.id !== discountId));
  };

  // Log whenever discounts state changes
  useEffect(() => {
    console.log('Discounts state updated:', discounts);
  }, [discounts]);

  const isExpiringSoon = (date: string) => {
    const expiryDate = new Date(date);
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const filteredDiscounts = discounts.filter(discount => {
    // Only show visible discounts unless it's in "My Discounts" tab
    if (!discount.visible && selectedTab !== "my") {
      return false;
    }
    
    if (selectedCategory !== "All" && discount.category !== selectedCategory) {
      return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        discount.title.toLowerCase().includes(query) ||
        discount.description.toLowerCase().includes(query) ||
        discount.category.toLowerCase().includes(query) ||
        discount.store.name.toLowerCase().includes(query)
      );
    }
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "expiring":
        return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
      case "popular":
        return (b._count?.likes || 0) - (a._count?.likes || 0);
      default: // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const myDiscounts = discounts.filter(discount => !discount.visible || discount.store.id === "user");
  const savedDiscounts = discounts.filter(discount => discount.visible && discount._count?.likes > 0);

  useEffect(() => {
    console.log('Filtered Discounts:', filteredDiscounts);
  }, [filteredDiscounts]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search discounts..."
              className="w-[300px] pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => {
              // Open filters dialog
            }}
          >
            <FunnelIcon className="h-4 w-4" />
            Filters
          </Button>
          <Button
            size="sm"
            className="gap-2"
            onClick={onAddDiscount}
          >
            <PlusIcon className="h-4 w-4" />
            Add Discount
          </Button>
        </div>
      </div>
      <Separator />
      <div className="flex-1 p-4">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="h-full space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="all">All Discounts</TabsTrigger>
              <TabsTrigger value="my">My Discounts</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {CATEGORIES.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          <TabsContent value="all" className="h-[calc(100%-64px)] space-y-8 overflow-y-auto">
            {filteredDiscounts.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No discounts found</p>
              </div>
            ) : (
              filteredDiscounts.map((discount) => (
                <DiscountCard
                  key={discount.id}
                  discount={discount}
                  isExpiringSoon={isExpiringSoon}
                  onDelete={handleDeleteDiscount}
                />
              ))
            )}
          </TabsContent>
          <TabsContent value="my" className="h-[calc(100%-64px)] space-y-8 overflow-y-auto">
            {myDiscounts.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">You haven't submitted any discounts yet</p>
              </div>
            ) : (
              myDiscounts.map((discount) => (
                <DiscountCard
                  key={discount.id}
                  discount={discount}
                  isExpiringSoon={isExpiringSoon}
                  onDelete={handleDeleteDiscount}
                />
              ))
            )}
          </TabsContent>
          <TabsContent value="saved" className="h-[calc(100%-64px)] space-y-8 overflow-y-auto">
            {savedDiscounts.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No saved discounts</p>
              </div>
            ) : (
              savedDiscounts.map((discount) => (
                <DiscountCard
                  key={discount.id}
                  discount={discount}
                  isExpiringSoon={isExpiringSoon}
                  onDelete={handleDeleteDiscount}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function DiscountCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6 space-y-4 animate-pulse">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3 flex-1">
          <div className="h-6 w-3/4 bg-muted rounded-md" />
          <div className="flex gap-2">
            <div className="h-5 w-20 bg-muted rounded-full" />
            <div className="h-5 w-24 bg-muted rounded-full" />
          </div>
        </div>
        <div className="h-8 w-8 bg-muted rounded-md" />
      </div>
      <div className="h-4 w-full bg-muted rounded-md" />
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 bg-muted rounded-md" />
          <div className="h-6 w-16 bg-muted rounded-md" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-muted rounded-md" />
          <div className="h-6 w-24 bg-muted rounded-md" />
        </div>
      </div>
      <Separator />
      <div className="flex items-center justify-between gap-4 pt-4">
        <div className="flex items-center gap-4">
          <div className="h-8 w-16 bg-muted rounded-md" />
          <div className="h-8 w-16 bg-muted rounded-md" />
          <div className="h-8 w-16 bg-muted rounded-md" />
        </div>
        <div className="h-8 w-24 bg-muted rounded-md" />
      </div>
    </div>
  );
}
