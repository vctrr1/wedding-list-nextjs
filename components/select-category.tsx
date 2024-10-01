import { productCategories } from "@/constants/categories";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function SelectCategoryItem(){
    return(
        <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Escolher categoria"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {productCategories.map((category) => (
                    <SelectItem key={category.name} value={category.name} className="flex flex-row items-center text-base">
                        
                        <div className="flex items-center">
                            {category.name}
                            <div className="h-2 w-2 rounded-full ml-3 mt-[3px]" style={{backgroundColor: category.color}} ></div>
                        </div>
                    </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
        </Select>
    )
}