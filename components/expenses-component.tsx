import { CircleDollarSign, Percent } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface ExpensesComponentProps {
    totalSpend: number,
    percentage: number
}

function ExpensesComponent({totalSpend, percentage}: ExpensesComponentProps) {
    return (
        <Card className="rounded-none">
            <CardContent className="p-0">
                <div className="flex">
                    <div className="w-[50%] border-r">
                       <div className="flex flex-col gap-3 pl-2 pt-2 pb-4 items-center">
                            <h1>Total Gasto</h1>
                            <div className="flex gap-2 items-center">
                                <CircleDollarSign size={20} strokeWidth={1.25}/>
                                <h1 className="">{totalSpend.toFixed(2)}</h1>
                            </div>
                       </div>
                    </div>
                    <div className="w-[50%]">
                       <div className="flex flex-col gap-3 pl-2 pt-2 items-center">
                            <h1>Porcentagem de Compra</h1>
                            <div className="flex items-center">
                                <h1 className="">{percentage.toFixed(1)}</h1>
                                <Percent size={16} strokeWidth={1.25}/>
                            </div>
                       </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default ExpensesComponent;