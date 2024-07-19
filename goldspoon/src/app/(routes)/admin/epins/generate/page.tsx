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

export default function GenerateEpin() {
  const [formData, setFormData] = useState({
    numberOfPins: "",
    pinPackage: "",
    referralMemberId: "",
    group: "",
  });

  const [packages, setPackages] = useState([]);
  const [packagesLoaded, setPackagesLoaded] = useState(false);
  const [selectedPackageName, setSelectedPackageName] = useState("");
  const [referralMemberName, setReferralMemberName] = useState("");
  const [generatedPins, setGeneratedPins] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchPackages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/packages", {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "e8f63d22-6a2d-42b0-845a-31f0f08e35b3",
          adminMemberId: 1,
        },
      });
      setPackages(response.data);
      setPackagesLoaded(true);
      console.log("Fetched packages:", response.data); // Debugging line
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast.error("Failed to fetch packages.");
    }
  };

  useEffect(() => {
    const fetchMemberName = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8080/member/${id}`);
        const member = response.data;
        setReferralMemberName(member.fullName || "");
      } catch (error) {
        console.error("Error fetching member details:", error);
        setReferralMemberName("");
        toast.error("Failed to fetch referral member details.");
      }
    };

    if (formData.referralMemberId) {
      fetchMemberName(formData.referralMemberId);
    } else {
      setReferralMemberName("");
    }
  }, [formData.referralMemberId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePackageChange = (value) => {
    console.log("Selected package ID:", value); // Debugging line
    const selectedPackage = packages.find(pkg => pkg.id == value);
    console.log("selectedPackage", selectedPackage); // Debugging line
    setFormData({
      ...formData,
      pinPackage: value,
    });
    if (selectedPackage) {
      setSelectedPackageName(selectedPackage.packageName);
    } else {
      setSelectedPackageName("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { numberOfPins, pinPackage, referralMemberId, group } = formData;

    if (!numberOfPins || !pinPackage || !referralMemberId || !group) {
      return toast.error("Please fill out all fields.");
    }

    if (numberOfPins > 50) {
      return toast.error("Maximum 50 Pins Allowed At One Time.");
    }

    const toastId = toast.loading("Generating E-PIN...");
    try {
      const response = await axios.post(
        "http://localhost:8080/admin/epins/generate",
        {
          totalEpins: numberOfPins,
          packageId: pinPackage,
          referralMemberId: referralMemberId,
          automaticGroupAssign: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "e8f63d22-6a2d-42b0-845a-31f0f08e35b3",
            adminMemberId: 1,
          },
        }
      );

      const newPins = response.data || []; // Ensure it's an array
      setGeneratedPins(newPins);
      console.log("newPins", newPins);
      toast.success("E-PINs generated successfully!", {
        id: toastId,
      });

      setIsDialogOpen(true);
      setFormData({
        numberOfPins: "",
        pinPackage: "",
        referralMemberId: "",
        group: "",
      });
      setSelectedPackageName("");
    } catch (error) {
      const errorMessage =
        error.response?.data || "Failed to generate E-PINs. Please try again.";
      console.error("Error generating E-PINs:", errorMessage); // Log the error message
      toast.error(errorMessage, {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>GENERATE E-PIN</CardTitle>
          <p>Note: Maximum 50 Pins Allowed At One Time</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="numberOfPins">Enter No Of Pins</Label>
              <Input
                id="numberOfPins"
                name="numberOfPins"
                type="number"
                placeholder="Enter No Of Pins"
                value={formData.numberOfPins}
                onChange={handleChange}
                required
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="pinPackage">Select Package</Label>
              <Select
                name="pinPackage"
                value={formData.pinPackage}
                onValueChange={handlePackageChange}
                required
                onOpenChange={(open) => {
                  if (open && !packagesLoaded) {
                    fetchPackages();
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue className="text-black">
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
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="referralMemberId">Referral Member ID</Label>
              <Input
                id="referralMemberId"
                name="referralMemberId"
                placeholder="Referral Member ID"
                value={formData.referralMemberId}
                onChange={handleChange}
                required
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="referralMemberName">Referral Member Name</Label>
              <Input
                id="referralMemberName"
                name="referralMemberName"
                placeholder="Auto Generated"
                value={referralMemberName}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="group">Select Group</Label>
              <Select
                name="group"
                value={formData.group}
                onValueChange={(value) =>
                  setFormData({ ...formData, group: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto-assign">Auto Assign</SelectItem>
                  <SelectItem value="g12">g12 (10 slots remaining)</SelectItem>
                  <SelectItem value="g20">g20 (2 slots remaining)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Button className="w-full" type="submit" variant="destructive">
                Generate E-PIN
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
          <DialogTitle>E-PINs Generated</DialogTitle>
          <DialogDescription>
            The following E-PINs have been generated. Please copy them safely as
            it will not be generated again.
          </DialogDescription>
          <div className="space-y-2">
            {Array.isArray(generatedPins) &&
              generatedPins.map((pin, index) => <p key={index}>{pin}</p>)}
          </div>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
