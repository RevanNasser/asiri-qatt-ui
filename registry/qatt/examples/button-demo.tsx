import { Button } from "@/registry/qatt/ui/button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="qatt">ابدأ الآن</Button>
      <Button variant="qatt-outline">تصفّح المكوّنات</Button>
      <Button>حفظ</Button>
      <Button variant="outline">إلغاء</Button>
      <Button variant="painted" tone="blue">
        متابعة
      </Button>
      <Button variant="painted" tone="yellow">
        إرسال
      </Button>
    </div>
  )
}
