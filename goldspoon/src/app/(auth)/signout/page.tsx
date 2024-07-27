"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const SignOutPage: React.FC = () => {

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Button onClick={handleSignOut} className="bg-blue-500 text-white">
        Sign Out
      </Button>
    </div>
  );
};

export default SignOutPage;
