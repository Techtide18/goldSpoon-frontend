// @ts-nocheck
"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from 'next/dynamic';
import { useSearchParams } from "next/navigation";
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
  DialogClose,
} from "@/components/ui/dialog";
import axios from "axios";
import Image from "next/image";

const Register = () => {
  const searchParams = useSearchParams();
  const epinId = useMemo(() => searchParams.get("epinId"), [searchParams]);

  const [formData, setFormData] = useState({
    epinId: "",
    memberId: "",
    memberName: "",
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
    aadhaarNumber: "",
    panNumber: "",
    addressDetails: "",
    password: "",
    confirmPassword: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [memberNumber, setMemberNumber] = useState<string | null>(null);

  useEffect(() => {
    if (epinId) {
      setFormData((prevData) => ({
        ...prevData,
        epinId: epinId || "",
      }));
    }
  }, [epinId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchMemberName = async () => {
    if (!formData.memberId) {
      return toast.error("Please enter a Member ID.");
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/member/name/${formData.memberId}`,
        {
          headers: {
            "Content-Type": "application/json",
            adminMemberId: 1,
          },
        }
      );
      setFormData((prevData) => ({
        ...prevData,
        memberName: response.data || "",
      }));
      toast.success("Member name fetched successfully.");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch member details.";
      setFormData((prevData) => ({
        ...prevData,
        memberName: "Unknown",
      }));
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      epinId,
      memberId,
      firstName,
      lastName,
      gender,
      phone,
      email,
      aadhaarNumber,
      panNumber,
      addressDetails,
      password,
      confirmPassword,
    } = formData;

    if (!epinId || !password || !confirmPassword) {
      return toast.error(
        "Please fill out the Epin ID, Password, and Confirm Password fields."
      );
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    if (password.trim().length < 4) {
      return toast.error("Password must be at least 4 characters long.");
    }

    const fullName = `${firstName} ${lastName}`;
    const requestData = {
      epinNumber: epinId,
      referralMemberNumber: memberId, // Use memberId as referralMemberNumber
      fullName,
      gender: gender ? gender.toUpperCase() : null, // Ensure gender is sent in uppercase or null
      phone,
      email,
      aadhaarNumber: aadhaarNumber ? parseInt(aadhaarNumber) : null,
      panNumber: panNumber ? parseInt(panNumber) : null,
      addressDetails,
      password,
    };

    const toastId = toast.loading("Registering new member...");

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/member/register`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const generatedMemberNumber = response.data.memberNumber;
      toast.success("Member created!", { id: toastId });
      setMemberNumber(generatedMemberNumber);
      setIsDialogOpen(true);
      setFormData({
        epinId: "",
        memberId: "",
        memberName: "",
        firstName: "",
        lastName: "",
        gender: "",
        phone: "",
        email: "",
        aadhaarNumber: "",
        panNumber: "",
        addressDetails: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data || 
          error.response?.data?.message ||
          "Failed to register member. Please try again.";
        toast.error(errorMessage, { id: toastId });
      } else {
        toast.error("An unexpected error occurred. Please try again.", {
          id: toastId,
        });
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#1995AD]">
      <div className="md:w-1/2 bg-[#1995AD] flex flex-col items-center justify-center relative p-4 md:p-0">
        <div className="mt-8 md:mt-0"></div>
        <Image
          src="https://goldspoon.co.in/template/images/logo.svg"
          alt="Logo"
          width={192}
          height={48}
          className="w-48 mb-4 z-10"
        />
        <div className="text-white font-bold mb-4">
          <p className="text-white font-bold">
            Already have an account?{" "}
            <a className="underline" href="/login">
              LOGIN
            </a>
          </p>
        </div>
        <div className="absolute bottom-4 text-center text-white text-sm px-4 z-10 hidden md:block">
          By clicking continue, you agree to our{" "}
          <a href="/terms" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
          .
        </div>
      </div>
      <div className="md:w-1/2 bg-[#A1D6E2] flex flex-col items-center justify-start min-h-screen">
        <div className="w-full max-w-lg mt-4 p-4">
          <Card className="bg-[#F1F1F2] shadow-lg rounded-lg p-8">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold text-[#1995AD] text-center">
                Register With Epin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="epinId">Epin ID *</Label>
                  <Input
                    id="epinId"
                    name="epinId"
                    placeholder="E Pin"
                    value={formData.epinId}
                    onChange={handleChange}
                    required
                    className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memberId">Referral ID / Sponsor ID</Label>
                  <Input
                    id="memberId"
                    name="memberId"
                    placeholder="Enter Id of the Referral"
                    value={formData.memberId}
                    onChange={handleChange}
                    className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                  />
                  <Button
                    onClick={fetchMemberName}
                    type="button"
                    className="w-full mt-2"
                  >
                    Get Referral Name
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memberName">Referral Name</Label>
                  <Input
                    id="memberName"
                    name="memberName"
                    placeholder="Auto Generated"
                    value={formData.memberName}
                    readOnly
                    className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addressDetails">Address Details</Label>
                  <Input
                    id="addressDetails"
                    name="addressDetails"
                    placeholder="Enter your address"
                    value={formData.addressDetails}
                    onChange={handleChange}
                    className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Enter your telephone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gender: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHERS">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
                    <Input
                      id="aadhaarNumber"
                      name="aadhaarNumber"
                      placeholder="Enter your Aadhaar Number"
                      value={formData.aadhaarNumber}
                      onChange={handleChange}
                      className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="panNumber">PAN Number</Label>
                    <Input
                      id="panNumber"
                      name="panNumber"
                      placeholder="Enter your PAN Number"
                      value={formData.panNumber}
                      onChange={handleChange}
                      className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full" type="submit">
                    Register Now
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center flex-col items-center"></CardFooter>
          </Card>
        </div>
        {isDialogOpen && (
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => open && setIsDialogOpen(true)}
          >
            <DialogContent>
              <DialogTitle>Registration Successful</DialogTitle>
              <DialogDescription>
                Your member number is <strong>{memberNumber}</strong>. Please keep it
                safely as it will not be generated again.
              </DialogDescription>
              <DialogClose asChild>
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={() => (window.location.href = "/login")}>
                  Go to Login page
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Register), { ssr: false });
