"use client";

import { useState, useEffect } from "react";
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

  const [referralMemberName, setReferralMemberName] = useState("");
  const [generatedPins, setGeneratedPins] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (formData.referralMemberId) {
      // Simulate an API call to fetch the referral member name
      setTimeout(() => {
        const randomNames = ["John Doe", "Jane Smith", "Alice Johnson"];
        const randomName =
          randomNames[Math.floor(Math.random() * randomNames.length)];
        setReferralMemberName(randomName);
      }, 500);
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
    // Simulate API call to generate E-PINs
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newPins = Array.from(
      { length: numberOfPins },
      (_, i) => `PIN-${Math.floor(Math.random() * 1000000)}`
    );
    setGeneratedPins(newPins);
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
              <Label htmlFor="pinPackage">Package</Label>
              <Select
                name="pinPackage"
                value={formData.pinPackage}
                onValueChange={(value) =>
                  setFormData({ ...formData, pinPackage: value })
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
            {generatedPins.map((pin, index) => (
              <p key={index}>{pin}</p>
            ))}
          </div>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
