"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function AddInstallment() {
  const [formData, setFormData] = useState({
    memberId: "",
    pinPackage: "",
    amountReceived: "",
    paymentMethod: "",
    transactionId: "",
    installmentMonth: "",
    remarks: "",
  });

  const [memberName, setMemberName] = useState("");
  const [packages, setPackages] = useState([]);
  const [selectedPackageDuration, setSelectedPackageDuration] = useState(0);
  const [selectedPackageName, setSelectedPackageName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchMemberName = async () => {
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
    } catch (error) {
      console.error("Error fetching member name:", error);
      setMemberName("Unknown");
    }
  };

  const fetchPackages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/package/all", {
        headers: {
          "Content-Type": "application/json",
          adminMemberId: 1,
        },
      });
      setPackages(response.data);
    } catch (error) {
      toast.error("Failed to fetch packages.");
    }
  };

  const handlePackageChange = (value) => {
    const selectedPackage = packages.find((pkg) => pkg.id === parseInt(value));
    setFormData({
      ...formData,
      pinPackage: value,
    });
    if (selectedPackage) {
      setSelectedPackageDuration(selectedPackage.packageDurationInMonths);
      setSelectedPackageName(selectedPackage.packageName);
    } else {
      setSelectedPackageDuration(0);
      setSelectedPackageName("");
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
    const {
      memberId,
      pinPackage,
      amountReceived,
      paymentMethod,
      transactionId,
      installmentMonth,
      remarks,
    } = formData;

    if (
      !memberId ||
      !pinPackage ||
      !amountReceived ||
      !paymentMethod ||
      !installmentMonth
    ) {
      return toast.error("Please fill out all fields.");
    }

    const requestData = {
      memberNumber: memberId,
      amountPaid: parseInt(amountReceived),
      transactionId,
      paymentMethod,
      installmentMonth: parseInt(installmentMonth),
    };

    const toastId = toast.loading("Adding Installment...");
    try {
      await axios.put("http://localhost:8080/installments/add", requestData, {
        headers: {
          adminMemberId: 1,
        },
      });

      toast.success("Installment added successfully!", {
        id: toastId,
      });

      setIsDialogOpen(true);
      setFormData({
        memberId: "",
        pinPackage: "",
        amountReceived: "",
        paymentMethod: "",
        transactionId: "",
        installmentMonth: "",
        remarks: "",
      });
      setSelectedPackageName("");
      setSelectedPackageDuration(0);
      setMemberName("");
    } catch (error) {
      toast.error("Failed to add installment. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>ADD INSTALLMENT</CardTitle>
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
                  onClick={fetchMemberName}
                  type="button"
                  className="min-w-max"
                >
                  Get Member Name
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
              <Label htmlFor="pinPackage">Package</Label>
              <Select
                name="pinPackage"
                value={formData.pinPackage}
                onValueChange={handlePackageChange}
                required
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={selectedPackageName || "Select Package"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {packages.map((pkg) => (
                    <SelectItem key={pkg.id} value={pkg.id.toString()}>
                      {pkg.packageName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="amountReceived">Amount Received</Label>
              <Input
                id="amountReceived"
                name="amountReceived"
                type="number"
                placeholder="Amount Received"
                value={formData.amountReceived}
                onChange={handleChange}
                required
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                name="paymentMethod"
                value={formData.paymentMethod}
                onValueChange={(value) =>
                  setFormData({ ...formData, paymentMethod: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash Deposit">Cash Deposit</SelectItem>
                  <SelectItem value="Paytm">Paytm</SelectItem>
                  <SelectItem value="Google Pay">Google Pay</SelectItem>
                  <SelectItem value="Phone Pay">Phone Pay</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                  <SelectItem value="Internet Banking">
                    Internet Banking
                  </SelectItem>
                  <SelectItem value="Money Order">Money Order</SelectItem>
                  <SelectItem value="Demand Draft">Demand Draft</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="transactionId">Payment Transaction ID</Label>
              <Input
                id="transactionId"
                name="transactionId"
                placeholder="Payment Transaction ID"
                value={formData.transactionId}
                onChange={handleChange}
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="installmentMonth">Installment Month</Label>
              <Select
                name="installmentMonth"
                value={formData.installmentMonth}
                onValueChange={(value) =>
                  setFormData({ ...formData, installmentMonth: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Installment Month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: selectedPackageDuration }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      Month - {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                name="remarks"
                placeholder="Remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                rows={4} // This will make the textarea twice the height of a normal input
              />
            </div>
            <div className="space-y-2">
              <Button className="w-full" type="submit" variant="destructive">
                Add Installment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(true)}
        className="mt-8 mb-8"
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>Installment Added</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>
                Installment added for <strong>{formData.memberId}</strong> in
                group <strong>G12</strong> for the installment of{" "}
                <strong>{formData.installmentMonth}</strong>, for which group
                level installment is running at{" "}
                <strong>{formData.installmentMonth}</strong> for package{" "}
                <strong>{formData.pinPackage}</strong>.
              </p>
            </div>
          </DialogDescription>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
