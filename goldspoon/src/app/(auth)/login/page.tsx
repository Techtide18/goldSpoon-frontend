import React from "react";
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
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your memberId and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginClient />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>Or</span>
          <RegisterForm />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
