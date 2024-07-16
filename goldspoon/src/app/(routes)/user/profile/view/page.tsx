"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Simulated Data
const simulatedProfile = {
  memberName: "John Doe",
  memberId: "123456",
  phone: "123-456-7890",
  email: "john.doe@example.com",
  aadhaarNumber: "1234-5678-9012",
  panNumber: "ABCDE1234F",
  address: "123 Main St, City, Country",
  isActive: "Yes",
  bankAccDetails: "Bank Name: ABC Bank, Acc No: 1234567890",
};

export default function ViewProfile() {
  const [profile] = useState(simulatedProfile);

  return (
    <div className="flex justify-center items-center py-8 px-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-4xl">
        {/* Profile Card */}
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-blue-500 text-white">
            <CardTitle className="text-2xl font-bold">VIEW PROFILE</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {Object.entries(profile).map(([key, value]) => (
              <div className="flex justify-between items-center py-2 border-b border-gray-200" key={key}>
                <span className="font-semibold text-md capitalize">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace("Id", "ID")}:</span>
                <span className="text-gray-700 text-md">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
