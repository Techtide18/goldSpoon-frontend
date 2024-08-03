// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
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

const fetchMemberDetails = async (memberId, forMemberNumber) => {
  const params = {};
  if (forMemberNumber) {
    params.forMemberNumber = forMemberNumber;
  }
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/member/wallet/${memberId}`,
    {
      headers: {
        adminMemberId: 1,
      },
      params,
    }
  );
  return response.data;
};

export default function PayRenewal() {
  const [formData, setFormData] = useState({
    forMemberNumber: "",
    remarks: "",
  });

  const [memberId, setMemberId] = useState("");
  const [memberDetails, setMemberDetails] = useState({
    memberName: "",
    packagePrice: "",
    walletBalance: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [installmentMonth, setInstallmentMonth] = useState("");

  useEffect(() => {
    const fetchInitialMemberDetails = async () => {
      const session = await getSession();
      if (!session || !session.user || !session.user.name) {
        toast.error("You must be logged in to view this information.");
        return;
      }

      const memberId = session.user.name; // Assuming memberId is stored in user.name
      setMemberId(memberId);
    };

    fetchInitialMemberDetails();
  }, []);

  const handleFetchMemberDetails = async () => {
    if (!formData.forMemberNumber) {
      toast.error("Please enter a Member Number to fetch details.");
      return;
    }

    try {
      const details = await fetchMemberDetails(
        memberId,
        formData.forMemberNumber
      );
      setMemberDetails(details);
    } catch (error) {
      console.error("Error fetching member details:", error);
      setErrorMessage("Error fetching member details. Please try again.");
      setErrorDialogOpen(true);
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

    if (
      parseInt(memberDetails.walletBalance) <
      parseInt(memberDetails.packagePrice)
    ) {
      setErrorMessage(
        "Your current balance is less than the installment amount to be paid."
      );
      setErrorDialogOpen(true);
      return;
    }

    setIsDialogOpen(true);
  };

  const handleConfirmPayment = async () => {
    const { forMemberNumber, remarks } = formData;
    const amount = parseInt(memberDetails.packagePrice);

    const requestData = {
      paidForMemberNumber: forMemberNumber,
      amountFromWallet: amount,
      paymentMethod: "Wallet Amount",
      paidByMemberNumber: memberId,
      amount: 0,
      remarks,
    };

    const toastId = toast.loading("Processing Payment...");
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/installments/add/member`,
        requestData,
        {
          headers: {
            adminMemberId: 1,
          },
        }
      );

      toast.success("Payment processed successfully!", {
        id: toastId,
      });

      setIsDialogOpen(false);
      setInstallmentMonth(response.data.installmentMonth); // Set the installmentMonth state with the response data
      setIsSuccessDialogOpen(true);
    } catch (error) {
      toast.error("Failed to process payment. Please try again.", {
        id: toastId,
      });
    }
  };

  const handleSuccessDialogClose = () => {
    setIsSuccessDialogOpen(false);
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>PAY INSTALLMENT FOR MEMBER</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <Label htmlFor="forMemberNumber">For Member Number</Label>
              <Input
                id="forMemberNumber"
                name="forMemberNumber"
                placeholder="Enter Member Number to Pay For"
                value={formData.forMemberNumber}
                onChange={handleChange}
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
              <Button
                onClick={handleFetchMemberDetails}
                className="md:col-span-2"
                type="button"
              >
                Get Member Details
              </Button>
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
              <Label htmlFor="packagePrice">
                Installment Amount to be Paid By Member
              </Label>
              <Input
                id="packagePrice"
                name="packagePrice"
                placeholder="Auto Generated"
                value={memberDetails.packagePrice}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <Label htmlFor="walletBalance">
                Current Balance in your Wallet
              </Label>
              <Input
                id="walletBalance"
                name="walletBalance"
                placeholder="Auto Generated"
                value={memberDetails.walletBalance}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
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
                Pay Next Installment for Member
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Confirm Payment Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open)}
        className="mt-8 mb-8"
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Confirm Payment</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>
                Are you sure you want to process the payment for another member?
              </p>
              <p>
                Member ID: <strong>{formData.forMemberNumber}</strong>
              </p>
              <p>
                Member Name: <strong>{memberDetails.memberName}</strong>
              </p>
              <p>
                Installment Amount to be Paid:{" "}
                <strong>{memberDetails.packagePrice}</strong>
              </p>
            </div>
          </DialogDescription>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmPayment}>
              Confirm Payment
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
        className="mt-8 mb-8"
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Payment Successful</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>
                Payment has been successfully processed for Member ID{" "}
                <strong>{formData.forMemberNumber}</strong>.
              </p>
              <p>
                Installment Month: {" "} <strong>{installmentMonth}</strong>
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
        className="mt-8 mb-8"
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
