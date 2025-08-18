"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { House, PlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { productCategories } from "@/app/_constants/categories";
import { DropdownMenuRadioGroup } from "@radix-ui/react-dropdown-menu";
import React, { useRef, useState } from "react";
import { createItem } from "@/app/_actions/items";
import { toast } from "sonner";

interface FormComponentProps {
  userId: string;
}

export default function FormComponent({ userId }: FormComponentProps) {
  //propriedade do formulario usada para limpar os campos quando for criado o item
  const formRef = useRef<HTMLFormElement>(null);

  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const productName = formData.get("product") as string;
    let productPrice = formData.get("price") as string;
    const productCategory = category;

    if (!productName || !productCategory || !userId) {
      toast.warning("Preencha todos os campos");
    } else {
      // Substitui vírgula por ponto antes de fazer o parse para float
      productPrice = productPrice.replace(",", ".");
      const parsedPrice = productPrice ? parseFloat(productPrice) : null;
      createItem(productName, parsedPrice, productCategory, userId);
      formRef.current?.reset();
      toast.success("Cadastrado com sucesso!");
    }
  };

  return (
    <div className="flex items-center w-[80%]">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex items-center space-x-2 w-full"
      >
        <Input
          type="text"
          placeholder="Produto"
          name="product"
          className="text-base w-[70%]"
        />
        <Input
          type="text"
          placeholder="Preço (Opcional)"
          name="price"
          className="w-[30%] text-base"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="select-none">
            <House size={38} strokeWidth={1.25} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
            <DropdownMenuRadioGroup
              value={category}
              onValueChange={setCategory}
            >
              {productCategories.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div
                    className="h-2 w-2 rounded-full ml-3 mt-[3px]"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <DropdownMenuRadioItem
                    key={item.name}
                    value={item.name}
                    className="text-xl"
                  >
                    {item.name}
                  </DropdownMenuRadioItem>
                </div>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="pl-4">
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="rounded-full"
          >
            <PlusIcon />
          </Button>
        </div>
      </form>
    </div>
  );
}
