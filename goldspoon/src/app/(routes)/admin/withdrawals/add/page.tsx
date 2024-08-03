// @ts-nocheck
"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming Textarea component exists
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AddTransaction() {
  const [formData, setFormData] = useState({
    memberId: "",
    transactionType: "",
    amount: "",
    note: "",
  });

  const [memberName, setMemberName] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
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
      setCurrentBalance(memberDetails.walletDetails.currentBalance || "0");

      toast.success("Fetched wallet details successfully.");
    } catch (error) {
      console.error("Error fetching wallet details:", error);
      setMemberName("Unknown");
      setCurrentBalance("0");
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
    const { memberId, transactionType, amount } = formData;

    if (!memberId || !transactionType || !amount) {
      return toast.error("Please fill out all required fields.");
    }

    const amountToWithdraw = parseInt(amount);
    if (amountToWithdraw > parseInt(currentBalance)) {
      setErrorDialogOpen(true);
      return;
    }

    setIsConfirmDialogOpen(true);
  };

  const handleConfirmTransaction = async () => {
    const { memberId, transactionType, amount, note } = formData;
    const amountToWithdraw = parseInt(amount);
    const requestData = {
      memberNumber: memberId,
      transactionType,
      amount: amountToWithdraw,
      note,
    };

    const toastId = toast.loading("Adding Transaction...");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payout/transaction/${formData.memberId}`,
        requestData,
        {
          headers: {
            adminMemberId: 1,
          },
        }
      );

      toast.success("Transaction completed successfully!", {
        id: toastId,
      });

      setIsDialogOpen(true);
      setIsConfirmDialogOpen(false);

      setFormData({
        memberId: "",
        transactionType: "",
        amount: "",
        note: "",
      });
      setMemberName("");
      setCurrentBalance("");
    } catch (error) {
      toast.error(`Failed to complete transaction: ${error.response?.data || "Please try again."}`, {
        id: toastId,
      });
    }
  };

  const finalAmount = formData.amount ? parseInt(formData.amount) * 0.9 : 0;

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>ADD TRANSACTION</CardTitle>
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
              <Label htmlFor="currentBalance">Current Balance Amount</Label>
              <Input
                id="currentBalance"
                name="currentBalance"
                placeholder="Auto Generated"
                value={currentBalance}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <Label htmlFor="amount">Transaction Amount</Label>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <Label htmlFor="transactionType">Transaction Type</Label>
              <Select
                name="transactionType"
                value={formData.transactionType}
                onValueChange={(value) =>
                  setFormData({ ...formData, transactionType: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Transaction Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CASH">CASH</SelectItem>
                  <SelectItem value="GIFT">GIFT</SelectItem>
                  <SelectItem value="GOLD">GOLD</SelectItem>
                  <SelectItem value="OTHERS">OTHERS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <Label htmlFor="finalAmount">Final Amount (after 10% admin charge)</Label>
             <Input
                id="finalAmount"
                name="finalAmount"
                placeholder="Auto Generated"
                value={finalAmount}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <Label htmlFor="note">Note</Label>
              <Textarea
                id="note"
                name="note"
                placeholder="Note"
                value={formData.note}
                onChange={handleChange}
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                rows={4} // This will make the textarea bigger
              />
            </div>
            <div className="space-y-2">
              <Button className="w-full" type="submit" variant="destructive">
                Complete Transaction
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
          <DialogTitle>Transaction Successful</DialogTitle>
          <DialogDescription>
            The transaction for member <strong>{memberName}</strong> has been completed successfully.
          </DialogDescription>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
      {/* Error Dialog */}
      <Dialog
        open={errorDialogOpen}
        onOpenChange={(open) => setErrorDialogOpen(open)}
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Transaction Error</DialogTitle>
          <DialogDescription>
            The amount to withdraw exceeds the current balance.
          </DialogDescription>
          <Button onClick={() => setErrorDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
      {/* Confirmation Dialog */}
      <Dialog
        open={isConfirmDialogOpen}
        onOpenChange={(open) => setIsConfirmDialogOpen(open)}
      >
        <DialogContent>
          <DialogTitle>Confirm Transaction</DialogTitle>
          <DialogDescription>
            Are you sure you want to complete the transaction for member{" "}
            <strong>{memberName}</strong> with the amount{" "}
            <strong>{formData.amount}</strong> (final amount after 10% cut:{" "}
            <strong>{finalAmount}</strong>)?
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setIsConfirmDialogOpen(false)}>No</Button>
            <Button onClick={handleConfirmTransaction} variant="destructive">
              Yes, Complete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
