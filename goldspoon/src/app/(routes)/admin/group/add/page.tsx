// @ts-nocheck
"use client";


import { useState, useEffect } from "react";
import axios from "axios";
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
    packageId: "",
  });

  const [packages, setPackages] = useState([]);
  const [packagesLoaded, setPackagesLoaded] = useState(false);
  const [selectedPackageName, setSelectedPackageName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/package/all`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "e8f63d22-6a2d-42b0-845a-31f0f08e35b3",
          adminMemberId: 1,
        },
      });
      setPackages(response.data);
      setPackagesLoaded(true);
    } catch (error) {
      toast.error("Failed to fetch packages.");
    }
  };

  const handlePackageChange = (value) => {
    const selectedPackage = packages.find(pkg => pkg.id == value);
    setFormData({
      ...formData,
      packageId: value,
    });
    if (selectedPackage) {
      setSelectedPackageName(selectedPackage.packageName);
    } else {
      setSelectedPackageName("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { groupName, maxTokenCount, packageId } = formData;

    if (!groupName || !maxTokenCount || !packageId) {
      return toast.error("Please fill out all fields.");
    }

    if (isNaN(maxTokenCount) || maxTokenCount <= 0) {
      return toast.error("Max Token Count must be a positive number.");
    }

    const newGroup = {
      groupName,
      maxTokenCapacity: parseInt(maxTokenCount, 10),
      packageId: parseInt(packageId, 10),
    };

    const toastId = toast.loading("Adding New Group...");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/group/create`,
        newGroup,
        {
          headers: {
            adminMemberId: 1,
          },
        }
      );

      toast.success("New Group added successfully!", {
        id: toastId,
      });

      setIsDialogOpen(true);
      setFormData({
        groupName: "",
        maxTokenCount: "",
        packageId: "",
      });
      setSelectedPackageName("");
    } catch (error) {
      toast.error("Failed to add new group. Please try again.", {
        id: toastId,
      });
    }
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
              <Label htmlFor="packageId">Package Name</Label>
              <Select
                name="packageId"
                value={formData.packageId}
                onValueChange={handlePackageChange}
                required
                onOpenChange={(open) => {
                  if (open && !packagesLoaded) {
                    fetchPackages();
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Package">
                    {selectedPackageName || "Select Package"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {packages.map((pkg) => (
                    <SelectItem key={pkg.id} value={pkg.id}>
                      {pkg.packageName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Button className="w-full" type="submit">
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
