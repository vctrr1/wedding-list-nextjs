import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChartColumnStacked, PlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { productCategories } from "@/constants/categories";
import { DropdownMenuRadioGroup } from "@radix-ui/react-dropdown-menu";


export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="h-screen flex flex-col items-center pt-4">
        <div className="flex w-[70%] items-center space-x-2">
          <Input type="text" placeholder="Produto" className="text-lg w-[70%]"/>
          <Input type="number" placeholder="Preço (Opcional)" className="w-[30%] text-lg"/>
          <DropdownMenu >
            <DropdownMenuTrigger asChild className="select-none">
              <ChartColumnStacked size={38}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuRadioGroup>
                {productCategories.map(item => (
                  <DropdownMenuRadioItem key={item.name} value={item.name} className="text-xl">{item.name}</DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="pl-4">
            <Button type="submit" variant="default" size="sm" className="rounded-full">
              <PlusIcon/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
