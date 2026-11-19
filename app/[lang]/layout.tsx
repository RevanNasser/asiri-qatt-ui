import type { Metadata } from "next"
import { IBM_Plex_Sans_Arabic } from "next/font/google"
import { notFound } from "next/navigation"
import { RootProvider } from "fumadocs-ui/provider/next"

import "../globals.css"

import { DirectionProvider } from "@/components/ui/direction"
import { dirOf, i18n } from "@/lib/i18n"
import { fumadocsTranslationsAr } from "@/lib/layout.shared"
import { t } from "@/lib/site-copy"

// TODO(ux-tokens): placeholder face; UX/UI owns the final Arabic font (kept in sync with the qatt-font item).
const fontSans = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
})

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
    <html lang={lang} dir={dir} className={fontSans.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <DirectionProvider direction={dir}>
          <RootProvider
            dir={dir}
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
