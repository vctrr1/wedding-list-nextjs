"use server";

import { signOut } from "@/app/_lib/auth";
import { revalidatePath } from "next/cache";

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};
