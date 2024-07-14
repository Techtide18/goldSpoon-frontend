"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Simulated Data
const simulatedData = [
  { memberId: "MEM123456", memberName: "John Doe", password: "password123" },
  { memberId: "MEM123457", memberName: "Jane Smith", password: "password456" },
  { memberId: "MEM123458", memberName: "Alice Johnson", password: "password789" },
  // Add more data as needed
];

export default function ViewPasswords() {
  const [viewOption, setViewOption] = useState("all");
  const [filterId, setFilterId] = useState("");
  const [filteredData, setFilteredData] = useState(simulatedData);

  const handleViewAll = () => {
    setViewOption("all");
    setFilterId("");
    setFilteredData(simulatedData);
  };

  const handleViewByMemberId = () => {
    setViewOption("memberId");
  };

  const handleGetPassword = () => {
    const filtered = simulatedData.filter(data => data.memberId === filterId);
    setFilteredData(filtered);
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.memberId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.memberName}</td>
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
