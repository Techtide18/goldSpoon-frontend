// @ts-nocheck
"use client";


import React, { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { toast } from "sonner"; // Assuming 'sonner' exposes a 'toast' function
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ReTopupReport() {
  const [reTopupData, setReTopupData] = useState([]);

  useEffect(() => {
    fetchData(); // Call fetchData on component mount
  }, []);

  // Function to fetch re-topup data
  const fetchData = async () => {
    const session = await getSession();
    if (!session || !session.user || !session.user.id) {
      toast.error('You must be logged in to view this information.');
      return;
    }

    try {
      const response = await axios.get(`https://goldspoon.in/api/member/retopup?memberId=${session.user.name}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data) {
        setReTopupData(response.data);
      } else {
        toast.error('No data returned.');
      }
      toast.success("Fetched retopups successfully.");
    } catch (error) {
      toast.error('Failed to fetch re-topup data.');
      console.error("Failed to fetch re-topup data:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 space-y-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">VIEW RETOPUPS</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Old Epin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  New Epin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Old Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  New Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Re-topup Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reTopupData.map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {data.memberId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.oldEpin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.newEpin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.oldPackage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.newPackage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.reTopupDate}
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
