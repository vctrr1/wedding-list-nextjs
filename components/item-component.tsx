"use client"

import { addLinkToitem, deleteItem, updateItemAsCompleted } from "@/actions/items";
import { Link, PlusIcon, Trash2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import React, { useTransition, useRef} from "react";
import UpdateItem from "./update-item-component";
import { DialogTrigger, Dialog, DialogHeader, DialogTitle, DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface ItemComponentProps {
    itemId: string, 
    itemName: string
    purchased: boolean
    links: string[] | null
}

export default function ItemComponent({itemId, itemName, purchased, links}: ItemComponentProps) {
  
  const formRef = useRef<HTMLFormElement>(null)
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const link = formData.get("link") as string

    if(!link){
      toast.warning("Preencha todos o campo")
    }else {
      addLinkToitem(itemId, link)
      formRef.current?.reset()
      toast.success("Cadastrado com sucesso!")
    }

  }

  return (
  <Card>
      {/* se o item for isCompleted=true vai deixar o conteudo do card com o pacidade 50%*/}
      <CardContent className={`${purchased ? "opacity-50" : ""} flex items-center gap-3 p-0 justify-between`}>
        <div className="flex items-center gap-3 pl-4">
          <div>
            <input
              id={itemId}
              type="checkbox"
              defaultChecked={purchased}
              className="h-[18px] w-[18px] rounded-full appearance-none border-2 border-primary checked:bg-primary checked:text-white focus:border-primary flex items-center justify-center"
              onChange={e => startTransition(() => updateItemAsCompleted(itemId, e.target.checked))}
            />
            {/* personalizando o checkbox para exibir um icone, usei o recurso de estilo chamado CSS-in-JS 
            que aparece com a tag <style jsx> permite que você escreva regras CSS diretamente no mesmo arquivo
             do seu componente, e essas regras se aplicam apenas a esse componente.*/}
            <style jsx>{`
              input[type="checkbox"]:checked::before {
                content: '✔';
                font-size: 14px;
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            `}</style>
          </div>
          <Dialog> {/**digalog quando clicado no titulo do item */}
            <DialogTrigger asChild>
              <div className="flex items-center gap-2">
                <h1 className="text-[18px]">{itemName}</h1>
                <div>
                  {Array.isArray(links) && links?.length > 0 && (
                    <Link size={11} className="text-blue-500"/>
                  )}
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="rounded-md sm:w-[70%] w-[90%]">
              <DialogHeader>
                <DialogTitle>
                  <h1 className="text-base">Links</h1>
                </DialogTitle>
              </DialogHeader>
              <form ref={formRef} onSubmit={handleSubmit} className="flex gap-2 pb-2">
                <Input className="h-8" id="link" name="link" />
                <button type="submit" className="">
                  <PlusIcon/>
                </button>
              </form>
              <div className="border-t-2 flex flex-col w-full">
                {Array.isArray(links) && links.length > 0 ? (
                  <div className="pt-4">
                    {links.map((item) => (
                      <div key={item} className="flex items-center gap-5 justify-between w-full">
                        <div 
                          title={item} 
                          onClick={() => window.open(item, "_blank")} // Abre o link em nova aba
                          className="text-blue-600 underline truncate sm:w-96 w-64" // Adiciona a classe cursor-pointer
                        >
                          {item}
                        </div>
                        <Trash2 size={18} className="cursor-pointer"/>
                      </div>
                    ))}
                  </div>
                ) : (
                  <h3>Nenhum link cadastrado</h3>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center gap-3 p-2 pr-3">
            <UpdateItem itemId={itemId}/>
          <button onClick={async () => await deleteItem(itemId)}>
            <Trash2 className="text-red-600 " strokeWidth={1.25}/>
          </button>
        </div>
      </CardContent>
    </Card>
  )
}