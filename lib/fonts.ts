import { IBM_Plex_Mono, IBM_Plex_Sans_Arabic, Readex_Pro } from "next/font/google"

// design-tokens.md §6 (all SIL OFL 1.1). Mirrored by the qatt-font / qatt-font-heading / qatt-font-mono registry items.
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
})

export const readex = Readex_Pro({
  subsets: ["arabic", "latin"],
  weight: "variable",
  variable: "--font-readex",
  display: "swap",
})

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
})

export const fontVariables = `${plexArabic.variable} ${readex.variable} ${plexMono.variable}`
