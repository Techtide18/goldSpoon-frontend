"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
  DialogFooter,
} from "@/components/ui/dialog";

export default function BlockMember() {
  const [formData, setFormData] = useState({
    memberId: "",
  });

  const [memberName, setMemberName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

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
    const { memberId } = formData;

    if (!memberId) {
      return toast.error("Please enter a Member ID.");
    }

    setIsConfirmDialogOpen(true);
  };

  const handleConfirmBlock = async () => {
    setIsConfirmDialogOpen(false);

    const toastId = toast.loading("Blocking member...");
    // Simulate API call to block the member
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success("Member blocked successfully!", {
      id: toastId,
    });

    setIsDialogOpen(true);
    setFormData({
      memberId: "",
    });
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>BLOCK MEMBER</CardTitle>
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
                Block Member
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Confirm Block Dialog */}
      <Dialog
        open={isConfirmDialogOpen}
        onOpenChange={(open) => setIsConfirmDialogOpen(open)}
      >
        <DialogContent>
          <DialogTitle>Confirm Block</DialogTitle>
          <DialogDescription>
            Are you sure you want to block the member <strong>{memberName}</strong>?
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setIsConfirmDialogOpen(false)}>No</Button>
            <Button onClick={handleConfirmBlock} variant="destructive">
              Yes, Block
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => open && setIsDialogOpen(true)}
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Member Blocked</DialogTitle>
          <DialogDescription>
            The member <strong>{memberName}</strong> has been blocked successfully.
          </DialogDescription>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
