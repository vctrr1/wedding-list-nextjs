import { EditIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import SelectCategoryItem from "./select-category";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { updateItem } from "@/app/_actions/items";
import { Switch } from "./ui/switch";
import Image from "next/image";

interface UpdateItemsProps {
  itemId: string;
  itemName: string;
  itemPrice?: number | null;
  itemCategory: string;
  gift: boolean;
}

export default function UpdateItem({
  itemId,
  itemName,
  itemPrice,
  itemCategory,
  gift,
}: UpdateItemsProps) {
  const [name, setName] = useState(itemName);
  const [category, setCategory] = useState(itemCategory);
  const [isGift, setIsGift] = useState(gift);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSelectCategory = (value: string) => {
    setCategory(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("id", itemId);
    formData.append("gift", String(isGift));

    const result = await updateItem(formData, category);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  // Validação do formulário
  useEffect(() => {
    const isValid = name.trim() !== "" && category.trim() !== "";
    setIsFormValid(isValid);
  }, [name, category]);

  return (
    <>
      {gift && <Image src="/gift.svg" alt="Presente" width={16} height={16} />}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="p-2 pl-0" size="sm" variant="ghost">
            <EditIcon strokeWidth={1.25} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:w-[50%] w-[90%] flex flex-col items-center justify-center rounded-lg">
          <DialogHeader className="mt-4 flex items-center">
            <DialogTitle className="text-xl font-normal">
              Atualizar Item
            </DialogTitle>
            <DialogDescription>Preencha o form.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-2 w-full"
          >
            <span //precisei criar um span invisivel, para o foco não ir para o primeiro input, no celular abre o teclado se o input estiver em foco.
              tabIndex={0}
              style={{ position: "absolute", opacity: 0, height: 0, width: 0 }}
            />
            <div className="flex items-center space-x-2 w-full justify-between">
              <label className="text-lg">Nome: </label>
              <Input
                name="name"
                type="text"
                id="name"
                className="w-[80%]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 w-full justify-between">
              <label className="text-lg">Preço: </label>
              <Input
                type="text"
                name="price"
                id="price"
                defaultValue={itemPrice?.toLocaleString("pt-BR") ?? ""}
                className="w-[80%]"
              />
            </div>
            <div className="flex items-center w-full justify-between">
              <label>Presente: </label>
              <Switch checked={isGift} onCheckedChange={setIsGift} />
            </div>
            <div className="flex items-center space-x-2 w-full justify-between pb-2">
              <label className="text-lg">Categoria: </label>
              <SelectCategoryItem
                onSelectCategory={handleSelectCategory}
                value={itemCategory}
              />
            </div>
            <DialogClose asChild>
              <Button
                type="submit"
                className="gap-2 w-full text-base"
                disabled={!isFormValid}
              >
                Atualizar
              </Button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
