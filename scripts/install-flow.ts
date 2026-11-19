/**
 * Install-flow gate: proves every registry item installs into a FRESH shadcn RTL Next app and that it builds.
 *
 *   1. build the registry with REGISTRY_URL=http://localhost:<port>, serve public/ on that port
 *   2. `shadcn create -t next --rtl` a fresh app (pinned CLI) in $INSTALL_FLOW_DIR (default: OS temp dir)
 *   3. pass "namespace": configure @qatt, `shadcn add @qatt/<every item>`        -> checks -> tsc -> next build
 *   4. pass "url":       reset the app, `shadcn add http://.../r/<item>.json`    -> checks -> tsc -> next build
 *   5. delete the fixture (KEEP_FIXTURE=1 keeps it)
 *
 * Usage: pnpm test:install [--pass=namespace|url]
 */
import { spawn, spawnSync, type SpawnSyncOptions } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

import { generateRegistry, ROOT } from "./registry-lib"

const PORT = Number(process.env.REGISTRY_PORT ?? 4000)
const REGISTRY_URL = `http://localhost:${PORT}`
const SHADCN = `shadcn@${process.env.SHADCN_VERSION ?? "4.23.0"}`
const BASE_DIR = path.resolve(process.env.INSTALL_FLOW_DIR ?? path.join(os.tmpdir(), "qatt-install-flow"))
const APP_DIR = path.join(BASE_DIR, "app")
const onlyPass = process.argv.find((a) => a.startsWith("--pass="))?.split("=")[1]

// Reuse the global pnpm store via hard links so a fixture costs little extra disk (D-010).
const env: NodeJS.ProcessEnv = {
  ...process.env,
  CI: "1",
  npm_config_package_import_method: "hardlink",
  NEXT_TELEMETRY_DISABLED: "1",
}
delete env.REGISTRY_URL

const results: { step: string; ok: boolean; detail?: string }[] = []

function run(cmd: string, args: string[], opts: SpawnSyncOptions & { allowFail?: boolean } = {}) {
  console.log(`\n$ ${cmd} ${args.join(" ")}   (cwd: ${opts.cwd ?? ROOT})`)
  const res = spawnSync(cmd, args, { cwd: ROOT, env, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opts })
  const out = `${res.stdout ?? ""}${res.stderr ?? ""}`
  process.stdout.write(out.split("\n").slice(-25).join("\n") + "\n")
  if (res.status !== 0 && !opts.allowFail) throw new Error(`${cmd} ${args.join(" ")} exited with ${res.status}`)
  return out
}

function step(name: string, fn: () => string | void) {
  try {
    const detail = fn() ?? undefined
    results.push({ step: name, ok: true, detail })
  } catch (error) {
    results.push({ step: name, ok: false, detail: (error as Error).message })
    throw error
  }
}

const PHYSICAL =
  /(?<![\w-])-?(ml|mr|pl|pr|left|right|border-l|border-r|rounded-l|rounded-r)-[\w./[\]-]+|(?<![\w-])(text-left|text-right)(?![\w-])/

function checkInstalled(pass: string) {
  const read = (p: string) => fs.readFileSync(path.join(APP_DIR, p), "utf8")
  const expectFile = (p: string) => {
    if (!fs.existsSync(path.join(APP_DIR, p))) throw new Error(`[${pass}] expected file ${p} was not installed`)
  }
  const installed = ["lib/qatt-utils.ts", "hooks/use-direction.ts", ...UI_ITEMS.map((n) => `components/ui/${n}.tsx`)]
  for (const f of [...installed, "components/ui/direction.tsx"]) expectFile(f)
  // overrides really replaced the upstream shadcn files
  if (!read("components/ui/button.tsx").includes('"qatt-outline"'))
    throw new Error(`[${pass}] button.tsx was not overridden`)

  const css = read("app/globals.css")
  for (const v of ["--qatt-red:", "--qatt-jiss:", "--color-qatt-red"])
    if (!css.includes(v)) throw new Error(`[${pass}] globals.css missing ${v} (qatt-theme cssVars)`)
  const primary = generateRegistry(REGISTRY_URL).items.find((i) => i.name === "qatt-theme")!.cssVars as {
    light: Record<string, string>
  }
  if (!css.includes(`--primary: ${primary.light.primary}`))
    throw new Error(`[${pass}] globals.css --primary was not replaced by the Qatt value`)
  if (!css.includes('[data-qatt-surface="gypsum"]'))
    throw new Error(`[${pass}] globals.css missing the gypsum surface scope`)
  const layout = read("app/layout.tsx")
  for (const font of ["IBM_Plex_Sans_Arabic", "Readex_Pro", "IBM_Plex_Mono"])
    if (!layout.includes(font)) throw new Error(`[${pass}] layout.tsx missing ${font} (qatt-font items)`)

  for (const f of installed) {
    const src = read(f)
    if (src.includes("@/registry/"))
      throw new Error(`[${pass}] ${f} still imports from @/registry (alias rewrite failed)`)
    const m = src.match(PHYSICAL)
    if (m) throw new Error(`[${pass}] ${f} contains physical direction class "${m[0]}"`)
  }
  return "files, theme vars, font, aliases, logical classes OK"
}

