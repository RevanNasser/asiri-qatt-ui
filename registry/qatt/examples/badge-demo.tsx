import { Badge } from "@/registry/qatt/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="qatt">مفتوح المصدر</Badge>
      <Badge>مطلوب</Badge>
      <Badge variant="outline">اختياري</Badge>
      <Badge variant="banat">مفتوح المصدر</Badge>
      <Badge variant="pigment" tone="blue">
        RTL
      </Badge>
      <Badge variant="pigment" tone="ink">
        LTR
      </Badge>
    </div>
  )
}
