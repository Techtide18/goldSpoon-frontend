"use client";

import { useState } from "react";
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

export default function Register() {
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

  const [memberNumber, setMemberNumber] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { epinId, password, confirmPassword } = formData;

    if (!epinId || !password || !confirmPassword) {
      return toast.error(
        "Please fill out the Epin ID, Password, and Confirm Password fields."
      );
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    const toastId = toast.loading("Registering new member...");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("Member created!", {
      id: toastId,
    });

    const generatedMemberNumber = `LS-${Math.floor(Math.random() * 1000000)}`; // Simulated member number generation
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
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-8 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register With Epin</CardTitle>
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
                  type="text"
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
        <CardFooter className="flex justify-center flex-col">
          <p>
            Already have an account?
            <a className="text-blue-500" href="/login">
              {" "}
              Login
            </a>
          </p>
        </CardFooter>
      </Card>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => open && setIsDialogOpen(true)}
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
    </div>
  );
}