function writeConsumerPage() {
  const dir = path.join(APP_DIR, "app/qatt-check")
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(
    path.join(dir, "client.tsx"),
    `"use client"
import { useDirection } from "@/hooks/use-direction"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"
export function Client() {
  const dir = useDirection()
  return (
    <TooltipProvider>
      <p data-dir={dir}>{dir}</p>
      <Tabs defaultValue="a"><TabsList variant="qatt"><TabsTrigger value="a">a</TabsTrigger></TabsList><TabsContent value="a">a</TabsContent></Tabs>
      <Sheet><SheetTrigger render={<Button variant="qatt" />}>s</SheetTrigger><SheetContent side="start"><SheetTitle>s</SheetTitle></SheetContent></Sheet>
      <Dialog><DialogTrigger render={<Button variant="painted" tone="blue" />}>d</DialogTrigger><DialogContent variant="qatt"><DialogTitle>d</DialogTitle></DialogContent></Dialog>
      <Select items={[{ value: "a", label: "a" }]}><SelectTrigger variant="qatt"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="a">a</SelectItem></SelectContent></Select>
      <Tooltip><TooltipTrigger render={<Button />}>t</TooltipTrigger><TooltipContent side="inline-end">t</TooltipContent></Tooltip>
      <Accordion variant="qatt"><AccordionItem value="a"><AccordionTrigger>a</AccordionTrigger><AccordionContent>a</AccordionContent></AccordionItem></Accordion>
      <Avatar ring><AvatarFallback tone="red">q</AvatarFallback></Avatar>
      <Separator variant="qatt" />
      <Toaster />
    </TooltipProvider>
  )
}
`,
  )
  fs.writeFileSync(
    path.join(dir, "page.tsx"),
    `import { DirectionProvider } from "@/components/ui/direction"
import { QattDivider } from "@/components/ui/qatt-divider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { formatNumber, getMotif } from "@/lib/qatt-utils"
import { Client } from "./client"

export default function Page() {
  return (
    <DirectionProvider direction="rtl">
      <main dir="rtl" lang="ar" className="bg-qatt-jiss text-qatt-red p-4">
        <QattDivider />
        <Badge variant="qatt">b</Badge>
        <Card variant="painted"><CardContent>{formatNumber(1234)}</CardContent></Card>
        <Input variant="qatt" aria-label="i" />
        <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbPage>p</BreadcrumbPage></BreadcrumbItem><BreadcrumbSeparator separator="khatmah" /></BreadcrumbList></Breadcrumb>
        <Pagination variant="qatt"><PaginationContent><PaginationItem><PaginationPrevious href="#" /></PaginationItem><PaginationItem><PaginationNext href="#" /></PaginationItem></PaginationContent></Pagination>
        <section data-qatt-surface="gypsum">{getMotif("hanash")?.id}</section>
        <Client />
      </main>
    </DirectionProvider>
  )
}
`,
  )
}

function buildApp(pass: string) {
  writeConsumerPage()
  step(`[${pass}] tsc --noEmit`, () => void run("pnpm", ["exec", "tsc", "--noEmit"], { cwd: APP_DIR }))
  step(`[${pass}] next build`, () => {
    const out = run("pnpm", ["exec", "next", "build"], { cwd: APP_DIR })
    if (!out.includes("/qatt-check")) throw new Error("route /qatt-check not in build output")
    return "built, /qatt-check prerendered"
  })
}

