"use client";

import {
  addLinkToitem,
  deleteItem,
  removeLinkfromItem,
  updateItemAsCompleted,
} from "@/app/_actions/items";
import { Link, Link2, PlusIcon, Trash2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import React, { useTransition, useRef } from "react";
import UpdateItem from "./update-item-component";
import {
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogClose,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

interface ItemComponentProps {
  itemId: string;
  itemName: string;
  itemPrice?: number | null;
  itemCategory: string;
  purchased: boolean;
  links: string[] | null;
}

export default function ItemComponent({
  itemId,
  itemName,
  itemPrice,
  itemCategory,
  purchased,
  links,
}: ItemComponentProps) {
  const { theme } = useTheme();

  const formRef = useRef<HTMLFormElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  const handleDeleteItem = async (itemId: string) => {
    try {
      const result = await deleteItem(itemId);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (_) {
      toast.error("Erro inesperado ao remover item");
    }
  };

  const handleDeleteItemLink = async (itemId: string, link: string) => {
    try {
      const result = await removeLinkfromItem(itemId, link);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (_) {
      toast.error("Erro inesperado ao remover link");
    }
  };

  const handleAddLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const link = formData.get("link") as string;

    if (!link) {
      toast.warning("Preencha todos o campo");
    } else {
      addLinkToitem(itemId, link);
      formRef.current?.reset();
      toast.success("Cadastrado com sucesso!");
    }
  };

  return (
    <div className="relative">
      {Array.isArray(links) && links.length > 0 && (
        <Link
          size={12}
          className="text-muted-foreground absolute -top-1 -right-1"
        />
      )}

      <Card className="border">
        {/* se o item for isCompleted=true vai deixar o conteudo do card com o pacidade 50%*/}
        <CardContent
          className={`${
            purchased ? "opacity-50" : ""
          } flex items-center gap-3 p-0 justify-between`}
        >
          <div className="flex items-center gap-3 pl-4">
            <div>
              <input
                id={itemId}
                type="checkbox"
                defaultChecked={purchased}
                className="h-[18px] w-[18px] rounded-full appearance-none border-2 border-primary checked:bg-primary checked:text-white focus:border-primary flex items-center justify-center"
                onChange={(e) =>
                  startTransition(() =>
                    updateItemAsCompleted(itemId, e.target.checked)
                  )
                }
              />
              {/* personalizando o checkbox para exibir um icone, usei o recurso de estilo chamado CSS-in-JS 
            que aparece com a tag <style jsx> permite que você escreva regras CSS diretamente no mesmo arquivo
             do seu componente, e essas regras se aplicam apenas a esse componente.*/}
              <style jsx>{`
                input[type="checkbox"]:checked::before {
                  content: "✔";
                  font-size: 14px;
                  color: white;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              `}</style>
            </div>
            <Dialog>
              {/**digalog quando clicado no titulo do item */}
              <DialogTrigger asChild>
                <div className="flex items-center gap-2">
                  <h1 className="text-[18px]">{itemName}</h1>
                </div>
              </DialogTrigger>
              <DialogContent className="rounded-md sm:w-[70%] w-[90%]">
                <DialogHeader>
                  <DialogTitle className="text-lg text-center font-normal">
                    {itemName}
                  </DialogTitle>
                </DialogHeader>
                {itemPrice && ( //Se tiver preço exibe abaixo do titulo
                  <div className="flex gap-1 text-lg justify-center text-muted-foreground">
                    <p className="">Valor Pago: </p>
                    <p>
                      {itemPrice.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                )}
                <form
                  ref={formRef}
                  onSubmit={handleAddLink}
                  className="flex gap-2"
                >
                  <span //precisei criar um span invisivel, para o foco não ir para o primeiro input, no celular abre o teclado se o input estiver em foco.
                    tabIndex={0}
                    style={{
                      position: "absolute",
                      opacity: 0,
                      height: 0,
                      width: 0,
                    }}
                  />
                  <Input
                    className="h-[38px]"
                    id="link"
                    name="link"
                    placeholder="Adicionar Link"
                  />
                  <Button type="submit" variant="outline" className="p-2">
                    <PlusIcon />
                  </Button>
                </form>
                <div className=" flex flex-col w-full pb-3">
                  {Array.isArray(links) && links.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-center">Links</p>
                      {links.map((link) => (
                        <div
                          key={link}
                          className="flex items-center justify-between w-full border-b pb-2"
                        >
                          <div
                            title={link}
                            onClick={() => window.open(link, "_blank")} // Abre o link em nova aba
                            className={`sm:w-96 w-64 flex items-center gap-1 cursor-pointer ${
                              theme === "dark"
                                ? "text-slate-200"
                                : "text-blue-500"
                            }`}
                          >
                            <Link2
                              size={13}
                              className="mt-[3px] text-blue-500 flex-shrink-0"
                            />
                            <span className="truncate">{link}</span>
                          </div>
                          <button
                            onClick={() => handleDeleteItemLink(itemId, link)}
                          >
                            <Trash2
                              size={18}
                              className="cursor-pointer text-red-500"
                              strokeWidth={1.5}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <h3 className="text-center text-muted-foreground">
                      Nenhum link cadastrado
                    </h3>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-3 p-2 pl-0 pr-3">
            <UpdateItem
              itemId={itemId}
              itemName={itemName}
              itemPrice={itemPrice}
              itemCategory={itemCategory}
            />
            <Dialog>
              <DialogTrigger asChild>
                <button>
                  <Trash2 className="text-red-600 " strokeWidth={1.25} />
                </button>
              </DialogTrigger>
              <DialogContent className="rounded-md sm:w-[70%] w-[80%]">
                <DialogHeader className="items-center flex">
                  <DialogTitle className="text-base pt-3">
                    Deseja excluir {itemName} ?
                  </DialogTitle>
                </DialogHeader>
                <div className="flex justify-evenly">
                  <DialogClose asChild>
                    <Button size="sm" variant="outline">
                      Cancelar
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteItem(itemId)}
                    >
                      Excluir
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
