// @ts-nocheck
"use client";


import { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

export default function ViewEpin() {
  const [epin, setEpin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEpin = async (memberNumber) => {
    try {
      const response = await axios.get("http://localhost:8080/epins/myepin", {
        params: { memberNumber },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data) {
        setEpin(response.data);
      } else {
        toast.error("No data returned from the server.");
      }
      toast.success("Fetched EPIN data successfully.");
    } catch (error) {
      toast.error("Failed to fetch EPIN data.");
      console.error("Failed to fetch EPIN data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getMemberNumber = async () => {
      const session = await getSession();
      if (session && session.user && session.user.name) {
        fetchEpin(session.user.name);
      } else {
        toast.error("You must be logged in to view this information.");
        setIsLoading(false);
      }
    };

    getMemberNumber();
  }, []);

  return (
    <div className="flex justify-center items-start py-4 px-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-5xl mt-4">
        {/* Epin Card */}
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-2xl font-bold">VIEW EPIN</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : epin ? (
              <>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-md capitalize">Epin Number:</span>
                  <span className="text-gray-700 text-md">{epin.epinNumber}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-md capitalize">Group:</span>
                  <span className="text-gray-700 text-md">{epin.groupName}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-md capitalize">Token Number:</span>
                  <span className="text-gray-700 text-md">{epin.tokenNumber}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-md capitalize">Package Name:</span>
                  <span className="text-gray-700 text-md">{epin.packageName}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-md capitalize">Package Price:</span>
                  <span className="text-gray-700 text-md">{epin.packagePrice}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-md capitalize">Installments Paid:</span>
                  <span className="text-gray-700 text-md">{epin.installmentsPaid}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-md capitalize">Is Active:</span>
                  <span className="text-gray-700 text-md">{epin.isActiveEpin ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-md capitalize">Referred By:</span>
                  <span className="text-gray-700 text-md">{epin.referredByName}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-md capitalize">Created Date:</span>
                  <span className="text-gray-700 text-md">{formatDate(epin.createdDate)}</span>
                </div>
              </>
            ) : (
              <div className="text-center">No data available</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
