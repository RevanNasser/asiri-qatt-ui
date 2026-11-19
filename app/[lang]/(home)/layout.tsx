import { SiteShell } from "@/components/site/site-shell"

export default function Layout({ children }: LayoutProps<"/[lang]">) {
  return <SiteShell>{children}</SiteShell>
}
