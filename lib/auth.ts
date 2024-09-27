import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
//import bcrypt from "bcryptjs"
import { Adapter } from "next-auth/adapters"
import { db } from "./db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    Credentials({

    })
  ],
})