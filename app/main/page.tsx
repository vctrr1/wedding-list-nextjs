import { getItemsByCategory } from "@/actions/items";
import { auth } from "@/auth";
import FormComponent from "@/components/form-component";
import ItemComponent from "@/components/item-component";
import Navbar from "@/components/navbar";

import { redirect } from "next/navigation";

export default async function Main() {
  const session = await auth()

  
  if(!session?.user?.id){
    redirect("/")
  }
  
  const items = await getItemsByCategory(session?.user?.id)


  return (
    <div>
      <Navbar/>
      <div className="flex flex-col items-center pt-4">
        <FormComponent userId={session.user.id}/>
      </div>
      <div className="flex flex-col items-center gap-2 pt-4">
        {items.map((item) => (
          <ItemComponent itemId={item.id} itemName={item.name} isCompleted={item.purchased} key={item.id}/>
        ))}
      </div>
    </div>
  );
}
