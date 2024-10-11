"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ChartProps {
  data: { browser: string; visitors: number; fill: string }[];
  config: ChartConfig;
}

export function ExpensesChart({ data, config }: ChartProps) {
  const totalVisitors = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.visitors, 0) // Usando o 'data' passado via props
  }, [data]) // Adicionando 'data' como dependência

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardDescription className="text-base">Gráfico das despesas</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={config} // Usando o 'config' passado via props
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
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
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total gasto
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

