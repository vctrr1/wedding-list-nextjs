"use client"

import { LogOut } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { logout } from "@/actions/logout";

export default function Navbar() {
    return (
    <div className="flex flex-row border-b items-center justify-between p-3">
        <div className="hidden sm:flex w-[88px]"></div>
        <h1 className="text-2xl pl-3 sm:pl-0">Lista de Enxoval</h1>
        <div className="gap-2 flex">
          <ThemeToggle/>     
          <Button size="icon" variant="ghost" onClick={() => logout()}>
            <LogOut className="h-[1.2rem] w-[1.2rem]"/>
          </Button>
        </div>
      </div>
    );

}
