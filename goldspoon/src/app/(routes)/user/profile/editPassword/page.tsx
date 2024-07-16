"use client";

import { useState } from "react";
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
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required.");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New password and confirm password do not match.");
    }

    setIsConfirmDialogOpen(true);
  };

  const handleConfirmUpdate = async () => {
    setIsConfirmDialogOpen(false);
    const toastId = toast.loading("Updating Password...");
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("Password updated successfully!", { id: toastId });
    setIsSuccessDialogOpen(true);
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
                  onChange={(e) => setOldPassword(e.target.value)}
                  type="password"
                  className="w-2/3 transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                  required
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

      {/* Confirm Update Dialog */}
      <Dialog
        open={isConfirmDialogOpen}
        onOpenChange={(open) => setIsConfirmDialogOpen(open)}
        className="mt-8 mb-8"
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Confirm Password Update</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>Are you sure you want to update your password?</p>
            </div>
          </DialogDescription>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsConfirmDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmUpdate}>
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
          <Button onClick={() => setIsSuccessDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
