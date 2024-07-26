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
import Image from "next/image";  // Import the Image component

const Register = () => {
  const searchParams = useSearchParams();
  const epinId = useMemo(() => searchParams.get("epinId"), [searchParams]);

  const [formData, setFormData] = useState({
    epinId: "",
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

  const [memberNumber, setMemberNumber] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      epinId,
      firstName,
      lastName,
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

    if (!/[A-Za-z]/.test(password.trim())) {
      return toast.error("Password must contain at least one letter.");
    }

    const fullName = `${firstName} ${lastName}`;
    const requestData = {
      epinNumber: epinId,
      fullName,
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
        "http://localhost:8080/member/register",
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
      const errorMessage =
        error.response?.data || "Failed to register member. Please try again.";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-[#1995AD] flex flex-col items-center justify-center relative">
      <Image
          src="https://goldspoon.co.in/template/images/logo.svg"
          alt="Logo"
          width={192} // Adjust width as necessary
          height={48} // Adjust height as necessary
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
        <div className="absolute bottom-4 text-center text-white text-sm px-4 z-10">
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
      <div className="w-1/2 bg-[#A1D6E2] flex items-center justify-center overflow-y-auto pt-24 pb-2">
        <Card className="w-full max-w-lg bg-[#F1F1F2] shadow-lg rounded-lg p-8">
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
              <div className="grid grid-cols-2 gap-4">
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
              <div className="grid grid-cols-2 gap-4">
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
              <div className="grid grid-cols-2 gap-4">
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
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
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
          <CardFooter className="flex justify-center flex-col items-center">
          </CardFooter>
        </Card>
        {isDialogOpen && (
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => setIsDialogOpen(open)}
          >
            <DialogContent>
              <DialogTitle>Registration Successful</DialogTitle>
              <DialogDescription>
                Your member number is <strong>{memberNumber}</strong>. Please keep
                it safely as it will not be generated again.
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
