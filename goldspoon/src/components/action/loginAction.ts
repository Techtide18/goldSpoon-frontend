"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {

    const memberId = formData.get("memberId") as String | undefined;
    const password = formData.get("password") as String | undefined;

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
