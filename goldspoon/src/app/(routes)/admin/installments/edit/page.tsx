"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";

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
    referralMemberId: "REF123457",
  },
  {
    EpinID: "EPN123458",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123458",
  },
  {
    EpinID: "EPN123459",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123459",
  },
  {
    EpinID: "EPN123460",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123460",
  },
  {
    EpinID: "EPN123461",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123461",
  },
  {
    EpinID: "EPN123462",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123462",
  },
  {
    EpinID: "EPN123463",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123463",
  },
  {
    EpinID: "EPN123464",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123464",
  },
  {
    EpinID: "EPN123465",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123465",
  },
  // Add more data to test pagination
  {
    EpinID: "EPN123466",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123466",
  },
  {
    EpinID: "EPN123467",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123467",
  },
  {
    EpinID: "EPN123468",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123468",
  },
  {
    EpinID: "EPN123469",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123469",
  },
  {
    EpinID: "EPN123470",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123470",
  },
  {
    EpinID: "EPN123471",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123471",
  },
  {
    EpinID: "EPN123472",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123472",
  },
  {
    EpinID: "EPN123473",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123473",
  },
  {
    EpinID: "EPN123474",
    packageName: "Package - 1500",
    createdDate: "13-07-2024",
    referralMemberId: "REF123474",
  },
  {
    EpinID: "EPN123475",
    packageName: "Package - 2000",
    createdDate: "13-07-2024",
    referralMemberId: "REF123475",
  },
];

const PAGE_SIZE = 100;

export default function Report() {
  const [viewOption, setViewOption] = useState("all");
  const [filterId, setFilterId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleViewAll = () => {
    setViewOption("all");
    setFilterId("");
    setCurrentPage(1);
  };

  const handleViewByReferralId = () => {
    setViewOption("referralId");
    setCurrentPage(1);
  };

  const filteredData = viewOption === "referralId" && filterId
    ? simulatedData.filter((data) => data.referralMemberId === filterId)
    : simulatedData;

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl mb-4">
        <CardHeader>
          <CardTitle >VIEW USED EPINs</CardTitle>
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
            className={`font-bold ${viewOption === "referralId" ? "bg-black text-white" : "border-black"}`}
            onClick={handleViewByReferralId}
            variant={viewOption === "referralId" ? "solid" : "outline"}
          >
            View by Referral Member ID ↓
          </Button>
        </CardContent>
        {viewOption === "referralId" && (
          <CardFooter className="flex flex-row space-x-4">
            <Input
              placeholder="Referral Member ID"
              value={filterId}
              onChange={(e) => setFilterId(e.target.value)}
            />
          </CardFooter>
        )}
      </Card>

      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold">EPIN Report</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Epin ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referral Member ID</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.EpinID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.packageName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.createdDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.referralMemberId}</td>
                  
                </tr>
              ))}
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

//edit installemnt by member id

//delete installment by member id