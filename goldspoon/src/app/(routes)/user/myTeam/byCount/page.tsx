// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function ViewCount() {
  const [levelsData, setLevelsData] = useState([]);

  const fetchLevelsData = async () => {
    const session = await getSession();
    if (!session || !session.user || !session.user.name) {
      toast.error("You must be logged in to view this information.");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/levels`,
        {
          params: {
            memberNumber: session.user.name,
          },
        }
      );

      if (response.data) {
        setLevelsData(response.data);
      } else {
        setLevelsData([]);
        toast.error("No data returned from the server.");
      }
    } catch (error) {
      toast.error("Failed to fetch data.");
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchLevelsData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">VIEW TEAM COUNT ACROSS ALL LEVELS</CardTitle>
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
              {levelsData.length > 0 ? (
                levelsData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.level}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.count}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
