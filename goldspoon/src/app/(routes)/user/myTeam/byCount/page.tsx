"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Simulated Data for Levels and Counts
const levelsData = [
  { level: "Level 1", count: 23 },
  { level: "Level 2", count: 2 },
  { level: "Level 3", count: 3 },
  { level: "Level 4", count: 4 },
  { level: "Level 5", count: 5 },
  { level: "Level 6", count: 6 },
  { level: "Level 7", count: 7 },
  { level: "Level 8", count: 8 },
  { level: "Level 9", count: 9 },
  { level: "Level 10", count: 10 },
];

export default function ViewCount() {
  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">VIEW TEAM COUNT ACCROSS ALL LEVELS</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {levelsData.map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {data.level}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
