"use client"

import { Button } from "@/registry/qatt/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/qatt/ui/sheet"

export default function SheetDemo() {
  return (
    <div className="flex gap-3">
      {(["start", "end"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="qatt-outline" />}>
            فتح <bdi dir="ltr">{side}</bdi>
          </SheetTrigger>
          <SheetContent side={side} ornament="mathalith-makhamis">
            <SheetHeader>
              <SheetTitle>لوحة جانبية</SheetTitle>
              <SheetDescription>لوحةٌ تنزلق من طرف الشاشة وتحترم اتجاه القراءة.</SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose render={<Button variant="outline" />}>إغلاق</SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
