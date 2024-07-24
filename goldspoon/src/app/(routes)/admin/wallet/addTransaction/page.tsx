"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function AddTransaction() {
  const [formData, setFormData] = useState({
    memberId: "",
    selectedWithdrawal: "",
  });

  const [memberName, setMemberName] = useState("");
  const [approvedWithdrawals, setApprovedWithdrawals] = useState([]);

  const fetchMemberNameAndWithdrawals = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/member/${formData.memberId}`,
        {
          headers: {
            adminMemberId: 1,
          },
        }
      );
      setMemberName(response.data.fullName);

      const withdrawalResponse = await axios.get(
        "http://localhost:8080/payout/withdrawalRequest/Details",
        {
          params: {
            pageSize: 50,
            pageNumber: 0,
            memberNumber: formData.memberId,
            status: "APPROVED",
          },
          headers: {
            adminMemberId: 1,
          },
        }
      );
      const withdrawals = withdrawalResponse.data.content.map((wd) => ({
        id: wd.id,
        date: new Date(wd.withdrawalDate).toLocaleDateString(),
        amount: wd.amount,
      }));
      setApprovedWithdrawals(withdrawals);

      toast.success("Fetched member details and approved withdrawal requests successfully.");
    } catch (error) {
      console.error("Error fetching data:", error);
      setMemberName("Unknown");
      toast.error("Failed to fetch member name or withdrawals.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { memberId, selectedWithdrawal } = formData;

    if (!memberId || !selectedWithdrawal) {
      return toast.error("Please fill out all fields.");
    }

    const requestData = {
      memberNumber: memberId,
      withdrawalRequestId: selectedWithdrawal,
    };

    const toastId = toast.loading("Adding Transaction...");
    try {
      await axios.post(
        "http://localhost:8080/payout/withdrawal/admin/create",
        requestData,
        {
          headers: {
            adminMemberId: 1,
          },
        }
      );

      toast.success("Transaction added successfully!", {
        id: toastId,
      });

      setFormData({
        memberId: "",
        selectedWithdrawal: "",
      });
      setMemberName("");
      setApprovedWithdrawals([]);
    } catch (error) {
      toast.error("Failed to complete transaction. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>ADD TRANSACTION</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="memberId">Member ID</Label>
              <div className="flex gap-4">
                <Input
                  id="memberId"
                  name="memberId"
                  placeholder="Member ID"
                  value={formData.memberId}
                  onChange={handleChange}
                  required
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
                <Button
                  onClick={fetchMemberNameAndWithdrawals}
                  type="button"
                  className="min-w-max"
                >
                  Get Member Details
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="memberName">Member Name</Label>
              <Input
                id="memberName"
                name="memberName"
                placeholder="Auto Generated"
                value={memberName}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="approvedWithdrawals">Approved Withdrawal</Label>
              <Select
                name="approvedWithdrawals"
                value={formData.selectedWithdrawal}
                onValueChange={(value) =>
                  setFormData({ ...formData, selectedWithdrawal: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Approved Withdrawal Requests" />
                </SelectTrigger>
                <SelectContent>
                  {approvedWithdrawals.length > 0 ? (
                    approvedWithdrawals.map((wd) => (
                      <SelectItem key={wd.id} value={wd.id.toString()}>
                        {`${wd.date} - ₹${wd.amount}`}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-requests" disabled>
                      No approved withdrawal requests present
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Button className="w-full" type="submit" variant="destructive">
                Complete Transaction
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
