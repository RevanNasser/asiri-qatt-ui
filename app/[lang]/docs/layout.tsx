import { DocsLayout } from "fumadocs-ui/layouts/docs"

import { baseOptions } from "@/lib/layout.shared"
import type { Lang } from "@/lib/i18n"
import { source } from "@/lib/source"

export default async function Layout({ children, params }: LayoutProps<"/[lang]/docs">) {
  const { lang } = await params
  return (
    <DocsLayout tree={source.getPageTree(lang)} {...baseOptions(lang as Lang)}>
      {children}
    </DocsLayout>
  )
}
