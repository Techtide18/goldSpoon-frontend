"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { loginAction } from "../action/loginAction";

const LoginClient = () => {
  return (
    <form
      action={async (formData) => {
        const memberId = formData.get("memberId") as String;
        const password = formData.get("password") as String;

        if (!memberId || !password) {
          toast.error("Please fill both");
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
