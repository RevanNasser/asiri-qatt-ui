"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/qatt/ui/button"

/** An LTR shell command with a copy button; the status is announced to screen readers. */
export function InstallCommand({
  label,
  command,
  copyLabel,
  copiedLabel,
  hint,
  className,
}: {
  label: string
  command: string
  copyLabel: string
  copiedLabel: string
  /** Optional small link under the command (e.g. first-time setup). */
  hint?: { label: React.ReactNode; href: string }
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)
  return (
    <div className={cn("w-full max-w-xl text-start", className)}>
      <p className="mb-2 text-sm font-medium text-foreground">{label}</p>
      <div
        dir="ltr"
        className="flex items-center gap-2 border-2 border-qatt-ink bg-card py-1.5 ps-3 pe-1.5 shadow-[3px_3px_0_var(--qatt-ink)]"
      >
        <span aria-hidden="true" className="font-mono text-sm text-qatt-red select-none">
          $
        </span>
        <code className="min-w-0 flex-1 [scrollbar-width:none] overflow-x-auto text-left font-mono text-sm whitespace-nowrap">
          {command}
        </code>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={copyLabel}
          onClick={() => {
            void navigator.clipboard?.writeText(command).then(() => {
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            })
          }}
        >
          {copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
        </Button>
      </div>
      {hint && (
        <a
          href={hint.href}
          className="mt-2 inline-block text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          {hint.label}
        </a>
      )}
      <span role="status" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </div>
  )
}
