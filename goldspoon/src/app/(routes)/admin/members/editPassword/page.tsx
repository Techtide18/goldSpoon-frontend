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

export default function EditPassword() {
  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMemberIdChange = (e) => {
    setMemberId(e.target.value);
  };

  const getMemberPassword = async () => {
    if (!memberId) {
      return toast.error("Please enter a Member ID.");
    }

    // Simulate an API call to fetch member password
    const toastId = toast.loading("Fetching Member Password...");
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulate fetched data
    const fetchedData = {
      memberName: "John Doe",
      password: "password123",
    };

    setMemberName(fetchedData.memberName);
    setPassword(fetchedData.password);
    setConfirmPassword(""); // Clear confirm password field
    toast.success("Member password fetched successfully!", { id: toastId });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error("Please fill both password fields.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    const toastId = toast.loading("Updating Member Password...");
    // Simulate API call to update member password
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success("Member password updated successfully!", {
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
            <CardTitle>Edit Password - Step 1</CardTitle>
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
              <Button className="w-full" onClick={getMemberPassword}>
                Get Member Password by ID
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Second Card */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Password - Step 2</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <Button className="w-full" type="submit">
                Update Password for Member
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
          <DialogTitle>Password Updated</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>Member password updated successfully!</p>
            </div>
          </DialogDescription>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
