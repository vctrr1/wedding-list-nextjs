"use server";

import { db } from "@/app/_lib/db";
import { revalidatePath } from "next/cache";

export async function createItem(
  productName: string,
  productPrice: number | null,
  productCategory: string,
  userId: string
) {
  await db.item.create({
    data: {
      name: productName,
      price: productPrice,
      category: productCategory,
      userId: userId,
    },
  });

  revalidatePath("/main");
}

export async function deleteItem(itemId: string) {
  try {
    await db.item.delete({
      where: {
        id: itemId,
      },
    });
    revalidatePath("/main");
    return { success: true, message: "Item deletado com sucesso" };
  } catch (error) {
    return { success: false, message: "Erro ao deletar item" };
  }
}

export async function updateItemAsCompleted(
  itemId: string,
  isCompleted: boolean
) {
  try {
    await db.item.update({
      where: {
        id: itemId,
      },
      data: {
        purchased: isCompleted,
      },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/main");
}

export async function updateItem(formData: FormData, category: string) {
  const entries = Array.from(formData.entries());
  const { id, name, price } = Object.fromEntries(entries) as {
    id: string;
    name: string;
    price: string;
  };

  // Converter o preço para número
  const parsedPrice = price ? parseFloat(price.replace(",", ".")) : null;

  try {
    await db.item.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        category: category,
        price: parsedPrice,
      },
    });
    revalidatePath("/main");
    return { success: true, message: "Atualizado com sucesso!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Erro ao atualizar o item." };
  }
}

export async function addLinkToitem(itemId: string, linkUrl: string) {
  if (!linkUrl) {
    return { success: false, message: "Erro ao atualizar o item." };
  }

  // Obter o item atual para pegar os links existentes
  const item = await db.item.findUnique({
    where: {
      id: itemId,
    },
    select: {
      links: true,
    },
  });

  // Se o item existir, atualizar os links
  if (item) {
    //se links for um array copia todos os item e coloca o novo link no final, se nao for, cria um novo array contendo apenas o link recebido
    const updatedLinks = Array.isArray(item.links)
      ? [...item.links, linkUrl]
      : [linkUrl];

    await db.item.update({
      where: {
        id: itemId,
      },
      data: {
        links: updatedLinks,
      },
    });
    revalidatePath("/main");
    return { success: true, message: "Link adicionado com sucesso!" };
  }

  return { success: false, message: "Item não encontrado." };
}

export async function removeLinkfromItem(itemId: string, linkToDelete: string) {
  try {
    const item = await db.item.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!item) {
      return { success: false, message: "Item não encontrado." };
    }

    const updatedListLinks = item.links.filter((link) => link !== linkToDelete);

    await db.item.update({
      where: {
        id: itemId,
      },
      data: {
        links: updatedListLinks,
      },
    });
    revalidatePath("/main");
    return { success: true, message: "Link removido com sucesso" };
  } catch (error) {
    console.error("Erro ao remover link:", error);
    return { success: false, message: "Erro ao remover link" };
  }
}

export async function getItems(userId: string) {
  const items = await db.item.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      name: "asc",
    },
  });
  return items;
}
