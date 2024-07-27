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

const PAGE_SIZE = 10;

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

export default function ViewWithdrawalRequests() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [withdrawalRequestsData, setWithdrawalRequestsData] = useState([]);
  const [memberNumber, setMemberNumber] = useState("");

  const fetchWithdrawalRequests = async (params) => {
    const session = await getSession();
    if (!session || !session.user || !session.user.name) {
      toast.error('You must be logged in to view this information.');
      return;
    }

    setMemberNumber(session.user.name);

    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/payout/withdrawalRequest/Details`, {
        params: {
          ...params,
          memberNumber: session.user.name, 
        },
      });

      if (response.data && response.data.content) {
        setWithdrawalRequestsData(response.data.content);
        setTotalItems(response.data.pagination.totalItems); 
      } else {
        setWithdrawalRequestsData([]);
        toast.error('No data returned from the server.');
      }
      toast.success("All withdrawals fetched successfully!");
    } catch (error) {
      toast.error('Failed to fetch withdrawal requests.');
      console.error("Failed to fetch withdrawal requests:", error);
    }
  };

  useEffect(() => {
    fetchWithdrawalRequests({ pageNumber: currentPage - 1, pageSize: PAGE_SIZE });
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    fetchWithdrawalRequests({ pageNumber: page - 1, pageSize: PAGE_SIZE });
  };

  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">VIEW WITHDRAWAL REQUESTS</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Withdrawal Request Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin Charges (10%)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {withdrawalRequestsData.length > 0 ? (
                withdrawalRequestsData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatDate(data.withdrawalDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(data.adminCharge).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.status}
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
        </CardContent>
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
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous 10
          </Button>
          <Button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next 10
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
