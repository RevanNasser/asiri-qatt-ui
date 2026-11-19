import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"

import { resolveRegistryUrl } from "@/lib/registry-url"
import { t } from "@/lib/site-copy"

const RUNNERS = {
  pnpm: "pnpm dlx shadcn@latest",
  npm: "npx shadcn@latest",
  yarn: "yarn shadcn@latest",
  bun: "bunx --bun shadcn@latest",
} as const

export function installCommands(item: string, registryUrl = resolveRegistryUrl()) {
  return Object.entries(RUNNERS).map(([pm, runner]) => ({
    pm,
    namespace: `${runner} add @qatt/${item}`,
    url: `${runner} add ${registryUrl}/r/${item}.json`,
  }))
}

/** Install command tabs (pnpm/npm/yarn/bun), each with the @qatt namespace form and the direct URL form. */
export function InstallCommand({ item }: { item: string }) {
  const commands = installCommands(item)
  return (
    <div dir="ltr" className="text-start" data-slot="install-command">
      <Tabs
        items={commands.map((c) => c.pm)}
        label={<span dir="rtl">{t("docs.install.pm.label")}</span>}
        groupId="package-manager"
        persist
      >
        {commands.map((c) => (
          <Tab key={c.pm}>
            <p className="mb-1 font-mono text-xs text-muted-foreground">@qatt</p>
            <DynamicCodeBlock lang="bash" code={c.namespace} />
            <p className="mt-3 mb-1 font-mono text-xs text-muted-foreground">URL</p>
            <DynamicCodeBlock lang="bash" code={c.url} />
          </Tab>
        ))}
      </Tabs>
    </div>
  )
}
