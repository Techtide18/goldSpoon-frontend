"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { toast } from "sonner";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported

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
  {
    memberId: "M004",
    dateTime: "2024-07-01 12:00:00",
    receivedMoneyFor: "M005",
    amountReceived: "200",
    incomeType: "Referral Income",
  },
  {
    memberId: "M006",
    dateTime: "2024-07-02 15:45:00",
    receivedMoneyFor: "M007",
    amountReceived: "150",
    incomeType: "Level Income",
  },
  {
    memberId: "M008",
    dateTime: "2024-07-05 10:30:00",
    receivedMoneyFor: "M009",
    amountReceived: "100",
    incomeType: "Referral Income",
  },
];

const PAGE_SIZE = 100;

export default function ViewMonthlyPayout() {
  const [viewOption, setViewOption] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [filteredPayouts, setFilteredPayouts] = useState(simulatedPayouts);
  const [showPayoutDetails, setShowPayoutDetails] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const handleViewAll = () => {
    setViewOption("all");
    setFilteredPayouts(simulatedPayouts);
    setSelectedMonth(null);
    setShowPayoutDetails(true);
    setCurrentPage(1);
  };

  const handleViewByMonth = () => {
    setViewOption("byMonth");
    setShowPayoutDetails(false);
    setCurrentPage(1);
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
      return (
        payoutDate.getMonth() + 1 === month && payoutDate.getFullYear() === year
      );
    });

    if (payoutData.length === 0) {
      toast.error("No payout details found for the selected month.");
      setShowPayoutDetails(true); // Ensure the card remains visible
      setFilteredPayouts([]);
      return;
    }

    setFilteredPayouts(payoutData);
    setShowPayoutDetails(true);
    setCurrentPage(1);
    toast.success("Payout details fetched successfully.");
  };

  const totalPages = Math.ceil(filteredPayouts.length / PAGE_SIZE);
  const paginatedPayouts = filteredPayouts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

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
                className={`font-bold ${
                  viewOption === "all" ? "bg-black text-white" : "border-black"
                }`}
                onClick={handleViewAll}
                variant={viewOption === "all" ? "solid" : "outline"}
              >
                View All
              </Button>
              <Button
                className={`font-bold ${
                  viewOption === "byMonth"
                    ? "bg-black text-white"
                    : "border-black"
                }`}
                onClick={handleViewByMonth}
                variant={viewOption === "byMonth" ? "solid" : "outline"}
              >
                View by Month
              </Button>
            </div>
            {viewOption === "byMonth" && (
              <div className="flex items-center space-x-4 mt-4">
                <div className="border p-2 rounded-md w-1/4">
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
                <div className="flex flex-col space-y-4 w-3/4">
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
                    Get Payout Details
                  </Button>
                </div>
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
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Received Money For (Member ID)
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
                {paginatedPayouts.length > 0 ? (
                  paginatedPayouts.map((payout, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payout.memberId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payout.dateTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payout.receivedMoneyFor}
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
                      colSpan="5"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No payout details found for the selected month.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              siblingCount={1}
              boundaryCount={1}
              size="large"
              shape="rounded"
              variant="outlined"
              color="primary"
              className="mt-4"
              showFirstButton
              showLastButton
            />
            <div className="flex space-x-2">
              <Button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous 100
              </Button>
              <Button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next 100
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
