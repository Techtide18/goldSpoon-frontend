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
import { Pagination } from "@/components/ui/pagination";

// Simulated Data for Used EPINs
const usedEpinData = [
  {
    epinId: "EPN123456",
    memberId: "MEM123456",
    packageName: "Package - 1500",
    createdDate: "14-07-2024",
    referralMemberId: "REF123456",
    group: "G12",
    reTopupDate: "14-07-2024",
  },
  {
    epinId: "EPN123457",
    memberId: "MEM123457",
    packageName: "Package - 2000",
    createdDate: "15-07-2024",
    referralMemberId: "REF123457",
    group: "G14",
    reTopupDate: "15-07-2024",
  },
  // Add more data as needed (total 50 entries)
  {
    epinId: "EPN123458",
    memberId: "MEM123458",
    packageName: "Package - 1500",
    createdDate: "16-07-2024",
    referralMemberId: "REF123458",
    group: "G15",
    reTopupDate: "16-07-2024",
  },
  {
    epinId: "EPN123459",
    memberId: "MEM123459",
    packageName: "Package - 2000",
    createdDate: "17-07-2024",
    referralMemberId: "REF123459",
    group: "G16",
    reTopupDate: "17-07-2024",
  },
  // Repeat for 50 entries
];

for (let i = 460; i < 506; i++) {
  usedEpinData.push({
    epinId: `EPN123${i}`,
    memberId: `MEM123${i}`,
    packageName: `Package - ${i % 2 === 0 ? "1500" : "2000"}`,
    createdDate: `14-07-2024`,
    referralMemberId: `REF123${i}`,
    group: `G${12 + (i % 5)}`,
    reTopupDate: `14-07-2024`,
  });
}

const PAGE_SIZE = 10;

export default function UsedEpinReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(usedEpinData.length / PAGE_SIZE);
  const paginatedData = usedEpinData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">VIEW USED EPINs</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  EPIN ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MEMBER ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PACKAGE NAME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CREATED DATE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  REFERRAL MEMBER ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GROUP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  RE-TOPUP DATE
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.epinId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.memberId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.packageName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.createdDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.referralMemberId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.group}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.reTopupDate}
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
