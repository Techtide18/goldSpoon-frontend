"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SignOutPage: React.FC = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="bg-gray-800 p-8 md:p-12 rounded-lg shadow-lg text-center mx-4 md:mx-0">
        <h2 className="text-2xl md:text-3xl text-white mb-4">Are you sure you want to sign out?</h2>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button onClick={handleSignOut} className="bg-red-500 text-white">
            Sign Out
          </Button>
          <Button onClick={handleGoBack} className="bg-blue-500 text-white">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignOutPage;
