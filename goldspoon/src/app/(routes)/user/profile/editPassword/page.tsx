// @ts-nocheck
"use client";


import { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function ViewPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const session = await getSession();
      if (!session || !session.user || !session.user.name) {
        toast.error('You must be logged in to view this information.');
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/member/${session.user.name}`);
        if (response.data && response.data.password) {
          setOldPassword(response.data.password);
        } else {
          toast.error('No password data returned from the server.');
        }
        toast.success("Fetched password successfully.");
      } catch (error) {
        toast.error('Failed to fetch profile data.');
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return toast.error("All fields are required.");
    }

    if (newPassword === oldPassword) {
      return toast.error("New password cannot be the same as the old password.");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New password and confirm password do not match.");
    }

    const session = await getSession();
    if (!session || !session.user || !session.user.name) {
      return toast.error("You must be logged in to update your password.");
    }

    try {
      const toastId = toast.loading("Updating Password...");
      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/member/${session.user.name}`, {
        password: newPassword,
      });

      toast.success("Password updated successfully!", { id: toastId });
      setIsSuccessDialogOpen(true);
    } catch (error) {
      toast.error("Failed to update password.");
      console.error("Failed to update password:", error);
    }
  };

  const handleDialogClose = () => {
    setIsSuccessDialogOpen(false);
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-start py-4 px-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-5xl mt-4">
        {/* Password Card */}
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-2xl font-bold">EDIT PASSWORD</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="oldPassword"
                  className="font-semibold text-md w-1/3"
                >
                  Old Password:
                </Label>
                <Input
                  id="oldPassword"
                  name="oldPassword"
                  value={oldPassword}
                  readOnly
                  className="w-2/3 transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="newPassword"
                  className="font-semibold text-md w-1/3"
                >
                  New Password:
                </Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  className="w-2/3 transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                  required
                />
              </div>
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="confirmPassword"
                  className="font-semibold text-md w-1/3"
                >
                  Confirm Password:
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  className="w-2/3 transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                  required
                />
              </div>
              <div className="mt-12">
                <Button className="w-full" type="submit">
                  Update Password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Success Dialog */}
      <Dialog
        open={isSuccessDialogOpen}
        onOpenChange={(open) => setIsSuccessDialogOpen(open)}
        className="mt-8 mb-8"
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Password Updated</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>Password updated successfully!</p>
            </div>
          </DialogDescription>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
