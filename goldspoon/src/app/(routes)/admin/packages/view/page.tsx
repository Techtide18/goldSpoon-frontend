"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Simulated Data
const simulatedPackages = [
  {
    packageName: "Basic Plan",
    packagePrice: "1000",
    description: "This is the basic plan.",
    duration: "6",
    createdDate: "2024-01-01",
  },
  {
    packageName: "Premium Plan",
    packagePrice: "2000",
    description: "This is the premium plan.",
    duration: "12",
    createdDate: "2024-02-01",
  },
  // Add more packages for testing
];

export default function ViewPackage() {
  const [viewOption, setViewOption] = useState("all");
  const [packageName, setPackageName] = useState("");
  const [filteredPackages, setFilteredPackages] = useState(simulatedPackages);

  const handleViewAll = () => {
    setViewOption("all");
    setFilteredPackages(simulatedPackages);
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

    const packageData = simulatedPackages.filter(
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
