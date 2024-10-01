import { EditIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import SelectCategoryItem from "./select-category";

export default function UpdateItem() {
    return(
        <Dialog>
        <DialogTrigger asChild>
          <Button className="p-2" size="sm" variant="ghost">
            <EditIcon strokeWidth={1.25}/>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[50%] flex flex-col items-center justify-center rounded-lg">
            <DialogHeader className="mt-4">
                <DialogTitle className="text-xl">Atualizar Item</DialogTitle>
                <DialogDescription>Preencha os campos</DialogDescription>
            </DialogHeader>

            <form className="flex flex-col items-center space-y-2 w-full">
                <div className="flex items-center space-x-2 w-full justify-between">
                    <label className="text-lg">Nome: </label>
                    <Input className="w-[80%]"/>
                </div>
                <div className="flex items-center space-x-2 w-full justify-between">
                    <label className="text-lg">Preço: </label>
                    <Input className="w-[80%]"/>
                </div>
                <div className="flex items-center space-x-2 w-full justify-between">
                    <label className="text-lg">Categoria: </label>
                    <SelectCategoryItem/>
                </div>
            </form>
            <Button  className="gap-2 w-full">
                Atualizar
            </Button>
        </DialogContent>
      </Dialog>
    )
}