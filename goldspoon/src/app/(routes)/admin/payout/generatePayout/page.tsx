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
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [message, setMessage] = useState("New payout is generating...");

  useEffect(() => {
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();

    // Check if the date is between 15th and end of the month
    if (dayOfMonth >= 15) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }

    // Check if the button has been clicked this month
    const lastClicked = localStorage.getItem("lastClicked");
    if (lastClicked) {
      const lastClickedDate = new Date(lastClicked);
      if (
        lastClickedDate.getMonth() === currentDate.getMonth() &&
        lastClickedDate.getFullYear() === currentDate.getFullYear()
      ) {
        setIsButtonClicked(true);
        setIsButtonEnabled(false);
      }
    }
  }, []);

  const handleClick = async () => {
    const currentDate = new Date();
   // localStorage.setItem("lastClicked", currentDate.toString());
    setIsButtonClicked(true);
    setIsButtonEnabled(false);

    setIsLoading(true);
    setIsDialogOpen(true);

    // Simulate API call to generate payout with a delay
    await new Promise((resolve) => setTimeout(resolve, 7000));

    try {
      const response = await axios.post(
        "http://localhost:8080/admin/job/generate/levelIncome"
      );

      if (response.status === 200) {
        setMessage("This month's payout has been generated successfully!");
        toast.success("This month's payout has been generated successfully!");
      } else {
        setMessage("Failed to generate payout. Please try again.");
        toast.error("Failed to generate payout. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to generate payout. Please try again.";
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
            disabled={!isButtonEnabled || isButtonClicked}
            variant="destructive"
          >
            Generate Payout
          </Button>
          {!isButtonEnabled && (
            <p className="text-red-500 text-center">
              Button can be used only between 15th and end of the month
            </p>
          )}
          {isButtonClicked && (
            <p className="text-red-500 text-center">
              Payout has already been generated this month
            </p>
          )}
        </CardContent>
      </Card>

      {/* Success Dialog */}
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
