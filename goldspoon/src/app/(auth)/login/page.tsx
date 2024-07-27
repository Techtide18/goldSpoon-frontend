"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import Image from "next/image";
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

interface User {
  role: string;
  // Add other properties if necessary
}

const Login: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = async (memberId: any) => {
    setLoading(true);
    try {
      const session = await getSession();
      const user = session?.user as User;

      if (!user) {
        console.error("No user data found.");
        return;
      }

      switch (user.role) {
        case "admin":
          router.push("/admin");
          break;
        case "user":
          router.push("/user");
          break;
        default:
          console.error("Invalid role or session.");
          break;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during authentication:", error.message);
      } else {
        console.error("An unknown error occurred during authentication.");
      }
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
          width={192}
          height={48}
          className="w-48 mb-4 z-10"
        />
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
