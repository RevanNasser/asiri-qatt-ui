import { Separator } from "@/registry/qatt/ui/separator"

export default function SeparatorDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4 text-sm">
      <p>التوثيق</p>
      <Separator />
      <p>المكوّنات</p>
      <Separator variant="qatt" />
      <p>الكتل</p>
      <Separator variant="qatt" motif="hanash" />
      <div className="flex h-6 items-center gap-4">
        <span>الكتل</span>
        <Separator orientation="vertical" variant="qatt" />
        <span>السمة</span>
      </div>
    </div>
  )
}
