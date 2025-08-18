"use client";

import { useFormStatus } from "react-dom";
import React from "react";
import { Loader2Icon } from "lucide-react";

interface LoginButtonProps {
  label: string;
}

export default function LoginButton({ label }: LoginButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className={
        "flex items-center justify-center rounded-md w-full py-2 text-base font-medium text-white bg-blue-600"
      }
    >
      {pending ? <Loader2Icon className="animate-spin" /> : label}
    </button>
  );
}
