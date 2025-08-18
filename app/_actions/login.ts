"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function login(formData: FormData){
    
    const entries = Array.from(formData.entries());
    
    const { name, password } = Object.fromEntries(entries) as {
      name: string;
      password: string;
    };

    try {
        await signIn("credentials", {name, password})
    } catch (error) {
        if(error instanceof AuthError){
            if (error.type === 'CredentialsSignin') {
                throw new Error('Credenciais inválidas');
              }
        }
    }

    redirect("/main")

}