"use client"

import { deleteItem, updateItemAsCompleted } from "@/actions/items";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useTransition } from "react";
import UpdateItem from "./update-item-component";

interface ItemComponentProps {
    itemId: string, 
    itemName: string
    isCompleted: boolean
}

export default function ItemComponent({itemId, itemName, isCompleted}: ItemComponentProps) {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition()

  return (
  <Card>
      {/* se o item for isCompleted=true vai deixar o conteudo do card com o pacidade 50%*/}
      <CardContent className={`${isCompleted ? "opacity-50" : ""} flex items-center gap-3 p-0 justify-between`}>
        <div className="flex items-center gap-3 pl-4">
          <input
            id={itemId}
            type="checkbox"
            defaultChecked={isCompleted}
            className="h-[18px] w-[18px] rounded-full appearance-none border-2 border-primary checked:bg-primary checked:text-white focus:border-primary flex items-center justify-center"
            onChange={e => startTransition(() => updateItemAsCompleted(itemId, e.target.checked))}
          />
          {/* personalizando o checkbox para exibir um icone, usei o recurso de estilo chamado CSS-in-JS 
          que aparece com a tag <style jsx> permite que você escreva regras CSS diretamente no mesmo arquivo
           do seu componente, e essas regras se aplicam apenas a esse componente.*/}
          <style jsx>{`
            input[type="checkbox"]:checked::before {
              content: '✔'; /* Ícone de check */
              font-size: 14px;
              color: white;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          `}</style>
          <h1 className="text-[18px]">{itemName}</h1>
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