"use server"

import { db } from "@/lib/db";
import { saltAndHashPassword } from "@/utils/crip-password";
import { redirect } from "next/navigation";

export default async function register(formData: FormData) {
    /* Tambem pode pegar os dados dessa forma
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
     */

    const entries = Array.from(formData.entries())
    const {name, email, password} = Object.fromEntries(entries) as {
        name: string;
        email: string;
        password: string;
    }

    if(!name || !email || !password){
        throw new Error("Preenha todos os campos")
    }
    //era findUnique mas como eu quero usar o nome como login e não email, preciso verificar se algum dos dois ja existe
    //findUnique do Prisma espera que seja passado um campo único (como id, email, ou name), e não aceita uma condição composta com OR.
    const user = await db.user.findFirst({
        where: {
            OR: [
                {name: name},
                {email: email}
            ]
        }
    })

    if(user){
        throw new Error("Usuário ja cadastrado")
    }

    await db.user.create({
        data: {
            name: name,
            email: email,
            hashedPassword: saltAndHashPassword(password)
        }
    })

    redirect("/")
}
