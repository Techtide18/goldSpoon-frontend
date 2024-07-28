"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const SignOutPage: React.FC = () => {

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="bg-gray-800 p-8 md:p-12 rounded-lg shadow-lg text-center mx-4 md:mx-0">
        <h2 className="text-2xl md:text-3xl text-white mb-4">Are you sure you want to signout?</h2>
        <Button onClick={handleSignOut} className="bg-red-500 text-white">
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default SignOutPage;
