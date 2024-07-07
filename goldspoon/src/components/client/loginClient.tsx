"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { loginAction } from "../action/loginAction";

const LoginClient = () => {
  return (
    <form
      action={async (formData) => {
        const memberId = formData.get("memberId") as string;
        const password = formData.get("password") as string;

        if (!memberId || !password) {
          return toast.error("Please fill both memberId and password");
        }

        const toastId = toast.loading("Logging in..");

        const error = await loginAction(memberId, password);
        if (!error) {
          toast.success("Login successful", {
            id: toastId,
          });
        } else {
          toast.error(error, {
            id: toastId,
          });
        }
      }}
      className="flex flex-col gap-4"
    >
      <Input placeholder="Member Id" name="memberId" />
      <Input placeholder="Password" type="password" name="password" />
      <Button type="submit"> Login</Button>
    </form>
  );
};

export default LoginClient;
