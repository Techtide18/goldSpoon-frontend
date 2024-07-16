"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Simulated Data for Wallet Details
const simulatedWalletDetails = {
  currentBalance: "10,000",
  approvedBalance: "8,000",
  totalIncomeHistory: "50,000",
  renewalIncomeLastMonth: "2,000",
  levelIncomeLastMonth: "1,500",
  totalRenewalIncomeHistory: "20,000",
  totalLevelIncomeHistory: "15,000",
};

export default function ViewWalletDetails() {
  const [walletDetails] = useState(simulatedWalletDetails);

  return (
    <div className="flex justify-center items-start py-4 px-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-5xl mt-4">
        {/* Wallet Details Card */}
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-2xl font-bold p-4">VIEW WALLET DETAILS</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {Object.entries(walletDetails).map(([key, value]) => (
              <div
                className="flex justify-between items-center py-2 border-b border-gray-200"
                key={key}
              >
                <span className="font-semibold text-md capitalize text-black">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  :
                </span>
                <span className="text-gray-700 text-md">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
