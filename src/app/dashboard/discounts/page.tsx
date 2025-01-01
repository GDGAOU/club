"use client";

import { useState } from "react";
import { StudentDiscounts } from "@/components/dashboard/discounts/student-discounts";
import { SubmitDiscount } from "@/components/dashboard/discounts/submit-discount";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { Discount } from "@/components/dashboard/discounts/discount-card";

export default function DiscountsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newDiscount, setNewDiscount] = useState<Discount | undefined>();

  const handleDiscountSubmit = (discount: Discount) => {
    console.log('DiscountsPage received new discount:', discount);
    setNewDiscount(discount);
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isSubmitting ? (
        <motion.div
          key="submit"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => setIsSubmitting(false)}
              className="gap-2"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Discounts
            </Button>
          </div>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Submit New Discount
            </h1>
            <p className="text-muted-foreground mb-8">
              Help your fellow students save money by sharing student discounts you&apos;ve found.
            </p>
            <SubmitDiscount onSuccess={handleDiscountSubmit} />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <StudentDiscounts 
            onAddDiscount={() => setIsSubmitting(true)} 
            newDiscount={newDiscount}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}