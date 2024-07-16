"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

// Simulated Data for Installments
const simulatedInstallmentsData = [
  {
    paidOnDate: "2024-07-13",
    installmentMonthCount: "Month - 1",
    paymentMethod: "Cash Deposit",
    transactionId: "TXN123456",
    epinNumber: "EPN123456",
    groupId: "Group A",
    tokenId: "TID123",
    packageName: "Package - 1500",
  },
  {
    paidOnDate: "2024-08-13",
    installmentMonthCount: "Month - 2",
    paymentMethod: "Paytm",
    transactionId: "TXN123457",
    epinNumber: "EPN123457",
    groupId: "Group B",
    tokenId: "TID124",
    packageName: "Package - 2000",
  },
  {
    paidOnDate: "2024-09-13",
    installmentMonthCount: "Month - 3",
    paymentMethod: "Google Pay",
    transactionId: "TXN123458",
    epinNumber: "EPN123458",
    groupId: "Group C",
    tokenId: "TID125",
    packageName: "Package - 1500",
  },
  {
    paidOnDate: "2024-10-13",
    installmentMonthCount: "Month - 4",
    paymentMethod: "Phone Pay",
    transactionId: "TXN123459",
    epinNumber: "EPN123459",
    groupId: "Group D",
    tokenId: "TID126",
    packageName: "Package - 2000",
  },
  {
    paidOnDate: "2024-11-13",
    installmentMonthCount: "Month - 5",
    paymentMethod: "Cheque",
    transactionId: "TXN123460",
    epinNumber: "EPN123460",
    groupId: "Group E",
    tokenId: "TID127",
    packageName: "Package - 1500",
  },
  {
    paidOnDate: "2024-12-13",
    installmentMonthCount: "Month - 6",
    paymentMethod: "Internet Banking",
    transactionId: "TXN123461",
    epinNumber: "EPN123461",
    groupId: "Group F",
    tokenId: "TID128",
    packageName: "Package - 2000",
  },
  {
    paidOnDate: "2025-01-13",
    installmentMonthCount: "Month - 7",
    paymentMethod: "Money Order",
    transactionId: "TXN123462",
    epinNumber: "EPN123462",
    groupId: "Group G",
    tokenId: "TID129",
    packageName: "Package - 1500",
  },
  {
    paidOnDate: "2025-02-13",
    installmentMonthCount: "Month - 8",
    paymentMethod: "Demand Draft",
    transactionId: "TXN123463",
    epinNumber: "EPN123463",
    groupId: "Group H",
    tokenId: "TID130",
    packageName: "Package - 2000",
  },
  {
    paidOnDate: "2025-03-13",
    installmentMonthCount: "Month - 9",
    paymentMethod: "Cash Deposit",
    transactionId: "TXN123464",
    epinNumber: "EPN123464",
    groupId: "Group I",
    tokenId: "TID131",
    packageName: "Package - 1500",
  },
  {
    paidOnDate: "2025-04-13",
    installmentMonthCount: "Month - 10",
    paymentMethod: "Paytm",
    transactionId: "TXN123465",
    epinNumber: "EPN123465",
    groupId: "Group J",
    tokenId: "TID132",
    packageName: "Package - 2000",
  },
  // Add more data to test pagination
];

const PAGE_SIZE = 10;

export default function InstallmentsReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(simulatedInstallmentsData.length / PAGE_SIZE);
  const paginatedData = simulatedInstallmentsData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">MY INSTALLMENTS</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Installment Paid On Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Installment Month Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  EPIN Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package Name
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.paidOnDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.installmentMonthCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.transactionId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.epinNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.packageName}
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
            Previous 10
          </Button>
          <Button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next 10
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
