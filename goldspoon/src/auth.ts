import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        memberId: { label: "Member Id", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      authorize: async (credentials) => {
        //api hit
        const user = { id: 100, name: "enz", password: "1234", role: "admin" };
        if (
          credentials?.memberId === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  // callbacks: {
  //   async signIn(user, account, profile) {
  //     console.log("signIn callback - user:", user);
  //     console.log("signIn callback - account:", account);
  //     console.log("signIn callback - profile:", profile);
  //     return true;
  //   },
  //   jwt: async ({ token, user }) => {
  //     if (user) {
  //       token.role = "admin";
  //     }
  //     return token;
  //   },
  //   session: async ({ session, token }) => {
  //     if (session?.user) {
  //       session.user.role = token.role;
  //     }
  //     return session;
  //   },
  // },
});
