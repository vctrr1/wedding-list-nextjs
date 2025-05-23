"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartProps {
  data: { browser: string; visitors: number; fill: string }[];
  config: ChartConfig;
  percentage: number;
  numberOfItems: number;
  itemsPutchased: number;
}

export function ExpensesChart({
  data,
  config,
  percentage,
  numberOfItems,
  itemsPutchased,
}: ChartProps) {
  const totalVisitors = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.visitors, 0); // Usando o 'data' passado via props
  }, [data]); // Adicionando 'data' como dependência

  return (
    <Card className="flex flex-col rounded-none border-t">
      <CardHeader className="items-center pb-0">
        <CardDescription className="text-base">
          Gráfico das despesas
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={config} // Usando o 'config' passado via props
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel indicator="dot" />}
            />
            <Pie
              data={data} // Usando o 'data' passado via props
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString("pt-BR")}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total gasto
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="justify-center flex flex-col">
        <CardDescription className="text-base">
          Itens: {numberOfItems}
        </CardDescription>
        <CardDescription className="text-base">
          Adquiridos: {itemsPutchased}
        </CardDescription>
        <CardDescription className="text-base">
          Total: {percentage.toFixed(1)}%
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
