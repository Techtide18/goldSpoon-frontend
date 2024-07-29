// @ts-nocheck
"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
} from "@/components/ui/dialog";

export default function AddInstallment() {
  const [formData, setFormData] = useState({
    memberId: "",
    amountToBePaid: "",
    paymentMethod: "",
    transactionId: "",
    remarks: "",
    walletUsedAmount: "",
  });

  const [memberName, setMemberName] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [installmentsPaidTillNow, setInstallmentsPaidTillNow] = useState(0);

  const fetchMemberDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/member/${formData.memberId}`,
        {
          headers: {
            adminMemberId: 1,
          },
        }
      );
      const memberData = response.data;
      setMemberName(memberData.fullName);
      setFormData((prevData) => ({
        ...prevData,
        amountToBePaid: memberData.amountToBePaid,
      }));
      setCurrentBalance(memberData.currentBalance);
    } catch (error) {
      console.error("Error fetching member details:", error);
      setMemberName("Unknown");
      setFormData((prevData) => ({
        ...prevData,
        amountToBePaid: "",
      }));
      setCurrentBalance("");
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
    const {
      memberId,
      amountToBePaid,
      paymentMethod,
      transactionId,
      remarks,
      walletUsedAmount,
    } = formData;

    if (!memberId) {
      return toast.error("Please fill out the Member ID.");
    }

    if (paymentMethod === "Wallet Amount + Cash/UPI" && walletUsedAmount > currentBalance) {
      return toast.error("Amount Used from Wallet cannot be more than Current Balance in Wallet.");
    }

    const requestData = {
      memberNumber: memberId,
      amountPaid: parseInt(amountToBePaid),
      transactionId: transactionId || undefined,
      paymentMethod,
      remarks,
      walletUsedAmount: walletUsedAmount ? parseInt(walletUsedAmount) : undefined,
    };

    const toastId = toast.loading("Adding Installment...");
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/installments/add`,
        requestData,
        {
          headers: {
            adminMemberId: 1,
          },
        }
      );

      toast.success("Installment added successfully!", {
        id: toastId,
      });

      setInstallmentsPaidTillNow(response.data.installmentsPaidTillNow);
      setIsDialogOpen(true);
      setFormData({
        memberId: "",
        amountToBePaid: "",
        paymentMethod: "",
        transactionId: "",
        remarks: "",
        walletUsedAmount: "",
      });
      setMemberName("");
      setCurrentBalance("");
    } catch (error) {
      toast.error("Failed to add installment. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>ADD INSTALLMENT</CardTitle>
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
              <Label htmlFor="currentBalance">Current Balance in Wallet</Label>
              <Input
                id="currentBalance"
                name="currentBalance"
                placeholder="Auto Generated"
                value={currentBalance}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="amountToBePaid">Installment Amount to be Paid</Label>
              <Input
                id="amountToBePaid"
                name="amountToBePaid"
                type="number"
                placeholder="Auto Generated"
                value={formData.amountToBePaid}
                onChange={handleChange}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                name="paymentMethod"
                value={formData.paymentMethod}
                onValueChange={(value) =>
                  setFormData({ ...formData, paymentMethod: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="UPI + Cash">UPI + Cash</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Net Banking">Net Banking</SelectItem>
                  <SelectItem value="Wallet Amount">Wallet Amount</SelectItem>
                  <SelectItem value="Wallet Amount + Cash/UPI">
                    Wallet Amount + Cash/UPI
                  </SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.paymentMethod.includes("UPI") && (
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="transactionId">Payment Transaction ID</Label>
                <Input
                  id="transactionId"
                  name="transactionId"
                  placeholder="Payment Transaction ID"
                  value={formData.transactionId}
                  onChange={handleChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
            )}
            {formData.paymentMethod === "Wallet Amount + Cash/UPI" && (
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="walletUsedAmount">
                  Amount Used from Wallet
                </Label>
                <Input
                  id="walletUsedAmount"
                  name="walletUsedAmount"
                  type="number"
                  placeholder="Amount Used from Wallet"
                  value={formData.walletUsedAmount}
                  onChange={handleChange}
                  required
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 items-center">
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
                Add Installment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(true)}
        className="mt-8 mb-8"
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Installment Added</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>Successfully added installment for the member.</p>
              <p>
                <strong>
                  Total Installments Paid Till Now: {installmentsPaidTillNow}
                </strong>
              </p>
            </div>
          </DialogDescription>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
