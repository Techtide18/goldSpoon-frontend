// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function EditProfile() {
  const [profile, setProfile] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const session = await getSession();
      if (!session || !session.user || !session.user.name) {
        toast.error('You must be logged in to view this information.');
        return;
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/member/${session.user.name}`);
        if (response.data) {
          setProfile(response.data);
        } else {
          toast.error('No profile data returned from the server.');
        }
        toast.success("Fetched profile data successfully.");
      } catch (error) {
        toast.error('Failed to fetch profile data.');
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleGenderChange = (value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      gender: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const session = await getSession();
    if (!session || !session.user || !session.user.name) {
      toast.error('You must be logged in to update this information.');
      return;
    }

    try {
      const toastId = toast.loading("Updating Profile Details...");
      await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/member/${session.user.name}`, {
        fullName: profile.fullName,
        phone: profile.phone,
        email: profile.email,
        aadhaarNumber: profile.aadhaarNumber,
        panNumber: profile.panNumber,
        addressDetails: profile.addressDetails,
        bankAccDetails: profile.bankAccDetails,
        gender: profile.gender,
        nominee: profile.nominee,
      });

      toast.success("Profile details updated successfully!", { id: toastId });
      setIsDialogOpen(true);
    } catch (error) {
      toast.error('Failed to update profile details.');
      console.error("Failed to update profile details:", error);
    }
  };

  if (!profile) {
    return <div></div>;
  }

  // Filter out the fields that should not be displayed
  const displayFields = [
    "fullName",
    "phone",
    "email",
    "aadhaarNumber",
    "panNumber",
    "addressDetails",
    "bankAccDetails",
    "nominee",
  ];

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
              {displayFields.map((key) => (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center" key={key}>
                  <Label
                    htmlFor={key}
                    className="font-semibold text-md capitalize"
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
                    value={profile[key] || ""}
                    onChange={handleChange}
                    className="col-span-2 transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                  />
                </div>
              ))}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <Label
                  htmlFor="gender"
                  className="font-semibold text-md capitalize"
                >
                  Gender:
                </Label>
                <div className="col-span-2">
                  <Select
                    value={profile.gender || ""}
                    onValueChange={handleGenderChange}
                    className="w-full transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" value={profile.gender || ""} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHERS">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
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
