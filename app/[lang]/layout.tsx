import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RootProvider } from "fumadocs-ui/provider/next"

import "../globals.css"

import { DirectionProvider } from "@/components/ui/direction"
import { fontVariables } from "@/lib/fonts"
import { dirOf, i18n, type Lang } from "@/lib/i18n"
import { fumadocsTranslationsAr } from "@/lib/layout.shared"
import { t } from "@/lib/site-copy"

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const lang = (await params).lang as Lang
  return {
    title: { default: t("seo.home.title", lang), template: `%s — ${t("nav.brand", lang)}` },
    description: t("seo.home.description", lang),
  }
}

/** Language switcher entries: each language named in itself. */
const LOCALES = [
  { locale: "ar", name: "العربية" },
  { locale: "en", name: "English" },
]

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
              locales: LOCALES,
              // Fumadocs ships English UI strings; Arabic maps onto site copy.
              translations: lang === "ar" ? fumadocsTranslationsAr : undefined,
            }}
          >
            {children}
          </RootProvider>
        </DirectionProvider>
      </body>
    </html>
  )
}
