"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createItem(productName: string,productPrice: number | null, productCategory: string, userId: string) {
    await db.item.create({
        data: {
            name: productName,
            price: productPrice,
            category: productCategory,
            userId: userId
        }
    })

    revalidatePath("/main")
}

export async function deleteItem(itemId: string){
    await db.item.delete({
        where: {
            id: itemId
        }
    })

    revalidatePath("/main")
}

export async function updateItemAsCompleted(itemId:string, isCompleted: boolean) {
    try {
        const item = await db.item.update({
            where: {
                id: itemId
            },
            data: {
                purchased: isCompleted
            }

        })
        console.log(item)
    } catch (error) {
        console.log(error)
    }

    revalidatePath("/main")
}

export async function getItemsByCategory(userId: string) {
    const items = await db.item.findMany({
        where:{
            userId: userId
        }
    })
    return items
}