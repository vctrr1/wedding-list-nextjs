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
        await db.item.update({
            where: {
                id: itemId
            },
            data: {
                purchased: isCompleted,
            }

        })
    } catch (error) {
        console.log(error)
    }

    revalidatePath("/main")
}

export async function updateItem(formData: FormData, category: string) {

    const entries = Array.from(formData.entries())
    const {id, name, price } = Object.fromEntries(entries) as {
        id: string
        name: string
        price: string
    };

    // Converter o preço para número
    const parcedPrice = price ? parseFloat(price) : null

    try {
        await db.item.update({
            where: {
                id: id
            },
            data: {
                name: name,
                category: category,
                price: parcedPrice
            }

        })
        revalidatePath("/main")
        return{success: true, message: "Atualizado com sucesso!"}
    } catch (error) {
        console.log(error)
        return { success: false, message: "Erro ao atualizar o item." };
    }

}

export async function getItems(userId: string) {
    const items = await db.item.findMany({
        where:{
            userId: userId
        }
    })
    return items
}