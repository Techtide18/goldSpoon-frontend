// @ts-nocheck
"use client";


import React, { useState, useEffect } from "react";
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
import { Pagination } from "@/components/ui/pagination";
import { toast } from "sonner"; // Assuming 'sonner' exposes a 'toast' function

const PAGE_SIZE = 20;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

export default function UsedEpinReport() {
  const [currentPage, setCurrentPage] = useState(0); // Start from 0
  const [totalItems, setTotalItems] = useState(0);
  const [epinData, setEpinData] = useState([]);

  const fetchEpins = async (params) => {
    const session = await getSession();
    if (!session || !session.user || !session.user.name) {
      toast.error("You must be logged in to view this information.");
      return;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/epins/used`, {
        headers: {
          adminMemberId: 2,
        },
        params: {
          isRefferal: true,
          ...params,
          memberNumber: session.user.name,
        },
      });

      if (response.data && response.data.content) {
        setEpinData(response.data.content);
        setTotalItems(response.data.pagination.totalItems);
      } else {
        setEpinData([]);
        toast.error("No data returned from the server.");
      }
      toast.success("Fetched Used EPIN data successfully.");
    } catch (error) {
      toast.error("Failed to fetch EPIN data.");
      console.error("Failed to fetch EPIN data:", error);
    }
  };

  useEffect(() => {
    fetchEpins({ pageNumber: currentPage, pageSize: PAGE_SIZE }); // Use currentPage directly
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page - 1); // Adjust the page index
    fetchEpins({ pageNumber: page - 1, pageSize: PAGE_SIZE });
  };

  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">VIEW USED EPINs</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  EPIN ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MEMBER ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PACKAGE NAME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CREATED DATE
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {epinData.length > 0 ? (
                epinData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.epinNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.memberNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.packageName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(data.createdDate)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Pagination
            count={totalPages}
            page={currentPage + 1} // Adjust for 0-based index
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
            onClick={() => handlePageChange(null, Math.max(currentPage, 1))}
            disabled={currentPage === 0}
          >
            Previous 20
          </Button>
          <Button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={() =>
              handlePageChange(null, Math.min(currentPage + 2, totalPages))
            }
            disabled={currentPage + 1 === totalPages}
          >
            Next 20
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
