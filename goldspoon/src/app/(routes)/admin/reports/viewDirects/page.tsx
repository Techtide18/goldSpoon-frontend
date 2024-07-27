// @ts-nocheck
"use client";


import React, { useState } from "react";
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

export default function ViewDirects() {
  const [viewOption, setViewOption] = useState("");
  const [customDirectCount, setCustomDirectCount] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchDirects = async (minDirects, maxDirects) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/directs`, {
        params: { minDirects, maxDirects },
        headers: {
          "Content-Type": "application/json",
          adminMemberId: 1,
        },
      });
      setFilteredData(response.data);
      setCurrentPage(1);
      toast.success("Directs data fetched successfully.");
    } catch (error) {
      console.error("Error fetching directs data:", error);
      toast.error("Failed to fetch directs data.");
    }
  };

  const handleView5Directs = () => {
    setViewOption("5directs");
    fetchDirects(5, 10);
  };

  const handleView10Directs = () => {
    setViewOption("10directs");
    fetchDirects(10, 20);
  };

  const handleView20Directs = () => {
    setViewOption("20directs");
    fetchDirects(20, null);
  };

  const handleViewCustomDirects = () => {
    if (!customDirectCount || customDirectCount <= 0) {
      return toast.error("Please enter a valid number of directs.");
    }
    fetchDirects(customDirectCount, null);
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
          <CardTitle>VIEW DIRECTS</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row space-x-4">
          <Button
            className={`font-bold ${
              viewOption === "5directs" ? "bg-black text-white" : "border-black"
            }`}
            onClick={handleView5Directs}
            variant={viewOption === "5directs" ? "solid" : "outline"}
          >
            View 5 Directs
          </Button>
          <Button
            className={`font-bold ${
              viewOption === "10directs"
                ? "bg-black text-white"
                : "border-black"
            }`}
            onClick={handleView10Directs}
            variant={viewOption === "10directs" ? "solid" : "outline"}
          >
            View 10 Directs
          </Button>
          <Button
            className={`font-bold ${
              viewOption === "20directs"
                ? "bg-black text-white"
                : "border-black"
            }`}
            onClick={handleView20Directs}
            variant={viewOption === "20directs" ? "solid" : "outline"}
          >
            View 20 Directs
          </Button>
          <Button
            className={`font-bold ${
              viewOption === "customDirects"
                ? "bg-black text-white"
                : "border-black"
            }`}
            onClick={() => setViewOption("customDirects")}
            variant={viewOption === "customDirects" ? "solid" : "outline"}
          >
            View Custom Directs
          </Button>
        </CardContent>
        {viewOption === "customDirects" && (
          <CardFooter className="flex flex-row space-x-4">
            <Input
              type="number"
              placeholder="Enter number of directs"
              value={customDirectCount}
              onChange={(e) => setCustomDirectCount(Number(e.target.value))}
            />
            <Button onClick={handleViewCustomDirects}>
              Get Custom Directs
            </Button>
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
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Direct Count
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((data, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {(currentPage - 1) * PAGE_SIZE + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.memberId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.memberName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.directCount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
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
        <CardFooter className="flex justify-end space-x-2">
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
          <div className="flex space-x-2">
            <Button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous 100
            </Button>
            <Button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next 100
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
