import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { db } from "./lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        name: {
          label: "name",
          type: "text"
        },
        password: {
          label: "password",
          type: "password"
        }
      },
      authorize(){
        return {name: "asdas", password: "Vicasd"}
      }
    })
  ],
})