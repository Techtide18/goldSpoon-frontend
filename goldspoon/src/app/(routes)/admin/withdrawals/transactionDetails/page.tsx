// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
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
import { Pagination } from "@/components/ui/pagination";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

const PAGE_SIZE = 100;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

export default function ViewTransactionDetails() {
  const [filterId, setFilterId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [viewOption, setViewOption] = useState("all");

  const getTransactions = async () => {
    try {
      const params = {
        pageSize: PAGE_SIZE,
        pageNumber: currentPage - 1,
      };
      if (viewOption === "byMemberId" && filterId) {
        params.memberNumber = filterId;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payout/transactions`,
        {
          params,
          headers: {
            "Content-Type": "application/json",
            adminMemberId: 1,
            type: "withdrawal"
          },
        }
      );

      const memberDetails = response.data.content;
      if (viewOption === "byMemberId") {
        setMemberName(memberDetails.length > 0 ? memberDetails[0].fullName : "Unknown");
      }
      setFilteredData(memberDetails);
      setTotalPages(response.data.pagination.totalPages);

      toast.success("Transaction data fetched successfully.");
    } catch (error) {
      console.error("Error fetching transaction data:", error);
      setMemberName("Unknown");
      setFilteredData([]);
      toast.error("Failed to fetch transaction data.");
    }
  };

  useEffect(() => {
    if (viewOption === "all") {
      getTransactions();
    }
  }, [currentPage, viewOption]);

  const handleViewAll = () => {
    setViewOption("all");
    setFilterId("");
    setCurrentPage(1);
  };

  const handleViewByMemberId = () => {
    setViewOption("byMemberId");
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      {/* Card 1 */}
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>VIEW WITHDRAWAL DETAILS FOR MEMBER</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <Button
              onClick={handleViewAll}
              className={`font-bold ${
                viewOption === "all" ? "bg-black text-white" : "border-black"
              }`}
              variant={viewOption === "all" ? "solid" : "outline"}
            >
              View All
            </Button>
            <Button
              onClick={handleViewByMemberId}
              className={`font-bold ${
                viewOption === "byMemberId"
                  ? "bg-black text-white"
                  : "border-black"
              }`}
              variant={viewOption === "byMemberId" ? "solid" : "outline"}
            >
              View by Member ID
            </Button>
          </div>
          {viewOption === "byMemberId" && (
            <>
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
            </>
          )}
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
                    Member ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admin Charges (10%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Final Amount Paid
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DateTime
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Note
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entry
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((data, index) => {
                    const adminCharges = Math.round(data.amount * 0.1);
                    const transactionMode =
                      data.transactionType === "BALANCE_APPROVAL"
                        ? "BALANCE APPROVAL"
                        : data.transactionType;

                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {data.memberNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transactionMode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {data.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {adminCharges}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {data.finalAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(data.createdDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {data.note}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {data.entry}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No transactions
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
