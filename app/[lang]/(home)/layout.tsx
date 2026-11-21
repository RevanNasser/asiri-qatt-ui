import { SiteShell } from "@/components/site/site-shell"
import type { Lang } from "@/lib/i18n"

export default async function Layout({ children, params }: LayoutProps<"/[lang]">) {
  const lang = (await params).lang as Lang
  return <SiteShell lang={lang}>{children}</SiteShell>
}
