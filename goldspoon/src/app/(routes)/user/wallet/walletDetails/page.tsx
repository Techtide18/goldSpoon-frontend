// @ts-nocheck
"use client";


import React, { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner"; // Assuming 'sonner' exposes a 'toast' function

export default function ViewWalletDetails() {
  const [walletDetails, setWalletDetails] = useState({});
  const [memberNumber, setMemberNumber] = useState("");

  const fetchWalletDetails = async () => {
    const session = await getSession();
    if (!session || !session.user || !session.user.name) {
      toast.error("You must be logged in to view this information.");
      return;
    }

    setMemberNumber(session.user.name);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payout/walletDetails`,
        {
          params: {
            pageSize: 1,
            pageNumber: 0,
            memberNumber: session.user.name,
          },
        }
      );

      if (
        response.data &&
        response.data.content &&
        response.data.content.length > 0
      ) {
        setWalletDetails(response.data.content[0]);
      } else {
        setWalletDetails({});
        toast.error("No data returned from the server.");
      }
      toast.success("Fetched wallet details.");
    } catch (error) {
      toast.error("Failed to fetch wallet details.");
      console.error("Failed to fetch wallet details:", error);
    }
  };

  useEffect(() => {
    fetchWalletDetails(); // Fetch data on component mount
  }, []);

  return (
    <div className="flex justify-center items-start py-4 px-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-5xl mt-4">
        {/* Wallet Details Card */}
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-2xl font-bold p-4">
              VIEW WALLET DETAILS
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {walletDetails && walletDetails.walletDetails ? (
              <>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-md capitalize text-black">
                    Name:
                  </span>
                  <span className="text-gray-700 text-md">
                    {walletDetails.fullName}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-md capitalize text-black">
                    Current Balance:
                  </span>
                  <span className="text-gray-700 text-md">
                    {walletDetails.walletDetails.currentBalance}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-md capitalize text-black">
                    Approved Balance:
                  </span>
                  <span className="text-gray-700 text-md">
                    {walletDetails.walletDetails.approvedBalance}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-md capitalize text-black">
                    Total Direct Income:
                  </span>
                  <span className="text-gray-700 text-md">
                    {walletDetails.totalDirectIncome}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-md capitalize text-black">
                    Total Level Income:
                  </span>
                  <span className="text-gray-700 text-md">
                    {walletDetails.totalLevelIncome}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-md capitalize text-black">
                    Total Income History:
                  </span>
                  <span className="text-gray-700 text-md">
                    {walletDetails.walletDetails.totalIncomeHistory}
                  </span>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">Loading...</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
