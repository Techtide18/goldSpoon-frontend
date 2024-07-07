"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

export async function loginAction(memberId: string, password: string) {
  try {
    await signIn("credentials", {
      memberId,
      password,
      redirect: true,
      redirectTo: "/",
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.message;
  }
}
