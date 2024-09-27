import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="h-screen flex flex-col items-center pt-4">
        <div className="flex w-[70%] items-center space-x-2">
          <Input type="text" placeholder="Produto" className="text-lg"/>
          <Input type="number" placeholder="Preço (Opcional)" className="w-[30%] text-lg"/>
          <Button type="submit" variant="default" size="sm" className="rounded-full">
            <PlusIcon/>
          </Button>
        </div>
      </div>
    </div>
  );
}
