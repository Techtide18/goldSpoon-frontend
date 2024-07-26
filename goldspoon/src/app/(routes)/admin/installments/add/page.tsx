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
    amountReceived: "",
    paymentMethod: "",
    transactionId: "",
    remarks: "",
  });

  const [memberName, setMemberName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [installmentsPaidTillNow, setInstallmentsPaidTillNow] = useState(0);

  const fetchMemberName = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/member/${formData.memberId}`,
        {
          headers: {
            adminMemberId: 1,
          },
        }
      );
      setMemberName(response.data.fullName);
    } catch (error) {
      console.error("Error fetching member name:", error);
      setMemberName("Unknown");
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
    const { memberId, amountReceived, paymentMethod, transactionId, remarks } =
      formData;

    if (!memberId || !amountReceived || !paymentMethod || !transactionId) {
      return toast.error("Please fill out all fields.");
    }

    const requestData = {
      memberNumber: memberId,
      amountPaid: parseInt(amountReceived),
      transactionId,
      paymentMethod,
      remarks,
    };

    const toastId = toast.loading("Adding Installment...");
    try {
      const response = await axios.put(
        "http://localhost:8080/installments/add",
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
        amountReceived: "",
        paymentMethod: "",
        transactionId: "",
        remarks: "",
      });
      setMemberName("");
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
                  onClick={fetchMemberName}
                  type="button"
                  className="min-w-max"
                >
                  Get Member Name
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
              <Label htmlFor="amountReceived">Amount Received</Label>
              <Input
                id="amountReceived"
                name="amountReceived"
                type="number"
                placeholder="Amount Received"
                value={formData.amountReceived}
                onChange={handleChange}
                required
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
                  <SelectItem value="Cash Deposit">Cash Deposit</SelectItem>
                  <SelectItem value="Paytm">Paytm</SelectItem>
                  <SelectItem value="Google Pay">Google Pay</SelectItem>
                  <SelectItem value="Phone Pay">Phone Pay</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                  <SelectItem value="Internet Banking">
                    Internet Banking
                  </SelectItem>
                  <SelectItem value="Money Order">Money Order</SelectItem>
                  <SelectItem value="Demand Draft">Demand Draft</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="transactionId">Payment Transaction ID</Label>
              <Input
                id="transactionId"
                name="transactionId"
                placeholder="Payment Transaction ID"
                value={formData.transactionId}
                onChange={handleChange}
                required
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                name="remarks"
                placeholder="Remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                rows={4} // This will make the textarea twice the height of a normal input
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
