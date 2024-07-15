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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function AddNewGroup() {
  const [formData, setFormData] = useState({
    groupName: "",
    maxTokenCount: "",
    packageName: "",
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
    const { groupName, maxTokenCount, packageName } = formData;

    if (!groupName || !maxTokenCount || !packageName) {
      return toast.error("Please fill out all fields.");
    }

    if (isNaN(maxTokenCount) || maxTokenCount <= 0) {
      return toast.error("Max Token Count must be a positive number.");
    }

    const toastId = toast.loading("Adding New Group...");
    // Simulate API call to add new group
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success("New Group added successfully!", {
      id: toastId,
    });

    setIsDialogOpen(true);
    setFormData({
      groupName: "",
      maxTokenCount: "",
      packageName: "",
    });
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>ADD NEW GROUP</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                id="groupName"
                name="groupName"
                placeholder="Enter Group Name"
                value={formData.groupName}
                onChange={handleChange}
                required
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="maxTokenCount">Max Token Count</Label>
              <Input
                id="maxTokenCount"
                name="maxTokenCount"
                type="number"
                placeholder="Enter Max Token Count"
                value={formData.maxTokenCount}
                onChange={handleChange}
                required
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="packageName">Package Name</Label>
              <Select
                name="packageName"
                value={formData.packageName}
                onValueChange={(value) =>
                  setFormData({ ...formData, packageName: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Package" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Package-1500">Package - 1500</SelectItem>
                  <SelectItem value="Package-2000">Package - 2000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Button className="w-full" type="submit" variant="destructive">
                Add Group
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => open && setIsDialogOpen(true)}
        className="mt-8 mb-8"
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Group Added</DialogTitle>
          <DialogDescription>
            The new group has been created successfully.
          </DialogDescription>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
