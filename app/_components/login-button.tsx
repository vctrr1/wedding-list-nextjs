"use client"

import { useFormStatus } from "react-dom";
import React from "react";

interface LoginButtonProps {
    label: string;
  }

export default function LoginButton({label}: LoginButtonProps) {
    const { pending } = useFormStatus();
    return(
        <button
            disabled={pending}
            type="submit"
            className={`${
              pending ? "bg-gray-600" : "bg-blue-600"
            } rounded-md w-full py-2 text-base font-medium text-white`}
        >
        {pending ? "Carregando.." : label}
        </button>

    )
}