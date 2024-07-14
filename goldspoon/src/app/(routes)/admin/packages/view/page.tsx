"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar"

// Simulated Data
const simulatedPayouts = [
  {
    memberId: "M001",
    dateTime: "2024-06-15 10:00:00",
    receivedMoneyFor: "M002",
    amountReceived: "500",
    incomeType: "Referral Income",
  },
  {
    memberId: "M003",
    dateTime: "2024-06-20 14:30:00",
    receivedMoneyFor: "M004",
    amountReceived: "300",
    incomeType: "Level Income",
  },
  // Add more payouts for testing
];

export default function ViewMonthlyPayout() {
  const [viewOption, setViewOption] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [filteredPayouts, setFilteredPayouts] = useState(simulatedPayouts);
  const [showPayoutDetails, setShowPayoutDetails] = useState(true);

  const handleViewAll = () => {
    setViewOption("all");
    setFilteredPayouts(simulatedPayouts);
    setSelectedMonth(null);
    setShowPayoutDetails(true);
  };

  const handleViewByMonth = () => {
    setViewOption("byMonth");
    setShowPayoutDetails(false);
  };

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  const getPayoutDetails = () => {
    if (!selectedMonth) {
      return toast.error("Please select a month.");
    }

    const month = selectedMonth.getMonth() + 1; // getMonth() returns 0-11
    const year = selectedMonth.getFullYear();

    const payoutData = simulatedPayouts.filter((payout) => {
      const payoutDate = new Date(payout.dateTime);
      return payoutDate.getMonth() + 1 === month && payoutDate.getFullYear() === year;
    });

    if (payoutData.length === 0) {
      toast.error("No payout details found for the selected month.");
      setShowPayoutDetails(true); // Ensure the card remains visible
      setFilteredPayouts([]);
      return;
    }

    setFilteredPayouts(payoutData);
    setShowPayoutDetails(true);
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <div className="w-full max-w-7xl space-y-8">
        {/* View Options Card */}
        <Card>
          <CardHeader>
            <CardTitle>View Monthly Payout Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <Button
                className={`font-bold ${viewOption === "all" ? "bg-black text-white" : "border-black"}`}
                onClick={handleViewAll}
                variant={viewOption === "all" ? "solid" : "outline"}
              >
                View All
              </Button>
              <Button
                className={`font-bold ${viewOption === "byMonth" ? "bg-black text-white" : "border-black"}`}
                onClick={handleViewByMonth}
                variant={viewOption === "byMonth" ? "solid" : "outline"}
              >
                View by Month
              </Button>
            </div>
            {viewOption === "byMonth" && (
              <div className="flex flex-col items-center space-y-4 mt-4">
                <Calendar
                  onChange={handleMonthChange}
                  value={selectedMonth}
                  view="year"
                  onClickMonth={handleMonthChange}
                  className="border p-2 rounded-md w-1/2"
                  tileClassName="text-center"
                  selectionType="month"
                />
                <Input
                  id="selectedMonth"
                  name="selectedMonth"
                  placeholder="Selected Month"
                  value={selectedMonth ? selectedMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : ''}
                  readOnly
                  className="w-1/2 transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
                <Button className="w-1/2" onClick={getPayoutDetails}>Get Payout Details</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payout Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Payout Details</CardTitle>
          </CardHeader>
          <CardContent>
            {showPayoutDetails ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received Money For (Member ID)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Received</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Income Type</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayouts.length > 0 ? (
                    filteredPayouts.map((payout, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payout.memberId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.dateTime}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.receivedMoneyFor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.amountReceived}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.incomeType}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No payout details found for the selected month.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-500">Select a view option to see details.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
