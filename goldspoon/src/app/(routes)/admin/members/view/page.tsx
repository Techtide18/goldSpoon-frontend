"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";

// Simulated Data
const simulatedData = [
  {
    memberName: "John Doe",
    memberId: "MEM123456",
    phone: "1234567890",
    email: "johndoe@example.com",
    createdDate: "01-01-2023",
    gender: "Male",
    aadhaarNumber: "1234-5678-9012",
    panNumber: "ABCDE1234F",
    address: "123 Main St, City, State, ZIP",
    isActive: true,
    bankAccDetails: "XYZ Bank, Account No: 123456789",
  },
  {
    memberName: "Jane Smith",
    memberId: "MEM123457",
    phone: "0987654321",
    email: "janesmith@example.com",
    createdDate: "01-02-2023",
    gender: "Female",
    aadhaarNumber: "1234-5678-9013",
    panNumber: "ABCDE1234G",
    address: "456 Elm St, City, State, ZIP",
    isActive: false,
    bankAccDetails: "ABC Bank, Account No: 987654321",
  },
  // Add more data to test pagination
  {
    memberName: "Alice Johnson",
    memberId: "MEM123458",
    phone: "1122334455",
    email: "alicejohnson@example.com",
    createdDate: "01-03-2023",
    gender: "Female",
    aadhaarNumber: "1234-5678-9014",
    panNumber: "ABCDE1234H",
    address: "789 Maple St, City, State, ZIP",
    isActive: true,
    bankAccDetails: "DEF Bank, Account No: 112233445",
  },
  {
    memberName: "Bob Brown",
    memberId: "MEM123459",
    phone: "2233445566",
    email: "bobbrown@example.com",
    createdDate: "01-04-2023",
    gender: "Male",
    aadhaarNumber: "1234-5678-9015",
    panNumber: "ABCDE1234I",
    address: "321 Oak St, City, State, ZIP",
    isActive: false,
    bankAccDetails: "GHI Bank, Account No: 223344556",
  },
  {
    memberName: "Charlie Davis",
    memberId: "MEM123460",
    phone: "3344556677",
    email: "charliedavis@example.com",
    createdDate: "01-05-2023",
    gender: "Male",
    aadhaarNumber: "1234-5678-9016",
    panNumber: "ABCDE1234J",
    address: "654 Pine St, City, State, ZIP",
    isActive: true,
    bankAccDetails: "JKL Bank, Account No: 334455667",
  },
];

const PAGE_SIZE = 100;

export default function ViewMembers() {
  const [viewOption, setViewOption] = useState("all");
  const [filterId, setFilterId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleViewAll = () => {
    setViewOption("all");
    setFilterId("");
    setCurrentPage(1);
  };

  const handleViewByMemberId = () => {
    setViewOption("memberId");
    setCurrentPage(1);
  };

  const filteredData = viewOption === "memberId" && filterId
    ? simulatedData.filter((data) => data.memberId === filterId)
    : simulatedData;

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>VIEW MEMBERS</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row space-x-4">
          <Button
            className={`font-bold ${viewOption === "all" ? "bg-black text-white" : "border-black"}`}
            onClick={handleViewAll}
            variant={viewOption === "all" ? "solid" : "outline"}
          >
            View All
          </Button>
          <Button
            className={`font-bold ${viewOption === "memberId" ? "bg-black text-white" : "border-black"}`}
            onClick={handleViewByMemberId}
            variant={viewOption === "memberId" ? "solid" : "outline"}
          >
            View by Member ID ↓
          </Button>
        </CardContent>
        {viewOption === "memberId" && (
          <CardFooter className="flex flex-row space-x-4">
            <Input
              placeholder="Member ID"
              value={filterId}
              onChange={(e) => setFilterId(e.target.value)}
            />
          </CardFooter>
        )}
      </Card>

      <Card className="w-full max-w-7xl mb-4">
  <CardHeader>
    <CardTitle className="text-lg font-bold">Members Report</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aadhaar Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAN Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Is Active</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Account Details</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((data, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.memberName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.memberId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.createdDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.gender}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.aadhaarNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.panNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.address}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.isActive ? "Yes" : "No"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.bankAccDetails}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </CardContent>
  <CardFooter className="flex justify-center space-x-2">
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
    <Button
      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
    >
      Previous 100
    </Button>
    <Button
      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
    >
      Next 100
    </Button>
  </CardFooter>
</Card>

    </div>
  );
}
