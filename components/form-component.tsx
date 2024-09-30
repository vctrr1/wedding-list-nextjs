"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { House, PlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { productCategories } from "@/constants/categories";
import { DropdownMenuRadioGroup } from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { createItem } from "@/actions/items";

export default function FormComponent(){
  
  const [category, setCategory] = useState("")

  const session = useSession()
  console.log(session)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const productName = formData.get("product") as string
    const productPrice = formData.get("price") as string
    const productCategory = category;
    const userId = session.data?.user?.id

    if(!productName || !productCategory || !userId){
      throw new Error("Insira as informações")
    }else{
      const parcedPrice = productPrice ? parseFloat(productPrice) : null
      createItem(productName, parcedPrice, productCategory, userId)
    }
  };

  return(
    <div className="flex items-center w-[80%]">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 w-full">      
        <Input type="text" placeholder="Produto" name="product" className="text-xl w-[70%]"/>
        <Input type="number" placeholder="Preço (Opcional)" name="price" className="w-[30%] text-xl"/>
        <DropdownMenu >
          <DropdownMenuTrigger asChild className="select-none">
            <House size={38} strokeWidth={1.25}/>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
              {productCategories.map(item => (
                <div key={item.name} className="flex items-center">
                  <div className="h-2 w-2 rounded-full ml-3 mt-[3px]" style={{backgroundColor: item.color}} ></div>
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
      </form>
    </div>
  )
}