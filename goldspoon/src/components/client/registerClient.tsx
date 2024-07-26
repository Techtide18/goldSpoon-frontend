
'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Use the useRouter hook
import { toast } from "sonner";

const RegisterForm = () => {
  const router = useRouter();

  const handleRegisterRedirect = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission
    toast.info("Please enter your E-PIN and details to continue with registration.");
    router.push("/register"); // Use router.push for client-side navigation
  };

  return (
    <form onSubmit={handleRegisterRedirect} className="w-full">
      <Button type="submit" variant={"outline"} className="w-full">
        Register With Epin
      </Button>
    </form>
  );
};

export default RegisterForm;