'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Use the useRouter hook

const RegisterForm = () => {
  const router = useRouter();

  const handleRegisterRedirect = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission
    router.push("/register"); // Use router.push for client-side navigation
  };

  return (
    <form onSubmit={handleRegisterRedirect}>
      <Button type="submit" variant={"outline"}>
        Register With Epin
      </Button>
    </form>
  );
};

export default RegisterForm;
