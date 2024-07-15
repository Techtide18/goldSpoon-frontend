"use client";

import React, { useState, useEffect } from "react";
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
const simulatedWalletDetails = [
  { memberId: "M001", memberName: "John Doe", currentBalance: 500, approvedBalance: 300, totalIncome: 800 },
  { memberId: "M002", memberName: "Jane Smith", currentBalance: 700, approvedBalance: 500, totalIncome: 1200 },
  { memberId: "M003", memberName: "Alice Johnson", currentBalance: 300, approvedBalance: 200, totalIncome: 500 },
  { memberId: "M004", memberName: "Bob Brown", currentBalance: 1000, approvedBalance: 800, totalIncome: 1800 },
  // Add more data to test pagination
];

const PAGE_SIZE = 100;

export default function ViewWalletDetails() {
  const [viewOption, setViewOption] = useState("all");
  const [filterId, setFilterId] = useState("");
  const [filteredData, setFilteredData] = useState(simulatedWalletDetails);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (viewOption === "all") {
      setFilteredData(simulatedWalletDetails);
    }
  }, [viewOption]);

  const handleViewAll = () => {
    setViewOption("all");
    setFilterId("");
    setCurrentPage(1);
    setFilteredData(simulatedWalletDetails);
  };

  const handleViewByMemberId = () => {
    setViewOption("memberId");
    setCurrentPage(1);
  };

  const getByMemberId = () => {
    if (!filterId) {
      return toast.error("Please enter a Member ID.");
    }

    const filtered = simulatedWalletDetails.filter((data) => data.memberId === filterId);
    if (filtered.length === 0) {
      toast.error("No data found for the specified Member ID.");
      return;
    }

    setFilteredData(filtered);
    setCurrentPage(1);
    toast.success("Data fetched successfully.");
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
          <CardTitle>VIEW WALLET DETAILS</CardTitle>
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
              viewOption === "memberId"
                ? "bg-black text-white"
                : "border-black"
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
              type="text"
              placeholder="Enter Member ID"
              value={filterId}
              onChange={(e) => setFilterId(e.target.value)}
            />
            <Button onClick={getByMemberId}>
              Get by Member ID
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Card 2 */}
      <Card className="w-full max-w-7xl mb-4">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Wallet Details Report</CardTitle>
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
                    Member Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Approved Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Income History
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
                        {data.memberName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.currentBalance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.approvedBalance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.totalIncome}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No data
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
