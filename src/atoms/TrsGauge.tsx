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
  const rayon = 90
  const totallllll = Math.PI * rayon

  const redddd = (60/100) * totallllll
  const orangeeee = (15/100) * totallllll
  const greeeen = (25/100) * totallllll
  
  const needleAngle = -90 + trs * 1.8

  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>TRS</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center">
        <svg viewBox="0 0 200 160" className="w-64">
          {/* Background */}
          <path
            d="M10 100 A90 90 0 0 1 190 100"
            fill="none"
            stroke="var(--border)"
            strokeWidth="14"
          />

          {/* 🔴 Rouge 0–60 */}
          <path
            d="M10 100 A90 90 0 0 1 190 100"
            fill="none"
            stroke="var(--destructive)"
            strokeWidth="14"
            strokeDasharray={`${redddd} ${totallllll}`}
            strokeLinecap="round"
          />

          {/* 🟠 Orange 60–75 */}
          <path
            d="M10 100 A90 90 0 0 1 190 100"
            fill="none"
            stroke="var(--chart-4)"
            strokeWidth="14"
            strokeDasharray={`${orangeeee} ${totallllll}`}
            strokeDashoffset={`-${redddd}`}
            strokeLinecap="round"
          />

          {/* 🟢 Vert 75–100 */}
          <path
            d="M10 100 A90 90 0 0 1 190 100"
            fill="none"
            stroke="var(--chart-2)"
            strokeWidth="14"
            strokeDasharray={`${greeeen} ${totallllll}`}
            strokeDashoffset={`-${orangeeee + redddd}`}
            strokeLinecap="round"
          />

          {/* Aiguille */}
          <g transform={`translate(100 100) rotate(${needleAngle})`}>
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
            y="130"
            textAnchor="middle"
            className="fill-foreground text-xl font-bold"
          >
            {trs} %
          </text>
        </svg>
      </CardContent>
    </Card>
  )
}
