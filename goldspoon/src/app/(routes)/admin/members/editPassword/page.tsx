// @ts-nocheck
"use client";

import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const PAGE_SIZE = 100;

export default function EditPassword() {
  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMemberIdChange = (e) => {
    setMemberId(e.target.value);
  };

  const getMemberPassword = async () => {
    if (!memberId) {
      return toast.error("Please enter a Member ID.");
    }

    const toastId = toast.loading("Fetching Member Password...");

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/member/${memberId}`, {
        headers: {
          "adminMemberId": 1,
        },
      });

      const fetchedData = response.data;

      setMemberName(fetchedData.fullName);
      setOldPassword(fetchedData.password);
      setNewPassword(""); // Clear new password field
      setConfirmPassword(""); // Clear confirm password field
      toast.success("Member password fetched successfully!", { id: toastId });
    } catch (error) {
      toast.error("Failed to fetch member password. Please try again.", { id: toastId });
    }
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return toast.error("Please fill both new password fields.");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match.");
    }

    if (!/[a-zA-Z]/.test(newPassword)) {
      return toast.error("New password must contain at least one letter.");
    }

    const toastId = toast.loading("Updating Member Password...");

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/member/${memberId}`, {
        password: newPassword,
      }, {
        headers: {
          "adminMemberId": 1,
        },
      });

      toast.success("Member password updated successfully!", {
        id: toastId,
      });

      setIsDialogOpen(true);
      // Clear all fields
      setMemberId("");
      setMemberName("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("Failed to update member password. Please try again.", { id: toastId });
    }
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <Label htmlFor="oldPassword">Old Password</Label>
                <Input
                  id="oldPassword"
                  name="oldPassword"
                  placeholder="Old Password"
                  value={oldPassword}
                  readOnly
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
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
