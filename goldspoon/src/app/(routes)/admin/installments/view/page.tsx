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

const PAGE_SIZE = 100;

export default function InstallmentsReport() {
  const [viewOption, setViewOption] = useState("all");
  const [filterId, setFilterId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (viewOption === "all") {
      fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/installments`, {
        pageNumber: 0,
        pageSize: PAGE_SIZE,
      });
    }
  }, [viewOption]);

  const fetchData = async (url, params) => {
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "e8f63d22-6a2d-42b0-845a-31f0f08e35b3",
          adminMemberId: 1,
        },
        params,
      });
      const data = response.data;
      setFilteredData(data.content);
      setTotalItems(data.pagination.totalItems);
      toast.success("Installment data fetched successfully.");
    } catch (error) {
      console.error("Error fetching installment data:", error);
      toast.error("Failed to fetch installment data.");
    }
  };

  const handleViewAll = () => {
    setViewOption("all");
    setFilterId("");
    setCurrentPage(1);
    fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/installments`, {
      pageNumber: 0,
      pageSize: PAGE_SIZE,
    });
  };

  const handleViewByMemberId = () => {
    setViewOption("memberId");
    setFilterId(""); // Clear text input
    setCurrentPage(1);
  };

  const getInstallmentsByMemberId = () => {
    if (!filterId) {
      toast.error("Please enter a Member ID.");
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/installments?pageNumber=0&pageSize=${PAGE_SIZE}&memberNumber=${filterId}`;
    fetchData(url);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    const params = { pageNumber: page - 1, pageSize: PAGE_SIZE };
    if (viewOption === "all") {
      fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/installments`, params);
    } else if (viewOption === "memberId") {
      params.memberNumber = filterId;
      fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/installments`, params);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const paginatedData = filteredData;

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl mb-4">
        <CardHeader>
          <CardTitle>VIEW INSTALLMENTS PAID</CardTitle>
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
            <Button onClick={getInstallmentsByMemberId}>
              Get Installments
            </Button>
          </CardFooter>
        )}
      </Card>

      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Installment Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Epin ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Installment Month
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Installment Paid Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount Paid (Rupees)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paid By (Member ID)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((data, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {data.epinNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.memberNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.installmentMonth}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(data.transactionDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.amountPaid}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.paidByMemberNumber ? data.paidByMemberNumber : "Self"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.transactionId}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
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
        {viewOption && (
          <CardFooter className="flex justify-center space-x-2">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
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
              onClick={() =>
                handlePageChange(null, Math.max(currentPage - 1, 1))
              }
              disabled={currentPage === 1}
            >
              Previous 100
            </Button>
            <Button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              onClick={() =>
                handlePageChange(null, Math.min(currentPage + 1, totalPages))
              }
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
