"use client";

import { useState } from "react";
import * as z from "zod";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { 
  TagIcon, 
  LinkIcon, 
  CalendarIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { Loader2Icon } from "lucide-react";

interface Discount {
  id: string;
  title: string;
  description: string;
  code: string;
  link: string;
  category: string;
  discount: string;
  status: string;
  expiryDate: string;
  createdAt: string;
  visible: boolean;
  store: {
    id: string;
    name: string;
  };
  _count: {
    likes: number;
    comments: number;
    shares: number;
  };
}

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  code: z.string().min(1, "Discount code is required"),
  discount: z.string().min(1, "Discount amount is required"),
  category: z.string().min(1, "Category is required"),
  customCategory: z.string().optional(),
  link: z.string().url("Please enter a valid URL"),
  terms: z.string().optional(),
  howToUse: z.string().optional(),
  targetGroup: z.string().min(1, "Target group is required"),
  platform: z.string().min(1, "Platform is required"),
  minPurchase: z.number().optional(),
  maxDiscount: z.number().optional(),
  expiryDate: z.string().refine((date) => {
    const selectedDate = parseISO(date);
    return selectedDate > new Date();
  }, "Expiry date must be in the future"),
});

type FormValues = z.infer<typeof formSchema>;

interface SubmitDiscountProps {
  onSuccess?: (discount: Discount) => void;
}

