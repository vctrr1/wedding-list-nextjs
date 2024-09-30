"use server"

import { db } from "@/lib/db"

export async function createItem(productName: string,productPrice: number | null, productCategory: string, userId: string) {
    await db.item.create({
        data: {
            name: productName,
            price: productPrice,
            category: productCategory,
            userId: userId
        }
    })
}

export async function getItemsByCategory() {
    
}