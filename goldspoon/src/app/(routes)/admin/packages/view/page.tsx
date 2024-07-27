// @ts-nocheck
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
  const [viewOption, setViewOption] = useState("all");
  const [packageName, setPackageName] = useState("");
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/package/all`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "e8f63d22-6a2d-42b0-845a-31f0f08e35b3",
          "adminMemberId": 1,
        },
      });
      setPackages(response.data);
      setFilteredPackages(response.data);
      toast.success("Packages fetched successfully.");
    } catch (error) {
      console.error('Failed to fetch packages:', error);
      toast.error("Failed to load packages.");
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleViewAll = () => {
    setViewOption("all");
    setPackageName("");
    setFilteredPackages(packages);
  };

  const handleViewByName = () => {
    setViewOption("byName");
    setPackageName("");
  };

  const handlePackageNameChange = (e) => {
    const searchValue = e.target.value;
    setPackageName(searchValue);

    if (searchValue === "") {
      setFilteredPackages(packages);
    } else {
      const regex = new RegExp(searchValue, 'i');
      const filtered = packages.filter((pkg) => regex.test(pkg.packageName));
      setFilteredPackages(filtered);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.packageDurationInMonths}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(pkg.createdDate)}</td>
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
