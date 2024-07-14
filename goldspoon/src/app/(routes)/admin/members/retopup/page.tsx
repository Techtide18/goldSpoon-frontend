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

export default function RetopUpMember() {
  const [formData, setFormData] = useState({
    memberId: "",
    pinPackage: "",
  });

  const [memberName, setMemberName] = useState("");
  const [generatedEpin, setGeneratedEpin] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (formData.memberId) {
      // Simulate an API call to fetch the member name
      setTimeout(() => {
        const randomNames = ["John Doe", "Jane Smith", "Alice Johnson"];
        const randomName =
          randomNames[Math.floor(Math.random() * randomNames.length)];
        setMemberName(randomName);
      }, 500);
    } else {
      setMemberName("");
    }
  }, [formData.memberId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { memberId, pinPackage } = formData;

    if (!memberId || !pinPackage) {
      return toast.error("Please fill out all fields.");
    }

    const toastId = toast.loading("Generating E-PIN...");
    // Simulate API call to generate E-PIN
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newEpin = `EPIN-${Math.floor(Math.random() * 1000000)}`;
    setGeneratedEpin(newEpin);
    toast.success("E-PIN generated successfully!", {
      id: toastId,
    });

    setIsDialogOpen(true);
    setFormData({
      memberId: "",
      pinPackage: "",
    });
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>RE-TOPUP MEMBER</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="memberId">Member ID</Label>
              <Input
                id="memberId"
                name="memberId"
                placeholder="Member ID"
                value={formData.memberId}
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
              <Label htmlFor="memberName">Member Name</Label>
              <Input
                id="memberName"
                name="memberName"
                placeholder="Auto Generated"
                value={memberName}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="space-y-2">
              <Button className="w-full" type="submit" variant="destructive">
                Re-Topup Member
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
          <DialogTitle>New E-PIN generated for member</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>
                <strong>New package:</strong> package {formData.pinPackage}
              </p>
              <p>
                <strong>New group assigned:</strong> G12
              </p>
              <p>
                <strong>New E-PIN:</strong> {generatedEpin}
              </p>
              <div style={{ marginBottom: "20px" }}></div>
              <div className="mt-4 space-y-2">
                <p>Member ID is still the same</p>
                <p>First Installment pending...</p>
              </div>
            </div>
          </DialogDescription>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          <Button
            onClick={() => (window.location.href = "/admin/installments/add")}
          >
            Add Installment Details
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
