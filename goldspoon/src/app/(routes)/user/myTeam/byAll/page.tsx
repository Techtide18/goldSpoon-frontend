// @ts-nocheck
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
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { toast } from "sonner";

// Simulated Data
const simulatedDirects = [
  { memberId: "M001", memberName: "John Doe", epinId: "EPN123456", level: 1, packageName: "Package - 1500" },
  { memberId: "M002", memberName: "Jane Smith", epinId: "EPN123457", level: 2, packageName: "Package - 2000" },
  { memberId: "M003", memberName: "Alice Johnson", epinId: "EPN123458", level: 3, packageName: "Package - 1500" },
  { memberId: "M004", memberName: "Bob Brown", epinId: "EPN123459", level: 4, packageName: "Package - 2000" },
  { memberId: "M005", memberName: "Charlie Davis", epinId: "EPN123460", level: 5, packageName: "Package - 1500" },
  { memberId: "M006", memberName: "Dave Wilson", epinId: "EPN123461", level: 6, packageName: "Package - 2000" },
  { memberId: "M007", memberName: "Eva Green", epinId: "EPN123462", level: 7, packageName: "Package - 1500" },
  { memberId: "M008", memberName: "Frank Harris", epinId: "EPN123463", level: 8, packageName: "Package - 2000" },
  { memberId: "M009", memberName: "Grace Lee", epinId: "EPN123464", level: 9, packageName: "Package - 1500" },
  { memberId: "M010", memberName: "Hank Miller", epinId: "EPN123465", level: 10, packageName: "Package - 2000" },
  { memberId: "M011", memberName: "Ivy Walker", epinId: "EPN123466", level: 1, packageName: "Package - 1500" },
  { memberId: "M012", memberName: "Jack Young", epinId: "EPN123467", level: 2, packageName: "Package - 2000" },
  // Add more data to test pagination
];

const PAGE_SIZE = 50;

export default function ViewDirects() {
  const [viewOption, setViewOption] = useState("all");
  const [filterLevel, setFilterLevel] = useState("");
  const [filteredData, setFilteredData] = useState(simulatedDirects);
  const [currentPage, setCurrentPage] = useState(1);

  const handleViewAll = () => {
    setViewOption("all");
    setFilterLevel("");
    setFilteredData(simulatedDirects);
    setCurrentPage(1);
  };

  const handleViewByLevel = () => {
    if (!filterLevel || filterLevel < 1 || filterLevel > 10) {
      return toast.error("Please enter a valid level between 1 and 10.");
    }

    const filtered = simulatedDirects.filter(
      (data) => data.level === parseInt(filterLevel)
    );

    if (filtered.length === 0) {
      toast.error("No data found for the specified level.");
      return;
    }

    setFilteredData(filtered);
    setCurrentPage(1);
    toast.success("Data fetched successfully.");
  };

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      {/* Card 1 */}
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>VIEW TEAM</CardTitle>
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
              viewOption === "level" ? "bg-black text-white" : "border-black"
            }`}
            onClick={() => setViewOption("level")}
            variant={viewOption === "level" ? "solid" : "outline"}
          >
            View by Level
          </Button>
        </CardContent>
        {viewOption === "level" && (
          <CardFooter className="flex flex-row space-x-4">
            <Input
              type="number"
              placeholder="Enter level (1-10)"
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
            />
            <Button onClick={handleViewByLevel}>Search</Button>
          </CardFooter>
        )}
      </Card>

      {/* Card 2 */}
      <Card className="w-full max-w-7xl mb-4">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Directs Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    EPIN ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package Name
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((data, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {data.memberId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.memberName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.epinId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.level}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.packageName}
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
          </div>
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
            Previous 50
          </Button>
          <Button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next 50
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
