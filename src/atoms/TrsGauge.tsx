"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type TrsGaugeProps = {
  trs: number
}

export function TrsGauge({ trs }: TrsGaugeProps) {
  const clampedTrs = Math.min(100, Math.max(0, trs))
  const angle = -90 + clampedTrs * 1.8

  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>TRS</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center">
        <svg viewBox="0 0 200 120" className="w-64">
          {/* Arc de fond */}
          <path
            d="M10 100 A90 90 0 0 1 190 100"
            fill="none"
            stroke="var(--border)"
            strokeWidth="14"
          />

          {/* Arc TRS */}
          <path
            d="M10 100 A90 90 0 0 1 190 100"
            fill="none"
            stroke={
              clampedTrs < 60
                ? "var(--destructive)"
                : clampedTrs < 80
                ? "var(--chart-4)"
                : "var(--chart-2)"
            }
            strokeWidth="14"
            strokeDasharray={`${clampedTrs * 1.8} 180`}
            strokeLinecap="round"
          />

          {/* Aiguille */}
          <g transform={`translate(100 100) rotate(${angle})`}>
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-70"
              stroke="currentColor"
              strokeWidth="4"
            />
            <circle cx="0" cy="0" r="6" fill="currentColor" />
          </g>

          {/* Texte */}
          <text
            x="100"
            y="115"
            textAnchor="middle"
            className="fill-foreground text-xl font-bold"
          >
            {clampedTrs} %
          </text>
        </svg>
      </CardContent>
    </Card>
  )
}
