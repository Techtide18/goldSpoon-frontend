// @ts-nocheck
"use client";


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ViewGroups() {
  const [viewOption, setViewOption] = useState("all");
  const [filterGroupName, setFilterGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/group/all`, {
        headers: {
          "Content-Type": "application/json",
          adminMemberId: 1,
        },
      });
      setGroups(response.data);
      setFilteredData(response.data);
      toast.success("Groups data fetched successfully.");
    } catch (error) {
      console.error("Error fetching groups data:", error);
      toast.error("Failed to fetch groups data.");
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleViewAll = () => {
    setViewOption("all");
    setFilterGroupName("");
    setFilteredData(groups);
  };

  const handleViewByGroupName = () => {
    setViewOption("groupName");
    setFilterGroupName("");
  };

  const handleGroupNameChange = (e) => {
    const searchValue = e.target.value;
    setFilterGroupName(searchValue);

    if (searchValue === "") {
      setFilteredData(groups);
    } else {
      const regex = new RegExp(searchValue, 'i');
      const filtered = groups.filter((group) => regex.test(group.groupName));
      setFilteredData(filtered);
    }
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
              onChange={handleGroupNameChange}
            />
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
              {filteredData.map((data, index) => (
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
      </Card>
    </div>
  );
}
