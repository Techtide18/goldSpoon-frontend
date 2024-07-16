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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Simulated API call to fetch current amount available
const fetchCurrentAmount = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentAmount = 1000; // Example amount
      resolve(currentAmount);
    }, 500);
  });
};

export default function AddWithdrawalRequest() {
  const [formData, setFormData] = useState({
    withdrawalAmount: "",
  });

  const [currentAmount, setCurrentAmount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  useEffect(() => {
    fetchCurrentAmount().then((amount) => {
      setCurrentAmount(amount);
    });
  }, []);

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
      return toast.error("Withdrawal amount exceeds current available amount.");
    }

    setIsDialogOpen(true);
  };

  const handleConfirmWithdrawal = async () => {
    const toastId = toast.loading("Processing Withdrawal Request...");
    // Simulate API call to process withdrawal request
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success("Withdrawal request processed successfully!", {
      id: toastId,
    });

    setIsDialogOpen(false);
    setIsSuccessDialogOpen(true);

    // Reset form
    setFormData({
      withdrawalAmount: "",
    });
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>ADD WITHDRAWAL REQUEST</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="currentAmount">Current Amount Available</Label>
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
                Amount to Withdraw: <strong>{formData.withdrawalAmount}</strong>
              </p>
              <p>
                Current Amount Available: <strong>{currentAmount}</strong>
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
          <DialogTitle>Withdrawal Successful</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>
                Withdrawal request has been successfully processed for the amount of{" "}
                <strong>{formData.withdrawalAmount}</strong>.
              </p>
            </div>
          </DialogDescription>
          <Button onClick={() => setIsSuccessDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
