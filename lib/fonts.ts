import localFont from "next/font/local"
import { IBM_Plex_Mono } from "next/font/google"

/** Licensed Thmanyah Sans files supplied for this site. The registry still ships its open-source defaults. */
export const thmanyahSans = localFont({
  src: [
    { path: "../app/fonts/thmanyah-sans-Light.woff2", weight: "300", style: "normal" },
    { path: "../app/fonts/thmanyah-sans-Regular.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-thmanyah-sans",
  display: "swap",
})

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
})

export const fontVariables = `${thmanyahSans.variable} ${plexMono.variable}`
