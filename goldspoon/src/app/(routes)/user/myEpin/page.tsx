"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Simulated Data
const simulatedEpin = {
  epinNumber: "EPN123456",
  groupNumber: "G12",
  tokenNumber: "98",
  packageName: "Package - 1500",
  isActive: "Yes",
};

export default function ViewEpin() {
  const [epin] = useState(simulatedEpin);

  return (
    <div className="flex justify-center items-start py-4 px-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-5xl mt-4">
        {/* Epin Card */}
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-2xl font-bold">VIEW EPIN</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {Object.entries(epin).map(([key, value]) => (
              <div
                className="flex justify-between items-center py-2 border-b border-gray-200"
                key={key}
              >
                <span className="font-semibold text-md capitalize">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())
                    .replace("Id", "ID")}
                  :
                </span>
                <span className="text-gray-700 text-md">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
