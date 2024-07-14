"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function EditPackage() {
  const [packageName, setPackageName] = useState("");
  const [packageDetails, setPackageDetails] = useState({
    name: "",
    price: "",
    description: "",
    duration: "",
  });
  const [originalDetails, setOriginalDetails] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePackageNameChange = (e) => {
    setPackageName(e.target.value);
  };

  const getPackageDetails = async () => {
    if (!packageName) {
      return toast.error("Please enter a Package Name.");
    }

    // Simulate an API call to fetch package details
    const toastId = toast.loading("Fetching Package Details...");
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulate fetched data
    const fetchedData = {
      name: packageName,
      price: "1500",
      description: "This is a sample package description.",
      duration: "12",
    };

    setPackageDetails(fetchedData);
    setOriginalDetails(fetchedData); // Save original details for comparison
    toast.success("Package details fetched successfully!", { id: toastId });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageDetails({
      ...packageDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any details have changed
    if (JSON.stringify(packageDetails) === JSON.stringify(originalDetails)) {
      return toast.error(
        "No changes detected. Please update package details to submit."
      );
    }

    const toastId = toast.loading("Updating Package Details...");
    // Simulate API call to update package details
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success("Package details updated successfully!", {
      id: toastId,
    });

    setIsDialogOpen(true);
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <div className="w-full max-w-7xl space-y-8">
        {/* First Card */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Package - Step 1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="packageName">Package Name</Label>
                <Input
                  id="packageName"
                  name="packageName"
                  placeholder="Package Name"
                  value={packageName}
                  onChange={handlePackageNameChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <Button className="w-full" onClick={getPackageDetails}>
                Get Package Details by Name
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Second Card */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Package - Step 2</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="name">Package Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Package Name"
                  value={packageDetails.name}
                  onChange={handleChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="price">Package Price</Label>
                <Input
                  id="price"
                  name="price"
                  placeholder="Package Price"
                  value={packageDetails.price}
                  onChange={handleChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={packageDetails.description}
                  onChange={handleChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                  rows={4} // This will make the textarea twice the height of a normal input
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="duration">Package Duration (Months)</Label>
                <Input
                  id="duration"
                  name="duration"
                  placeholder="Package Duration in Months"
                  type="number"
                  value={packageDetails.duration}
                  onChange={handleChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <Button className="w-full" type="submit">
                Update Package Details
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(true)}
        className="mt-8 mb-8"
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Package Updated</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>Package details updated successfully!</p>
            </div>
          </DialogDescription>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
