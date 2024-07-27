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

const formatDateString = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}-${date.getFullYear()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  return formattedDate;
};

export default function ViewMembers() {
  const [viewOption, setViewOption] = useState("all");
  const [filterId, setFilterId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (viewOption === "all") {
      fetchMembers(0);
    }
  }, [viewOption]);

  const fetchMembers = async (pageNumber = 0) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/member/all`, {
        headers: {
          "Content-Type": "application/json",
          "adminMemberId": 1,
        },
        params: {
          pageNumber,
          pageSize: PAGE_SIZE,
        },
      });
      const data = response.data;
      setFilteredData(data.content);
      setTotalItems(data.pagination.totalItems);
      toast.success("Members data fetched successfully.");
    } catch (error) {
      console.error("Error fetching members data:", error);
      toast.error("Failed to fetch members data.");
    }
  };

  const handleViewAll = () => {
    setViewOption("all");
    setFilterId("");
    setCurrentPage(1);
    fetchMembers(0);
  };

  const handleViewByMemberId = () => {
    setViewOption("memberId");
    setFilterId(""); // Clear text input
    setCurrentPage(1);
  };

  const getMemberByMemberId = async () => {
    if (!filterId) {
      toast.error("Please enter a Member ID.");
      return;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/member/${filterId}`, {
        headers: {
          "Content-Type": "application/json",
          "adminMemberId": 1,
        },
      });

      const data = response.data ? [response.data] : [];
      if (data.length === 0) {
        toast.error("No data found for the specified Member ID.");
      } else {
        setFilteredData(data);
        toast.success("Member data fetched successfully.");
      }
    } catch (error) {
      console.error("Error fetching member data:", error);
      toast.error("Failed to fetch member data.");
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    if (viewOption === "all") {
      fetchMembers(page - 1);
    } else if (viewOption === "memberId" && filterId) {
      getMemberByMemberId();
    }
  };

  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const paginatedData = filteredData;

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>VIEW MEMBERS</CardTitle>
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
            <Button onClick={getMemberByMemberId}>Get Member</Button>
          </CardFooter>
        )}
      </Card>

      <Card className="w-full max-w-7xl mb-4">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Members Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aadhaar Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAN Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Account Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Is Active</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((data, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.fullName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.memberNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateString(data.createdDate)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.gender}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.aadhaarNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.panNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.addressDetails}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.bankAccDetails}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.isActive ? "Yes" : "No"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="px-6 py-4 text-center text-sm text-gray-500">
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        {viewOption && totalPages > 1 && (
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
