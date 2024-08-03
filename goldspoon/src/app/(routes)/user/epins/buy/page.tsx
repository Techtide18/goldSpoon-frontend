// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function BuyEpin() {
  const [formData, setFormData] = useState({
    numberOfPins: "",
    pinPackage: "",
    referralMemberNumber: "",
  });

  const [packages, setPackages] = useState([]);
  const [packagesLoaded, setPackagesLoaded] = useState(false);
  const [selectedPackageName, setSelectedPackageName] = useState("Select Package");
  const [selectedPackagePrice, setSelectedPackagePrice] = useState("");
  const [generatedPins, setGeneratedPins] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [walletAmount, setWalletAmount] = useState("");

  useEffect(() => {
    fetchWalletDetails();
    fetchSessionData();
  }, []);

  useEffect(() => {
    console.log("FormData updated:", formData);
  }, [formData]);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/all`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "e8f63d22-6a2d-42b0-845a-31f0f08e35b3",
            adminMemberId: 1,
          },
        }
      );
      setPackages(response.data);
      setPackagesLoaded(true);
    } catch (error) {
      toast.error("Failed to fetch packages.");
    }
  };

  const fetchWalletDetails = async () => {
    const session = await getSession();
    if (!session || !session.user || !session.user.name) {
      toast.error('You must be logged in to view this information.');
      return;
    }

    const memberNumber = session.user.name;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payout/walletDetails`,
        {
          params: {
            pageSize: 1,
            pageNumber: 0,
            memberNumber,
          },
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "e8f63d22-6a2d-42b0-845a-31f0f08e35b3",
            adminMemberId: 1,
          },
        }
      );
      const walletData = response.data.content[0]?.walletDetails || {};
      setWalletAmount(walletData.currentBalance || 0);
    } catch (error) {
      toast.error("Failed to fetch wallet details.");
    }
  };

  const fetchSessionData = async () => {
    const session = await getSession();
    if (session && session.user && session.user.name) {
      setFormData((prevData) => ({
        ...prevData,
        referralMemberNumber: session.user.name,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePackageChange = async (value) => {
    const selectedPackage = packages.find((pkg) => pkg.id == value);
    setFormData({
      ...formData,
      pinPackage: value,
    });
    if (selectedPackage) {
      setSelectedPackageName(selectedPackage.packageName);
      setSelectedPackagePrice(selectedPackage.packagePrice);
    } else {
      setSelectedPackageName("Select Package");
      setSelectedPackagePrice("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { numberOfPins, pinPackage, referralMemberNumber } = formData;

    // Debug logs
    console.log("Form Data on Submit:", formData);

    if (!numberOfPins || !pinPackage) {
      return toast.error("Please fill out all fields.");
    }

    if (parseInt(numberOfPins) > 50) {
      return toast.error("Maximum 50 Pins Allowed At One Time.");
    }

    const requestData = {
      totalEpins: parseInt(numberOfPins),
      packageId: parseInt(pinPackage),
      automaticGroupAssign: true,
      referralMemberNumber,
      amountFromWallet: selectedPackagePrice,
    };

    const toastId = toast.loading("Generating E-PIN...");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/epins/member/generate`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "e8f63d22-6a2d-42b0-845a-31f0f08e35b3",
            adminMemberId: 1,
          },
        }
      );

      const newPins = response.data || [];
      setGeneratedPins(newPins);
      toast.success("E-PINs generated successfully!", {
        id: toastId,
      });

      setIsDialogOpen(true);
      setFormData({
        numberOfPins: "",
        pinPackage: "",
        referralMemberNumber: "",
      });
      setSelectedPackageName("Select Package");
      setSelectedPackagePrice("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to generate E-PINs. Please try again.";
      toast.error(errorMessage, {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>BUY E-PIN</CardTitle>
          <p>Note: Maximum 50 Pins Allowed At One Time</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <Label htmlFor="numberOfPins">Enter No Of Pins</Label>
              <Input
                id="numberOfPins"
                name="numberOfPins"
                type="number"
                placeholder="Enter No Of Pins"
                value={formData.numberOfPins}
                onChange={handleChange}
                required
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <Label htmlFor="pinPackage">Select Package</Label>
              <Select
                name="pinPackage"
                value={formData.pinPackage}
                onValueChange={handlePackageChange}
                required
                onOpenChange={(open) => {
                  if (open && !packagesLoaded) {
                    fetchPackages();
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue className="text-black">
                    {selectedPackageName || "Select Package"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {packages.map((pkg) => (
                    <SelectItem key={pkg.id} value={pkg.id}>
                      {pkg.packageName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <Label htmlFor="packagePrice">Package Price</Label>
              <Input
                id="packagePrice"
                name="packagePrice"
                placeholder="Auto Generated"
                value={selectedPackagePrice}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <Label htmlFor="currentWalletAmount">Current Wallet Amount</Label>
              <Input
                id="currentWalletAmount"
                name="currentWalletAmount"
                value={walletAmount}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="space-y-2">
              <Button className="w-full" type="submit" variant="destructive">
                Buy E-PIN
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => open && setIsDialogOpen(true)}
        className="mt-8 mb-8"
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>E-PINs Generated</DialogTitle>
          <DialogDescription>
            The following E-PINs have been generated. Please copy them safely as
            it will not be generated again.
          </DialogDescription>
          <div className="space-y-2">
            {Array.isArray(generatedPins) &&
              generatedPins.map((pin, index) => <p key={index}>{pin}</p>)}
          </div>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
