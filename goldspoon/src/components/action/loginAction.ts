"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

export async function loginAction(memberId: string, password: string) {
  try {
    await signIn("credentials", {
      memberId,
      password,
      redirect: false,
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    console.log(err.message);
    return err.message;
  }
}
