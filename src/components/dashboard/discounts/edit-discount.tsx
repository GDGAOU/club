import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface EditDiscountProps {
  discount: {
    id: string;
    title: string;
    description: string;
    code: string;
    discount: string;
    category: string;
    expiryDate: string;
    link: string;
    imageUrl?: string;
    status: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedDiscount: any) => void;
}

const CATEGORIES = [
  "Development",
  "Cloud",
  "Design",
  "Productivity",
  "Education",
  "Entertainment"
];

interface DiscountFormValues {
  title: string;
  description: string;
  code: string;
  discount: string;
  category: string;
  expiryDate: string;
  link: string;
  imageUrl?: string;
  status: string;
}

export function EditDiscountModal({ discount, isOpen, onClose, onUpdate }: EditDiscountProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<DiscountFormValues>({
    title: discount.title,
    description: discount.description,
    code: discount.code,
    discount: discount.discount,
    category: discount.category,
    expiryDate: new Date(discount.expiryDate).toISOString().split('T')[0],
    link: discount.link,
    imageUrl: discount.imageUrl || "",
    status: discount.status,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.code || 
          !formData.discount || !formData.category || !formData.expiryDate || !formData.link) {
        throw new Error("Please fill in all required fields");
      }

      // Validate URL format
      try {
        new URL(formData.link);
      } catch {
        throw new Error("Please enter a valid URL for the discount link");
      }

      // Validate expiry date
      const expiryDate = new Date(formData.expiryDate);
      if (isNaN(expiryDate.getTime()) || expiryDate <= new Date()) {
        throw new Error("Please select a future date for expiry");
      }

      const response = await fetch(`/api/discounts/${discount.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update discount");
      }

      toast({
        title: "Success",
        description: "Discount updated successfully!",
      });

      onUpdate(data.data);
      onClose();
    } catch (error: unknown) {
      console.error("Error updating discount:", error);
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to update discount",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Discount</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., GitHub Student Developer Pack"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the discount"
              className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium mb-1">
                Discount Code
              </label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="STUDENT2024"
                required
              />
            </div>
            <div>
              <label htmlFor="discount" className="block text-sm font-medium mb-1">
                Discount Amount
              </label>
              <Input
                id="discount"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                placeholder="e.g., 50% off"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                required
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                Expiry Date
              </label>
              <Input
                type="date"
                id="expiryDate"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="link" className="block text-sm font-medium mb-1">
              Discount Link
            </label>
            <Input
              id="link"
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://example.com/student-discount"
              required
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
              Image URL (Optional)
            </label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/discount-image.jpg"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Discount"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
