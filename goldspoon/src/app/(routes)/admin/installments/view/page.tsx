// @ts-nocheck
"use client";


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { toast } from "sonner";

const PAGE_SIZE = 100;

export default function InstallmentsPaid() {
  const [viewOption, setViewOption] = useState("all");
  const [filterId, setFilterId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          adminMemberId: 1,
        },
      });
      setFilteredData(response.data.content || []);
      setTotalItems(response.data.pagination.totalItems || 0);
      toast.success("Installment data fetched successfully.");
    } catch (error) {
      toast.error("Failed to fetch data. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (viewOption === "all") {
      const url = `http://localhost:8080/api/installments?pageNumber=${currentPage - 1}&pageSize=${PAGE_SIZE}`;
      fetchData(url);
    }
  }, [viewOption, currentPage]);

  const handleViewAll = () => {
    setViewOption("all");
    setFilterId("");
    setCurrentPage(1);
  };

  const handleViewByMemberId = () => {
    setViewOption("memberId");
    setFilterId("");
    setCurrentPage(1);
  };

  const getInstallmentsByMemberId = () => {
    if (!filterId) {
      toast.error("Please enter a Member ID.");
      return;
    }
    setCurrentPage(1);
    const url = `http://localhost:8080/api/installments?pageNumber=0&pageSize=${PAGE_SIZE}&memberNumber=${filterId}`;
    fetchData(url);
  };

  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const paginatedData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl mb-4">
        <CardHeader>
          <CardTitle>VIEW INSTALLMENTS PAID</CardTitle>
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
            <Button onClick={getInstallmentsByMemberId}>Get Installments</Button>
          </CardFooter>
        )}
      </Card>

      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Installments Paid Report</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Epin ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Installment Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Installment Paid Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid (Rupees)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.EpinID}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.memberId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.installmentMonth}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.installmentPaidDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.amountPaid}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.transactionId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.paymentMethod}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
        {totalPages > 1 && (
          <CardFooter className="flex justify-end space-x-2">
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
        )}
      </Card>
    </div>
  );
}
