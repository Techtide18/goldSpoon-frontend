// @ts-nocheck
"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const PAGE_SIZE = 100;

const ViewMonthlyPayout = () => {
  const [viewOption, setViewOption] = useState("byMonth");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [filteredPayouts, setFilteredPayouts] = useState([]);
  const [memberIncome, setMemberIncome] = useState([]);
  const [showPayoutDetails, setShowPayoutDetails] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [memberId, setMemberId] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const fetchPayouts = useCallback(async (pageNumber = 0, month = null) => {
    try {
      const params = {
        pageNumber,
        pageSize: PAGE_SIZE,
      };

      if (month) {
        params.month = month;
      }

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
          ? "Level Income"
          : payout.isLevelIncome
          ? "Renewal Income"
          : "Unknown",
      }));

      setFilteredPayouts(payoutData);
      setTotalPages(Math.ceil(response.data.pagination.totalItems / PAGE_SIZE));
      toast.success("Payout data fetched successfully.");
    } catch (error) {
      console.error("Error fetching payouts:", error);
      toast.error("Failed to fetch payouts data.");
    }
  }, []);

  const fetchMemberIncome = async (pageNumber = 0, month = null, memberId = "") => {
    try {
      const params = {
        pageNumber,
        pageSize: PAGE_SIZE,
        month,
      };

      if (memberId) {
        params.memberNumber = memberId;
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payout/summary`, {
        params,
        headers: {
          "Content-Type": "application/json",
          adminMemberId: 1,
        },
      });

      const incomeData = response.data.content.map((income) => ({
        memberNumber: income.memberNumber,
        totalAmountOfMonth: income.totalAmountOfMonth,
        incomeType: income.incomeType,
        month: month, // Add the selected month to the data
      }));

      setMemberIncome(incomeData);
      setTotalPages(response.data.pagination.totalPages);
      setCurrentPage(response.data.pagination.currentPage + 1);
      toast.success("Member income data fetched successfully.");
    } catch (error) {
      console.error("Error fetching member income:", error);
      toast.error("Failed to fetch member income data.");
    }
  };

  useEffect(() => {
    fetchPayouts(0);
  }, [fetchPayouts]);

  const handleViewByMonth = () => {
    setViewOption("byMonth");
    setShowPayoutDetails(false);
    setCurrentPage(1);
  };

  const handleViewMemberIncome = () => {
    setViewOption("memberIncome");
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

    const month = `${selectedMonth.getFullYear()}-${String(
      selectedMonth.getMonth() + 1
    ).padStart(2, "0")}`;

    fetchPayouts(0, month);
    setShowPayoutDetails(true);
    setCurrentPage(1);
    toast.success("Payout details fetched successfully.");
  };

  const getMemberIncomeDetails = () => {
    if (!selectedMonth) {
      return toast.error("Please select a month.");
    }

    const month = `${selectedMonth.getFullYear()}-${String(
      selectedMonth.getMonth() + 1
    ).padStart(2, "0")}`;

    fetchMemberIncome(0, month, memberId);
    setShowPayoutDetails(true);
    setCurrentPage(1);
    toast.success("Member income details fetched successfully.");
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if (viewOption === "byMonth") {
        fetchPayouts(
          currentPage - 2,
          selectedMonth && `${selectedMonth.getFullYear()}-${String(
            selectedMonth.getMonth() + 1
          ).padStart(2, "0")}`
        );
      } else if (viewOption === "memberIncome") {
        fetchMemberIncome(
          currentPage - 2,
          selectedMonth && `${selectedMonth.getFullYear()}-${String(
            selectedMonth.getMonth() + 1
          ).padStart(2, "0")}`,
          memberId
        );
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      if (viewOption === "byMonth") {
        fetchPayouts(
          currentPage,
          selectedMonth && `${selectedMonth.getFullYear()}-${String(
            selectedMonth.getMonth() + 1
          ).padStart(2, "0")}`
        );
      } else if (viewOption === "memberIncome") {
        fetchMemberIncome(
          currentPage,
          selectedMonth && `${selectedMonth.getFullYear()}-${String(
            selectedMonth.getMonth() + 1
          ).padStart(2, "0")}`,
          memberId
        );
      }
    }
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <div className="w-full max-w-7xl space-y-8">
        {/* View Options Card */}
        <Card>
          <CardHeader>
            <CardTitle>VIEW MONTHLY PAYOUT DETAILS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <Button
                className={`font-bold ${
                  viewOption === "byMonth"
                    ? "bg-black text-white"
                    : "border-black"
                }`}
                onClick={handleViewByMonth}
                variant={viewOption === "byMonth" ? "solid" : "outline"}
              >
                View All by Month
              </Button>
              <Button
                className={`font-bold ${
                  viewOption === "memberIncome"
                    ? "bg-black text-white"
                    : "border-black"
                }`}
                onClick={handleViewMemberIncome}
                variant={viewOption === "memberIncome" ? "solid" : "outline"}
              >
                View Total Income of Members by Month
              </Button>
            </div>
            {viewOption === "byMonth" && (
              <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0 mt-4">
                <div className="border p-2 rounded-md w-full md:w-1/4">
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
                <div className="flex flex-col space-y-4 w-full md:w-3/4">
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
            )}
            {viewOption === "memberIncome" && (
              <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0 mt-4">
                <div className="border p-2 rounded-md w-full md:w-1/4">
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
                <div className="flex flex-col space-y-4 w-full md:w-3/4">
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
                  <Input
                    id="memberId"
                    name="memberId"
                    placeholder="Member ID (optional)"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    className="w-full transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                  />
                  <Button className="w-full" onClick={getMemberIncomeDetails}>
                    Get Member Total Income
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payout Details Card */}
        {viewOption === "byMonth" && showPayoutDetails && (
          <Card>
            <CardHeader>
              <CardTitle>Payout Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Member ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payout Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Received Money For (Member ID)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Level
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
                            {payout.level}
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
                          colSpan="6"
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No payout details found for the selected month.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous 100
              </Button>
              <Button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next 100
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Member Income Details Card */}
        {viewOption === "memberIncome" && showPayoutDetails && (
          <Card>
            <CardHeader>
              <CardTitle>Member Income Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Member ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount Earned This Month
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Income Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Month
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {memberIncome.length > 0 ? (
                      memberIncome.map((income, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {income.memberNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {income.totalAmountOfMonth}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {income.incomeType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {selectedMonth.toLocaleDateString("en-GB", {
                              month: "long",
                              year: "numeric",
                            })}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No income details found for the selected month.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous 100
              </Button>
              <Button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next 100
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

// Wrap the component export in dynamic import to disable SSR
export default dynamic(() => Promise.resolve(ViewMonthlyPayout), { ssr: false });