const categories = [
  { label: "Food & Drink", value: "Food & Drink" },
  { label: "Shopping", value: "Shopping" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Travel", value: "Travel" },
  { label: "Education", value: "Education" },
  { label: "Technology", value: "Technology" },
  { label: "Health & Beauty", value: "Health & Beauty" },
  { label: "Other", value: "Other" },
];

const targetGroups = [
  "All Students",
  "University Students",
  "High School Students",
  "College Students",
  "Recent Graduates",
];

const platforms = ["Online", "In-Store", "Both"];

export function SubmitDiscount({ onSuccess }: SubmitDiscountProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTab, setCurrentTab] = useState("basic");
  const [hasMinPurchase, setHasMinPurchase] = useState(false);
  const [hasMaxDiscount, setHasMaxDiscount] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    code: "",
    discount: "",
    category: "",
    customCategory: "",
    link: "",
    terms: "",
    howToUse: "",
    targetGroup: "All Students",
    platform: "Online",
    minPurchase: 0,
    maxDiscount: 0,
    expiryDate: format(new Date(), "yyyy-MM-dd"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      const validatedData = formSchema.parse(formData);
      console.log('Validated form data:', validatedData);
      
      const newDiscount: Discount = {
        id: String(Date.now()), // Generate a unique ID
        title: validatedData.title,
        description: validatedData.description,
        code: validatedData.code,
        link: validatedData.link,
        category: validatedData.category === "Other" ? validatedData.customCategory! : validatedData.category,
        discount: validatedData.discount,
        status: "pending", // Set initial status as pending
        expiryDate: validatedData.expiryDate,
        createdAt: new Date().toISOString(),
        visible: false, // Hide until approved
        store: {
          id: "user",
          name: "User Submitted",
        },
        _count: {
          likes: 0,
          comments: 0,
          shares: 0,
        },
      };
      
      console.log('Created new discount:', newDiscount);

      if (onSuccess) {
        console.log('Calling onSuccess with discount:', newDiscount);
        onSuccess(newDiscount);
      }

      toast({
        title: "Success!",
        description: "Your discount has been submitted and is pending review. We'll notify you once it's approved.",
      });

      setFormData({
        title: "",
        description: "",
        code: "",
        discount: "",
        category: "",
        customCategory: "",
        link: "",
        terms: "",
        howToUse: "",
        targetGroup: "All Students",
        platform: "Online",
        minPurchase: 0,
        maxDiscount: 0,
        expiryDate: format(new Date(), "yyyy-MM-dd"),
      });
      setHasMinPurchase(false);
      setHasMaxDiscount(false);
      setCurrentTab("basic");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err) => err.message);
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: errors.join(", "),
        });
      } else {
        console.error("Error submitting discount:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="additional">Additional Details</TabsTrigger>
        </TabsList>
        <TabsContent value="basic" className="space-y-6 mt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="e.g., 50% off at Nike"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe the discount..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Discount Code</Label>
                <Input
                  placeholder="e.g., STUDENT50"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Discount Amount</Label>
                <Input
                  placeholder="e.g., 50% OFF"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.category === "Other" && (
                <Input
                  placeholder="Enter custom category"
                  value={formData.customCategory}
                  onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                  className="mt-2"
                />
              )}
            </div>
            <div className="space-y-2">
              <Label>Link</Label>
              <Input
                type="url"
                placeholder="https://..."
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Expiry Date</Label>
              <Input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                min={format(new Date(), "yyyy-MM-dd")}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="additional" className="space-y-6 mt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Target Group</Label>
              <RadioGroup
                value={formData.targetGroup}
                onValueChange={(value) => setFormData({ ...formData, targetGroup: value })}
                className="grid grid-cols-2 gap-4 mt-2"
              >
                {targetGroups.map((group) => (
                  <div key={group} className="flex items-center space-x-2">
                    <RadioGroupItem value={group} id={group} />
                    <Label htmlFor={group}>{group}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Platform</Label>
              <RadioGroup
                value={formData.platform}
                onValueChange={(value) => setFormData({ ...formData, platform: value })}
                className="grid grid-cols-3 gap-4 mt-2"
              >
                {platforms.map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <RadioGroupItem value={platform} id={platform} />
                    <Label htmlFor={platform}>{platform}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <Label>Minimum Purchase</Label>
                    <Switch
                      checked={hasMinPurchase}
                      onCheckedChange={setHasMinPurchase}
                    />
                  </div>
                  {hasMinPurchase && (
                    <div className="relative">
                      <CurrencyDollarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="number"
                        className="pl-9"
                        placeholder="0.00"
                        value={formData.minPurchase || ""}
                        onChange={(e) => setFormData({ ...formData, minPurchase: parseFloat(e.target.value) })}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <Label>Maximum Discount</Label>
                    <Switch
                      checked={hasMaxDiscount}
                      onCheckedChange={setHasMaxDiscount}
                    />
                  </div>
                  {hasMaxDiscount && (
                    <div className="relative">
                      <CurrencyDollarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="number"
                        className="pl-9"
                        placeholder="0.00"
                        value={formData.maxDiscount || ""}
                        onChange={(e) => setFormData({ ...formData, maxDiscount: parseFloat(e.target.value) })}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="space-y-2">
              <Label>Terms & Conditions</Label>
              <Textarea
                placeholder="Enter any terms, conditions, or restrictions that apply to this discount..."
                value={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Important restrictions or conditions students should know about
              </p>
            </div>
            <div className="space-y-2">
              <Label>How to Use</Label>
              <Textarea
                placeholder="Step-by-step instructions on how to claim and use this discount..."
                value={formData.howToUse}
                onChange={(e) => setFormData({ ...formData, howToUse: e.target.value })}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Help other students easily claim this discount
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        {currentTab === "additional" ? (
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Discount"
            )}
          </Button>
        ) : (
          <div className="flex gap-4">
            {currentTab !== "basic" && (
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  const tabs = ["basic", "additional"];
                  const currentIndex = tabs.indexOf(currentTab);
                  setCurrentTab(tabs[currentIndex - 1]);
                }}
              >
                Previous
              </Button>
            )}
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                const tabs = ["basic", "additional"];
                const currentIndex = tabs.indexOf(currentTab);
                setCurrentTab(tabs[currentIndex + 1]);
              }}
            >
              Next
            </Button>
          </div>
        )}
      </div>
      <div className="flex justify-between pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setFormData({
              title: "",
              description: "",
              code: "",
              discount: "",
              category: "",
              customCategory: "",
              link: "",
              terms: "",
              howToUse: "",
              targetGroup: "All Students",
              platform: "Online",
              minPurchase: 0,
              maxDiscount: 0,
              expiryDate: format(new Date(), "yyyy-MM-dd"),
            });
            setHasMinPurchase(false);
            setHasMaxDiscount(false);
            setCurrentTab("basic");
          }}
          disabled={isSubmitting}
        >
          Reset Form
        </Button>
      </div>
    </form>
  );
}
