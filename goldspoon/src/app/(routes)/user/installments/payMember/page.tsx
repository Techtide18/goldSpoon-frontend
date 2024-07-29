// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        amountToBePaid: "1500",
        currentBalance: "2000",
      };
      resolve(memberDetails);
    }, 500);
  });
};

export default function PayRenewal() {
  const [formData, setFormData] = useState({
    memberId: "",
    remarks: "",
  });

  const [memberDetails, setMemberDetails] = useState({
    memberName: "",
    groupName: "",
    packageName: "",
    amountToBePaid: "",
    currentBalance: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        amountToBePaid: "",
        currentBalance: "",
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

    if (
      parseInt(memberDetails.currentBalance) <
      parseInt(memberDetails.amountToBePaid)
    ) {
      setErrorMessage(
        "Your current balance is less than the installment amount to be paid."
      );
      setErrorDialogOpen(true);
      return;
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

  const handleSuccessDialogClose = () => {
    setIsSuccessDialogOpen(false);
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>PAY INSTALLMENT FOR MEMBER</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <Label htmlFor="amountToBePaid">
                Installment Amount to be Paid By Member
              </Label>
              <Input
                id="amountToBePaid"
                name="amountToBePaid"
                placeholder="Auto Generated"
                value={memberDetails.amountToBePaid}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <Label htmlFor="currentBalance">
                Current Balance in your Wallet
              </Label>
              <Input
                id="currentBalance"
                name="currentBalance"
                placeholder="Auto Generated"
                value={memberDetails.currentBalance}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                name="remarks"
                placeholder="Remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Button className="w-full" type="submit" variant="destructive">
                Pay Next Installment for Member
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
              <p>
                Are you sure you want to process the payment for other member?
              </p>
              <p>
                Member ID: <strong>{formData.memberId}</strong>
              </p>
              <p>
                Member Name: <strong>{memberDetails.memberName}</strong>
              </p>
              <p>
                Installment Amount to be Paid:{" "}
                <strong>{memberDetails.amountToBePaid}</strong>
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
        onOpenChange={(open) => {
          setIsSuccessDialogOpen(open);
          if (!open) {
            window.location.reload();
          }
        }}
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
          <Button onClick={handleSuccessDialogClose}>Close</Button>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog
        open={errorDialogOpen}
        onOpenChange={(open) => setErrorDialogOpen(open)}
        className="mt-8 mb-8"
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Error</DialogTitle>
          <DialogDescription>
            <div className="space-y-2">
              <strong>
                <p>{errorMessage}</p>
              </strong>
            </div>
          </DialogDescription>
          <Button onClick={() => setErrorDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
