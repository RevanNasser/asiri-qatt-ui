"use client"

import { toast } from "sonner"

import { Button } from "@/registry/qatt/ui/button"
import { Toaster } from "@/registry/qatt/ui/sonner"

export default function SonnerDemo() {
  return (
    <>
      <Button variant="qatt-outline" onClick={() => toast.success("تم النسخ")}>
        نسخ
      </Button>
      <Toaster />
    </>
  )
}
