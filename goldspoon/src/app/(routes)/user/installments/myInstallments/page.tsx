// @ts-nocheck
"use client";


import React, { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PAGE_SIZE = 10;

export default function InstallmentsReport() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [installmentsData, setInstallmentsData] = useState([]);

  useEffect(() => {
    const fetchInstallments = async () => {
      const session = await getSession();
      if (!session || !session.user || !session.user.name) {
        toast.error('You must be logged in to view this information.');
        return;
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/installments`, {
          params: {
            pageNumber: currentPage,
            pageSize: PAGE_SIZE,
            memberNumber: session.user.name,
          },
        });

        if (response.data && response.data.content) {
          setInstallmentsData(response.data.content);
          setTotalPages(Math.ceil(response.data.totalElements / PAGE_SIZE));
        } else {
          setInstallmentsData([]);
          toast.error('No data returned from the server.');
        }
      } catch (error) {
        toast.error('Failed to fetch installments data.');
        console.error("Failed to fetch installments data:", error);
      }
    };

    fetchInstallments();
  }, [currentPage]);

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">MY INSTALLMENTS</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Installment Paid On Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Installment Month Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  EPIN Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package Name
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {installmentsData.length > 0 ? (
                installmentsData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.paidOnDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.installmentMonthCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.transactionId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.epinNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.packageName}
                    </td>
                  </tr>
                ))
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
        <CardFooter className="flex justify-end space-x-2">
          <div className="flex space-x-2">
            <Button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
            >
              Previous 10
            </Button>
            <Button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={currentPage >= totalPages - 1}
            >
              Next 10
            </Button>
          </div>
        </CardFooter>
        <CardFooter className="flex justify-end space-x-2">
          <Pagination
            count={totalPages}
            page={currentPage + 1}
            onChange={(e, page) => setCurrentPage(page - 1)}
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
        </CardFooter>
      </Card>
    </div>
  );
}
