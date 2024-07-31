"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
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
} from "@/components/ui/dialog";

// Simulated API call to fetch member details
const fetchMemberDetails = (memberId: string): Promise<{ memberName: string; currentBalance: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const memberDetails = {
        memberName: "John Doe",
        currentBalance: "2000",
      };
      resolve(memberDetails);
    }, 500);
  });
};

export default function FundTransfer() {
  const [formData, setFormData] = useState({
    memberId: "",
    amountToTransfer: "",
  });

  const [memberDetails, setMemberDetails] = useState<{ memberName: string; currentBalance: string }>({
    memberName: "",
    currentBalance: "",
  });

  const [finalAmount, setFinalAmount] = useState("");
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
        currentBalance: "",
      });
    }
  }, [formData.memberId]);

  useEffect(() => {
    if (formData.amountToTransfer) {
      const amount = parseInt(formData.amountToTransfer);
      if (!isNaN(amount)) {
        setFinalAmount((amount * 0.95).toFixed(2));
      } else {
        setFinalAmount("");
      }
    } else {
      setFinalAmount("");
    }
  }, [formData.amountToTransfer]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.memberId) {
      return toast.error("Please fill out the Member ID field.");
    }

    if (!formData.amountToTransfer || parseInt(formData.amountToTransfer) <= 0) {
      return toast.error("Please enter a valid amount to transfer.");
    }

    if (parseInt(formData.amountToTransfer) > parseInt(memberDetails.currentBalance)) {
      setErrorMessage(
        "Amount to Transfer cannot be greater than the Current Balance in Wallet."
      );
      setErrorDialogOpen(true);
      return;
    }

    if (parseInt(memberDetails.currentBalance) < parseFloat(finalAmount)) {
      setErrorMessage(
        "Your current balance is less than the final amount to be transferred."
      );
      setErrorDialogOpen(true);
      return;
    }

    setIsDialogOpen(true);
  };

  const handleConfirmTransfer = async () => {
    const toastId = toast.loading("Processing Transfer...");
    // Simulate API call to process transfer
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success("Transfer processed successfully!", {
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
          <CardTitle>FUND TRANSFER</CardTitle>
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
              <Label htmlFor="currentBalance">Current Balance in Wallet</Label>
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
              <Label htmlFor="amountToTransfer">Amount to Transfer</Label>
              <Input
                id="amountToTransfer"
                name="amountToTransfer"
                placeholder="Enter Amount"
                value={formData.amountToTransfer}
                onChange={handleChange}
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <Label htmlFor="finalAmount">Final Amount (5% deduction)</Label>
              <Input
                id="finalAmount"
                name="finalAmount"
                placeholder="Auto Generated"
                value={finalAmount}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="space-y-2">
              <Button className="w-full" type="submit" variant="destructive">
                Send
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Confirm Transfer Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open)}
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Confirm Transfer</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>Are you sure you want to process the transfer?</p>
              <p>
                Member ID: <strong>{formData.memberId}</strong>
              </p>
              <p>
                Member Name: <strong>{memberDetails.memberName}</strong>
              </p>
              <p>
                Amount to Transfer: <strong>{formData.amountToTransfer}</strong>
              </p>
              <p>
                Final Amount to be Transferred: <strong>{finalAmount}</strong>
              </p>
            </div>
          </DialogDescription>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmTransfer}>
              Confirm Transfer
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
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Transfer Successful</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>
                Transfer has been successfully processed for Member ID{" "}
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