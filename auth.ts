import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { db } from "./lib/db"
import { compareSync } from "bcryptjs"

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
      async authorize(credentials){

        if(!credentials.name || !credentials.password){
          return null
        }
        const user = await db.user.findUnique({
          where: {
            name: credentials.name as string
          }
        })

        if(!user){
          return null
        }

        const matches = compareSync(credentials.password as string, user.hashedPassword ?? "")

        if(matches) {
          return {id: user.id, name: user.name, email: user.email}
        }

        return null

      }
    })
  ],
})