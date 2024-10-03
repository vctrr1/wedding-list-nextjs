import { getItemsByCategory } from "@/actions/items";
import { auth } from "@/auth";
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
  // outros campos, se necessário
}

export default async function Main() {
  const session = await auth()

  
  if(!session?.user?.id){
    redirect("/")
  }
  
  const items: Item[] = await getItemsByCategory(session?.user?.id)

  const categoryWithItems = productCategories.filter((category) => items.some((item: Item) => item.category === category.name))


  return (
    <div>
      <Navbar/>
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
                item.category === category.name ? <ItemComponent itemId={item.id} itemName={item.name} isCompleted={item.purchased} key={item.id}/> : ""
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
