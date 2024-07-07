//USER DASHBOARD

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();
  console.log("Home Page Session: ", session);
  return (
    <div className="max-w-xl mx-auto mt-20">
      <div className="text-4xl text-gray-800">
        Welcome user{session.user?.name}
      </div>
      <Link href="/api/auth/signout">Logout</Link>

    </div>

  );
}
