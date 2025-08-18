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

interface UpdateItemsProps {
  itemId: string;
}

export default function UpdateItem({ itemId }: UpdateItemsProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSelectCategory = (value: string) => {
    setCategory(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("id", itemId);

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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-2" size="sm" variant="ghost">
          <EditIcon strokeWidth={1.25} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[50%] w-[90%] flex flex-col items-center justify-center rounded-lg">
        <DialogHeader className="mt-4 flex items-center">
          <DialogTitle className="text-xl">Atualizar Item</DialogTitle>
          <DialogDescription>Preencha o form.</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-2 w-full"
        >
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
            <Input type="text" name="price" id="price" className="w-[80%]" />
          </div>
          <div className="flex items-center space-x-2 w-full justify-between pb-2">
            <label className="text-lg">Categoria: </label>
            <SelectCategoryItem onSelectCategory={handleSelectCategory} />
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
  );
}
