import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        memberId: {
          label: "Member Id",
          type: "id",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const memberId = credentials.memberId as string | undefined;
        const password = credentials.password as string | undefined;
        if (!memberId || !password) {
          throw new CredentialsSignin("Please provide both email and password");
        }
        const user = await { memberId, id: "ashu" };

        if (password !== "ashu") {
          throw new CredentialsSignin("Password does not match");
        } else return user;
      },
    }),
  ],
});
