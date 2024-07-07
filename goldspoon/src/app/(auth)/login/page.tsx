import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoginClient from "@/components/client/loginClient";

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
          <form action="">
            <Button type="submit" variant={"outline"}>
              Register With Epin
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
