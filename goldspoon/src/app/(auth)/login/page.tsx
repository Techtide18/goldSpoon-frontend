"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
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
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your memberId and password to login to account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginClient onSuccess={handleLoginSuccess} />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>Or</span>
          <RegisterForm />
        </CardFooter>
      </Card>
      {loading}
    </div>
  );
};

export default Login;
