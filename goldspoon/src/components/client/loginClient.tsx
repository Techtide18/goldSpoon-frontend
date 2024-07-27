"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { loginAction } from "../action/loginAction";
import { sleep } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface LoginClientProps {
  onSuccess: (memberId: string) => void;
}

const LoginClient: React.FC<LoginClientProps> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      action={async (formData) => {
        const memberId = formData.get("memberId") as string;
        const password = formData.get("password") as string;

        if (!memberId || !password) {
          return toast.error("Please fill both memberId and password");
        }

        const toastId = toast.loading("Logging in..");
        await sleep(800);

        const error = await loginAction(memberId, password);
        if (!error) {
          toast.success("Login successful", {
            id: toastId,
          });
          onSuccess(memberId); // Pass the memberId to onSuccess
        } else {
          toast.error("Invalid memberId or password", {
            id: toastId,
          });
        }
      }}
      className="flex flex-col gap-4"
    >
      <Input placeholder="Member Id" name="memberId" />
      <div className="relative">
        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          name="password"
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginClient;
