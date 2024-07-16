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

// Simulated Data for Renewal Income
const simulatedIncomeData = [
  {
    memberId: "M001",
    dateTime: "2024-07-13 10:00:00",
    receivedForMemberId: "M002",
    level: "1",
    amountReceived: "1500",
  },
  {
    memberId: "M003",
    dateTime: "2024-07-13 11:00:00",
    receivedForMemberId: "M004",
    level: "2",
    amountReceived: "2000",
  },
  {
    memberId: "M005",
    dateTime: "2024-07-13 12:00:00",
    receivedForMemberId: "M006",
    level: "3",
    amountReceived: "1500",
  },
  {
    memberId: "M007",
    dateTime: "2024-07-13 13:00:00",
    receivedForMemberId: "M008",
    level: "4",
    amountReceived: "2000",
  },
  {
    memberId: "M009",
    dateTime: "2024-07-13 14:00:00",
    receivedForMemberId: "M010",
    level: "5",
    amountReceived: "1500",
  },
  {
    memberId: "M011",
    dateTime: "2024-07-13 15:00:00",
    receivedForMemberId: "M012",
    level: "6",
    amountReceived: "2000",
  },
  {
    memberId: "M013",
    dateTime: "2024-07-13 16:00:00",
    receivedForMemberId: "M014",
    level: "7",
    amountReceived: "1500",
  },
  {
    memberId: "M015",
    dateTime: "2024-07-13 17:00:00",
    receivedForMemberId: "M016",
    level: "8",
    amountReceived: "2000",
  },
  {
    memberId: "M017",
    dateTime: "2024-07-13 18:00:00",
    receivedForMemberId: "M018",
    level: "9",
    amountReceived: "1500",
  },
  {
    memberId: "M019",
    dateTime: "2024-07-13 19:00:00",
    receivedForMemberId: "M020",
    level: "10",
    amountReceived: "2000",
  },
  // Add more data to test pagination
];

const PAGE_SIZE = 50;

export default function RenewalIncomeReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(simulatedIncomeData.length / PAGE_SIZE);
  const paginatedData = simulatedIncomeData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            VIEW RENEWAL INCOME
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Received Money For (Member ID)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount Received
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
                      {data.dateTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.receivedForMemberId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.level}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.amountReceived}
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
            Previous 50
          </Button>
          <Button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next 50
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