function add(pass: string, specs: string[]) {
  const out = run("pnpm", ["dlx", SHADCN, "add", ...specs, "-y", "--overwrite"], { cwd: APP_DIR })
  if (/Would you like to overwrite|Something went wrong/i.test(out))
    throw new Error(`[${pass}] shadcn add prompted or failed`)
}

const ALL = generateRegistry(REGISTRY_URL).items
const ITEMS = ALL.map((i) => i.name)
const UI_ITEMS = ALL.filter((i) => i.type === "registry:ui").map((i) => i.name)

async function main() {
  let server: ReturnType<typeof spawn> | undefined
  try {
    step(
      "registry build (REGISTRY_URL=" + REGISTRY_URL + ")",
      () => void run("pnpm", ["registry:build"], { env: { ...env, REGISTRY_URL } }),
    )
    server = spawn(
      process.execPath,
      [path.join(ROOT, "scripts/serve-registry.mjs"), path.join(ROOT, "public"), String(PORT)],
      { stdio: "inherit" },
    )
    await new Promise((r) => setTimeout(r, 800))
    step("registry served", () => {
      const out = run("curl", ["-sf", `${REGISTRY_URL}/r/qatt-theme.json`])
      if (!out.includes('"registry:theme"')) throw new Error("qatt-theme.json not served")
    })

    fs.rmSync(BASE_DIR, { recursive: true, force: true })
    fs.mkdirSync(BASE_DIR, { recursive: true })
    step(`fresh app: ${SHADCN} create -t next --rtl`, () => {
      run("pnpm", ["dlx", SHADCN, "create", "-t", "next", "-d", "--rtl", "--no-monorepo", "-n", "app", "-y"], {
        cwd: BASE_DIR,
      })
      const cfg = JSON.parse(fs.readFileSync(path.join(APP_DIR, "components.json"), "utf8"))
      if (cfg.rtl !== true || cfg.style !== "base-nova")
        throw new Error(`unexpected components.json: rtl=${cfg.rtl} style=${cfg.style}`)
      run("git", ["add", "-A"], { cwd: APP_DIR })
      run(
        "git",
        [
          "-c",
          "user.name=install-flow",
          "-c",
          "user.email=install-flow@localhost",
          "commit",
          "-qm",
          "fresh app",
          "--no-verify",
        ],
        { cwd: APP_DIR, allowFail: true },
      )
      return "components.json: style=base-nova, rtl=true"
    })

    if (!onlyPass || onlyPass === "namespace") {
      step(
        "[namespace] shadcn registry add @qatt",
        () =>
          void run("pnpm", ["dlx", SHADCN, "registry", "add", `@qatt=${REGISTRY_URL}/r/{name}.json`], { cwd: APP_DIR }),
      )
      step(`[namespace] shadcn add ${ITEMS.map((i) => "@qatt/" + i).join(" ")}`, () =>
        add(
          "namespace",
          ITEMS.map((i) => `@qatt/${i}`),
        ),
      )
      step("[namespace] checks", () => checkInstalled("namespace"))
      buildApp("namespace")
    }

    if (!onlyPass || onlyPass === "url") {
      step("[url] reset fixture to fresh app", () => {
        run("git", ["reset", "--hard", "-q"], { cwd: APP_DIR })
        run("git", ["clean", "-fdq"], { cwd: APP_DIR })
        fs.rmSync(path.join(APP_DIR, ".next"), { recursive: true, force: true })
        const cfg = JSON.parse(fs.readFileSync(path.join(APP_DIR, "components.json"), "utf8"))
        if (cfg.registries?.["@qatt"]) throw new Error("@qatt still configured; url pass must run without a namespace")
      })
      step(`[url] shadcn add ${REGISTRY_URL}/r/<item>.json x${ITEMS.length}`, () =>
        add(
          "url",
          ITEMS.map((i) => `${REGISTRY_URL}/r/${i}.json`),
        ),
      )
      step("[url] checks", () => checkInstalled("url"))
      buildApp("url")
    }
  } catch {
    // recorded in results
  } finally {
    server?.kill()
    if (!process.env.KEEP_FIXTURE) fs.rmSync(BASE_DIR, { recursive: true, force: true })
  }

  console.log("\n=== install-flow summary ===")
  for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.step}${r.detail ? `  — ${r.detail}` : ""}`)
  const failed = results.some((r) => !r.ok)
  console.log(failed ? "\nINSTALL-FLOW: FAIL" : "\nINSTALL-FLOW: PASS")
  process.exit(failed ? 1 : 0)
}

void main()
