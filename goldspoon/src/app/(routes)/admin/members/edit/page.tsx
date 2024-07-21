"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function EditProfile() {
  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    phone: "",
    email: "",
    gender: "",
    aadhaarNumber: "",
    panNumber: "",
    addressDetails: "",
    accountNumber: "",
    accountName: "",
    bankName: "",
    bankBranch: "",
  });

  const handleMemberIdChange = (e) => {
    setMemberId(e.target.value);
  };

  const getMemberDetails = async () => {
    if (!memberId) {
      return toast.error("Please enter a Member ID.");
    }

    const toastId = toast.loading("Fetching Member Details...");

    try {
      const response = await axios.get(`http://localhost:8080/member/${memberId}`, {
        headers: {
          adminMemberId: 1,
        },
      });

      const fetchedData = response.data;

      setProfileData({
        fullName: fetchedData.fullName,
        phone: fetchedData.phone,
        email: fetchedData.email,
        gender: fetchedData.gender,
        aadhaarNumber: fetchedData.aadhaarNumber,
        panNumber: fetchedData.panNumber,
        addressDetails: fetchedData.addressDetails,
        accountNumber: fetchedData.accountNumber,
        accountName: fetchedData.accountName,
        bankName: fetchedData.bankName,
        bankBranch: fetchedData.bankBranch,
      });
      setMemberName(fetchedData.fullName);
      toast.success("Member details fetched successfully!", { id: toastId });
    } catch (error) {
      toast.error("Failed to fetch member details. Please try again.", { id: toastId });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Updating Member Details...");

    try {
      await axios.put(`http://localhost:8080/member/${memberId}`, {
        fullName: profileData.fullName,
        phone: profileData.phone,
        email: profileData.email,
        aadhaarNumber: profileData.aadhaarNumber,
        panNumber: profileData.panNumber,
        addressDetails: profileData.addressDetails,
        bankAccDetails: `${profileData.accountNumber}, ${profileData.accountName}, ${profileData.bankName}, ${profileData.bankBranch}`,
      }, {
        headers: {
          adminMemberId: 1,
        },
      });

      toast.success("Member details updated successfully!", { id: toastId });
      setIsDialogOpen(true);
    } catch (error) {
      toast.error("Failed to update member details. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <div className="w-full max-w-7xl space-y-8">
        {/* First Card */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Member - Step 1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="memberId">Member ID</Label>
                <Input
                  id="memberId"
                  name="memberId"
                  placeholder="Member ID"
                  value={memberId}
                  onChange={handleMemberIdChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
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
              <Button className="w-full" onClick={getMemberDetails}>
                Get Member Details by ID
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Second Card */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Member - Step 2</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Full Name"
                  value={profileData.fullName}
                  onChange={handleChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  name="gender"
                  value={profileData.gender}
                  onValueChange={(value) =>
                    setProfileData({ ...profileData, gender: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
                <Input
                  id="aadhaarNumber"
                  name="aadhaarNumber"
                  placeholder="Aadhaar Number"
                  value={profileData.aadhaarNumber}
                  onChange={handleChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="panNumber">PAN Number</Label>
                <Input
                  id="panNumber"
                  name="panNumber"
                  placeholder="PAN Number"
                  value={profileData.panNumber}
                  onChange={handleChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="addressDetails">Address Details</Label>
                <Textarea
                  id="addressDetails"
                  name="addressDetails"
                  placeholder="Address Details"
                  value={profileData.addressDetails}
                  onChange={handleChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                  rows={4} // This will make the textarea twice the height of a normal input
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="accountNumber">Account No.</Label>
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  placeholder="Account No."
                  value={profileData.accountNumber}
                  onChange={handleChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="accountName">Account Name</Label>
                <Input
                  id="accountName"
                  name="accountName"
                  placeholder="Account Name"
                  value={profileData.accountName}
                  onChange={handleChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  name="bankName"
                  placeholder="Bank Name"
                  value={profileData.bankName}
                  onChange={handleChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="bankBranch">Bank Branch</Label>
                <Input
                  id="bankBranch"
                  name="bankBranch"
                  placeholder="Bank Branch"
                  value={profileData.bankBranch}
                  onChange={handleChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <Button className="w-full" type="submit">
                Update Details For Member Id
              </Button>
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
              <p>Member details updated successfully!</p>
            </div>
          </DialogDescription>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
