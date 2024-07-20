"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
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

export default function Report() {
  const [viewOption, setViewOption] = useState("");
  const [filterId, setFilterId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  const fetchAllEpins = async (pageNumber) => {
    try {
      const response = await axios.get(`http://localhost:8080/admin/epins/unused?pageNumber=${pageNumber - 1}&pageSize=${PAGE_SIZE}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "e8f63d22-6a2d-42b0-845a-31f0f08e35b3",
          adminMemberId: 1,
        },
      });
      setFilteredData(response.data);
      toast.success("E-PIN data fetched successfully.");
    } catch (error) {
      console.error("Error fetching E-PIN data:", error);
      toast.error("Failed to fetch E-PIN data.");
    }
  };

  const handleViewAll = () => {
    setViewOption("all");
    setFilterId("");
    setCurrentPage(1);
    fetchAllEpins(1);
  };

  const handleViewByReferralId = () => {
    setViewOption("referralId");
    setCurrentPage(1);
  };

  const getEpinByReferralId = async () => {
    if (!filterId) {
      toast.error("Please enter a Referral Member ID.");
      return;
    }else{
      filterId.trim;
    }

    try {
      const response = await axios.get(`http://localhost:8080/admin/epins/unused?pageNumber=0&pageSize=100&memberNumber=${filterId}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "e8f63d22-6a2d-42b0-845a-31f0f08e35b3",
          adminMemberId: 1,
        },
      });
      setFilteredData(response.data);
      if (response.data.length === 0) {
        toast.error("No data found for the specified Referral Member ID.");
      } else {
        toast.success("E-PIN data fetched successfully.");
      }
    } catch (error) {
      console.error("Error fetching E-PIN data:", error);
      toast.error("Failed to fetch E-PIN data.");
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    if (viewOption === "all") {
      fetchAllEpins(page);
    } else if (viewOption === "referralId") {
      getEpinByReferralId(page);
    }
  };

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl mb-4">
        <CardHeader>
          <CardTitle>VIEW UNUSED EPINs</CardTitle>
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
              viewOption === "referralId"
                ? "bg-black text-white"
                : "border-black"
            }`}
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
            <Button onClick={() => { getEpinByReferralId(); setCurrentPage(1); }}>Get E-PINs</Button>
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
              {paginatedData.map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {data.epinNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.packageName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.createdDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.referredByMemberNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      href={`/register?epinId=${data.epinNumber}`}
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
              ))}
            </tbody>
          </table>
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
              onClick={() => handlePageChange(null, Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous 100
            </Button>
            <Button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              onClick={() => handlePageChange(null, Math.min(currentPage + 1, totalPages))}
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
