"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarRadiusAxis,
  Label,
} from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart"

import getOneProductionOrder from "../api/getOneProductionOrder"
import AddQuantity from "../molecules/AddQuantity"

interface ProductionOrder {
  id: number
  production_order_reference: string
  theoritical_final_product_quantity: number
  actual_final_product_quantity: number
}

export function RadialChart() {
  const { id } = useParams<{ id: string }>()
  const [productionOrder, setProductionOrder] =
    useState<ProductionOrder | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      const data = await getOneProductionOrder(Number(id))
      setProductionOrder(data)
    }

    fetchData()
  }, [id])

  if (!productionOrder) {
    return <div>Chargement…</div>
  }

  const produced = productionOrder.actual_final_product_quantity
  const total = productionOrder.theoritical_final_product_quantity
  const percentage = Math.round((produced / total) * 100)

  const fillColor =
    percentage < 50
      ? "var(--destructive)"
      : percentage < 80
      ? "var(--chart-4)"
      : "var(--chart-2)"

  const chartData = [
    {
      name: "production",
      value: percentage,
      fill: fillColor,
    },
  ]

  const chartConfig = {
    production: {
      label: "Production",
      color: fillColor,
    },
  } satisfies ChartConfig

  return (
    <Card className="max-w-[600px] mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="font-text text-center text-lg">
          Avancement production
        </CardTitle>
      </CardHeader>

      <CardContent className="flex items-center gap-4">
        <div className="flex-1">
          <ChartContainer
            config={chartConfig}
            className="aspect-square max-h-[180px]"
          >
            <RadialBarChart
              data={chartData}
              startAngle={0}
              endAngle={percentage * 3.6}
              innerRadius={60}
              outerRadius={85}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[66, 54]}
              />

              <RadialBar
                dataKey="value"
                background
                cornerRadius={8}
              />

              <PolarRadiusAxis tick={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (
                      viewBox &&
                      "cx" in viewBox &&
                      "cy" in viewBox
                    ) {
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
                            className="fill-foreground text-xl font-text"
                          >
                            {produced} / {total}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 18}
                            className="fill-muted-foreground font-text"
                          >
                            {percentage}% produit
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </div>

        <div className="w-px bg-border self-stretch" />

        <div className="w-[220px]">
          <AddQuantity />
        </div>
      </CardContent>
    </Card>
  )
}
