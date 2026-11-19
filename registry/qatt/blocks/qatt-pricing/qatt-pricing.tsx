"use client"

import * as React from "react"
import { CheckIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatNumber } from "@/registry/qatt/lib/qatt-utils"
import { Badge } from "@/registry/qatt/ui/badge"
import { buttonVariants } from "@/registry/qatt/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/registry/qatt/ui/card"
import { QattMotifTile } from "@/registry/qatt/ui/qatt-pattern"
import { Tabs, TabsList, TabsTrigger } from "@/registry/qatt/ui/tabs"

export type QattCta = { label: string; href: string; variant?: "qatt" | "default" | "outline" | "qatt-outline" }
type Price = number | string | { monthly: number | string; yearly: number | string }

export interface QattPlan {
  name: string
  price: Price
  description?: string
  features: (string | { label: string; included?: boolean })[]
  cta: QattCta
  highlighted?: boolean
  badge?: string
}

export interface QattPricingProps extends Omit<React.ComponentProps<"section">, "title"> {
  title: string
  subtitle?: string
  /** Written after the number, as in Arabic: «99 ر.س». */
  currency?: string
  /** Labels for the monthly/yearly toggle; providing them shows the toggle. */
  period?: { monthly: string; yearly: string; label?: string; yearlyHint?: string; perMonth?: string; perYear?: string }
  plans: QattPlan[]
  /** Shown instead of 0. */
  freeLabel?: string
  /** Screen-reader labels for the feature check / minus icons. */
  includedLabel?: string
  notIncludedLabel?: string
}

function priceFor(price: Price, period: "monthly" | "yearly"): number | string {
  return typeof price === "object" ? price[period] : price
}

/** «جدول الأسعار»: plans side by side; the highlighted plan is framed with a taadheeq crest and a text badge. */
function QattPricing({
  title,
  subtitle,
  currency = "ر.س",
  period,
  plans,
  freeLabel,
  includedLabel,
  notIncludedLabel,
  className,
  ...props
}: QattPricingProps) {
  const id = React.useId()
  const [billing, setBilling] = React.useState<"monthly" | "yearly">("monthly")

  return (
    <section aria-labelledby={id} data-slot="qatt-pricing" className={cn("w-full", className)} {...props}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6">
        <header className="flex flex-col items-center gap-3 text-center">
          <h2 id={id} className="font-heading text-3xl font-bold">
            {title}
          </h2>
          {subtitle && <p className="max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
          {period && (
            <Tabs value={billing} onValueChange={(v) => setBilling(v as "monthly" | "yearly")}>
              <TabsList aria-label={period.label}>
                <TabsTrigger value="monthly">{period.monthly}</TabsTrigger>
                <TabsTrigger value="yearly">
                  {period.yearly}
                  {period.yearlyHint && (
                    <span className="text-xs font-normal text-muted-foreground">({period.yearlyHint})</span>
                  )}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}
        </header>
        <ul className="grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const planId = `${id}-plan-${index}`
            const value = priceFor(plan.price, billing)
            const per = period ? (billing === "monthly" ? period.perMonth : period.perYear) : undefined
            return (
              <li key={plan.name} className="relative flex pt-4">
                {plan.highlighted && (
                  <QattMotifTile
                    motif="taadheeq"
                    className="absolute start-1/2 top-0 z-10 h-8 w-6 -translate-x-1/2 rtl:translate-x-1/2"
                  />
                )}
                <Card
                  variant={plan.highlighted ? "framed" : "painted"}
                  className="w-full"
                  data-highlighted={plan.highlighted || undefined}
                >
                  <CardHeader className="gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 id={planId} className="font-heading text-xl font-semibold">
                        {plan.name}
                      </h3>
                      {plan.badge && <Badge variant="qatt">{plan.badge}</Badge>}
                    </div>
                    {plan.description && <p className="text-sm text-muted-foreground">{plan.description}</p>}
                    <p className="flex items-baseline gap-2">
                      <bdi className="font-heading text-4xl font-bold tabular-nums">
                        {typeof value === "number"
                          ? value === 0 && freeLabel
                            ? freeLabel
                            : `${formatNumber(value)} ${currency}`
                          : value}
                      </bdi>
                      {typeof value === "number" && value > 0 && per && (
                        <span className="text-sm text-muted-foreground">{per}</span>
                      )}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="flex flex-col gap-2">
                      {plan.features.map((f) => {
                        const feature = typeof f === "string" ? { label: f, included: true } : { included: true, ...f }
                        return (
                          <li
                            key={feature.label}
                            className={cn("flex items-start gap-2", !feature.included && "text-muted-foreground")}
                          >
                            {feature.included ? (
                              <CheckIcon aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                            ) : (
                              <MinusIcon aria-hidden="true" className="mt-1 size-4 shrink-0" />
                            )}
                            <span>
                              {feature.label}
                              {(feature.included ? includedLabel : notIncludedLabel) && (
                                <span className="sr-only">
                                  {" "}
                                  ({feature.included ? includedLabel : notIncludedLabel})
                                </span>
                              )}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </CardContent>
                  <CardFooter className="border-t-0 bg-transparent">
                    <a
                      href={plan.cta.href}
                      aria-describedby={planId}
                      className={cn(
                        buttonVariants({
                          variant: plan.cta.variant ?? (plan.highlighted ? "qatt" : "qatt-outline"),
                          size: "lg",
                        }),
                        "w-full",
                      )}
                    >
                      {plan.cta.label}
                    </a>
                  </CardFooter>
                </Card>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export { QattPricing }
