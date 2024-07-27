// @ts-nocheck
"use client";


import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function GeneratePayout() {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("New payout is generating...");

  useEffect(() => {
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();

    // Check the date condition
    const isDateConditionMet = dayOfMonth >= 15;

    // Call the check API
    const checkPayoutStatus = async () => {
      try {
        const response = await axios.get(
          "https://goldspoon.in/api/admin/job/check",
          {
            headers: {
              "Content-Type": "application/json",
              adminMemberId: 1,
            },
          }
        );
        // Enable the button only if the date condition is met and the API returns false
        setIsButtonEnabled(isDateConditionMet && !response.data);
      } catch (error) {
        console.error("Error checking payout status:", error);
      }
    };

    checkPayoutStatus();
  }, []);

  const handleClick = async () => {
    setIsButtonEnabled(false);
    setIsLoading(true);
    setIsDialogOpen(true);

    try {
      const response = await axios.post(
        "https://goldspoon.in/api/admin/job/generate/levelIncome"
      );

      // Simulate 5-second delay
      await new Promise((resolve) => setTimeout(resolve, 5000));

      if (response.status === 200) {
        setMessage("This month's payout has been generated successfully!");
        toast.success("This month's payout has been generated successfully!");
      } else {
        setMessage("Failed to generate payout. Please try again.");
        toast.error("Failed to generate payout. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to generate payout. Please try again.";
      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>GENERATE PAYOUT</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            This payout is used to add renewal income to wallets of all the
            users who have renewed their membership before or on 14th of the
            month.
          </p>
          <Button
            className="w-full"
            onClick={handleClick}
            disabled={!isButtonEnabled}
            variant="destructive"
          >
            Generate Payout
          </Button>
          {!isButtonEnabled && (
            <p className="text-red-500 text-center">
              Button can be used only between 15th and end of the month or the
              payout has already been generated.
            </p>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(true)}
        className="mt-8 mb-8"
      >
        <DialogContent className="max-h-screen overflow-y-auto text-center">
          <DialogTitle>Payout Generation</DialogTitle>
          <DialogDescription>
            {isLoading ? (
              <div className="flex flex-col items-center space-y-4">
                <svg
                  className="animate-spin h-10 w-10 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span className="text-lg font-semibold">
                  New payout is generating...
                </span>
              </div>
            ) : (
              <span className="font-semibold">{message}</span>
            )}
          </DialogDescription>
          {!isLoading && <Button onClick={handleClose}>Close</Button>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
