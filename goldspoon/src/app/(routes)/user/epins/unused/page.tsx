"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

// Simulated Data
const simulatedData = [
  {
    EpinID: "EPN123456",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123457",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123458",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123459",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123460",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123461",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123462",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123463",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123464",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123465",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123466",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123467",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123468",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123469",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123470",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123471",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123472",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123473",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123474",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
  {
    EpinID: "EPN123475",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123456",
  },
];

const PAGE_SIZE = 10;

export default function EpinReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(simulatedData.length / PAGE_SIZE);
  const paginatedData = simulatedData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            VIEW UNUSED EPINs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Epin ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referral Member ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.EpinID}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/register?epinId=${data.EpinID}`}
                        legacyBehavior
                      >
                        <a
                          className="text-blue-600 hover:text-blue-900"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Register E-PIN
                        </a>
                      </Link>
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
