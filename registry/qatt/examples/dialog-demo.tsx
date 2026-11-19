"use client"

import { Button } from "@/registry/qatt/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/qatt/ui/dialog"

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="qatt-outline" />}>فتح</DialogTrigger>
      <DialogContent variant="qatt" ornament="mahareeb">
        <DialogHeader>
          <DialogTitle>نافذة حوار</DialogTitle>
          <DialogDescription>نافذةٌ تعلو الصفحة لتأكيد إجراءٍ أو إدخال بيانات.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>إلغاء</DialogClose>
          <DialogClose render={<Button variant="qatt" />}>تأكيد</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
