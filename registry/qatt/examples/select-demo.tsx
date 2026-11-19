"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/qatt/ui/select"

const items = [
  { value: "light", label: "الوضع الفاتح" },
  { value: "dark", label: "الوضع الداكن" },
  { value: "system", label: "حسب النظام" },
]

export default function SelectDemo() {
  return (
    <div className="grid gap-1.5">
      <span id="demo-theme-label" className="text-sm font-medium">
        السمة
      </span>
      <Select items={items} defaultValue="system">
        <SelectTrigger aria-labelledby="demo-theme-label" className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
