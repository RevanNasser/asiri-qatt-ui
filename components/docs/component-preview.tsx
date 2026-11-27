import fs from "node:fs/promises"
import path from "node:path"

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"

import { examples, isBlockExample } from "@/components/docs/examples"
import { PreviewFrame, type PreviewLabels } from "@/components/docs/preview-frame"
import { renderCopy } from "@/components/site/copy"
import { resolveRegistryUrl } from "@/lib/registry-url"
import type { Lang } from "@/lib/i18n"
import { copyFor } from "@/lib/site-copy"
import { source } from "@/lib/source"

export function previewLabels(lang: Lang = "ar"): PreviewLabels {
  const { t } = copyFor(lang)
  return {
    preview: t("docs.tab.preview"),
    code: t("docs.tab.code"),
    dirLabel: t("docs.preview.dir.label"),
    rtl: t("docs.preview.dir.rtl"),
    ltr: t("docs.preview.dir.ltr"),
    themeLabel: t("docs.preview.theme.label"),
    light: t("nav.theme.light"),
    dark: t("nav.theme.dark"),
    viewportLabel: t("docs.preview.viewport.label"),
    viewport: {
      mobile: t("docs.preview.viewport.mobile"),
      tablet: t("docs.preview.viewport.tablet"),
      desktop: t("docs.preview.viewport.desktop"),
    },
    openInV0: t("docs.v0.open"),
    v0Caveat: renderCopy(t("docs.v0.caveat")),
  }
}

/** v0 opens a public registry item by URL (shadcn docs: registry/open-in-v0). Structure only (D-005). */
export function v0Url(item: string) {
  return `https://v0.dev/chat/api/open?url=${encodeURIComponent(`${resolveRegistryUrl()}/r/${item}.json`)}`
}

function pageTitle(item: string, lang: Lang): string | undefined {
  const page = source.getPages(lang).find((p) => p.url.endsWith(`/${item}`))
  return typeof page?.data.title === "string" ? page.data.title : undefined
}

/**
 * Preview + code tabs for a live example (components/docs/examples.ts). The preview is an isolated iframe
 * with its own RTL/LTR and light/dark toggles (D-028). `item` enables "Open in v0".
 */
export async function ComponentPreview({
  name,
  item,
  title,
  lang = "ar",
}: {
  name: string
  item?: string
  title?: string
  lang?: Lang
}) {
  const example = examples[name]
  if (!example) throw new Error(`ComponentPreview: unknown example "${name}"`)
  const code = await fs.readFile(path.join(process.cwd(), "registry", example.file), "utf8")
  const registryItem = item ?? name.replace(/-demo$/, "")

  return (
    <PreviewFrame
      name={name}
      title={title ?? pageTitle(registryItem, lang) ?? registryItem}
      kind={isBlockExample(name) ? "block" : "component"}
      labels={previewLabels(lang)}
      v0Url={v0Url(registryItem)}
    >
      <DynamicCodeBlock lang="tsx" code={code.trimEnd()} />
    </PreviewFrame>
  )
}
