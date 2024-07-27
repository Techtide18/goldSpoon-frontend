// @ts-nocheck
"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const PAGE_SIZE = 100;

export default function ViewWithdrawalRequests() {
  const [viewOption, setViewOption] = useState("pending");
  const [filterId, setFilterId] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchWithdrawalRequests = useCallback(async (
    pageNumber = 0,
    status = "PENDING",
    memberNumber = null
  ) => {
    try {
      const params = {
        pageNumber,
        pageSize: PAGE_SIZE,
        status,
      };

      if (memberNumber) {
        params.memberNumber = memberNumber;
      }

      const response = await axios.get(
        "https://goldspoon.in/api/payout/withdrawalRequest/Details",
        {
          params,
          headers: {
            "Content-Type": "application/json",
            adminMemberId: 1,
          },
        }
      );

      const requestData = response.data.content.map((request) => ({
        requestId: request.id,
        requestDate: formatDate(request.withdrawalDate),
        memberId: request.memberNumber,
        memberName: request.fullName,
        amountRequested: request.amount,
        adminCharge: request.adminCharge,
        status: request.status.toLowerCase(),
      }));

      setFilteredData(requestData);
      setTotalPages(Math.ceil(response.data.pagination.totalItems / PAGE_SIZE));
      toast.success("Data fetched successfully.");
    } catch (error) {
      console.error("Error fetching withdrawal requests:", error);
      toast.error("Failed to fetch data.");
    }
  }, []);

  const handleViewOption = (option) => {
    setViewOption(option);
    setFilterId("");
    setCurrentPage(1);
    if (option !== "memberId") {
      fetchWithdrawalRequests(0, option.toUpperCase());
    }
  };

  useEffect(() => {
    fetchWithdrawalRequests();
  }, [fetchWithdrawalRequests]);

  const getByMemberId = () => {
    if (!filterId) {
      return toast.error("Please enter a Member ID.");
    }

    fetchWithdrawalRequests(0, null, filterId);
    setCurrentPage(1);
  };

  const approveRequest = (request) => {
    setSelectedRequest(request);
    setIsApproveDialogOpen(true);
  };

  const rejectRequest = (request) => {
    setSelectedRequest(request);
    setIsRejectDialogOpen(true);
  };

  const handleAction = async (action) => {
    const toastId = toast.loading(`Processing ${action} request...`);
    try {
      await axios.put(
        `https://goldspoon.in/api/payout/withdrawalRequest/Details/${selectedRequest.requestId}`,
        { status: action },
        {
          headers: {
            "Content-Type": "application/json",
            adminMemberId: 1,
          },
        }
      );

      toast.success(`Request ${action.toLowerCase()} successfully!`, {
        id: toastId,
      });

      if (action === "APPROVED") {
        setIsApproveDialogOpen(false);
      } else {
        setIsRejectDialogOpen(false);
      }

      // Refresh the data
      fetchWithdrawalRequests(currentPage - 1, viewOption.toUpperCase());
    } catch (error) {
      toast.error(`Failed to ${action.toLowerCase()} request.`, {
        id: toastId,
      });
      console.error(`Error ${action.toLowerCase()} request:`, error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchWithdrawalRequests(
        currentPage - 2,
        viewOption.toUpperCase(),
        viewOption === "memberId" ? filterId : null
      );
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      fetchWithdrawalRequests(
        currentPage,
        viewOption.toUpperCase(),
        viewOption === "memberId" ? filterId : null
      );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      {/* Card 1 */}
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>VIEW WITHDRAWAL REQUESTS</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row space-x-4">
          <Button
            className={`font-bold ${
              viewOption === "pending" ? "bg-black text-white" : "border-black"
            }`}
            onClick={() => handleViewOption("pending")}
            variant={viewOption === "pending" ? "solid" : "outline"}
          >
            View Pending Requests
          </Button>
          <Button
            className={`font-bold ${
              viewOption === "approved" ? "bg-black text-white" : "border-black"
            }`}
            onClick={() => handleViewOption("approved")}
            variant={viewOption === "approved" ? "solid" : "outline"}
          >
            View Approved Requests
          </Button>
          <Button
            className={`font-bold ${
              viewOption === "rejected" ? "bg-black text-white" : "border-black"
            }`}
            onClick={() => handleViewOption("rejected")}
            variant={viewOption === "rejected" ? "solid" : "outline"}
          >
            View Rejected Requests
          </Button>
          <Button
            className={`font-bold ${
              viewOption === "memberId" ? "bg-black text-white" : "border-black"
            }`}
            onClick={() => handleViewOption("memberId")}
            variant={viewOption === "memberId" ? "solid" : "outline"}
          >
            View Requests by Member ID
          </Button>
        </CardContent>
        {viewOption === "memberId" && (
          <CardFooter className="flex flex-row space-x-4">
            <Input
              type="text"
              placeholder="Enter Member ID"
              value={filterId}
              onChange={(e) => setFilterId(e.target.value)}
            />
            <Button onClick={getByMemberId}>Get by Member ID</Button>
          </CardFooter>
        )}
      </Card>

      {/* Card 2 */}
      <Card className="w-full max-w-7xl mb-4">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Withdrawal Requests Report
          </CardTitle>
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
                    Withdrawal Request Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount Requested
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admin Charge (10%)
                  </th>
                  {viewOption === "pending" && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((data, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {(currentPage - 1) * PAGE_SIZE + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.requestDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.memberId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.memberName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.amountRequested}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.adminCharge}
                      </td>
                      {viewOption === "pending" && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                          <Button
                            onClick={() => approveRequest(data)}
                            className="bg-green-500 text-white"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => rejectRequest(data)}
                            className="bg-red-500 text-white"
                          >
                            Reject
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={viewOption === "pending" ? 7 : 6}
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
          <Button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous 100
          </Button>
          <Button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next 100
          </Button>
        </CardFooter>
      </Card>

      {/* Approve Request Dialog */}
      <Dialog
        open={isApproveDialogOpen}
        onOpenChange={(open) => setIsApproveDialogOpen(open)}
      >
        <DialogContent>
          <DialogTitle>Approve Request</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve the request for amount{" "}
            <strong>{selectedRequest?.amountRequested}</strong> for member ID{" "}
            <strong>{selectedRequest?.memberId}</strong>?
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setIsApproveDialogOpen(false)}>No</Button>
            <Button
              onClick={() => handleAction("APPROVED")}
              className="bg-green-500 text-white"
            >
              Yes, Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Request Dialog */}
      <Dialog
        open={isRejectDialogOpen}
        onOpenChange={(open) => setIsRejectDialogOpen(open)}
      >
        <DialogContent>
          <DialogTitle>Reject Request</DialogTitle>
          <DialogDescription>
            Are you sure you want to reject the request for amount{" "}
            <strong>{selectedRequest?.amountRequested}</strong> for member ID{" "}
            <strong>{selectedRequest?.memberId}</strong>?
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setIsRejectDialogOpen(false)}>No</Button>
            <Button
              onClick={() => handleAction("REJECTED")}
              className="bg-red-500 text-white"
            >
              Yes, Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
