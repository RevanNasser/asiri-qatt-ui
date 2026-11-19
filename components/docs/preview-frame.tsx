"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { MonitorIcon, MoonIcon, SmartphoneIcon, SunIcon, TabletIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/qatt/ui/tabs"

type Dir = "rtl" | "ltr"
type Theme = "light" | "dark"
type Viewport = "mobile" | "tablet" | "desktop"

const VIEWPORT_WIDTH: Record<Viewport, string> = { mobile: "375px", tablet: "768px", desktop: "100%" }

export interface PreviewLabels {
  preview: string
  code: string
  dirLabel: string
  rtl: string
  ltr: string
  themeLabel: string
  light: string
  dark: string
  viewport: Record<Viewport, string>
  v0Caveat: React.ReactNode
}

const noopSubscribe = () => () => {}

function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
  name,
}: {
  label?: string
  value: T
  onChange: (v: T) => void
  name: string
  options: { value: T; content: React.ReactNode; ariaLabel?: string }[]
}) {
  return (
    <div role="group" aria-label={label} data-slot={`preview-${name}`} className="inline-flex rounded-md border p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          aria-label={o.ariaLabel}
          data-value={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-sm px-2 text-xs font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            value === o.value && "bg-secondary text-secondary-foreground",
          )}
        >
          {o.content}
        </button>
      ))}
    </div>
  )
}

/**
 * Docs preview (site-ia §6/§7): Preview / Code tabs, and an isolated <iframe> preview whose direction and
 * theme are set per preview (RTL↔LTR, light↔dark), never on the page. Blocks also get viewport widths.
 */
export function PreviewFrame({
  name,
  title,
  kind,
  labels,
  v0Url,
  children,
}: {
  name: string
  title: string
  kind: "component" | "block"
  labels: PreviewLabels
  v0Url?: string
  /** The code tab (server-rendered code block). */
  children: React.ReactNode
}) {
  const { resolvedTheme } = useTheme()
  // client-only values without setState-in-effect: `mounted` is false during SSR/hydration
  const mounted = React.useSyncExternalStore(noopSubscribe, () => true, () => false)
  const pageDir = React.useSyncExternalStore(
    noopSubscribe,
    (): Dir => (document.documentElement.dir === "ltr" ? "ltr" : "rtl"),
    (): Dir => "rtl",
  )
  const [dir, setDir] = React.useState<Dir | null>(null)
  const [theme, setTheme] = React.useState<Theme | null>(null)
  const [viewport, setViewport] = React.useState<Viewport>("desktop")
  const minHeight = kind === "block" ? 420 : 320
  const [measured, setMeasured] = React.useState<{ src: string; height: number } | null>(null)
  const frame = React.useRef<HTMLIFrameElement>(null)
  const caveatId = React.useId()

  const effDir: Dir = dir ?? pageDir
  const effTheme: Theme = theme ?? (resolvedTheme === "dark" ? "dark" : "light")
  const src = `/preview/${effDir}/${effTheme}/${name}`
  const frameKey = `${src}#${viewport}`
  const height = measured?.src === frameKey ? Math.max(minHeight, measured.height) : minHeight

  React.useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== window.location.origin || e.source !== frame.current?.contentWindow) return
      const data = e.data as { type?: string; height?: number }
      if (data?.type === "qatt-preview-height" && typeof data.height === "number")
        setMeasured({ src: frameKey, height: Math.ceil(data.height) })
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [frameKey])

  return (
    <div data-slot="preview-frame" data-name={name} className="not-prose my-6 rounded-lg border bg-card">
      <Tabs defaultValue="preview" className="gap-0">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b p-2">
          <TabsList variant="qatt">
            <TabsTrigger value="preview">{labels.preview}</TabsTrigger>
            <TabsTrigger value="code">{labels.code}</TabsTrigger>
          </TabsList>
          <div className="flex flex-wrap items-center gap-2">
            {kind === "block" && (
              <Segmented
                name="viewport"
                // TODO(ar-copy): docs.preview.viewport.label (group name for the viewport buttons).
                value={viewport}
                onChange={setViewport}
                options={[
                  {
                    value: "mobile",
                    ariaLabel: labels.viewport.mobile,
                    content: <SmartphoneIcon aria-hidden="true" className="size-4" />,
                  },
                  {
                    value: "tablet",
                    ariaLabel: labels.viewport.tablet,
                    content: <TabletIcon aria-hidden="true" className="size-4" />,
                  },
                  {
                    value: "desktop",
                    ariaLabel: labels.viewport.desktop,
                    content: <MonitorIcon aria-hidden="true" className="size-4" />,
                  },
                ]}
              />
            )}
            <Segmented
              name="dir"
              label={labels.dirLabel}
              value={effDir}
              onChange={setDir}
              options={[
                {
                  value: "rtl",
                  content: (
                    <>
                      <span lang="en">RTL</span>
                      <span className="sr-only"> {labels.rtl}</span>
                    </>
                  ),
                },
                {
                  value: "ltr",
                  content: (
                    <>
                      <span lang="en">LTR</span>
                      <span className="sr-only"> {labels.ltr}</span>
                    </>
                  ),
                },
              ]}
            />
            <Segmented
              name="theme"
              label={labels.themeLabel}
              value={effTheme}
              onChange={setTheme}
              options={[
                { value: "light", ariaLabel: labels.light, content: <SunIcon aria-hidden="true" className="size-4" /> },
                { value: "dark", ariaLabel: labels.dark, content: <MoonIcon aria-hidden="true" className="size-4" /> },
              ]}
            />
            {v0Url && (
              // TODO(ar-copy): docs.v0.open — Arabic label for "Open in v0".
              <a
                href={v0Url}
                target="_blank"
                rel="noreferrer"
                lang="en"
                dir="ltr"
                aria-describedby={caveatId}
                data-slot="open-in-v0"
                className="inline-flex h-8 items-center rounded-md border px-2 text-xs font-medium outline-none hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Open in v0
              </a>
            )}
          </div>
        </div>
        <TabsContent value="preview" keepMounted className="data-hidden:hidden">
          <div data-slot="component-preview" className="overflow-x-auto bg-background">
            <div
              className="mx-auto"
              style={{
                width: kind === "block" ? VIEWPORT_WIDTH[viewport] : "100%",
                maxWidth: kind === "block" && viewport === "desktop" ? "100%" : undefined,
              }}
            >
              {mounted ? (
                <iframe
                  ref={frame}
                  key={src}
                  src={src}
                  title={title}
                  loading="lazy"
                  data-dir={effDir}
                  data-theme={effTheme}
                  className="block w-full border-0"
                  style={{ height }}
                />
              ) : (
                <div style={{ height: minHeight }} />
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div dir="ltr" className="p-2 text-start">
            {children}
          </div>
        </TabsContent>
      </Tabs>
      {v0Url && (
        <p id={caveatId} className="border-t px-3 py-2 text-xs text-muted-foreground">
          {labels.v0Caveat}
        </p>
      )}
    </div>
  )
}
