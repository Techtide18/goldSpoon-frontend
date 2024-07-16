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
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Simulated Data
const initialProfile = {
  memberName: "John Doe",
  memberId: "123456",
  phone: "123-456-7890",
  email: "john.doe@example.com",
  aadhaarNumber: "1234-5678-9012",
  panNumber: "ABCDE1234F",
  address: "123 Main St, City, Country",
  isActive: "Yes",
  bankAccDetails: "Bank Name: ABC Bank, Acc No: 1234567890",
};

export default function EditProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate an API call to update profile details
    const toastId = toast.loading("Updating Profile Details...");
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success("Profile details updated successfully!", { id: toastId });

    setIsDialogOpen(true);
  };

  return (
    <div className="flex justify-center items-start py-4 px-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-5xl mt-4">
        {/* Profile Card */}
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-2xl font-bold">EDIT PROFILE</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {Object.entries(profile).map(([key, value]) => (
                <div className="flex items-center gap-4" key={key}>
                  <Label
                    htmlFor={key}
                    className="font-semibold text-md capitalize w-1/3"
                  >
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())
                      .replace("Id", "ID")}
                    :
                  </Label>
                  <Input
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    readOnly={key === "memberId"}
                    className="w-2/3 transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                  />
                </div>
              ))}
              <div className="mt-8">
                <Button className="w-full" type="submit">
                  Update Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => open && setIsDialogOpen(true)}
        className="mt-8 mb-8"
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Profile Updated</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>Profile details updated successfully!</p>
            </div>
          </DialogDescription>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
