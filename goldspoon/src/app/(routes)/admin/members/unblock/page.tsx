"use client";

import { useState, useEffect } from "react";
import axios from "axios";
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

export default function UnblockMember() {
  const [formData, setFormData] = useState({
    memberId: "",
  });

  const [memberName, setMemberName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  useEffect(() => {
    if (formData.memberId) {
      // Fetch member name from the API
      const fetchMemberName = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/member/${formData.memberId}`, {
            headers: {
              adminMemberId: 1,
            },
          });
          setMemberName(response.data.fullName);
        } catch (error) {
          console.error("Error fetching member name:", error);
          setMemberName("Unknown");
        }
      };
      fetchMemberName();
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

  const handleConfirmUnblock = async () => {
    setIsConfirmDialogOpen(false);

    const toastId = toast.loading("Unblocking member...");
    try {
      await axios.put(`http://localhost:8080/member/${formData.memberId}`, {
        isBlocked: false,
      }, {
        headers: {
          adminMemberId: 1,
        },
      });

      toast.success("Member unblocked successfully!", {
        id: toastId,
      });

      setIsDialogOpen(true);
      setFormData({
        memberId: "",
      });
    } catch (error) {
      toast.error("Failed to unblock member. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>UNBLOCK MEMBER</CardTitle>
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
                Unblock Member
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Confirm Unblock Dialog */}
      <Dialog
        open={isConfirmDialogOpen}
        onOpenChange={(open) => setIsConfirmDialogOpen(open)}
      >
        <DialogContent>
          <DialogTitle>Confirm Unblock</DialogTitle>
          <DialogDescription>
            Are you sure you want to unblock the member <strong>{memberName}</strong>?
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setIsConfirmDialogOpen(false)}>No</Button>
            <Button onClick={handleConfirmUnblock} variant="destructive">
              Yes, Unblock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(true)}
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Member Unblocked</DialogTitle>
          <DialogDescription>
            The member <strong>{memberName}</strong> has been unblocked successfully.
          </DialogDescription>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
