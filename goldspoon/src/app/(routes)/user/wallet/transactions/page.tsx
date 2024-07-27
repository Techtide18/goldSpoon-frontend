// @ts-nocheck
"use client";


import React, { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { toast } from "sonner";

const PAGE_SIZE = 10;

export default function ViewTransactionDetails() {
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionDetailsData, setTransactionDetailsData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [memberNumber, setMemberNumber] = useState("");

  useEffect(() => {
    fetchTransactionDetails(currentPage);
  }, [currentPage]);

  const fetchTransactionDetails = async (pageNumber) => {
    const session = await getSession();
    if (!session || !session.user || !session.user.name) {
      toast.error("You must be logged in to view this information.");
      return;
    }

    setMemberNumber(session.user.name);

    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/payout/transactions`, {
        params: {
          memberNumber: session.user.name,
          pageSize: PAGE_SIZE,
          pageNumber: pageNumber - 1, // Server expects zero-based page number
        },
        headers: {
          adminMemberId: 1,
        },
      });

      const data = response.data.content;
      setTransactionDetailsData(data);
      setTotalPages(response.data.pagination.totalPages);
      toast.success("Fetched transaction details successfully.");
    } catch (error) {
      toast.error("Failed to fetch transaction details.");
      console.error("Failed to fetch transaction details:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">VIEW TRANSACTION DETAILS</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction Completed Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction Mode
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approved Withdrawal Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin Charges (10%)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Final Amount Paid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Note
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactionDetailsData.length > 0 ? (
                transactionDetailsData.map((data, index) => {
                  const adminCharges = Math.round(data.amount * 0.1);
                  const finalAmount = data.amount - adminCharges;
                  const transactionMode = data.transactionType === "BALANCE_APPROVAL" ? "BALANCE APPROVAL" : data.transactionType;

                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {new Date(data.createdDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transactionMode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {adminCharges}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {finalAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.note || ""}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="6"
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
