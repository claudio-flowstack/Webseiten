/**
 * @baustein Pricing with Chart
 * @zweck Pricing-Sektion mit integriertem Line-Chart für Plan-Popularität
 * @geeignet-fuer SaaS Pricing, Analytics-Produkte, Data-driven Products
 * @stil Clean, Split-Layout (Free vs Pro), Purple Akzente, Chart-Integration
 */

import React from "react"
import { Button } from "@/components/ui/button"
import { CheckCircleIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

const chartData = [
  { month: "Jan", free: 186, pro: 305 },
  { month: "Feb", free: 205, pro: 410 },
  { month: "Mär", free: 237, pro: 520 },
  { month: "Apr", free: 173, pro: 480 },
  { month: "Mai", free: 209, pro: 610 },
  { month: "Jun", free: 214, pro: 740 },
]

const chartConfig = {
  free: {
    label: "Free",
    color: "hsl(270 60% 70%)",
  },
  pro: {
    label: "Pro",
    color: "hsl(270 80% 55%)",
  },
} satisfies ChartConfig

type PlanFeature = {
  text: string
  included: boolean
}

const freePlanFeatures: PlanFeature[] = [
  { text: "5 Projekte", included: true },
  { text: "1 GB Speicher", included: true },
  { text: "Basis-Analysen", included: true },
  { text: "E-Mail Support", included: true },
  { text: "API Zugang", included: false },
  { text: "Prioritäts-Support", included: false },
]

const proPlanFeatures: PlanFeature[] = [
  { text: "Unbegrenzte Projekte", included: true },
  { text: "50 GB Speicher", included: true },
  { text: "Erweiterte Analysen", included: true },
  { text: "Prioritäts-Support", included: true },
  { text: "API Zugang", included: true },
  { text: "Eigene Integrationen", included: true },
]

function FeatureList({ features }: { features: PlanFeature[] }) {
  return (
    <ul className="space-y-3">
      {features.map((feature) => (
        <li key={feature.text} className="flex items-center gap-2.5">
          <CheckCircleIcon
            className={
              feature.included
                ? "size-5 shrink-0 text-purple-500 dark:text-purple-400"
                : "size-5 shrink-0 text-muted-foreground/40"
            }
          />
          <span
            className={
              feature.included
                ? "text-sm text-foreground"
                : "text-sm text-muted-foreground line-through"
            }
          >
            {feature.text}
          </span>
        </li>
      ))}
    </ul>
  )
}

function PopularityChart() {
  return (
    <Card className="border-purple-500/20 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Plan-Popularität</CardTitle>
        <CardDescription>Nutzerentwicklung der letzten 6 Monate</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-border/50"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              type="monotone"
              dataKey="free"
              stroke="var(--color-free)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="pro"
              stroke="var(--color-pro)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default function PricingWithChart() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Einfache, transparente Preise
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Starte kostenlos und wachse mit deinen Anforderungen. Kein
            versteckter Aufwand, keine überraschenden Kosten.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Free Plan */}
          <Card className="relative border-border/60 bg-card transition-shadow hover:shadow-lg dark:border-border/40">
            <CardHeader>
              <CardTitle className="text-xl">Free</CardTitle>
              <CardDescription>
                Perfekt zum Ausprobieren und für kleine Projekte
              </CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold text-foreground">0 EUR</span>
                <span className="ml-1 text-muted-foreground">/Monat</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <FeatureList features={freePlanFeatures} />
              <Button
                variant="outline"
                className="w-full border-purple-500/30 text-purple-600 hover:bg-purple-50 dark:border-purple-400/30 dark:text-purple-400 dark:hover:bg-purple-950/30"
              >
                Kostenlos starten
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="relative border-purple-500/40 bg-card shadow-lg shadow-purple-500/5 transition-shadow hover:shadow-xl hover:shadow-purple-500/10 dark:border-purple-400/30 dark:shadow-purple-500/10">
            <div className="absolute -top-3 left-6">
              <span className="rounded-full bg-purple-600 px-3 py-1 text-xs font-medium text-white dark:bg-purple-500">
                Beliebtester Plan
              </span>
            </div>
            <CardHeader>
              <CardTitle className="text-xl">Pro</CardTitle>
              <CardDescription>
                Für Teams und professionelle Anwendungen
              </CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold text-foreground">49 EUR</span>
                <span className="ml-1 text-muted-foreground">/Monat</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <FeatureList features={proPlanFeatures} />
              <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
                Jetzt upgraden
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <div className="mt-12">
          <PopularityChart />
        </div>
      </div>
    </section>
  )
}
