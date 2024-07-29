// @ts-nocheck
"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ViewMonthlyPayout = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [filteredPayouts, setFilteredPayouts] = useState([]);
  const [showPayoutDetails, setShowPayoutDetails] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const fetchPayouts = useCallback(async (month) => {
    try {
      const params = {
        pageNumber: 0,
        pageSize: 2,
        month,
      };

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payout`, {
        params,
        headers: {
          "Content-Type": "application/json",
          adminMemberId: 1,
        },
      });

      const payoutData = response.data.content.map((payout) => ({
        memberId: payout.receivingMemberNumber,
        dateTime: formatDate(payout.receivedDate),
        receivedMoneyFor: payout.receivedFromMemberNumber,
        amountReceived: payout.receivedAmount,
        level: payout.level,
        incomeType: payout.isDirectIncome
          ? "Direct Income"
          : payout.isLevelIncome
          ? "Level Income"
          : "Unknown",
      }));

      setFilteredPayouts(payoutData);
      toast.success("Payout data fetched successfully.");
    } catch (error) {
      console.error("Error fetching payouts:", error);
      toast.error("Failed to fetch payouts data.");
    }
  }, []);

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  const getPayoutDetails = () => {
    if (!selectedMonth) {
      return toast.error("Please select a month.");
    }

    const month = `${selectedMonth.getFullYear()}-${String(
      selectedMonth.getMonth() + 1
    ).padStart(2, "0")}`;

    fetchPayouts(month);
    setShowPayoutDetails(true);
    toast.success("Payout details fetched successfully.");
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <div className="w-full max-w-7xl space-y-8">
        {/* View by Month Card */}
        <Card>
          <CardHeader>
            <CardTitle>VIEW MONTHLY PAYOUT DETAILS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row items-center md:items-center md:space-x-4 mt-4">
              <div className="border p-2 rounded-md w-full md:w-1/4 mb-4 md:mb-0 flex justify-center md:block">
                <Calendar
                  onChange={handleMonthChange}
                  value={selectedMonth}
                  view="year"
                  onClickMonth={handleMonthChange}
                  className="react-calendar"
                  tileClassName="text-center"
                  showNavigation={true}
                />
              </div>
              <div className="flex flex-col space-y-4 w-full md:w-3/4 justify-center">
                <Input
                  id="selectedMonth"
                  name="selectedMonth"
                  placeholder="Selected Month"
                  value={
                    selectedMonth
                      ? selectedMonth.toLocaleDateString("en-GB", {
                          month: "long",
                          year: "numeric",
                        })
                      : ""
                  }
                  readOnly
                  className="w-full transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
                <Button className="w-full" onClick={getPayoutDetails}>
                  Get Monthly Payout Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payout Details Card */}
        {showPayoutDetails && (
          <Card>
            <CardHeader>
              <CardTitle>Payout Details</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payout Month
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount Received
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Income Type
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayouts.length > 0 ? (
                    filteredPayouts.map((payout, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payout.dateTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payout.amountReceived}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payout.incomeType}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No payout details found for the selected month.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// Wrap the component export in dynamic import to disable SSR
export default dynamic(() => Promise.resolve(ViewMonthlyPayout), { ssr: false });
