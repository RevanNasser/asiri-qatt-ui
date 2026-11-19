"use client"

import { CopyIcon } from "lucide-react"

import { Button } from "@/registry/qatt/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/qatt/ui/tooltip"

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex gap-3">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="انسخ الأمر" />}>
            <CopyIcon aria-hidden="true" />
          </TooltipTrigger>
          <TooltipContent>انسخ الأمر</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>نسخ</TooltipTrigger>
          <TooltipContent side="inline-end">انسخ الشيفرة</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
