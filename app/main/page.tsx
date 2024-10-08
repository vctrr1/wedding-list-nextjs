import { getItems } from "@/actions/items";
import { auth } from "@/auth";
import ExpensesComponent from "@/components/expenses-component";
import FormComponent from "@/components/form-component";
import ItemComponent from "@/components/item-component";
import Navbar from "@/components/navbar";
import { productCategories } from "@/constants/categories";
import { redirect } from "next/navigation";

interface Item {
  id: string;
  name: string;
  price?: number | null,
  category: string;
  purchased: boolean;
  links: string[] | null
  // outros campos, se necessário
}

export default async function Main() {
  const session = await auth()

  if(!session?.user?.id){
    redirect("/")
  }
  //precisou tipar por conta de um erro na vercel
  const items: Item[] = await getItems(session?.user?.id)
  
  const itemsWithPrice: Item[] = items.filter((item) => (
    item.price != null && item.purchased === true //retorna os items que tem o preço e que foi comprado
  )) 

  const totalSpend = itemsWithPrice.reduce((total, item) => {
    return total + (item.price ?? 0)
  }, 0) // 0 valor inicial
  
  const itemsPurchased: Item[] = items.filter((item) => (
    item.purchased === true //retorna os items que foram marcado como comprado
  )) 

  const percentage = ((itemsPurchased.length / items.length) * 100)

  //armazena as categorias que tem algum item cadastrado com a categoria
  const categoryWithItems = productCategories.filter((category) => 
    items.some((item: Item) => item.category === category.name)
  )


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <div className="flex-grow">
        <div className="flex flex-col items-center pt-4 pb-6">
          <FormComponent userId={session.user.id}/>
        </div>
        <div className="flex flex-col items-center gap-4 mb-7">
            {categoryWithItems.map((category) => (
              <div key={category.name} className="w-[80%] flex flex-col gap-2 "> 
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full mt-[2px]" style={{backgroundColor: category.color}} ></div>
                  <h1 className="text-xl">
                    {category.name}
                  </h1>
                </div>
                {items.map((item) => (
                  item.category === category.name ? <ItemComponent itemId={item.id} itemName={item.name} purchased={item.purchased} links={item.links} key={item.id}/> : ""
                ))}
              </div>
            ))}
        </div>
      </div>
      {itemsPurchased.length > 0 && (
        <ExpensesComponent totalSpend={totalSpend} percentage={percentage}/>
      )}
    </div>
  );
}
