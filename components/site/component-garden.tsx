"use client"

import { CheckIcon, HeartIcon, MenuIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/qatt/ui/accordion"
import { Badge } from "@/registry/qatt/ui/badge"
import { Button } from "@/registry/qatt/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/qatt/ui/card"
import { Input } from "@/registry/qatt/ui/input"
import { QattBorder } from "@/registry/qatt/ui/qatt-border"
import { QattCorner } from "@/registry/qatt/ui/qatt-corner"
import { QattDivider } from "@/registry/qatt/ui/qatt-divider"
import { QattFrame } from "@/registry/qatt/ui/qatt-frame"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/qatt/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/qatt/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/qatt/ui/tooltip"

export type DemoLabels = {
  badge: string; ready: string; heroTitle: string; heroBody: string; frameCaption: string
  cardBadge: string; cardTitle: string; cardBody: string; cta: string
  borderTitle: string; borderBody: string; formTitle: string; formName: string; formPlaceholder: string
  formTone: string; quiet: string; warm: string; bright: string; save: string
  overview: string; details: string; principle: string; principleBody: string; motion: string; motionBody: string
  detailsBody: string; divider: string
}

/** A real page composition that makes the registry's components discoverable by hover. */
export function ComponentGarden({ labels }: { labels: DemoLabels }) {
  const themes = [
    { value: "quiet", label: labels.quiet },
    { value: "warm", label: labels.warm },
    { value: "bright", label: labels.bright },
  ]
  return (
    <TooltipProvider>
      <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          <NamedSurface name="QattFrame" className="h-full">
            <QattFrame ratio={4 / 3} base="rukun" className="h-full" caption={labels.frameCaption}>
              <div className="flex size-full flex-col justify-between bg-qatt-jiss p-6">
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="qatt">{labels.badge}</Badge>
                  <Badge variant="pigment" tone="ink"><CheckIcon aria-hidden="true" className="size-3" /> {labels.ready}</Badge>
                </div>
                <div className="space-y-2">
                  <h2 className="font-heading text-2xl font-bold tracking-tight">{labels.heroTitle}</h2>
                  <p className="text-sm leading-6 text-muted-foreground">{labels.heroBody}</p>
                </div>
              </div>
            </QattFrame>
          </NamedSurface>

          <NamedSurface name="Card + Button + Badge" className="h-full">
            <Card variant="framed" className="h-full min-h-72">
              <CardHeader className="gap-3">
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="banat">{labels.cardBadge}</Badge>
                  <HeartIcon aria-hidden="true" className="size-5 text-qatt-red" />
                </div>
                <CardTitle>{labels.cardTitle}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-5 text-muted-foreground">
                <p>{labels.cardBody}</p>
                <Button variant="qatt" className="w-fit">{labels.cta}</Button>
              </CardContent>
            </Card>
          </NamedSurface>

          <NamedSurface name="Input + Select" className="h-full">
            <Card variant="framed" className="h-full min-h-72">
              <CardHeader>
                <CardTitle>{labels.formTitle}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-5">
                <label className="grid gap-2 text-sm font-medium">
                  {labels.formName}
                  <Input variant="qatt" placeholder={labels.formPlaceholder} />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  {labels.formTone}
                  <Select items={themes} defaultValue="quiet">
                    <SelectTrigger variant="qatt" className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {themes.map((theme) => <SelectItem key={theme.value} value={theme.value}>{theme.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </label>
                <Button variant="qatt-outline" className="w-full">{labels.save}</Button>
              </CardContent>
            </Card>
          </NamedSurface>

          <NamedSurface name="Tabs + Accordion" className="h-full">
            <Card variant="framed" className="h-full min-h-72">
              <CardContent className="pt-1">
                <Tabs defaultValue="overview" className="gap-4">
                  <TabsList variant="qatt">
                    <TabsTrigger value="overview">{labels.overview}</TabsTrigger>
                    <TabsTrigger value="details">{labels.details}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <Accordion variant="qatt" defaultValue={["principle"]}>
                      <AccordionItem value="principle">
                        <AccordionTrigger>{labels.principle}</AccordionTrigger>
                        <AccordionContent>{labels.principleBody}</AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="motion">
                        <AccordionTrigger>{labels.motion}</AccordionTrigger>
                        <AccordionContent>{labels.motionBody}</AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </TabsContent>
                  <TabsContent value="details" className="py-3 text-sm leading-6 text-muted-foreground">
                    {labels.detailsBody}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </NamedSurface>

          <NamedSurface name="QattBorder + QattCorner" className="h-full">
            <QattBorder side="block" motif="rukun" thickness="sm" caps className="h-full min-h-48 bg-qatt-jiss">
              <div className="relative flex h-full flex-col justify-between p-6">
                <QattCorner position="start-start" size="lg" />
                <QattCorner position="end-end" size="lg" />
                <MenuIcon aria-hidden="true" className="size-5 text-qatt-ink" />
                <div className="space-y-2">
                  <p className="font-heading text-xl font-semibold">{labels.borderTitle}</p>
                  <p className="text-sm leading-6 text-muted-foreground">{labels.borderBody}</p>
                </div>
              </div>
            </QattBorder>
          </NamedSurface>
          <NamedSurface name="QattDivider" className="flex min-h-48 items-center rounded-lg border-2 border-qatt-ink bg-qatt-jiss px-6">
            <QattDivider mural="frieze" label={labels.divider} className="my-0" />
          </NamedSurface>
      </div>
    </TooltipProvider>
  )
}

function NamedSurface({ name, className, children }: { name: string; className?: string; children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger render={<div className={cn("group/component rounded-lg outline-none", className)} aria-label={name} />}>
        {children}
      </TooltipTrigger>
      <TooltipContent side="top"><code dir="ltr">{name}</code></TooltipContent>
    </Tooltip>
  )
}
