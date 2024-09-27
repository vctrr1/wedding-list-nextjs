"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChartColumnStacked, PlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { productCategories } from "@/constants/categories";
import { DropdownMenuRadioGroup } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

export default function FormComponent() {

    const [position, setPosition] = useState("")

    return(
        <div className="flex w-[70%] items-center space-x-2">
        <Input type="text" placeholder="Produto" className="text-xl w-[70%]"/>
        <Input type="number" placeholder="Preço (Opcional)" className="w-[30%] text-xl"/>
        <DropdownMenu >
          <DropdownMenuTrigger asChild className="select-none">
            <ChartColumnStacked size={38}/>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              {productCategories.map(item => (
                <div key={item.name} className="flex items-center">
                  <div className="bg-red-700 h-2 w-2 rounded-full ml-3 mt-[3px]" style={{backgroundColor: item.color}} ></div>
                  <DropdownMenuRadioItem key={item.name} value={item.name} className="text-xl">{item.name}</DropdownMenuRadioItem>
                </div>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="pl-4">
          <Button type="submit" variant="default" size="sm" className="rounded-full">
            <PlusIcon/>
          </Button>
        </div>
      </div>
    )
}