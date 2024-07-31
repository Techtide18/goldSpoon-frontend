// @ts-nocheck
"use client";

import { useState } from "react";
import axios from "axios";
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
  DialogFooter,
} from "@/components/ui/dialog";

export default function AddAmountToWallet() {
  const [formData, setFormData] = useState({
    memberId: "",
    amount: "",
  });

  const [memberName, setMemberName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const fetchWalletDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payout/walletDetails`,
        {
          params: {
            pageSize: 1,
            pageNumber: 0,
            memberNumber: formData.memberId,
          },
          headers: {
            "Content-Type": "application/json",
            adminMemberId: 1,
          },
        }
      );

      const memberDetails = response.data.content[0];
      setMemberName(memberDetails.fullName || "Unknown");

      toast.success("Fetched wallet details successfully.");
    } catch (error) {
      console.error("Error fetching wallet details:", error);
      setMemberName("Unknown");
      toast.error("Failed to fetch wallet details.");
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
    const { memberId, amount } = formData;

    if (!memberId || !amount) {
      return toast.error("Please fill out all required fields.");
    }

    setIsConfirmDialogOpen(true);
  };

  const handleConfirmTransaction = async () => {
    const { memberId, amount } = formData;
    const requestData = {
      memberNumber: memberId,
      amount: parseInt(amount),
    };

    const toastId = toast.loading("Adding Amount...");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payout/wallet/add`,
        null,
        {
          params: requestData,
          headers: {
            "Content-Type": "application/json",
            adminMemberId: 1,
          },
        }
      );

      if (response.status === 202) {
        toast.success("Amount added successfully!", {
          id: toastId,
        });
      } else {
        throw new Error("Failed to add amount");
      }

      setIsDialogOpen(true);
      setIsConfirmDialogOpen(false);

      setFormData({
        memberId: "",
        amount: "",
      });
      setMemberName("");
    } catch (error) {
      toast.error(`Failed to add amount: ${error.response?.data || "Please try again."}`, {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>ADD AMOUNT TO WALLET</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
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
                  onClick={fetchWalletDetails}
                  type="button"
                  className="min-w-max"
                >
                  Get Member Details
                </Button>
              </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <Label htmlFor="amount">Amount to Add</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="space-y-2">
              <Button className="w-full" type="submit" variant="destructive">
                Add Amount
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {/* Success Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open)}
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Amount Added Successfully</DialogTitle>
          <DialogDescription>
            The amount has been added to the wallet of member <strong>{memberName}</strong> successfully.
          </DialogDescription>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
      {/* Confirmation Dialog */}
      <Dialog
        open={isConfirmDialogOpen}
        onOpenChange={(open) => setIsConfirmDialogOpen(open)}
      >
        <DialogContent>
          <DialogTitle>Confirm Add Amount</DialogTitle>
          <DialogDescription>
            Are you sure you want to add the amount of <strong>{formData.amount}</strong> to the wallet of member <strong>{memberName}</strong>?
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setIsConfirmDialogOpen(false)}>No</Button>
            <Button onClick={handleConfirmTransaction} variant="destructive">
              Yes, Add Amount
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
