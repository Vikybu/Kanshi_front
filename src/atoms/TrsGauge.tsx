"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TrsGaugeProps = {
  trs: number | null;
};

export function TrsGauge({ trs }: TrsGaugeProps) {
  if (trs === null || isNaN(trs)) {
    trs = 0
  }

  const rayon = 90;
  const total = Math.PI * rayon;

  const red = (60 / 100) * total;
  const orange = (15 / 100) * total;
  const green = (25 / 100) * total;

  const needleAngle = -90 + trs * 1.8;

  return (
    <Card className="w-112.5 h-60">
      <CardHeader className="items-center font-text">
        <CardTitle className="items-center font-text font-bold text-base">Suivi du TRS</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center">
        <svg viewBox="0 0 190 210 150" className="w-50">
          <path
            d="M10 100 A90 90 0 0 1 190 100"
            fill="none"
            stroke="var(--border)"
            strokeWidth="14"
          />

          <path
            d="M10 100 A90 90 0 0 1 190 100"
            fill="none"
            stroke="var(--destructive)"
            strokeWidth="14"
            strokeDasharray={`${red} ${total}`}
            strokeLinecap="round"
          />

          <path
            d="M10 100 A90 90 0 0 1 190 100"
            fill="none"
            stroke="var(--chart-4)"
            strokeWidth="14"
            strokeDasharray={`${orange} ${total}`}
            strokeDashoffset={`-${red}`}
            strokeLinecap="round"
          />

          <path
            d="M10 100 A90 90 0 0 1 190 100"
            fill="none"
            stroke="var(--chart-2)"
            strokeWidth="14"
            strokeDasharray={`${green} ${total}`}
            strokeDashoffset={`-${orange + red}`}
            strokeLinecap="round"
          />

          <g transform={`translate(100 100) rotate(${needleAngle})`}>
            <line x1="0" y1="0" x2="0" y2="-70" stroke="currentColor" strokeWidth="4" />
            <circle cx="0" cy="0" r="6" fill="currentColor" />
          </g>

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
  );
}
