import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";
import { loginAction } from "@/components/action/loginAction";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="flex flex-col gap-4">
            <Input placeholder="Member Id" name="memberId" />
            <Input placeholder="Password" type="password" name="password" />
            <Button type="submit"> Login</Button>
          </form>
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
