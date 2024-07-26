// @ts-nocheck
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import Image from "next/image";  // Import the Image component
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginClient from "@/components/client/loginClient";
import RegisterForm from "@/components/client/registerClient";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = async (memberId) => {
    setLoading(true);
    try {
      // Simulating a delay to fetch session
      const session = await getSession();
      if (session?.user?.role === "admin") {
        router.push("/admin");
      } else if (session?.user?.role === "user") {
        router.push("/user");
      } else {
        console.error("Invalid role or session");
      }
    } catch (error) {
      console.error("Error during authentication", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-[#A1D6E2] flex flex-col items-center justify-center relative">
        <Image
          src="https://goldspoon.co.in/template/images/logo.svg"
          alt="Logo"
          width={192} // Adjust width as necessary
          height={48} // Adjust height as necessary
          className="w-48 mb-4 z-10"
        />
        {/* <Image
          src="https://images4.alphacoders.com/134/1348334.jpg"
          alt="Scenic Image"
          layout="fill" // Adjust layout as necessary
          objectFit="cover" // Adjust objectFit as necessary
          className="absolute bottom-0 w-full h-auto z-0"
        /> */}
        <div className="absolute bottom-4 text-center text-black text-sm px-4 z-10">
          By clicking continue, you agree to our{" "}
          <a href="/terms" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
          .
        </div>
      </div>
      <div className="w-1/2 bg-[#1995AD] flex items-center justify-center">
        <Card className="w-full max-w-md bg-[#F1F1F2] shadow-lg rounded-lg p-8">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-[#1995AD] text-center">
              Login
            </CardTitle>
            <CardDescription className="text-gray-600 text-center">
              Enter your memberId and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginClient onSuccess={handleLoginSuccess} />
          </CardContent>
          <CardFooter className="flex flex-col gap-4 items-center">
            <div className="flex items-center w-full">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-600">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <RegisterForm />
          </CardFooter>
        </Card>
        {loading}
      </div>
    </div>
  );
};

export default Login;
