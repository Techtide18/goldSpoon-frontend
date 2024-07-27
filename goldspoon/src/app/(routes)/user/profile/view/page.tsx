// @ts-nocheck
"use client";


import { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner"; // Assuming 'sonner' exposes a 'toast' function

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

export default function ViewProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const session = await getSession();
      if (!session || !session.user || !session.user.name) {
        toast.error('You must be logged in to view this information.');
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/member/${session.user.name}`, {
        });

        if (response.data) {
          setProfile(response.data);
        } else {
          toast.error('No profile data returned from the server.');
        }
        toast.success("Fetched profile.");
      } catch (error) {
        toast.error('Failed to fetch profile data.');
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div></div>;
  }

  const profileFields = [
    { label: "Full Name", value: profile.fullName },
    { label: "Member ID", value: profile.memberNumber },
    { label: "Phone", value: profile.phone },
    { label: "Email", value: profile.email },
    { label: "Aadhaar Number", value: profile.aadhaarNumber },
    { label: "PAN Number", value: profile.panNumber },
    { label: "Address", value: profile.addressDetails },
    { label: "Bank Account Details", value: profile.bankAccDetails },
  ];

  return (
    <div className="flex justify-center items-start py-4 px-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-5xl mt-4">
        {/* Profile Card */}
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-2xl font-bold">VIEW PROFILE</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {profileFields.map(({ label, value }) => (
              <div
                className="flex justify-between items-center py-2 border-b border-gray-200"
                key={label}
              >
                <span className="font-semibold text-md capitalize">
                  {label}:
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
