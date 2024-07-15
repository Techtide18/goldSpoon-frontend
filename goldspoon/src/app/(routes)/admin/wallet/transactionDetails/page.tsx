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
import { Label } from "@/components/ui/label";

// Simulated Data
const simulatedTransactions = [
  {
    id: 1,
    memberId: "D001",
    receivedFromMemberId: "M001",
    amount: 100,
    dateTime: "2024-06-15 10:00:00",
    incomeType: "Renewal Income",
  },
  {
    id: 2,
    memberId: "D002",
    receivedFromMemberId: "M002",
    amount: 200,
    dateTime: "2024-07-01 12:30:00",
    incomeType: "Level Income",
  },
  {
    id: 3,
    memberId: "D002",
    receivedFromMemberId: "M003",
    amount: 150,
    dateTime: "2024-07-10 15:45:00",
    incomeType: "Renewal Income",
  },
  {
    id: 4,
    memberId: "D004",
    receivedFromMemberId: "M004",
    amount: 250,
    dateTime: "2024-07-15 09:20:00",
    incomeType: "Level Income",
  },
  // Add more data to test pagination
];

const PAGE_SIZE = 100;

export default function ViewTransactionDetails() {
  const [filterId, setFilterId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getTransactions = () => {
    if (!filterId) {
      return toast.error("Please enter a Member ID.");
    }

    // Simulate fetching transaction data from backend based on the entered Member ID
    // and setting the memberName and filteredData
    const member = { memberName: "John Doe" }; // Simulated member name
    const filtered = simulatedTransactions.filter(
      (data) => data.memberId === filterId
    ); // Simulated filtered data

    setMemberName(member.memberName);
    setFilteredData(filtered);
    setCurrentPage(1);
    toast.success("Transaction data fetched successfully.");
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
          <CardTitle>VIEW TRANSACTION DETAILS FOR MEMBER</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <div className="flex flex-row items-center space-x-4">
            <Label htmlFor="memberId" className="w-32">
              Member ID:
            </Label>
            <Input
              id="memberId"
              type="text"
              placeholder="Enter Member ID"
              value={filterId}
              onChange={(e) => setFilterId(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="flex flex-row items-center space-x-4">
            <Label htmlFor="memberName" className="w-32">
              Member Name:
            </Label>
            <Input
              id="memberName"
              type="text"
              placeholder="Auto Generated"
              value={memberName}
              readOnly
              className="flex-1"
            />
          </div>
          <Button onClick={getTransactions} className="w-full">
            Get Transaction Details
          </Button>
        </CardContent>
      </Card>

      {/* Card 2 */}
      <Card className="w-full max-w-7xl mb-4">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Transaction Details Report</CardTitle>
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
                    Member ID (Received Money For)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DateTime
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Income Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((data, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {data.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.memberId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.receivedFromMemberId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.dateTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.incomeType}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
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
