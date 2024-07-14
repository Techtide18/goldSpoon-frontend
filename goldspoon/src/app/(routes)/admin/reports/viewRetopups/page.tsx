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
const simulatedReTopups = [
  { memberId: "M001", oldEpin: "E12345", newEpin: "E67890", oldPackage: "Basic", newPackage: "Premium", retopupDate: "2024-06-15" },
  { memberId: "M002", oldEpin: "E23456", newEpin: "E78901", oldPackage: "Standard", newPackage: "Gold", retopupDate: "2024-07-01" },
  { memberId: "M003", oldEpin: "E34567", newEpin: "E89012", oldPackage: "Gold", newPackage: "Platinum", retopupDate: "2024-07-10" },
  { memberId: "M004", oldEpin: "E45678", newEpin: "E90123", oldPackage: "Basic", newPackage: "Standard", retopupDate: "2024-07-15" },
  // Add more data to test pagination
];

const PAGE_SIZE = 100;

export default function ViewReTopups() {
  const [viewOption, setViewOption] = useState("all");
  const [filterId, setFilterId] = useState("");
  const [filteredData, setFilteredData] = useState(simulatedReTopups);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (viewOption === "all") {
      setFilteredData(simulatedReTopups);
    }
  }, [viewOption]);

  const handleViewAll = () => {
    setViewOption("all");
    setFilterId("");
    setCurrentPage(1);
    setFilteredData(simulatedReTopups);
  };

  const handleViewByMemberId = () => {
    setViewOption("memberId");
    setCurrentPage(1);
  };

  const getByMemberId = () => {
    if (!filterId) {
      return toast.error("Please enter a Member ID.");
    }

    const filtered = simulatedReTopups.filter((data) => data.memberId === filterId);
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
          <CardTitle>VIEW RE-TOPUPS</CardTitle>
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
          <CardTitle className="text-lg font-bold">Re-Topups Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Old EPIN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    New EPIN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Old Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    New Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Re-Topup Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((data, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {(currentPage - 1) * PAGE_SIZE + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.memberId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.oldEpin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.newEpin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.oldPackage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.newPackage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.retopupDate}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
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
