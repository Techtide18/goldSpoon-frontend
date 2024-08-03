"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
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

export default function AddInstallment() {
  const [formData, setFormData] = useState({
    amountToBePaid: "",
    transactionId: "",
    remarks: "",
  });

  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [currentBalance, setCurrentBalance] = useState<string | number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [installmentsPaidTillNow, setInstallmentsPaidTillNow] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMemberDetails = async () => {
      const session = await getSession();
      if (!session || !session.user || !session.user.name) {
        toast.error("You must be logged in to view this information.");
        return;
      }

      const memberId = session.user.name; // Assuming memberId is stored in user.name
      setMemberId(memberId);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/member/wallet/${memberId}`,
          {
            headers: {
              adminMemberId: 1,
            },
          }
        );
        const memberData = response.data;
        setMemberName(memberData.memberName);
        setFormData((prevData) => ({
          ...prevData,
          amountToBePaid: memberData.packagePrice,
        }));
        setCurrentBalance(memberData.walletBalance);

        if (!memberData.walletBalance) {
          toast.error("Failed to fetch wallet details. Cannot proceed.");
        }

        if (!memberData.packagePrice) {
          toast.error("Failed to fetch installment amount to be paid. Cannot proceed.");
        }
      } catch (error) {
        console.error("Error fetching member details:", error);
        setMemberName("Unknown");
        setFormData((prevData) => ({
          ...prevData,
          amountToBePaid: "",
        }));
        setCurrentBalance(null);
        toast.error("Error fetching member details. Cannot proceed.");
      }
    };

    fetchMemberDetails();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { amountToBePaid } = formData;

    // Validate if currentBalance is null or 0
    if (currentBalance === null || currentBalance === 0) {
      setErrorMessage("Current balance is zero or unavailable. Cannot proceed.");
      setErrorDialogOpen(true);
      return;
    }

    // Validate if amountToBePaid is missing
    if (!amountToBePaid) {
      setErrorMessage("Installment amount to be paid is missing. Cannot proceed.");
      setErrorDialogOpen(true);
      return;
    }

    // Validate if currentBalance is less than amountToBePaid
    if (parseInt(currentBalance.toString()) < parseInt(amountToBePaid)) {
      setErrorMessage("Your current balance is less than the installment amount to be paid.");
      setErrorDialogOpen(true);
      return;
    }

    setConfirmDialogOpen(true);
  };

  const handleConfirmSubmit = async () => {
    const { amountToBePaid, transactionId, remarks } = formData;

    const requestData = {
      memberNumber: memberId,
      amountFromWallet: parseInt(amountToBePaid),
      paymentMethod: "Wallet Amount",
      amount: 0,
      remarks,
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
      setConfirmDialogOpen(false);
    } catch (error) {
      toast.error("Failed to add installment. Please try again.", {
        id: toastId,
      });
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle>ADD INSTALLMENT</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <Label htmlFor="currentBalance">Current Balance in Wallet</Label>
              <Input
                id="currentBalance"
                name="currentBalance"
                placeholder="Auto Generated"
                value={currentBalance ?? ""}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
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
        open={confirmDialogOpen}
        onOpenChange={(open) => setConfirmDialogOpen(open)}
        className="mt-8 mb-8"
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Confirm Payment</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>Do you confirm the payment of the installment amount from your wallet?</p>
              <p>
                <strong>Installment Amount: {formData.amountToBePaid}</strong>
              </p>
            </div>
          </DialogDescription>
          <Button onClick={handleConfirmSubmit}>Confirm</Button>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            window.location.reload();
          }
        }}
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Installment Added</DialogTitle>
          <DialogDescription>
            <div className="mt-2 space-y-2">
              <p><strong>Successfully added installment for the member.</strong></p>
              <p>
                <strong>
                  Total Installments Paid Till Now: {installmentsPaidTillNow}
                </strong>
              </p>
            </div>
          </DialogDescription>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={errorDialogOpen}
        onOpenChange={(open) => setErrorDialogOpen(open)}
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Error</DialogTitle>
          <DialogDescription>
            <div className="space-y-2">
              <strong><p>{errorMessage}</p></strong>
            </div>
          </DialogDescription>
          <Button onClick={() => setErrorDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
