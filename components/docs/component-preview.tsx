import fs from "node:fs/promises"
import path from "node:path"

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"

import { examples } from "@/components/docs/examples"
import { t } from "@/lib/site-copy"

/** Preview + code tabs for a live example (see components/docs/examples.ts). */
export async function ComponentPreview({ name }: { name: string }) {
  const example = examples[name]
  if (!example) throw new Error(`ComponentPreview: unknown example "${name}"`)
  const Example = example.component
  const code = await fs.readFile(path.join(process.cwd(), "registry", example.file), "utf8")

  return (
    <Tabs items={[t("docs.tab.preview"), t("docs.tab.code")]}>
      <Tab>
        <div data-slot="component-preview" className="not-prose flex min-h-40 items-center justify-center p-6">
          <Example />
        </div>
      </Tab>
      <Tab>
        <div dir="ltr" className="text-start">
          <DynamicCodeBlock lang="tsx" code={code.trimEnd()} />
        </div>
      </Tab>
    </Tabs>
  )
}
