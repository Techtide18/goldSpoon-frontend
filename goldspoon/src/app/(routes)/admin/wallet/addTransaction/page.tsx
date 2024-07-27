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
  const [approvedBalance, setApprovedBalance] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchWalletDetails = async () => {
    try {
      const response = await axios.get(
        "https://goldspoon.in/api/payout/walletDetails",
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
      setApprovedBalance(memberDetails.walletDetails.approvedBalance || "0");

      toast.success("Fetched wallet details successfully.");
    } catch (error) {
      console.error("Error fetching wallet details:", error);
      setMemberName("Unknown");
      setApprovedBalance("0");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { memberId, transactionType, amount, note } = formData;

    if (!memberId || !transactionType || !amount) {
      return toast.error("Please fill out all required fields.");
    }

    if (parseInt(amount) > parseInt(approvedBalance)) {
      return toast.error("Amount cannot be greater than Approved Balance.");
    }

    const requestData = {
      memberNumber: memberId,
      transactionType,
      amount: parseInt(amount),
      note,
    };

    const toastId = toast.loading("Adding Transaction...");
    try {
      await axios.post(
        `https://goldspoon.in/api/payout/transaction/${formData.memberId}`,
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

      setFormData({
        memberId: "",
        transactionType: "",
        amount: "",
        note: "",
      });
      setMemberName("");
      setApprovedBalance("");
    } catch (error) {
      toast.error(`Failed to complete transaction: ${error.response?.data || "Please try again."}`, {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>ADD TRANSACTION</CardTitle>
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
                  onClick={fetchWalletDetails}
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
              <Label htmlFor="approvedBalance">Approved Balance</Label>
              <Input
                id="approvedBalance"
                name="approvedBalance"
                placeholder="Auto Generated"
                value={approvedBalance}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
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
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="amount">Amount</Label>
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
            <div className="grid grid-cols-2 gap-4 items-center">
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
    </div>
  );
}
