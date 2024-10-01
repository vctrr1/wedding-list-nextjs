"use client"

import { deleteItem, updateItemAsCompleted } from "@/actions/items";
import { EditIcon, TrashIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useTransition } from "react";

interface ItemComponentProps {
    itemId: string, 
    itemName: string
    isCompleted: boolean
}

export default function ItemComponent({itemId, itemName, isCompleted}: ItemComponentProps) {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition()

  return (
  <Card className="w-[80%]">
      <CardContent className="flex items-center gap-3 p-3 justify-between">
        <div className="flex items-center gap-3 p-3">
          <input
            id={itemId}
            type="checkbox"
            defaultChecked={isCompleted}
            className=""
            onChange={e => startTransition(() => updateItemAsCompleted(itemId, e.target.checked))}
          />
          <h1 className="text-xl">{itemName}</h1>
        </div>
        <div className="flex items-center gap-3 p-3">
          <button>
            <EditIcon strokeWidth={1.25}/>
          </button>
          <button onClick={async () => await deleteItem(itemId)}>
            <TrashIcon className="hover:bg-red-500 rounded-full transition" strokeWidth={1.25}/>
          </button>
        </div>
      </CardContent>
    </Card>
  )
}