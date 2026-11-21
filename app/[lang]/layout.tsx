import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RootProvider } from "fumadocs-ui/provider/next"

import "../globals.css"

import { DirectionProvider } from "@/components/ui/direction"
import { fontVariables } from "@/lib/fonts"
import { dirOf, i18n } from "@/lib/i18n"
import { fumadocsTranslationsAr } from "@/lib/layout.shared"
import { t } from "@/lib/site-copy"

export const metadata: Metadata = {
  title: { default: t("seo.home.title"), template: `%s — ${t("nav.brand")}` },
  description: t("seo.home.description"),
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }))
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params
  if (!(i18n.languages as string[]).includes(lang)) notFound()
  const dir = dirOf(lang)

  return (
    <html lang={lang} dir={dir} className={fontVariables} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <DirectionProvider direction={dir}>
          <RootProvider
            dir={dir}
            // Light (the day wall) is the default; the toggle still offers dark, and a visitor's choice persists.
            theme={{ defaultTheme: "light" }}
            i18n={{
              locale: lang,
              defaultLanguage: i18n.defaultLanguage,
              hideLocale: i18n.hideLocale,
              translations: fumadocsTranslationsAr,
            }}
          >
            {children}
          </RootProvider>
        </DirectionProvider>
      </body>
    </html>
  )
}
