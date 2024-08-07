// @ts-nocheck
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming Textarea component exists
import { toast } from "sonner";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function CreatePackage() {
  const [formData, setFormData] = useState({
    packageName: "",
    packagePrice: "",
    description: "",
    packageDuration: "", // Added package duration
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { packageName, packagePrice, description, packageDuration } =
      formData;

    if (!packageName || !packagePrice || !description || !packageDuration) {
      return toast.error("Please fill out all fields.");
    }

    const toastId = toast.loading("Creating Package...");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/package`,
        {
          packageName,
          packagePrice: parseInt(packagePrice, 10),
          description,
          packageDurationInMonths: parseInt(packageDuration, 10),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "e8f63d22-6a2d-42b0-845a-31f0f08e35b3",
            adminMemberId: 1,
          },
        }
      );

      toast.success("Package created successfully!", {
        id: toastId,
      });

      setIsDialogOpen(true);
      setFormData({
        packageName: "",
        packagePrice: "",
        description: "",
        packageDuration: "",
      });
    } catch (error) {
      console.log("err", error);
      toast.error(error.response.data || "Failed to create package", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>CREATE PACKAGE</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <Label htmlFor="packageName">Package Name</Label>
              <Input
                id="packageName"
                name="packageName"
                placeholder="Package Name"
                value={formData.packageName}
                onChange={handleChange}
                required
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <Label htmlFor="packagePrice">Package Price</Label>
              <Input
                id="packagePrice"
                name="packagePrice"
                placeholder="Package Price"
                type="number"
                value={formData.packagePrice}
                onChange={handleChange}
                required
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <Label htmlFor="packageDuration">Package Duration (Months)</Label>
              <Input
                id="packageDuration"
                name="packageDuration"
                placeholder="Package Duration in Months"
                type="number"
                value={formData.packageDuration}
                onChange={handleChange}
                required
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                rows={4} // This will make the textarea twice the height of a normal input
              />
            </div>
            <div className="space-y-2">
              <Button className="w-full" type="submit" variant="destructive">
                Create Package
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => open && setIsDialogOpen(true)}
        className="mt-8 mb-8"
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Package Created</DialogTitle>
          <DialogDescription>
            New package created successfully!
          </DialogDescription>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
