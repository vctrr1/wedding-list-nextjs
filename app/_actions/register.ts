"use server";

import { db } from "@/app/_lib/db";
import { saltAndHashPassword } from "@/app/_utils/crip-password";

export default async function register(formData: FormData) {
  /* Tambem pode pegar os dados dessa forma
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
     */

  const entries = Array.from(formData.entries());
  const { name, password } = Object.fromEntries(entries) as {
    name: string;
    password: string;
  };

  if (!name || !password) {
    return { success: false, message: "Preencha todos os campos" };
  }
  //era findUnique mas como eu quero usar o nome como login e não email, preciso verificar se algum dos dois ja existe
  //findUnique do Prisma espera que seja passado um campo único (como id, email, ou name), e não aceita uma condição composta com OR.
  const user = await db.user.findFirst({
    where: {
      name: name,
    },
  });

  if (user) {
    return { success: false, message: "Usuário ja cadastrado" };
  }

  await db.user.create({
    data: {
      name: name,
      email: "email@exemplo.com",
      hashedPassword: saltAndHashPassword(password),
    },
  });

  return { success: true, message: "Usuário cadastrado com sucesso!" };
}
