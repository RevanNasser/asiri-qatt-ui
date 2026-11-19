"use client"

import { SearchIcon } from "lucide-react"
import { useSearchContext } from "fumadocs-ui/contexts/search"

import { Button } from "@/registry/qatt/ui/button"

/** Opens the Fumadocs search dialog (⌘K). */
export function SearchButton({ label }: { label: string }) {
  const { setOpenSearch } = useSearchContext()
  return (
    <Button variant="qatt-outline" size="lg" onClick={() => setOpenSearch(true)}>
      <SearchIcon data-icon="inline-start" aria-hidden="true" />
      {label}
    </Button>
  )
}
