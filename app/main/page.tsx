import { getItems } from "@/actions/items";
import { auth } from "@/auth";
import FormComponent from "@/components/form-component";
import ItemComponent from "@/components/item-component";
import Navbar from "@/components/navbar";
import { ExpensesChart } from "@/components/pie-chart";
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

interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
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

  // Agrupa os itens por categoria e calcula o total gasto em cada categoria
  const totalPerCategory = itemsWithPrice.reduce((acc, item) => {
    const category = acc.find(cat => cat.category === item.category);

    if (category) {
      category.total += item.price ?? 0;
    } else {
      acc.push({ category: item.category, total: item.price ?? 0 });
    }

    return acc;
  }, [] as { category: string, total: number }[]);

  // Mapeia os dados para o formato necessário para o gráfico
  const chartData = totalPerCategory.map(category => ({
    browser: category.category,
    visitors: category.total,
    fill: productCategories.find(cat => cat.name === category.category)?.color || "var(--default-color)"
  }));

  const chartConfig: ChartConfig = {
    visitors: {
      label: "Total gasto",
      color: ""
    },
    ...productCategories.reduce((acc, category) => {
      acc[category.name] = {
        label: category.name,
        color: category.color
      };
      return acc;
    }, {} as ChartConfig)
  };

  const itemsPurchased: Item[] = items.filter((item) => (
    item.purchased === true //retorna os items que foram marcado como comprado
  )) 

  //armazena as categorias que tem algum item cadastrado com a categoria
  const categoryWithItems = productCategories.filter((category) => 
    items.some((item: Item) => item.category === category.name)
  )


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <div className="flex-grow">
        <div className="flex flex-col items-center pt-4 pb-4">
          <FormComponent userId={session.user.id}/>
        </div>
        <div className=" flex flex-col gap-2 w-full h-12 justify-center items-center">
          <div className="h-full w-[80%] flex">
            <div className="bg-[#834629] w-1/4 h-full rounded-l-sm"></div>
            <div className="bg-[#835841] w-1/4 h-full"></div>
            <div className="bg-[#ab6f4d] w-1/4 h-full"></div>
            <div className="bg-[#9c8062] w-1/4 h-full rounded-r-sm"></div>
          </div>
          <div className="h-full w-[80%] flex">
            <div className="bg-[#3a5a40] w-1/4 h-full rounded-l-sm"></div>
            <div className="bg-[#5c7650] w-1/4 h-full"></div>
            <div className="bg-[#a3b18a] w-1/4 h-full"></div>
            <div className="bg-[#e7dbcd] w-1/4 h-full rounded-r-sm"></div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 mb-7 pt-3">
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
        <div className="w-full flex justify-center mb-7">
          <ExpensesChart data={chartData} config={chartConfig} />
        </div>
      )}
    </div>
  );
}
