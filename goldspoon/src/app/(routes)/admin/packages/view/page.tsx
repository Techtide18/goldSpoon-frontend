"use client";

import { useState, useEffect } from "react";
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ViewPackage() {
  const [viewOption, setViewOption] = useState("");
  const [packageName, setPackageName] = useState("");
  const [filteredPackages, setFilteredPackages] = useState([]);

  const fetchPackages = async () => {
    console.log("fetchPackages called");
    try {
      const response = await axios.get("http://localhost:8080/admin/packages", {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "e8f63d22-6a2d-42b0-845a-31f0f08e35b3",
          "adminMemberId": 1,
        },
      });
      setFilteredPackages(response.data);
    } catch (error) {
      console.error('Failed to fetch packages:', error);
      toast.error("Failed to load packages.");
    }
  };

  const handleViewAll = () => {
    setViewOption("all");
    fetchPackages();
    setPackageName("");
  };

  const handleViewByName = () => {
    setViewOption("byName");
  };

  const handlePackageNameChange = (e) => {
    setPackageName(e.target.value);
  };

  const getPackageByName = () => {
    if (!packageName) {
      return toast.error("Please enter a Package Name.");
    }

    const packageData = filteredPackages.filter(
      (pkg) => pkg.packageName.toLowerCase() === packageName.toLowerCase()
    );

    if (packageData.length === 0) {
      return toast.error("Package not found.");
    }

    setFilteredPackages(packageData);
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <div className="w-full max-w-7xl space-y-8">
        {/* View Options Card */}
        <Card>
          <CardHeader>
            <CardTitle>VIEW PACKAGES</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <Button
                className={`font-bold ${viewOption === "all" ? "bg-black text-white" : "border-black"}`}
                onClick={handleViewAll}
                variant={viewOption === "all" ? "solid" : "outline"}
              >
                View All
              </Button>
              <Button
                className={`font-bold ${viewOption === "byName" ? "bg-black text-white" : "border-black"}`}
                onClick={handleViewByName}
                variant={viewOption === "byName" ? "solid" : "outline"}
              >
                View by Package Name
              </Button>
            </div>
            {viewOption === "byName" && (
              <div className="flex space-x-4 items-center mt-4">
                <Input
                  id="packageName"
                  name="packageName"
                  placeholder="Package Name"
                  value={packageName}
                  onChange={handlePackageNameChange}
                  className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
                />
                <Button onClick={getPackageByName}>Get Package</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Packages Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Package Details</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration (Months)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPackages.map((pkg, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pkg.packageName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.packagePrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.createdDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
