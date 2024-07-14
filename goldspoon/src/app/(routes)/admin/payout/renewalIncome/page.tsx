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

// Simulated Data
const simulatedRenewalIncome = [
  {
    memberId: "M001",
    dateTime: "2024-06-15 10:00:00",
    receivedMoneyFor: "M002",
    level:"2",
    amountReceived: "500",
  },
  {
    memberId: "M003",
    dateTime: "2024-06-20 14:30:00",
    receivedMoneyFor: "M004",
    level:"3",
    amountReceived: "300",
  },
  // Add more data to test pagination
  {
    memberId: "M004",
    dateTime: "2024-07-01 12:00:00",
    receivedMoneyFor: "M005",
    level:"1",
    amountReceived: "200",
  },
  {
    memberId: "M006",
    dateTime: "2024-07-02 15:45:00",
    receivedMoneyFor: "M007",
    level:"7",
    amountReceived: "150",
  },
  {
    memberId: "M008",
    dateTime: "2024-07-05 10:30:00",
    receivedMoneyFor: "M009",
    level:"5",
    amountReceived: "100",
  },
];

const PAGE_SIZE = 100;

export default function ViewRenewalIncome() {
  const [viewOption, setViewOption] = useState("all");
  const [filterId, setFilterId] = useState("");
  const [filteredData, setFilteredData] = useState(simulatedRenewalIncome);
  const [currentPage, setCurrentPage] = useState(1);

  const handleViewAll = () => {
    setViewOption("all");
    setFilterId("");
    setFilteredData(simulatedRenewalIncome);
    setCurrentPage(1);
  };

  const handleViewByMemberId = () => {
    setViewOption("memberId");
    setCurrentPage(1);
  };

  const getRenewalIncomeForMember = () => {
    if (!filterId) {
      return toast.error("Please enter a Member ID.");
    }

    const filtered = simulatedRenewalIncome.filter(
      (data) => data.memberId === filterId
    );

    if (filtered.length === 0) {
      toast.error("No renewal income found for the specified member.");
      return;
    }

    setFilteredData(filtered);
    setCurrentPage(1);
    toast.success("Renewal income details fetched successfully.");
  };

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      {/* Card 1 */}
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>VIEW RENEWAL INCOME</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row space-x-4">
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
              viewOption === "memberId" ? "bg-black text-white" : "border-black"
            }`}
            onClick={handleViewByMemberId}
            variant={viewOption === "memberId" ? "solid" : "outline"}
          >
            View by Member ID
          </Button>
        </CardContent>
        {viewOption === "memberId" && (
          <CardFooter className="flex flex-row space-x-4">
            <Input
              placeholder="Member ID"
              value={filterId}
              onChange={(e) => setFilterId(e.target.value)}
            />
            <Button onClick={getRenewalIncomeForMember}>
              Get Renewal Income for Member
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Card 2 */}
      <Card className="w-full max-w-7xl mb-4">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Renewal Income Report
          </CardTitle>
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
                    Date & Time
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((data, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {data.memberId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.dateTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.receivedMoneyFor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.level}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.amountReceived}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No renewal income details found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
  );
}
