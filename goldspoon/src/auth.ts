//@ts-nocheck

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

interface User {
  memberId: string;
  memberNumber: string;
  role: string;
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
            `${process.env.REACT_APP_BASE_URL}/api/login`,
            {
              memberNumber: credentials.memberId,
              password: credentials.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const user = response.data as User;
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Login error: ", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  //url: process.env.NEXTAUTH_URL,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const customUser = user as User;
        token.id = customUser.memberId;
        token.name = customUser.memberNumber;
        token.role = customUser.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 4,
  },
});
