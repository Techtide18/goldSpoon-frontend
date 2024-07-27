// @ts-nocheck
"use client";


import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function AddWithdrawalRequest() {
  const [formData, setFormData] = useState({
    memberId: "",
    withdrawalAmount: "",
  });

  const [memberName, setMemberName] = useState("");
  const [currentAmount, setCurrentAmount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [memberNumber, setMemberNumber] = useState("");

  const fetchMemberDetails = async () => {
    try {
      const response = await axios.get("https://goldspoon.in/api/payout/walletDetails", {
        params: {
          pageSize: 1,
          pageNumber: 0,
          memberNumber: formData.memberId,
        },
        headers: {
          adminMemberId: 1,
        },
      });

      if (response.data && response.data.content && response.data.content.length > 0) {
        const memberData = response.data.content[0];
        const walletDetails = memberData.walletDetails;
        setMemberNumber(formData.memberId);
        setMemberName(memberData.fullName);
        setCurrentAmount(walletDetails.currentBalance);
        toast.success("Fetched member details and balances.");
      } else {
        setMemberName("");
        setCurrentAmount(0);
        toast.error("No data returned from the server.");
      }
    } catch (error) {
      toast.error("Failed to fetch member details.");
      console.error("Failed to fetch member details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const withdrawalAmount = parseFloat(formData.withdrawalAmount);

    if (!withdrawalAmount) {
      return toast.error("Please enter an amount to withdraw.");
    }

    if (withdrawalAmount > currentAmount) {
      return toast.error("Withdrawal amount exceeds current balance.");
    }

    setIsDialogOpen(true);
  };

  const handleConfirmWithdrawal = async () => {
    const toastId = toast.loading("Processing Withdrawal Request...");
    try {
      await axios.post("https://goldspoon.in/api/payout/withdrawalRequest/admin/create", {
        memberNumber,
        amount: parseInt(formData.withdrawalAmount, 10),
        status: "APPROVED",
      }, {
        headers: {
          adminMemberId: 1,
        },
      });

      toast.success("Withdrawal request processed successfully!", {
        id: toastId,
      });

      setIsDialogOpen(false);
      setIsSuccessDialogOpen(true);

      // Reset form
      setFormData({
        memberId: "",
        withdrawalAmount: "",
      });
      setMemberName("");
      setMemberNumber("");
      setCurrentAmount(0);
    } catch (error) {
      toast.error("Failed to process withdrawal request. " + error.response.data, {
        id: toastId,
      });
      console.error("Failed to process withdrawal request:", error);
    }
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>ADD WITHDRAWAL REQUEST</CardTitle>
          <CardDescription>You can place a withdrawal request from your current balance.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="memberId">Member ID</Label>
              <div className="flex gap-4">
                <Input
                  id="memberId"
                  name="memberId"
                  placeholder="Member ID"
                  value={formData.memberId}
                  onChange={handleChange}
                  required
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
                <Button
                  onClick={fetchMemberDetails}
                  type="button"
                  className="min-w-max"
                >
                  Get Member Details
                </Button>
              </div>
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
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="currentAmount">Current Balance Available</Label>
              <Input
                id="currentAmount"
                name="currentAmount"
                placeholder="Current Amount Available"
                value={currentAmount}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="withdrawalAmount">Amount to Withdraw</Label>
              <Input
                id="withdrawalAmount"
                name="withdrawalAmount"
                placeholder="Amount to Withdraw"
                value={formData.withdrawalAmount}
                onChange={handleChange}
                type="number"
                required
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="space-y-2">
              <Button className="w-full" type="submit" variant="destructive">
                Add Withdrawal Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Confirm Withdrawal Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open)}
        className="mt-8 mb-8"
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Confirm Withdrawal Request</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>Are you sure you want to process the withdrawal request?</p>
              <p>
                Current Balance Available: <strong>{currentAmount}</strong>
              </p>
              <p>
                Amount to Withdraw: <strong>{formData.withdrawalAmount}</strong>
              </p>
            </div>
          </DialogDescription>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmWithdrawal}>
              Confirm Withdrawal
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
          <DialogTitle>Withdrawal Request Placed</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>Your withdrawal request has been successfully placed and is approved automatically.</p>
            </div>
          </DialogDescription>
          <Button onClick={() => setIsSuccessDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
