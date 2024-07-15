"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { toast } from "sonner";

// Simulated Data
const simulatedData = [
  {
    EpinID: "EPN123456",
    memberId: "MEM123456",
    installmentMonth: "1",
    installmentPaidDate: "01-02-2024",
    amountPaid: "1500",
    transactionId: "TXN1234567890",
    paymentMethod: "GPay",
  },
  {
    EpinID: "EPN123457",
    memberId: "MEM123457",
    installmentMonth: "2",
    installmentPaidDate: "01-03-2024",
    amountPaid: "2000",
    transactionId: "TXN1234567891",
    paymentMethod: "UPI",
  },
  {
    EpinID: "EPN123458",
    memberId: "MEM123458",
    installmentMonth: "3",
    installmentPaidDate: "01-04-2024",
    amountPaid: "1500",
    transactionId: "TXN1234567892",
    paymentMethod: "Cheque",
  },
  {
    EpinID: "EPN123459",
    memberId: "MEM123459",
    installmentMonth: "3",
    installmentPaidDate: "01-05-2024",
    amountPaid: "2000",
    transactionId: "TXN1234567893",
    paymentMethod: "GPay",
  },
  {
    EpinID: "EPN123460",
    memberId: "MEM123460",
    installmentMonth: "3",
    installmentPaidDate: "01-06-2024",
    amountPaid: "1500",
    transactionId: "TXN1234567894",
    paymentMethod: "UPI",
  },
  {
    EpinID: "EPN123461",
    memberId: "MEM123461",
    installmentMonth: "5",
    installmentPaidDate: "01-07-2024",
    amountPaid: "2000",
    transactionId: "TXN1234567895",
    paymentMethod: "Cheque",
  },
  {
    EpinID: "EPN123462",
    memberId: "MEM123462",
    installmentMonth: "5",
    installmentPaidDate: "01-08-2024",
    amountPaid: "1500",
    transactionId: "TXN1234567896",
    paymentMethod: "GPay",
  },
  {
    EpinID: "EPN123463",
    memberId: "MEM123463",
    installmentMonth: "7",
    installmentPaidDate: "01-09-2024",
    amountPaid: "2000",
    transactionId: "TXN1234567897",
    paymentMethod: "UPI",
  },
  {
    EpinID: "EPN123464",
    memberId: "MEM123464",
    installmentMonth: "7",
    installmentPaidDate: "01-10-2024",
    amountPaid: "1500",
    transactionId: "TXN1234567898",
    paymentMethod: "Cheque",
  },
  {
    EpinID: "EPN123465",
    memberId: "MEM123465",
    installmentMonth: "15",
    installmentPaidDate: "01-11-2024",
    amountPaid: "2000",
    transactionId: "TXN1234567899",
    paymentMethod: "GPay",
  },
];

const PAGE_SIZE = 100;

export default function InstallmentsPaid() {
  const [viewOption, setViewOption] = useState("all");
  const [filterId, setFilterId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(simulatedData);

  const handleViewAll = () => {
    setViewOption("all");
    setFilterId("");
    setCurrentPage(1);
    setFilteredData(simulatedData);
  };

  const handleViewByMemberId = () => {
    setViewOption("memberId");
    setCurrentPage(1);
  };

  const getInstallmentsByMemberId = () => {
    if (!filterId) {
      toast.error("Please enter a Member ID.");
      return;
    }

    const filtered = simulatedData.filter((data) => data.memberId === filterId);

    if (filtered.length === 0) {
      toast.error("No data found for the specified Member ID.");
      return;
    }

    setFilteredData(filtered);
    toast.success("Installment data fetched successfully.");
  };

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid (Rupees) </th>
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
