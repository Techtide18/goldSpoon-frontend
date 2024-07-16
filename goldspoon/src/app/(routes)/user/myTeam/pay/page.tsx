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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Simulated API call to fetch member details
const fetchMemberDetails = (memberId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const memberDetails = {
        memberName: "John Doe",
        groupName: "Group A",
        packageName: "Package - 1500",
      };
      resolve(memberDetails);
    }, 500);
  });
};

export default function PayRenewal() {
  const [formData, setFormData] = useState({
    memberId: "",
  });

  const [memberDetails, setMemberDetails] = useState({
    memberName: "",
    groupName: "",
    packageName: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  useEffect(() => {
    if (formData.memberId) {
      fetchMemberDetails(formData.memberId).then((details) => {
        setMemberDetails(details);
      });
    } else {
      setMemberDetails({
        memberName: "",
        groupName: "",
        packageName: "",
      });
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

    if (!formData.memberId) {
      return toast.error("Please fill out the Member ID field.");
    }

    setIsDialogOpen(true);
  };

  const handleConfirmPayment = async () => {
    const toastId = toast.loading("Processing Payment...");
    // Simulate API call to process payment
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success("Payment processed successfully!", {
      id: toastId,
    });

    setIsDialogOpen(false);
    setIsSuccessDialogOpen(true);
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>PAY RENEWAL FOR MEMBER</CardTitle>
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
                value={memberDetails.memberName}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                id="groupName"
                name="groupName"
                placeholder="Auto Generated"
                value={memberDetails.groupName}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="packageName">Package Name</Label>
              <Input
                id="packageName"
                name="packageName"
                placeholder="Auto Generated"
                value={memberDetails.packageName}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="space-y-2">
              <Button className="w-full" type="submit" variant="destructive">
                Pay Renewal for Next Installment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Confirm Payment Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open)}
        className="mt-8 mb-8"
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Confirm Payment</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>Are you sure you want to process the payment?</p>
              <p>
                Member ID: <strong>{formData.memberId}</strong>
              </p>
              <p>
                Member Name: <strong>{memberDetails.memberName}</strong>
              </p>
              <p>
                Group Name: <strong>{memberDetails.groupName}</strong>
              </p>
              <p>
                Package Name: <strong>{memberDetails.packageName}</strong>
              </p>
            </div>
          </DialogDescription>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmPayment}>
              Confirm Payment
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
          <DialogTitle>Payment Successful</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>
                Payment has been successfully processed for Member ID{" "}
                <strong>{formData.memberId}</strong>.
              </p>
            </div>
          </DialogDescription>
          <Button onClick={() => setIsSuccessDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
