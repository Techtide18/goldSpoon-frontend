"use client";

import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const PAGE_SIZE = 100;

export default function ViewPasswords() {
  const [viewOption, setViewOption] = useState("");
  const [filterId, setFilterId] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const fetchAllMembers = async (pageNumber = 0) => {
    try {
      const response = await axios.get(`http://localhost:8080/admin/members?pageNumber=${pageNumber}&pageSize=${PAGE_SIZE}`, {
        headers: {
          "adminMemberId": 1,
        },
      });
      setFilteredData(response.data);
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

  const handleViewAll = () => {
    setViewOption("all");
    setFilterId("");
    fetchAllMembers();
  };

  const handleViewByMemberId = () => {
    setViewOption("memberId");
  };

  const handleGetPassword = () => {
    fetchMemberById();
  };

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
      </Card>
    </div>
  );
}
