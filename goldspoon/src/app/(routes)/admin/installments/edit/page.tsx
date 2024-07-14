"use client";

import { useState } from "react";
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
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function EditInstallment() {
  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [installmentMonth, setInstallmentMonth] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [installmentData, setInstallmentData] = useState({
    installmentMonth: "",
    amountPaid: "",
    transactionId: "",
    paymentMethod: "",
  });

  const handleMemberIdChange = (e) => {
    setMemberId(e.target.value);
  };

  const getInstallmentDetails = async () => {
    if (!memberId || !installmentMonth) {
      return toast.error("Please enter Member ID and select Installment Month.");
    }

    // Simulate an API call to fetch installment details
    const toastId = toast.loading("Fetching Installment Details...");
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulate fetched data
    const fetchedData = {
      installmentMonth: "January",
      amountPaid: "1500",
      transactionId: "TXN1234567890",
      paymentMethod: "GPay",
    };

    setInstallmentData(fetchedData);
    setMemberName("John Doe");
    toast.success("Installment details fetched successfully!", { id: toastId });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstallmentData({
      ...installmentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { amountPaid, transactionId, paymentMethod } = installmentData;

    if (!amountPaid || !transactionId || !paymentMethod) {
      return toast.error("Please fill out all fields.");
    }

    const toastId = toast.loading("Updating Installment Details...");
    // Simulate API call to update installment details
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success("Installment details updated successfully!", {
      id: toastId,
    });

    setIsDialogOpen(true);
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <div className="w-full max-w-7xl space-y-8">
        {/* First Card */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Installment - Step 1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="memberId">Member ID</Label>
                <Input
                  id="memberId"
                  name="memberId"
                  placeholder="Member ID"
                  value={memberId}
                  onChange={handleMemberIdChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="installmentMonth">Installment Month</Label>
                <Select
                  name="installmentMonth"
                  value={installmentMonth}
                  onValueChange={(value) => setInstallmentMonth(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Installment Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 15 }, (_, i) => (
                      <SelectItem key={i + 1} value={`Month-${i + 1}`}>
                        Month - {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              <Button className="w-full" onClick={getInstallmentDetails}>
                Get Installment Details for Member
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Second Card */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Installment - Step 2</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="installmentMonth">Installment Month</Label>
                <Input
                  id="installmentMonth"
                  name="installmentMonth"
                  placeholder="Installment Month"
                  value={installmentData.installmentMonth}
                  readOnly
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="amountPaid">Amount Paid (Rupees)</Label>
                <Input
                  id="amountPaid"
                  name="amountPaid"
                  placeholder="Amount Paid"
                  value={installmentData.amountPaid}
                  onChange={handleChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="transactionId">Transaction ID</Label>
                <Input
                  id="transactionId"
                  name="transactionId"
                  placeholder="Transaction ID"
                  value={installmentData.transactionId}
                  onChange={handleChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  name="paymentMethod"
                  value={installmentData.paymentMethod}
                  onValueChange={(value) =>
                    setInstallmentData({ ...installmentData, paymentMethod: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GPay">GPay</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                    <SelectItem value="NetBanking">NetBanking</SelectItem>
                    <SelectItem value="Card">Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" type="submit">
                Update Installment Detail for Member
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => open && setIsDialogOpen(true)}
        className="mt-8 mb-8"
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Installment Updated</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>Installment details updated successfully!</p>
            </div>
          </DialogDescription>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
