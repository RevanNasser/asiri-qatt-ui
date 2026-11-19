import { notFound } from "next/navigation"

// Any unmatched URL lands here and renders app/[lang]/not-found.tsx with HTTP 404.
export default function CatchAll() {
  notFound()
}
