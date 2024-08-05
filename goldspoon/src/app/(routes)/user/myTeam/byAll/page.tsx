// @ts-nocheck
"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
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

const PAGE_SIZE = 50;

export default function ViewDirects() {
  const [viewOption, setViewOption] = useState("all");
  const [filterLevel, setFilterLevel] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchDirects = useCallback(async (level = null) => {
    const session = await getSession();
    if (!session || !session.user || !session.user.name) {
      toast.error("You must be logged in to view this information.");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/directs`,
        {
          params: {
            memberNumber: session.user.name,
            level,
            pageNumber: currentPage - 1,
            pageSize: PAGE_SIZE,
          },
        }
      );

      if (response.data && response.data.content) {
        setFilteredData(response.data.content);
        setTotalPages(Math.ceil(response.data.totalElements / PAGE_SIZE));
      } else {
        setFilteredData([]);
        toast.error("No data returned from the server.");
      }
    } catch (error) {
      toast.error("Failed to fetch data.");
      console.error("Failed to fetch data:", error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchDirects();
  }, [currentPage, fetchDirects]);

  const handleViewAll = () => {
    setViewOption("all");
    setFilterLevel("");
    setCurrentPage(1);
    fetchDirects();
  };

  const handleViewByLevel = () => {
    if (!filterLevel || filterLevel < 1 || filterLevel > 10) {
      return toast.error("Please enter a valid level between 1 and 10.");
    }

    setViewOption("level");
    setCurrentPage(1);
    fetchDirects(filterLevel);
  };

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
