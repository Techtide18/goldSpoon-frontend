"use client";

import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { toast } from "sonner";

const PAGE_SIZE = 100;

export default function ViewGroups() {
  const [viewOption, setViewOption] = useState("");
  const [filterGroupName, setFilterGroupName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  const fetchGroups = async () => {
    try {
      const response = await axios.get("http://localhost:8080/group/all", {
        headers: {
          "Content-Type": "application/json",
          adminMemberId: 1,
        },
      });
      setFilteredData(response.data);
      toast.success("Groups data fetched successfully.");
    } catch (error) {
      console.error("Error fetching groups data:", error);
      toast.error("Failed to fetch groups data.");
    }
  };

  const handleViewAll = () => {
    setViewOption("all");
    setFilterGroupName("");
    setCurrentPage(1);
    fetchGroups();
  };

  const handleViewByGroupName = () => {
    setViewOption("groupName");
    setCurrentPage(1);
  };

  const handleSubmit = () => {
    if (filterGroupName) {
      const filtered = filteredData.filter((data) => data.groupName === filterGroupName);
      setFilteredData(filtered);
    } else {
      fetchGroups();
    }
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl mb-4">
        <CardHeader>
          <CardTitle>VIEW GROUPS</CardTitle>
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
            className={`font-bold ${viewOption === "groupName" ? "bg-black text-white" : "border-black"}`}
            onClick={handleViewByGroupName}
            variant={viewOption === "groupName" ? "solid" : "outline"}
          >
            View by Group Name ↓
          </Button>
        </CardContent>
        {viewOption === "groupName" && (
          <CardFooter className="flex flex-row space-x-4">
            <Input
              placeholder="Group Name"
              value={filterGroupName}
              onChange={(e) => setFilterGroupName(e.target.value)}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        )}
      </Card>

      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Group Report</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Token Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Token Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Is Filled</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filled Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Is Completed</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.groupName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(data.createdDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.maxTokenCapacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.currentTokenCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.groupFullDate ? "Yes" : "No"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(data.groupFullDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.packageName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.isCompleted ? "Yes" : "No"}</td>
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
