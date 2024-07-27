//@ts-nocheck

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { User } from "next-auth";

interface CustomUser extends User {
  memberId: string;
  memberNumber: string;
  role: string;
}

class CustomError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        memberId: { label: "Member Id", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      authorize: async (credentials) => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
            {
              memberNumber: credentials?.memberId,
              password: credentials?.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              }
            }
          );
          console.log("reached response",response);
          const user = response.data as CustomUser;
          if (user) {
            console.log("user q342");
            return user;
          } else {
            console.log("user 11111");
            throw new CustomError("invalid-credentials", "Invalid credentials provided");
          }
        } catch (error) {
          console.log("user 112121212");
          console.error("Login error: ", error);
          throw new CustomError("login-error", "Error during login");
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: "/login",
    signOut: "/signout",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log("startdsdsdsdsdsdd");
      if (user) {
        console.log("start");
        const customUser = user as CustomUser;
        token.id = customUser.memberId;
        token.name = customUser.memberNumber;
        token.role = customUser.role;
        console.log("done");
      }
      return token;
    },
    session: async ({ session, token }) => {
      console.log("start1333");
      if (session?.user) {
        console.log("start1");
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
        console.log("dsdsd");
      }
      return session;
    },
  },
});
