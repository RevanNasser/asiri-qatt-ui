import { notFound } from "next/navigation"

import { examples, isBlockExample } from "@/components/docs/examples"

export const dynamicParams = false

export function generateStaticParams() {
  const out: { dir: string; theme: string; name: string }[] = []
  for (const dir of ["rtl", "ltr"])
    for (const theme of ["light", "dark"]) for (const name of Object.keys(examples)) out.push({ dir, theme, name })
  return out
}

export default async function PreviewPage({ params }: PageProps<"/preview/[dir]/[theme]/[name]">) {
  const { name } = await params
  const example = examples[name]
  if (!example) notFound()
  const Example = example.component
  if (isBlockExample(name)) {
    return (
      <div data-slot="preview-root" data-kind="block" className="w-full">
        <Example />
      </div>
    )
  }
  return (
    <div
      data-slot="preview-root"
      data-kind="component"
      className="flex min-h-[inherit] w-full flex-wrap items-center justify-center gap-4 p-6 sm:p-10"
    >
      <Example />
    </div>
  )
}
