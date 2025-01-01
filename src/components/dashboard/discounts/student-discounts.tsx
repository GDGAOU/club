"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { SubmitDiscount } from "./submit-discount";
import { EditDiscountModal } from "./edit-discount";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";

export function StudentDiscounts() {
  const [discounts, setDiscounts] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const response = await fetch("/api/discounts");
      if (!response.ok) {
        throw new Error("Failed to fetch discounts");
      }
      const data = await response.json();
      setDiscounts(data);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch discounts",
          variant: "destructive",
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/discounts/${selectedDiscount.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete discount");
      }

      setDiscounts(discounts.filter((d) => d.id !== selectedDiscount.id));
      setShowDeleteDialog(false);
      setSelectedDiscount(null);
      toast({
        title: "Success",
        description: "Discount deleted successfully",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete discount",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Student Discounts</h2>
        <Button onClick={() => setShowSubmitModal(true)}>Add Discount</Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Discounts</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {discounts.map((discount) => (
            <Card key={discount.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{discount.title}</h3>
                  <p className="text-sm text-gray-500">{discount.description}</p>
                  <div className="mt-2 space-x-2">
                    <Badge>{discount.category}</Badge>
                    <Badge variant={discount.status === "active" ? "default" : "secondary"}>
                      {discount.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedDiscount(discount);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setSelectedDiscount(discount);
                      setShowDeleteDialog(true);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {discounts
            .filter((d) => d.status === "active")
            .map((discount) => (
              <Card key={discount.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{discount.title}</h3>
                    <p className="text-sm text-gray-500">{discount.description}</p>
                    <div className="mt-2 space-x-2">
                      <Badge>{discount.category}</Badge>
                      <Badge variant="default">Active</Badge>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedDiscount(discount);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setSelectedDiscount(discount);
                        setShowDeleteDialog(true);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          {discounts
            .filter((d) => d.status === "expired")
            .map((discount) => (
              <Card key={discount.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{discount.title}</h3>
                    <p className="text-sm text-gray-500">{discount.description}</p>
                    <div className="mt-2 space-x-2">
                      <Badge>{discount.category}</Badge>
                      <Badge variant="secondary">Expired</Badge>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedDiscount(discount);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setSelectedDiscount(discount);
                        setShowDeleteDialog(true);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
        </TabsContent>
      </Tabs>

      <SubmitDiscount
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onSubmit={(newDiscount) => {
          setDiscounts([...discounts, newDiscount]);
          setShowSubmitModal(false);
        }}
      />

      {selectedDiscount && (
        <EditDiscountModal
          discount={selectedDiscount}
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedDiscount(null);
          }}
          onUpdate={(updatedDiscount) => {
            setDiscounts(
              discounts.map((d) =>
                d.id === updatedDiscount.id ? updatedDiscount : d
              )
            );
          }}
        />
      )}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the discount.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
