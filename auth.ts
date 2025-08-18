import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { db } from "./app/_lib/db";
import { compareSync } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        name: {
          label: "name",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials.name || !credentials.password) {
          return null;
        }
        const user = await db.user.findUnique({
          where: {
            name: credentials.name as string,
          },
        });

        if (!user) {
          return null;
        }

        const matches = compareSync(
          credentials.password as string,
          user.hashedPassword ?? ""
        );

        if (matches) {
          return { id: user.id, name: user.name, email: user.email };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user.id = token.id as string;
      return session;
    },
  },
});
