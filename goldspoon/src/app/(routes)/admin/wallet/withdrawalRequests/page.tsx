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
const simulatedWithdrawalRequests = [
  {
    requestId: "W001",
    requestDate: "2024-06-15",
    memberId: "M001",
    memberName: "John Doe",
    epinId: "E12345",
    amountRequested: 100,
    groupName: "G12",
    status: "pending",
  },
  {
    requestId: "W002",
    requestDate: "2024-07-01",
    memberId: "M002",
    memberName: "Jane Smith",
    epinId: "E23456",
    amountRequested: 200,
    groupName: "G12",
    status: "approved",
  },
  {
    requestId: "W003",
    requestDate: "2024-07-10",
    memberId: "M003",
    memberName: "Alice Johnson",
    epinId: "E34567",
    amountRequested: 300,
    groupName: "G20",
    status: "rejected",
  },
  {
    requestId: "W004",
    requestDate: "2024-07-15",
    memberId: "M004",
    memberName: "Bob Brown",
    epinId: "E45678",
    amountRequested: 150,
    groupName: "G12",
    status: "pending",
  },
  // Add more data to test pagination
];

const PAGE_SIZE = 100;

export default function ViewWithdrawalRequests() {
  const [viewOption, setViewOption] = useState("pending");
  const [filterId, setFilterId] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (viewOption !== "memberId") {
      filterData();
    }
  }, [viewOption]);

  const handleViewOption = (option) => {
    setViewOption(option);
    setFilterId("");
    setCurrentPage(1);
    if (option !== "memberId") {
      filterData(option);
    }
  };

  const filterData = (option = viewOption) => {
    let filtered = [];
    if (option === "memberId" && filterId) {
      filtered = simulatedWithdrawalRequests.filter(
        (data) => data.memberId === filterId
      );
    } else {
      filtered = simulatedWithdrawalRequests.filter(
        (data) => data.status === option
      );
    }

    if (filtered.length === 0) {
      toast.error("No data found for the specified filter.");
    } else {
      toast.success("Data fetched successfully.");
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const getByMemberId = () => {
    if (!filterId) {
      return toast.error("Please enter a Member ID.");
    }

    filterData();
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
          <CardTitle>VIEW WITHDRAWAL REQUESTS</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row space-x-4">
          <Button
            className={`font-bold ${
              viewOption === "pending" ? "bg-black text-white" : "border-black"
            }`}
            onClick={() => handleViewOption("pending")}
            variant={viewOption === "pending" ? "solid" : "outline"}
          >
            View Pending Requests
          </Button>
          <Button
            className={`font-bold ${
              viewOption === "approved" ? "bg-black text-white" : "border-black"
            }`}
            onClick={() => handleViewOption("approved")}
            variant={viewOption === "approved" ? "solid" : "outline"}
          >
            View Approved Requests
          </Button>
          <Button
            className={`font-bold ${
              viewOption === "rejected" ? "bg-black text-white" : "border-black"
            }`}
            onClick={() => handleViewOption("rejected")}
            variant={viewOption === "rejected" ? "solid" : "outline"}
          >
            View Rejected Requests
          </Button>
          <Button
            className={`font-bold ${
              viewOption === "memberId" ? "bg-black text-white" : "border-black"
            }`}
            onClick={() => handleViewOption("memberId")}
            variant={viewOption === "memberId" ? "solid" : "outline"}
          >
            View Requests by Member ID
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
            <Button onClick={getByMemberId}>Get by Member ID</Button>
          </CardFooter>
        )}
      </Card>

      {/* Card 2 */}
      <Card className="w-full max-w-7xl mb-4">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Withdrawal Requests Report</CardTitle>
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
                    Withdrawal Request Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    EPIN ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount Requested
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Group Name
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
                        {data.requestDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.memberId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.memberName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.epinId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.amountRequested}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.groupName}
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
