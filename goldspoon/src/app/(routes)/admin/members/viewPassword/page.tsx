"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const PAGE_SIZE = 100;

export default function ViewPasswords() {
  const [viewOption, setViewOption] = useState("all");
  const [filterId, setFilterId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const fetchAllMembers = async (pageNumber = 0) => {
    try {
      const response = await axios.get(`http://localhost:8080/member/all?pageNumber=${pageNumber}&pageSize=${PAGE_SIZE}`, {
        headers: {
          "adminMemberId": 1,
        },
      });
      setFilteredData(response.data.content);
      setTotalItems(response.data.pagination.totalItems);
      toast.success("Members data fetched successfully.");
    } catch (error) {
      console.error("Error fetching members data:", error);
      toast.error("Failed to fetch members data.");
    }
  };

  const fetchMemberById = async () => {
    if (!filterId) {
      return toast.error("Please enter a Member ID.");
    }

    try {
      const response = await axios.get(`http://localhost:8080/member/${filterId}`, {
        headers: {
          "adminMemberId": 1,
        },
      });
      const filtered = [response.data];
      setFilteredData(filtered);
      toast.success("Member data fetched successfully.");
    } catch (error) {
      console.error("Error fetching member data:", error);
      toast.error("Failed to fetch member data.");
    }
  };

  useEffect(() => {
    if (viewOption === "all") {
      fetchAllMembers(0);
    }
  }, [viewOption]);

  const handleViewAll = () => {
    setViewOption("all");
    setFilterId("");
    setCurrentPage(1);
    fetchAllMembers(0);
  };

  const handleViewByMemberId = () => {
    setViewOption("memberId");
    setFilterId("");
  };

  const handleGetPassword = () => {
    fetchMemberById();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (viewOption === "all") {
      fetchAllMembers(page - 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalItems / PAGE_SIZE)) {
      handlePageChange(currentPage + 1);
    }
  };

  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl mb-4">
        <CardHeader>
          <CardTitle>VIEW PASSWORDS</CardTitle>
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
            <Button onClick={handleGetPassword}>
              Get Password for Member ID
            </Button>
          </CardFooter>
        )}
      </Card>

      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Passwords</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.memberNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
        {viewOption === "all" && totalPages > 1 && (
          <CardFooter className="flex justify-end space-x-2">
            <Button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous 100
            </Button>
            <Button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              onClick={handleNextPage}
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
